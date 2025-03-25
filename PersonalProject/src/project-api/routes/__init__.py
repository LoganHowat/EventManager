from flask import Blueprint
from .user_routes import user_routes
from .product_routes import product_routes

# Create a single Blueprint
routes_bp = Blueprint("routes", __name__)

# Register individual route modules
routes_bp.register_blueprint(user_routes)