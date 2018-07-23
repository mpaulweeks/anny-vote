
import requests
from bs4 import BeautifulSoup


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


def crawl_for_events(url):
    req = requests.get(url)

    if(req.status_code != 200):
        print(req.status_code, url)
        return []

    soup = BeautifulSoup(req.text, 'html.parser')

    event_urls = []
    event_links = soup.find_all('span', {'class': 'mk-button--text'})
    for el in event_links:
        url = el.parent.get('href')
        prefix = 'www.animationnights.com/'
        if prefix in url:
            event_urls.append(url)
    return event_urls


def crawl_events():
    past = search_for_events('http://www.animationnights.com/pastprograms/')
    curr = search_for_events('http://www.animationnights.com/events-2/')
    return curr + past


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


if __name__ == '__main__':
    # scrape_event('screening30')
    # for f in scrape_event('screening31'):
        # print(f.to_json())
    print(scrape_event_slugs())
