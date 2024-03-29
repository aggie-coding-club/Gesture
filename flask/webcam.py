from flask import Blueprint, Response
import recognition.detection as dt
from model import Configuration

feed = Blueprint('video', __name__, url_prefix="/video")

@feed.route('/feed')
def video_feed():
    configQuery = Configuration.query.all()
    configData = []

    for configuration in configQuery:
        configData.append({ "hand" : configuration.hand,
                            "gesture" : configuration.gesture,
                            "action" : configuration.action,
                            "alias" : configuration.alias})

    return Response(dt.gen_video(configData), mimetype='multipart/x-mixed-replace; boundary=frame')


@feed.route('/off')
def off():
    return Response(dt.gen_off(), mimetype='multipart/x-mixed-replace; boundary=frame')


@feed.route('/switch')
def switch():
    dt.switchWebcam()
    return "Switched", 200

