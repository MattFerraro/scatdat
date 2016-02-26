from flask import Flask, request
import flask
import api
app = Flask(__name__, static_url_path='/static', static_path='/static')


@app.route('/')
def hello_world():
    return flask.render_template("index.html")


@app.route('/events')
def get_events():
    all_events = api.get_events()
    return flask.jsonify({"events": all_events})


@app.route('/events', methods=['POST'])
def post_event():
    stall_id = request.args.get('stall_id', None)
    door_open = request.args.get('door_open', None)
    batt_v = request.args.get('batt_v', None)
    return flask.jsonify(api.new_event(stall_id, door_open, batt_v))


@app.route('/statuses/')
def get_statuses():
    return flask.jsonify(api.get_statuses())


@app.before_first_request
def initialize():
    api.initialize_db("scatdat.db")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
