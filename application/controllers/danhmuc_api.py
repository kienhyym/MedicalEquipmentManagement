
from application.extensions import sqlapimanager
from gatco_restapi.helpers import to_dict
from application.server import app
from sqlalchemy import or_, and_
from gatco.response import json
from datetime import datetime
from application.controllers.helper import *
from application.client import HTTPClient




from application.models.models import Nation, Province, District, Wards ,EthnicGroup
# 
async def prepost_danhmuc(request=None, data=None, Model=None, **kw):
    if "code" in data and data['code'] is not None and data['code'] != "":
        check_existed = db.session.query(Model).filter(Model.code == data['code']).count()
        if check_existed >0:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Mã danh mục đã bị trùng, vui lòng chọn mã khác"}, status=520)

async def preput_danhmuc(request=None, data=None, Model=None, **kw):
    check_danhmuc = db.session.query(Model).filter(Model.code == data["code"]).filter(Model.id != data['id']).first()
    if (check_danhmuc is not None):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Mã danh mục đã bị trùng, vui lòng chọn mã khác"}, status=520)
            

async def prepost_put_danhmuc(request=None, data=None, Model=None, **kw):
    if "stt" in data:
        del data['stt']
    objects_danhmuc = [ 'wards', 'nation', 'province', 'district', 'nganh']
    for obj in objects_danhmuc:
        if obj in data and "stt" in data[obj]:
            del data[obj]['stt']



     
sqlapimanager.create_api(Nation, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc], PUT_SINGLE=[auth_func, preput_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='nation')
 
 
 
sqlapimanager.create_api(Province, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='province')
 
 
 
sqlapimanager.create_api(District, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='district')
 
 
sqlapimanager.create_api(Wards, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='wards')
 
 


