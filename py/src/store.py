
from collections import defaultdict
from datetime import timedelta
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
    crawl_events,
    scrape_event,
    extract_slug_from_url,
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


def calc_week(dt):
    # todo convert to est
    temp = dt
    while temp.weekday() != 6:  # 6 == Sunday
        # walk back to find first day of the week
        temp = temp - timedelta(days=1)
    week = str(temp)[0:10]
    return week


def get_votes_by_event(event_id):
    most_recent_votes = (
        Vote
        .select()
        .where(Vote.event_id == event_id)
        .group_by(Vote.user_token)
        .having(Vote.created_at == fn.MAX(Vote.created_at))
    )
    by_week = {}
    for vote in most_recent_votes:
        vote_week = calc_week(vote.created_at)
        if vote_week not in by_week:
            by_week[vote_week] = {
                'id': vote_week,
                'count': 0,
                'votes': defaultdict(int),
            }
        aggregate = by_week[vote_week]
        aggregate['count'] += 1
        vote_data = json.loads(vote.blob)
        for film_id, liked in vote_data.items():
            if liked:
                aggregate['votes'][film_id] += 1
    week_array = [week_data for week_data in by_week.values()]
    return sorted(week_array, reverse=True, key=lambda wd: wd['id'])


def record_votes(event_id, token, votes):
    return Vote.create(
        event_id=event_id,
        user_token=token,
        blob=json.dumps(votes),
    ).to_dict()


def crawl():
    return crawl_events()


def scrape_and_record_urls(urls):
    slugs_inserted = []
    for url in urls:
        es = extract_slug_from_url(url)
        query = Event.select().where(Event.slug == es)
        number = Event.extract_slug_number(es)
        if number and not query.exists():
            slugs_inserted.append(es)
            event = Event.create_from_slug(es, number)
            filmInfos = scrape_event(url)
            for index, filmInfo in enumerate(filmInfos):
                Film.create_from_scraped_info(event, index, filmInfo)
    return slugs_inserted


def scrape_and_record():
    event_urls = crawl_events()
    return scrape_and_record_urls(event_urls)


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


def get_all_event_votes_data():
    events_data = get_all_event_data()
    for event_data in events_data:
        event_data['votes'] = get_votes_by_event(event_data['event']['id'])
    return events_data
