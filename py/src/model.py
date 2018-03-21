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

    def to_dict(self):
        return model_to_dict(self, max_depth=0)

    def to_json(self):
        return json.dumps(self.to_dict())


class Event(BaseModel):
    id = PrimaryKeyField()
    number = IntegerField(unique=True)
    slug = CharField(unique=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    @classmethod
    def create_from_slug(cls, slug):
        number = int(slug.split('screening')[-1])
        return Event.create(
            number=number,
            slug=slug,
        )


class Film(BaseModel):
    id = PrimaryKeyField()
    event = ForeignKeyField(Event, to_field='id')
    order = IntegerField()
    name = CharField()
    description = TextField()
    image_url = TextField()
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    def is_vr(self):
        return self.name.lower().startswith('vr selection:')

    def hide(self):
        return self.is_vr()

    def to_dict(self):
        model_dict = super(Film, self).to_dict()
        model_dict['hide'] = self.hide()
        return model_dict

    @classmethod
    def create_from_scraped_info(cls, event, index, filmInfo):
        return Film.create(
            event_id=event.id,
            order=index,
            name=filmInfo.name,
            description=filmInfo.description,
            image_url=filmInfo.image_url,
        )


class Vote(BaseModel):
    id = PrimaryKeyField()
    event = ForeignKeyField(Event, to_field='id')
    user_token = CharField()
    blob = TextField()
    created_at = DateTimeField(default=datetime.datetime.utcnow)


models = [
    Event,
    Film,
    Vote,
]
