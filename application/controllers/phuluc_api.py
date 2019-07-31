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
from application.database import db, redisdb
from application.models.models import *


from application.server import app
from gatco_restapi.helpers import to_dict
from sqlalchemy.sql.expression import except_
import time
from math import floor, ceil
from application.client import HTTPClient
from application.controllers.helper import *
from sqlalchemy import or_, and_, desc

from application.controllers.helper import current_user


sqlapimanager.create_api(HSQLSucKhoeVaBenhTatNguoiLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='hsqlsuckhoevabenhtatnguoilaodong')

sqlapimanager.create_api(BangQLSucKhoeTruocKhiBoTriViecLam, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangqlsuckhoetruockhibotrivieclam')


sqlapimanager.create_api(BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangqlsuckhoelaodongthongquakhamsuckhoedinhky')



sqlapimanager.create_api(BangSoTruongHopMacCacLoaiBenhThongThuong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangsotruonghopmaccacloaibenhthongthuong')


sqlapimanager.create_api(BangCacTruongHopMacBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),   
    collection_name='bangcactruonghopmacbenhnghenghiep')



sqlapimanager.create_api(BangCacTruongHopTaiNanLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangcactruonghoptainanlaodong')




sqlapimanager.create_api(BangTinhHinhNghiViec, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangtinhhinhnghiviec')




sqlapimanager.create_api(BangQuanLyBenhManTinh, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangquanlybenhmantinh')




sqlapimanager.create_api(BangQuanLyBenhManTinhTheoTungBenh, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangquanlybenhmantinhtheotungbenh')



sqlapimanager.create_api(BangTheoDoiBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangtheodoibenhnghenghiep')




sqlapimanager.create_api(BangDanhSachNguoiLaoDongMacBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangdanhsachnguoilaodongmacbenhnghenghiep')


