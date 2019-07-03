import uuid, time
from math import floor
from sqlalchemy.dialects.postgresql import UUID
from application.database import db

# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Column, String, Integer, BigInteger,
    DateTime, Date, Boolean,
    event, func
)


def default_uuid():
    return str(uuid.uuid4())


def model_oncreate_listener(mapper, connection, instance):
    instance.created_at = floor(time.time())
    instance.updated_at = floor(time.time())


def model_onupdate_listener(mapper, connection, instance):
    instance.created_at = instance.created_at
    instance.updated_at = floor(time.time())
    if instance.deleted is True:
        instance.deleted_at = floor(time.time())


# CommonModel
# a common model using to add all below attributes into model class
# using CommonModel as argument of Model Class
class CommonModel(db.Model):
    __abstract__ = True
    id = db.Column(UUID(as_uuid=True), default=default_uuid)
    created_at = db.Column(BigInteger())
    created_by = db.Column(String, nullable=True)
    updated_at = db.Column(BigInteger())
    updated_by = db.Column(String, nullable=True)
    deleted = db.Column(Boolean, default=False)
    deleted_by = db.Column(String, nullable=True)
    deleted_at = db.Column(BigInteger())


event.listen(CommonModel, 'before_insert', model_oncreate_listener, propagate=True)
event.listen(CommonModel, 'before_update', model_onupdate_listener, propagate=True)



    



























































# CREATE SEQUENCE public.userdubaosotxuathuyet_id_seq
#     INCREMENT 1
#     START 1
#     MINVALUE 1
#     MAXVALUE 2147483647
#     CACHE 1;
    
# CREATE TABLE public.userdubaosotxuathuyet
# (
#     _created_at timestamp without time zone,
#     _updated_at timestamp without time zone,
#     _deleted boolean,
#     _deleted_at timestamp without time zone,
#     _etag character varying(40) COLLATE pg_catalog."default",
#     id integer NOT NULL DEFAULT nextval('userdubaosotxuathuyet_id_seq'::regclass),
#     name character varying COLLATE pg_catalog."default",
#     email character varying COLLATE pg_catalog."default",
#     phone character varying(63) COLLATE pg_catalog."default",
#     zalo_id integer,
#     CONSTRAINT userdubaosotxuathuyet_pkey PRIMARY KEY (id),
#     CONSTRAINT userdubaosotxuathuyet_zalo_id_fkey FOREIGN KEY (zalo_id)
#         REFERENCES public.zalo (id) MATCH SIMPLE
#         ON UPDATE NO ACTION
#         ON DELETE NO ACTION
# );


# CREATE INDEX ix_userdubaosotxuathuyet__etag
#     ON public.userdubaosotxuathuyet USING btree
#     (_etag COLLATE pg_catalog."default")
#     TABLESPACE pg_default;






# CREATE SEQUENCE public.zalo_id_seq
#     INCREMENT 1
#     START 1
#     MINVALUE 1
#     MAXVALUE 2147483647
#     CACHE 1;

# CREATE TABLE public.zalo
# (
#     _created_at timestamp without time zone,
#     _updated_at timestamp without time zone,
#     _deleted boolean,
#     _deleted_at timestamp without time zone,
#     _etag character varying(40) COLLATE pg_catalog."default",
#     id integer NOT NULL DEFAULT nextval('zalo_id_seq'::regclass),
#     name character varying(80) COLLATE pg_catalog."default",
#     description character varying(255) COLLATE pg_catalog."default",
#     CONSTRAINT zalo_pkey PRIMARY KEY (id),
#     CONSTRAINT zalo_name_key UNIQUE (name)

# );


# CREATE INDEX ix_zalo__etag
#     ON public.zalo USING btree
#     (_etag COLLATE pg_catalog."default")
#     TABLESPACE pg_default;      

