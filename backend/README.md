```markdown
# Backend Project (Flask) README

This repository contains the backend API for a web application that displays set menus, allows filtering by cuisine, and handles pagination.  It's built using Flask, SQLAlchemy for database interaction, and Flask-Limiter for rate limiting.  This README will help you understand how to run and use the API.

## Project Setup

1. **Python and Virtual Environment:**  Ensure you have Python 3.x installed.  Create a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Linux/macOS
   .venv\Scripts\activate  # On Windows
   ```

2. **Install Dependencies:**

   ```bash
   pip install flask flask-sqlalchemy flask-limiter flask-cors requests
   ```

3. **Create the Database:**

   ```bash
   python app.py init-db  # Initialize the SQLite database (yhangry.db) in the same directory as app.py
   ```
  This will create the database and tables if they don't exist.

4. **Harvest Initial Data (Important):**

   ```bash
   python app.py harvest-data
   ```
   This command fetches data from the provided API endpoint (`https://staging.yhangry.com/booking/test/set-menus`) and populates the database with set menus and cuisines.  Run this only once to populate the database.

## Running the API

```bash
python app.py
```

This starts the Flask development server.  You can access the API at `http://127.0.0.1:5000/`.

## API Endpoints

### `/api/set-menus` (GET)

* **Description:** Retrieves a paginated list of set menus.
* **Parameters:**
    * `page` (int, optional): Page number (default: 1).
    * `per_page` (int, optional): Items per page (default: 10).
    * `cuisineSlug` (string, optional): Filter menus by cuisine name.
* **Response:**
    * `menus` (list): List of set menu objects. Each object includes: `id`, `name`, `description`, `price_per_person`, `min_spend`, `number_of_orders`, `image`, `thumbnail`, `cuisine` (name of the cuisine).
    * `total` (int): Total number of set menus matching the criteria.

### `/api/cuisines` (GET)

* **Description:** Retrieves a list of all cuisines.
* **Response:**
    * `cuisines` (list): List of cuisine objects. Each object includes: `id`, `name`, `total_orders`, `live_menus`.


## Data Model

The API utilizes SQLAlchemy models (`Cuisine` and `SetMenu`) to represent the data structure.  The `main_db.py` file defines these models.  Crucially, relationships are established through `backref` for efficient data retrieval.


## Rate Limiting

The Flask-Limiter middleware is configured to limit API requests to a rate of `1 per second` per remote address. This is configured in `app.py`.


## Error Handling and Logging

The code includes basic error handling for API requests.  More comprehensive error handling and logging (e.g., using a logging library) is highly recommended for production environments.  The `before_request` and `after_request` decorators log request times.


## Important Considerations for Production

- **Database Choice:** Consider using a more robust database (like PostgreSQL) instead of SQLite for production.
- **Security:**  Implement proper security measures (e.g., authentication, authorization) in a production environment.
- **Error Handling:** Improve error handling and logging to provide more informative error messages.
- **Testing:**  Write unit tests for the API endpoints to ensure code correctness and maintainability.
- **Deployment:** Use a deployment tool (like Heroku, Docker) for a production-ready environment.
- **Rate Limiting Strategy:** Choose a rate-limiting strategy appropriate for your application's needs. The current `1 per second` is suitable for development but might not be sufficient for high traffic.

This enhanced README provides a clearer and more comprehensive understanding of the Flask backend API.  Remember to adapt this to your specific needs and adjust error handling, security, and deployment strategies accordingly.
```