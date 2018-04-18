
from collections import defaultdict
from datetime import datetime, timedelta
import json

from peewee import (
    fn,
)

from .model import (
    Event,
    Film,
    Vote,
)
from .scraper import (
    scrape_event_slugs,
    scrape_event,
)


def get_latest_event():
    return Event.select().order_by(Event.number.desc()).get()


def get_all_events():
    return [
      e.to_dict()
      for e
      in Event.select()
    ]


def get_event_data_by_number(number):
    event = Event.get(number=number)
    films = Film.select().where(Film.event_id == event.id).order_by(Film.order)
    return {
        'event': event.to_dict(),
        'films': [f.to_dict() for f in films],
    }


def get_votes_by_event_and_token(event_id, token):
    vote = (
        Vote
        .select()
        .where(Vote.event_id == event_id, Vote.user_token == token)
        .order_by(Vote.created_at.desc())
        .get()
    )
    return json.loads(vote.blob)


def get_votes_by_event(event_id):
    most_recent_votes = (
        Vote
        .select()
        .where(Vote.event_id == event_id)
        .group_by(Vote.user_token)
        .having(Vote.created_at == fn.MAX(Vote.created_at))
    )
    count = 0
    aggregate = defaultdict(int)
    epoch = datetime.now() - timedelta(hours=24)
    for vote in most_recent_votes:
        if epoch <= vote.created_at:
            count += 1
            vote_data = json.loads(vote.blob)
            for film_id, liked in vote_data.items():
                if liked:
                    aggregate[film_id] += 1
    return {
        'count': count,
        'votes': aggregate,
    }


def record_votes(event_id, token, votes):
    return Vote.create(
        event_id=event_id,
        user_token=token,
        blob=json.dumps(votes),
    ).to_dict()


def scrape_and_record():
    event_slugs = scrape_event_slugs()
    slugs_inserted = []
    for es in event_slugs:
        query = Event.select().where(Event.slug == es)
        if not query.exists():
            slugs_inserted.append(es)
            event = Event.create_from_slug(es)
            filmInfos = scrape_event(es)
            for index, filmInfo in enumerate(filmInfos):
                Film.create_from_scraped_info(event, index, filmInfo)
    return slugs_inserted


def get_all_event_data():
    events = Event.select()
    films = Film.select()
    s_events = sorted(events, key=lambda d: d.number, reverse=True)
    s_films = sorted(films, key=lambda d: d.order, reverse=False)
    data = []
    for e in s_events:
        data.append({
            'event': e.to_dict(),
            'films': [f.to_dict() for f in s_films if f.event.id == e.id],
        })
    return data
