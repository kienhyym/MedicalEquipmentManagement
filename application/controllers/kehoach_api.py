import string
import random
import uuid
import base64, re
import binascii
import aiohttp
import copy
from gatco.response import json, text, html
from application.extensions import sqlapimanager
from application.extensions import auth
from application.database import db, redisdb, mdb
from application.models.models import *
from application.common.constants import KeHoach_ThanhTra_TrangThai


from application.server import app
from gatco_restapi.helpers import to_dict
from sqlalchemy.sql.expression import except_
import time
from datetime import datetime
from math import floor
from application.client import HTTPClient
from application.controllers.helper import *
from sqlalchemy import or_, and_, desc


@app.route('/api/v1/kehoachthanhtra/review', methods=['POST'])
async def kehoach_review(request):
    makehoach = request.json.get("id", None)
    currentUser = await current_user(request)
    if (currentUser is None):
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"}, status=520)

    if (makehoach is None or makehoach == ""):
        return json({"error_code":"ERROR_PARAMS","error_message":"Tham số không hợp lệ!"}, status=520)
    
    kehoach = db.session.query(KeHoachThanhTra).filter(KeHoachThanhTra.id == makehoach).first()
    if kehoach is not None:
        if kehoach.cosokcb_id == currentUser.id_cosokcb and kehoach.trangthai ==0:
            kehoach.trangthai = 1
            db.session.commit()
            
            log_datkham = {
                "user_id" : currentUser.id,
                "appkey" : None,
                "makehoach":kehoach.id,
                "user_name" : (currentUser.first_name if currentUser.first_name is not None else "")+ (currentUser.last_name if currentUser.last_name is not None else ""),
                "sochamsoc_id" :  kehoach.sochamsoc_id,
                "cosokcb_id" : kehoach.id_cosokcb,
                "cosokcb_name" : kehoach.cosokcb.ten_coso if kehoach.cosokcb.ten_coso is not None else "",
                "description" : "confirm booking",
                "action" : KeHoach_ThanhTra_TrangThai["confirm_booking"],
                "created_at": datetime.utcnow()
            }
            await mdb.db['DatKhamMonitor'].insert_one(log_datkham)
            
        return json(to_dict(kehoach))
    else:
        return json({"error_code":"NOT_FOUND","error_message":"Tham số không hợp lệ!"}, status=520)
            
        
async def pre_post_kehoachthanhtra(request=None, data=None, Model=None, **kw):
    madatkham = get_madatkham_new()
    if madatkham is None:
        return json({"error_code":"ERROR_SYSTEM","error_message":"Không lấy được mã đợt thanh tra!"}, status=520)
    else:
        data['id'] = madatkham.decode('utf-8')
        
        

async def response_getmany_kehoachthanhtra(request=None, Model=None, result=None, **kw):
    if result is not None and "objects" in result:
        objects = to_dict(result["objects"])
        datas = []
        i =1
        page = request.args.get("page",None)
        results_per_page = request.args.get("results_per_page",None)
        currentUser = await current_user(request)
        if currentUser is None:
            return json({"error_code":"PERMISSION_DENY","error_message":"Hết phiên làm việc!"}, status=520)
            
        if page is not None and results_per_page is not None and int(page) != 1:
            i = i + int(results_per_page)*int(page)
        for obj in objects:
            if obj is not None:
                obj_tmp = to_dict(obj)
                obj_tmp["stt"] = i
                i = i +1
                datas.append(obj_tmp)
        result = datas
        
async def pregetmany_kehoachthanhtra(search_params, Model, **kw):
    request = kw.get("request", None)


async def post_process_kehoachthanhtra(request=None, Model=None, result=None, **kw):
    obj = to_dict(result)
    currentUser = await current_user(request)
    log_datkham = {
        "user_id" : result["user_id"],
        "appkey" : result["appkey"],
        "makehoach":result["id"],
        "user_name" : (currentUser.first_name if currentUser is not None and  currentUser.first_name is not None else "")+ (currentUser.last_name if  currentUser is not None and currentUser.last_name is not None else ""),
        "sochamsoc_id" :  result["sochamsoc_id"],
        "cosokcb_id" : result["cosokcb_id"],
        "cosokcb_name" : result["cosokcb"]["ten_coso"] if result["cosokcb"]["ten_coso"] is not None else "",
        "description" : "create new",
        "action" : KeHoach_ThanhTra_TrangThai["new"],
        "created_at": datetime.utcnow()
    }
    await mdb.db['DatKhamMonitor'].insert_one(log_datkham)

sqlapimanager.create_api(DanhMucDoanhNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhmucdoanhnghiep')


sqlapimanager.create_api(KeHoachThanhTra, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[], GET_MANY=[pregetmany_kehoachthanhtra], POST=[pre_post_kehoachthanhtra], PUT_SINGLE=[]),
    postprocess=dict(POST=[post_process_kehoachthanhtra], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[response_getmany_kehoachthanhtra]),
    collection_name='kehoachthanhtra')



    

