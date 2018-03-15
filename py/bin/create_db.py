
from ..src.model import (
    sqlite_db,
    models,
)
from ..src.store import (
    scrape_and_record,
)


if __name__ == "__main__":
    sqlite_db.connect()
    sqlite_db.create_tables(models)

    new_slugs = scrape_and_record()
    print(new_slugs)

    sqlite_db.close()
