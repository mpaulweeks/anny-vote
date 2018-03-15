
import requests
from bs4 import BeautifulSoup


class FilmInfo():
    def __init__(self, name, description, imgUrl):
        self.name = name
        self.description = description
        self.imgUrl = imgUrl

    def to_json(self):
        return {
            'name': self.name,
            'description': self.description,
            'imgUrl': self.imgUrl,
        }


def scrape_event(slug):
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
        imgUrl = ft.parent.findNext('a').get('href')
        film = FilmInfo(title, description, imgUrl)
        films.append(film)

    return films


if __name__ == '__main__':
    # scrape_event('screening30')
    for f in scrape_event('screening31'):
        print(f.to_json())
