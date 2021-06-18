from flask import Blueprint, Response
import recognition.detection as dt

feed = Blueprint('video', __name__, url_prefix="/video")

@feed.route('/feed')
def video_feed():
    return Response(dt.gen_video(), mimetype='multipart/x-mixed-replace; boundary=frame')


@feed.route('/off')
def off():
    return Response(dt.gen_off(), mimetype='multipart/x-mixed-replace; boundary=frame')

