from gatco.response import json,text, html
from application.extensions import sqlapimanager
from application.extensions import auth
from application.database import db
from application.server import app
from sqlalchemy import or_, and_
from datetime import datetime
import time
from gatco_restapi.helpers import to_dict
from application.models.warehouse import *
from application.models.goodsreciept import *
from application.models.models import *
from application.models.consumablesupplies import *


from application.common.constants import ERROR_CODE, ERROR_MSG, STATUS_CODE
# from application.common.helper import auth_func
from application.common.helper import pre_post_set_user_tenant_id, pre_get_many_user_tenant_id, get_tennat_id, current_user, auth_func






@app.route("/api/v1/length_data", methods=["POST"])
def length_data(request):
    data = request.json
    if data is not None:
        length = db.session.query(MedicalEquipment).count()
        return json(length/12)


@app.route('/api/v1/get_data_medicalequipment',methods=['POST'])
async def get_data_medicalequipment(request):
    req = request.json
    pageNumber =req['page_number']
    if req['text'] is not None:
        keySearch = req['text']
        search = "%{}%".format(keySearch)
        tex_capitalize = keySearch.capitalize()
        search_capitalize = "%{}%".format(tex_capitalize)
        list = db.session.query(MedicalEquipment).filter(or_(MedicalEquipment.name.like(search),MedicalEquipment.name.like(search_capitalize))).offset(12*pageNumber).limit(12)
        arr = []
        for i in list:
            obj = to_dict(i)
            arr.append(obj)
        return json(arr)
    else:
        result = []
        details = db.session.query(MedicalEquipment).offset(12*pageNumber).limit(12)
        for d in details:
            list_d = to_dict(d)
            result.append(list_d)
        return json(result)
















@app.route("/api/v1/goods-reciept-by-goodsreciept-id", methods=["POST"])
def goodsreciept_bywarehouse(request):
    data = request.json
    goodsreciept_id = data["goodsreciept_id"]
    if data is not None:
        result = []
        details = db.session.query(GoodsRecieptDetails).filter(GoodsRecieptDetails.goodsreciept_id == goodsreciept_id).all()
        
        for d in details:
            list_d = to_dict(d)
            result.append(list_d)

        return json(result)
        

@app.route("/api/v1/get_all_goodsreciept_details", methods=["GET"])
def get_goodsreciept_details(request):
    
    goodsrecieptdetails = db.session.query(GoodsRecieptDetails).all()
    result = []
    if goodsrecieptdetails is not None:
        for g in goodsrecieptdetails:
            listg = to_dict(g)
            result.append(listg)
        # print("result", result)
        return json(result)


@app.route("/api/v1/get-goodsreciept", methods=["GET"])
async def get_goodsreciept(request):
    # uid = await current_user(request)
    tenant_id = await get_tennat_id(request)
    goodsreciept = db.session.query(GoodsReciept).filter(GoodsReciept.tenant_id==tenant_id).all()
    result = []
    if goodsreciept is not None:
        for g in goodsreciept:
            listg = to_dict(g)
            result.append(listg)
        # print("result", result)
        return json(result)


@app.route("/api/v1/get-goodsreciept-by-id", methods=["POST"])
async def get_goodsreciept(request):
    data = request.json
    # uid = await current_user(request)
    tenant_id = await get_tennat_id(request)

    if data is not None:
        goodsreciept = db.session.query(GoodsReciept).filter(and_(GoodsReciept.id == data["id"], GoodsReciept.tenant_id==tenant_id)).first()
        result = []
        if goodsreciept is not None:
            list_goods = to_dict(goodsreciept)
            result.append(list_goods)
            return json(result)


sqlapimanager.create_api(GoodsReciept,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func],
                    GET_MANY=[auth_func],
                    POST=[auth_func],
                    PUT_SINGLE=[auth_func]),
    postprocess=dict(
        POST=[],
        PUT_SINGLE=[],
        DELETE_SINGLE=[]),
    collection_name='goodsreciept')

sqlapimanager.create_api(GoodsRecieptDetails,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func],
                    GET_MANY=[auth_func],
                    POST=[auth_func],
                    PUT_SINGLE=[auth_func]),
    collection_name='goodsrecieptdetails')

