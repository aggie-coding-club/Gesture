from app import db

class Configuration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hand = db.Column(db.String(10))
    gesture = db.Column(db.String(20))
    action = db.Column(db.String(60))
    alias = db.Column(db.String(30))