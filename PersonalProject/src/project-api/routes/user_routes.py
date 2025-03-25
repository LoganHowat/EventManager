from flask import Blueprint
from models import User
from database import db
from flask import request
import json

user_bp= Blueprint('user_bp', __name__)

def convertJson(user):# This function calls a method defined in the user class that serializes the Object
    return user.serialized()

def validateNewUser(user):
    try:
        if user["name"] and user["email"] and user["password"]:
            return False
        else:
            return {
                "message":"All fields must be filled in"
            }, 404
    except:
        return{
            "Message":"Something went wrong"
        },500