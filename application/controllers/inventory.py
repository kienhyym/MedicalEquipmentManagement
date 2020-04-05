import string
import random
import uuid
import base64, re
import binascii
import aiohttp
import requests
import json as json_load

import copy
from gatco.response import json, text, html
from application.extensions import sqlapimanager
from application.extensions import auth
from application.database import db, redisdb
from application.models.unit import *
from application.models.receipt import *
from application.models.purchaseorder import *
from application.models.payment import *
from application.models.currency import *
from application.models.contact import *
from application.models.consumablesupplies import *
from application.models.warehouse import *
from application.models.goodsreciept import *




from application.server import app
from gatco_restapi.helpers import to_dict
from sqlalchemy.sql.expression import except_
import time
from math import floor, ceil
from application.client import HTTPClient
from application.controllers.helper import *
from sqlalchemy import or_, and_, desc
# from application.components.activitylog.model import ActivityLog
from application.controllers.helper import current_user






@app.route("/api/v1/item/sync/account", methods=["OPTIONS", "POST"])
async def sync_item(request):
    data = request.json
    if data is None:
        return json({
            "error_code": ERROR_CODE['INPUT_DATA_ERROR'],
            "error_message": ERROR_MSG['INPUT_DATA_ERROR']
        }, status=STATUS_CODE['ERROR'])

    objmap = {
        "item": Item,
        "workstation": Workstation,
        "warehouse": Warehouse
    }

    if 'url' in data and data['url'] is not None and (data["object"] in objmap):
        headers = {
            'content-type': 'application/json'
        }

        response = requests.get(data['url'], headers=headers)
        if response.status_code == 200:
            items = response.json()
            
            OBJ = objmap[data["object"]]
            obj = db.session.query(OBJ).filter(and_(OBJ.id == items["id"], OBJ.tenant_id == items["tenant_id"])).first()

            if obj is None:
                insert = True
                obj = OBJ()

            for key in items:
                if hasattr(obj, key):
                    setattr(obj, key, items[key])

            if insert:
                db.session.add(obj)
            
            db.session.commit()
            return json({
                    "ok": True,
                    "message": "CREATE " + data["object"].upper() + " SUCCESS"
                })

@app.route("/api/v1/activitylog/save", methods=["POST"])
def save_log(request):
    data = request.json
    action = data.get('action', None)
    actor = data.get('actor', None)
    workstation_id = data.get('workstation_id', None)
    workstation_name = data.get('workstation_name', None)
    tenant_id = data.get('tenant_id', None)
    user_id = data.get('user_id', None)
    items = data.get('items', [])
    object_type = data.get('object_type', None)
    object_no = data.get('object_no', None)
    created_at = data.get('created_at', None)

    new_log = ActivityLog()
    new_log.action = action
    new_log.actor = actor
    new_log.workstation_id = workstation_id
    new_log.workstation_name = workstation_name
    new_log.tenant_id = tenant_id
    new_log.user_id = user_id
    new_log.items = items
    new_log.object_no = object_no
    new_log.object_type = object_type
    new_log.created_at = created_at

    db.session.add(new_log)
    db.session.commit()

    return json({
        "ok": True,
        "message": "SAVE LOG SUCCESS"
    })




sqlapimanager.create_api(Unit, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='unit')

sqlapimanager.create_api(PurchaseOrder, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='purchaseorder')
    

sqlapimanager.create_api(PurchaseOrderDetails, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='purchaseorderdetails')


sqlapimanager.create_api(Contact, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    preprocess=dict(GET_SINGLE=[], GET_MANY=[], POST=[], PUT_SINGLE=[]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='contact')