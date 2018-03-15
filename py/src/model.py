import datetime
import json
import os

from peewee import (
    SqliteDatabase,
    Model,
    PrimaryKeyField,
    ForeignKeyField,
    IntegerField,
    BooleanField,
    CharField,
    TextField,
    DateTimeField,
)
from playhouse.shortcuts import model_to_dict


sqlite_db = SqliteDatabase(os.environ.get('ANNY_VOTE_DB', 'sqlite.db'))


class BaseModel(Model):
    class Meta:
        database = sqlite_db

    def to_json(self):
        return json.dumps(model_to_dict(self))


class Event(BaseModel):
    id = PrimaryKeyField()
    slug = CharField(unique=True)


class Film(BaseModel):
    id = PrimaryKeyField()
    event_id = ForeignKeyField(Event, to_field='id')
    order = IntegerField()
    name = CharField()
    description = TextField()
    image_url = TextField()


class Vote(BaseModel):
    id = PrimaryKeyField()
    film_id = ForeignKeyField(Film, to_field='id')
    user_id = CharField()
    liked = BooleanField()
    created_at = DateTimeField(default=datetime.datetime.utcnow)


models = [
    Event,
    Film,
    Vote,
]
