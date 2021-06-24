from flask import Blueprint, jsonify, request
from app import db
from model import Configuration

cf = Blueprint("config", __name__, url_prefix="/config")

@cf.route("add_configuration", methods=["POST"])
def addConfiguration():
    configData = request.get_json()

    newConfiguration = Configuration(   hand=configData["hand"],
                                        gesture=configData["gesture"],
                                        action=configData["action"],
                                        alias=configData["alias"])

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
                            "action" : configuration.action,
                            "alias" : configuration.alias})

    return jsonify({"config" : configData})


@cf.route("update_configuration", methods=["POST"])
def updateConfiguration():
    configData = request.get_json()

    configuration = Configuration.query.filter_by(alias=configData["alias"]).first()
    configuration.gesture = configData["gesture"]
    db.session.commit()

    return "Updated", 201
#
# @cf.route("delete_configuration", methods=[])
# def deleteConfig():


