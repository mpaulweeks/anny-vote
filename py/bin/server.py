#!/usr/bin/env python

import os
from flask import (
    Flask,
    send_file,
)

import .store

EVENT_CACHE = {}


def get_cached_event(key):
    if key not in EVENT_CACHE:
        if key == 'latest':
            # todo special case
            pass
        else:
            # todo get event
            EVENT_CACHE[key] = None
    return EVENT_CACHE[key]


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../static',
)


@app.route('/')
def index():
    return send_file('../static/index.html')


@app.route('/api/event/latest')
def get_latest_event():
    return get_cached_event('latest')


@app.route('/api/event/<event_id>')
def get_event_by_id(event_id):
    return get_cached_event(event_id)


@app.route('/api/scrape')
def scrape_events():
    store.scrape_and_record()
    EVENT_CACHE.clear()
    all_event_data = store.get_events()
    return json.dumps(all_event_data)


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
