from flask import Blueprint, jsonify, request
from app import db
from model import Configuration

cf = Blueprint("config", __name__, url_prefix="/config")

@cf.route("add_configuration", methods=["POST"])
def addConfiguration():
    configData = request.get_json()

    newConfiguration = Configuration(   hand=configData["hand"], 
                                        gesture=configData["gesture"],
                                        action=configData["action"])

    db.session.add(newConfiguration)
    db.session.commit()

    return "Added", 201


@cf.route("/retrieve")
def retrieve():
    configQuery = Configuration.query.all()
    configData = []

    for configuration in configQuery:
        configData.append({ "hand" : configuration.hand,
                            "gesture" : configuration.gesture,
                            "action" : configuration.action})

    return jsonify({"config" : configData})