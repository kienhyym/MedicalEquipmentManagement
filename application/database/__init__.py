from gatco_sqlalchemy import SQLAlchemy
# from gatco_couchdb import CouchDB

import redis
from gatco_motor import Motor

mdb = Motor()

redisdb = redis.StrictRedis(host='localhost', port=6379, db=6)

db = SQLAlchemy()
# couchdb = CouchDB()


def init_database(app):
    db.init_app(app)
    mdb.init_app(app)
#     couchdb.init_app(app)
