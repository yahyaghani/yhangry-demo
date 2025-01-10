from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cuisine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    total_orders = db.Column(db.Integer, default=0)
    live_menus = db.Column(db.Integer, default=0)

class SetMenu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price_per_person = db.Column(db.Float, nullable=False)
    min_spend = db.Column(db.Float, nullable=False)
    number_of_orders = db.Column(db.Integer, default=0)
    is_live = db.Column(db.Boolean, default=True)
    image = db.Column(db.String(500))
    thumbnail = db.Column(db.String(500))
    cuisine_id = db.Column(db.Integer, db.ForeignKey('cuisine.id'), nullable=False)
    cuisine = db.relationship('Cuisine', backref=db.backref('set_menus', lazy=True))
