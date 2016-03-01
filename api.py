from models import StallEvent
import models

session = None


def new_event(stall_id, door_open, batt_v):
    se = StallEvent(stall_id, door_open, batt_v)
    session.add(se)
    session.commit()
    return se.to_dict()


def get_events():
    events = [x.to_dict() for x in session.query(StallEvent).all()]
    return events


def get_statuses():
    '''
    Return the current statuses of all stalls
    '''
    stall_ids = [
        str(x.stall_id) for x in session.query(StallEvent.stall_id).distinct()]

    statuses = {}
    for stall_id in stall_ids:
        most_recent = \
            session.query(StallEvent) \
            .filter(StallEvent.stall_id == stall_id) \
            .order_by(StallEvent.time.desc()) \
            .first().to_dict()

        stall_status = \
            'open' if most_recent['door_open'] is True else 'occupied'
        statuses[stall_id] = {
            'status': stall_status,
            'timestamp': most_recent['time'],
            'batt_v': most_recent['batt_v']
        }

    return statuses


def initialize_db(db_name='scatdat.db'):
    global session
    engine = models.get_engine(db_name)
    session = models.get_session(engine)
    models.create_tables(engine)
