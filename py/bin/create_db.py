
from ..src.model import (
    sqlite_db,
    models,
)


if __name__ == "__main__":
    sqlite_db.connect()
    sqlite_db.create_tables(models)
    sqlite_db.close()
