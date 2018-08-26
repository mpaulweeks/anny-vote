#!/usr/bin/env python

from datetime import datetime
import json
import os
from flask import (
    Flask,
    abort,
    request,
)
from flask_cors import CORS

from ..src import store

EVENT_CACHE = {}


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def to_json(obj):
    return json.dumps(obj, default=json_serial)


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
)
# only enable CORS in flask for local dev
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route('/api/event/latest')
def get_latest_event():
    event_data = get_cached_event(0)
    return to_json(event_data)


@app.route('/api/event/number/<event_number>')
def get_event_by_number(event_number):
    number = int(str(event_number))
    if number < 1:
        abort(404)
    event_data = get_cached_event(number)
    return to_json(event_data)


@app.route('/api/events')
def get_all_events():
    events_data = store.get_all_events()
    return to_json(events_data)


@app.route('/api/event/<event_id>/user/<token>/votes', methods=['POST'])
def post_votes(event_id, token):
    votes = request.get_json()['payload']
    newVote = store.record_votes(event_id, token, votes)
    return to_json(newVote)


@app.route('/api/event/<event_id>/user/<token>/votes')
def get_votes_by_token(event_id, token):
    try:
        votes = store.get_votes_by_event_and_token(event_id, token)
    except Exception:
        abort(404)
    return to_json(votes)


@app.route('/api/event/<event_id>/votes')
def get_votes(event_id):
    votes = store.get_votes_by_event(event_id)
    return to_json(votes)


@app.route('/api/crawl', methods=['POST'])
def crawl():
    result = store.crawl()
    return to_json(result)


@app.route('/api/scrape', methods=['POST'])
def scrape():
    result = store.scrape_and_record()
    EVENT_CACHE.clear()
    return to_json(result)


@app.route('/api/scrape/custom', methods=['POST'])
def scrape_custom():
    url = request.get_json()['url']
    result = store.scrape_and_record_urls([url])
    EVENT_CACHE.clear()
    return to_json(result)


@app.route('/api/data')
def get_data():
    all_event_data = store.get_all_event_votes_data()
    return to_json(all_event_data)


def main():
    with open('server.pid', 'wt') as f:
        f.write(str(os.getpid()))
    app.run(
        # debug=True,
        host='localhost',
        port=5400,
    )


if __name__ == "__main__":
    main()
