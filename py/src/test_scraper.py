
import unittest

from . import scraper


class ScraperTestCase(unittest.TestCase):

    def test_crawl_events(self):
        result = scraper.crawl_events()
        self.assertIn('http://www.animationnights.com/screening36/', result)
        self.assertIn('http://www.animationnights.com/screening01/', result)


if __name__ == '__main__':
    unittest.main()
