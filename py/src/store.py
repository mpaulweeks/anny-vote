
from .model import (
    Event,
    Film,
)
from .scraper import (
    scrape_event_slugs,
    scrape_event,
)


def scrape_and_record():
    event_slugs = scrape_event_slugs()
    slugs_inserted = []
    for es in event_slugs:
        query = Event.select().where(Event.slug == es)
        if not query.exists():
            slugs_inserted.append(es)
            event = Event.create(slug=es)
            filmInfos = scrape_event(es)
            for index, filmInfo in enumerate(filmInfos):
                Film.create_from_scraped_info(event, index, filmInfo)
    return slugs_inserted


def get_events():
    events = Event.select()
    films = Film.select()
    s_events = sorted(events, key=lambda d: d.created_at, reverse=True)
    s_films = sorted(films, key=lambda d: d.created_at, reverse=False)
    data = []
    for e in s_events:
        data.append({
            'event': e.to_dict(),
            'films': [f.to_dict() for f in df if f.event_id == e.id],
        })
    return data
