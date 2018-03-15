#!/usr/bin/env python

from datetime import datetime
import json
import os
from flask import (
    Flask,
    send_file,
)

from ..src import store

EVENT_CACHE = {}


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


def get_cached_event(key):
    if key not in EVENT_CACHE:
        if key == 'latest':
            event = store.get_latest_event()
            EVENT_CACHE[key] = store.get_event_data_by_slug(event.slug)
        else:
            EVENT_CACHE[key] = store.get_event_data_by_slug(event.key)
    return EVENT_CACHE[key]


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../../static',
)


@app.route('/')
def index():
    return send_file('../../static/index.html')


@app.route('/api/event/latest')
def get_latest_event():
    return json.dumps(get_cached_event('latest'), default=json_serial)


@app.route('/api/event/<event_id>')
def get_event_by_id(event_id):
    return json.dumps(get_cached_event(event_id), default=json_serial)


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
