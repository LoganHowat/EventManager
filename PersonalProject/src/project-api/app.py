from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from db import init_db, db
from routes import routes

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure database from environment
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database
init_db(app)

# Register routes
app.register_blueprint(routes)

# Create tables if they don’t exist
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)