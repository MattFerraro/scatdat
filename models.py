# Author: Matt Ferraro (matt@planet.com)
# Description: The models that we keep in our database

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()


class StallEvent(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True)
    time = Column(DateTime, default=datetime.datetime.utcnow)

    stall_id = Column(String)
    door_open = Column(Boolean)
    batt_v = Column(Float)

    def __init__(self, stall_id, door_open, batt_v):
        self.stall_id = stall_id
        self.door_open = door_open
        self.batt_v = batt_v

    def to_dict(self):
        return {
            "stall_id": self.stall_id,
            "door_open": self.door_open,
            "batt_v": self.batt_v,
            "time": self.time
        }

    def __repr__(self):
        if self.door_open:
            return '{}: stall {} opened (batt={})'.format(
                str(self.time), self.stall_id, self.batt_v)
        else:
            return '{}: stall {} closed (batt={})'.format(
                str(self.time), self.stall_id, self.batt_v)


def get_engine(db_name='scatdat.db'):
    engine = create_engine('sqlite:///' + db_name)
    return engine


def get_session(engine):
    return sessionmaker(bind=engine)()


def create_tables(engine):
    Base.metadata.create_all(engine)
