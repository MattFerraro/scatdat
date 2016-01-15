import models

session = None


def new_event(stall_id, door_open, batt_v):
    se = models.StallEvent(stall_id, door_open, batt_v)
    session.add(se)
    session.commit()
    return se.to_dict()


def get_events():
    events = [x.to_dict() for x in session.query(models.StallEvent).all()]
    return events


def initialize_db(db_name='scatdat.db'):
    global session
    engine = models.get_engine(db_name)
    session = models.get_session(engine)
    models.create_tables(engine)
