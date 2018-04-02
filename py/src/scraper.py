
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


def search_for_events(url):
    req = requests.get(url)

    if(req.status_code != 200):
        print(req.status_code, url)
        return []

    soup = BeautifulSoup(req.text, 'html.parser')

    event_slugs = []
    event_links = soup.find_all('span', {'class': 'mk-button--text'})
    for el in event_links:
        url = el.parent.get('href')
        prefix = 'www.animationnights.com/'
        if prefix in url:
            slug = url.split(prefix)[-1]
            if slug[-1] == '/':
                slug = slug[0:-1]
            event_slugs.append(slug)
    return event_slugs


def scrape_event_slugs():
    past = search_for_events('http://www.animationnights.com/pastprograms/')
    curr = search_for_events('http://www.animationnights.com/events-2/')
    return curr + past


def scrape_event(slug):
    print('scraping event:', slug)
    url = 'http://www.animationnights.com/%s/' % slug
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
