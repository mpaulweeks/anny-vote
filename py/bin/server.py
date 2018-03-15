#!/usr/bin/env python

from datetime import datetime
import json
import os
from flask import (
    abort,
    Flask,
    send_file,
)
from flask_cors import CORS

from ..src import store

EVENT_CACHE = {}


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


def get_cached_event(number):
    if number not in EVENT_CACHE:
        if number == 0:
            event = store.get_latest_event()
            EVENT_CACHE[number] = store.get_event_data_by_number(event.number)
        else:
            EVENT_CACHE[number] = store.get_event_data_by_number(number)
    return EVENT_CACHE[number]


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../../static',
)
# temp for local dev
CORS(app)


@app.route('/')
def index():
    return send_file('../../static/index.html')


@app.route('/api/event/latest')
def get_latest_event():
    event_data = get_cached_event(0)
    return json.dumps(event_data, default=json_serial)


@app.route('/api/event/<event_number>')
def get_event_by_number(event_number):
    number = int(str(event_number))
    if number < 1:
        abort(404)
    event_data = get_cached_event(number)
    return json.dumps(event_data, default=json_serial)


@app.route('/api/scrape')
def scrape_events():
    new_slugs = store.scrape_and_record()
    EVENT_CACHE.clear()
    return json.dumps(new_slugs)


@app.route('/api/data')
def get_data():
    all_event_data = store.get_all_event_data()
    return json.dumps(all_event_data, default=json_serial)


def main():
    with open('server.pid', 'wt') as f:
        f.write(str(os.getpid()))
    app.run(
        # debug=True,
        host='localhost',
        port=6200,
    )


if __name__ == "__main__":
    main()
