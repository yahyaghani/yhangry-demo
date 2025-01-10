from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
import time
import os
import requests
from main_db import db, Cuisine, SetMenu

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(BASE_DIR, "yhangry.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

# Initialize Flask-Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["1 per second"],  # Default rate limit for all routes
)

# Database Initialization
@app.cli.command('init-db')
def init_db():
    db.create_all()
    print("Database initialized.")

# Data Harvesting Command
@app.cli.command('harvest-data')
def harvest_data():
    API_URL = "https://staging.yhangry.com/booking/test/set-menus"
    headers = {"Accept": "application/json"}
    response = requests.get(API_URL, headers=headers)
    if response.status_code == 200:
        data = response.json()["data"]
        for menu in data:
            cuisine_name = menu["cuisines"][0]["name"]
            cuisine = Cuisine.query.filter_by(name=cuisine_name).first()
            if not cuisine:
                cuisine = Cuisine(name=cuisine_name)
                db.session.add(cuisine)
                db.session.commit()

            set_menu = SetMenu(
                name=menu["name"],
                description=menu.get("description"),
                price_per_person=menu["price_per_person"],
                min_spend=menu["min_spend"],
                number_of_orders=menu["number_of_orders"],
                is_live=menu["status"] == 1,
                image=menu["image"],
                thumbnail=menu["thumbnail"],
                cuisine_id=cuisine.id
            )
            db.session.add(set_menu)
            db.session.commit()
            cuisine.total_orders += menu["number_of_orders"]
            if set_menu.is_live:
                cuisine.live_menus += 1
            db.session.commit()
        print("Data harvested successfully.")
    else:
        print("Failed to fetch data from API.")

# Before and After Request Hooks for Logging Response Time
@app.before_request
def start_timer():
    g.start_time = time.time()

@app.after_request
def log_response_time(response):
    if hasattr(g, 'start_time'):
        end_time = time.time()
        response_time_ms = (end_time - g.start_time) * 1000
        print(f"Request to {request.path} took {response_time_ms:.2f} ms")
    return response

# API to Get Set Menus
@limiter.limit("1 per second", error_message="Rate limit exceeded. Please slow down.")
@app.route('/api/set-menus', methods=['GET'])
def get_set_menus():
    cuisine_slug = request.args.get('cuisineSlug')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    query = SetMenu.query.filter_by(is_live=True)
    if cuisine_slug:
        cuisine = Cuisine.query.filter_by(name=cuisine_slug).first()
        if cuisine:
            query = query.filter_by(cuisine_id=cuisine.id)

    menus = query.order_by(SetMenu.number_of_orders.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    results = [
        {
            "id": menu.id,
            "name": menu.name,
            "description": menu.description,
            "price_per_person": menu.price_per_person,
            "min_spend": menu.min_spend,
            "number_of_orders": menu.number_of_orders,
            "cuisine": menu.cuisine.name,
            "image": menu.image,
            "thumbnail": menu.thumbnail
        }
        for menu in menus.items
    ]
    return jsonify({"menus": results, "total": menus.total})

# API to Get Cuisines
@limiter.limit("1 per second", error_message="Rate limit exceeded. Please slow down.")
@app.route('/api/cuisines', methods=['GET'])
def get_cuisines():
    cuisines = Cuisine.query.order_by(Cuisine.total_orders.desc()).all()
    results = [{
        "id": cuisine.id,
        "name": cuisine.name,
        "total_orders": cuisine.total_orders,
        "live_menus": cuisine.live_menus
    } for cuisine in cuisines]

    return jsonify({"cuisines": results})

if __name__ == '__main__':
    app.run(debug=True)
