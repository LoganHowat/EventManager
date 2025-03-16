from flask import Flask
from flask_cors import CORS
import os
from db import db
from routes import routes

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(routes)

# Create tables if they don’t exist
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)