from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from webcam import feed
    from config import cf
    app.register_blueprint(feed)
    app.register_blueprint(cf)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000)