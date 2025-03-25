from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email