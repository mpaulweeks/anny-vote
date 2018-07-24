
import requests
from bs4 import BeautifulSoup


PREFIX = 'www.animationnights.com/'
CRAWL_URLS = [
    'http://www.animationnights.com/events-2/',
    'http://www.animationnights.com/pastprograms/',
]


class FilmInfo():
    def __init__(self, name, description, image_url):
        self.name = name
        self.description = description
        self.image_url = image_url

    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
        }


def crawl_url_for_events(url):
    req = requests.get(url)

    if(req.status_code != 200):
        print(req.status_code, url)
        return []

    return crawl_html_for_events(req.text)


def crawl_html_for_events(html_text):
    soup = BeautifulSoup(html_text, 'html.parser')

    event_urls = []
    event_links = soup.find_all('span', {'class': 'mk-button--text'})
    for el in event_links:
        url = el.parent.get('href').strip()
        if PREFIX in url:
            event_urls.append(url)
    return event_urls


def extract_slug_from_url(url):
    slug = url.split(PREFIX)[-1]
    if slug[-1] == '/':
        slug = slug[0:-1]
    return slug


def crawl_events():
    return [
        event_url
        for to_crawl in CRAWL_URLS
        for event_url in crawl_url_for_events(to_crawl)
    ]


def scrape_event(url):
    print('scraping event:', url)
    req = requests.get(url)

    if(req.status_code != 200):
        print(req.status_code, url)
        return []

    soup = BeautifulSoup(req.text, 'html.parser')

    films = []
    film_titles = soup.find_all('div', {'class': 'gallery-title'})
    for ft in film_titles:
        title = ft.get_text()
        description = ft.find_next('div').get_text()
        image_url = ft.parent.find_next('a').get('href')
        film = FilmInfo(title, description, image_url)
        films.append(film)

    return films
