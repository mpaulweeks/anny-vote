
from ..src.model import (
    sqlite_db,
)
from ..src.store import (
    scrape_and_record,
)


if __name__ == "__main__":
    sqlite_db.connect()
    new_slugs = scrape_and_record()
    sqlite_db.close()

    print(new_slugs)
