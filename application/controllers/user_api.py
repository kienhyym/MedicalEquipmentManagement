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

def user_to_dict(user):
    obj = to_dict(user)
    if "password" in obj:
        del(obj["password"])
    if "salt" in obj:
        del(obj["salt"])
    return obj
@app.route('api/v1/current_user')
async def get_current_user(request):
    error_msg = None
    currentUser = await current_user(request)
    print("===============", currentUser)
    if currentUser is not None:
        user_info = to_dict(currentUser)
        return json(user_info)
    else:
        error_msg = "Tài khoản không tồn tại"
    return json({
        "error_code": "USER_NOT_FOUND",
        "error_message":error_msg
    }, status = 520)
    
@app.route('api/v1/logout')
async def logout(request):
    try:
        auth.logout_user(request)
    except:
        pass
    return json({})


@app.route('/api/v1/login', methods=['POST'])
async def login(request):
    data = request.json
    print("==================data", data)
    username = data['username']
    password = data['password']
    print("==================USER NAME", username)
    print("==================PASSWORD", password)
    user = db.session.query(User).filter(or_(User.email == username, User.phone_number == username)).first()


    print("==================", user)
    if (user is not None) and auth.verify_password(password, user.password):
        
        auth.login_user(request, user)
        result = user_to_dict(user)
        return json(result)
        
    return json({"error_code":"LOGIN_FAILED","error_message":"Tài khoản hoặc mật khẩu không đúng"}, status=520)

@app.route('/api/v1/changepassword', methods=['POST'])
async def changepassword(request):
    data = request.json
    print("==================data", data)
    password_old = data['password_old']
    password_new = data['password_new']
    current_uid = data['user_id']

    print("==================PASSWORD_OLD", password_old)
    print("==================PASSWORD_NEW", password_new)
    print("===================current_uid============", current_uid)
    user = db.session.query(User).filter(or_(User.id == current_uid)).first()

    if current_uid and password_new is not None and auth.verify_password(password_old, user.password):
        print("==============USER INFO", auth.verify_password(password_old, user.password))

        user_info = db.session.query(User).filter(User.id == current_uid).first()
        print("==============USER INFO", user_info)
        if user_info is not None:
            user_info.password = auth.encrypt_password(password_new)

            db.session.commit()
            return json({})
# @app.route('/api/v1/changepassword', methods=['POST'])
# async def changepassword(request):
#     data = request.json
#     print("==================data", data)
#     password = data.get('password', None)
#     current_uid = auth.current_user(request)
#     user_id = data['user_id']
#     password2 = data['password']
#     print("==================PASSWORD", password)
#     print("===================current_uid============", current_uid)
#     print("===================user_id============", user_id)
#     print("===================password2============", password2)


#     if current_uid and password is not None:
#         user_info = db.session.query(User).filter(User.id == current_uid).first()
#         print("==============USER INFO", user_info)
#         if user_info is not None:
#             user_info.password = auth.encrypt_password(password)

#             db.session.commit()
#             return json({})

@app.route('/api/v1/register', methods=["POST"])
def register(request):
    data = request.json
    print("===================", data)
    user = db.session.query(User).filter(or_(User.email==data["email"], User.phone_number==data["phone_number"])).first()
    if user is not None:
        return json({
            "error_code": "USER_EXISTED",
            "error_message": "Email hoặc phone đã tồn tại"
            }, status = 520)
    else:
        new_user = User()
        new_user.name = data["name"]
        new_user.email = data["email"]
        new_user.phone_number = data["phone_number"]
        # new_user.user_image = data["user_image"]
        new_user.password = auth.encrypt_password(data["password"])
        # new_user.password = data["password"]
        db.session.add(new_user)
        db.session.commit()
        result = user_to_dict(new_user)
        return json(result)








async def prepost_user(request=None, data=None, Model=None, **kw):
    currentUser = await current_user(request)
    if (currentUser is None):
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"}, status=520)

    if "name" not in data or data['name'] is None or "password" not in data or data['password'] is None:
        return json({"error_code":"PARAMS_ERROR","error_message":"Tham số không hợp lệ"}, status=520)
    if ('phone_number' in data) and ('email' in data) :
        user = db.session.query(User).filter((User.phone_number == data['phone_number']) | (User.email == data['email'])).first()
        if user is not None:
            if user.phone_number == data['phone_number']:
                return json({"error_code":"USER_EXISTED","error_message":'Số điện thoại đã được sử dụng, vui lòng chọn lại'},status=520)
            else:
                return json({"error_code":"USER_EXISTED","error_message":'Email đã được sử dụng trong tài khoản khác'},status=520)

    
    salt = generator_salt()
    data['salt'] = salt
    password = data['password']
    data['password'] = auth.encrypt_password(password, salt)
    data['active']= True
    
async def preput_user(request=None, data=None, Model=None, **kw):
    currentUser = await current_user(request)
    if (currentUser is None):
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"}, status=520)
    
    if "name" not in data or data['name'] is None or "id" not in data or data['id'] is None:
        return json({"error_code":"PARAMS_ERROR","error_message":"Tham số không hợp lệ"}, status=520)
    if ('phone_number' in data) and ('email' in data) :
        check_user = db.session.query(User).filter((User.phone_number == data['phone_number']) | (User.email == data['email'])).filter(User.id != data['id']).first()
        if check_user is not None:
            if check_user.phone_number == data['phone_number']:
                return json({"error_code":"USER_EXISTED","error_message":'Số điện thoại đã được sử dụng, vui lòng chọn lại'},status=520)
            else:
                return json({"error_code":"USER_EXISTED","error_message":'Email đã được sử dụng trong tài khoản khác'},status=520)
    
    user = db.session.query(User).filter(User.id == data['id']).first()
    if user is None:
        return json({"error_code":"NOT_FOUND","error_message":"Không tìm thấy tài khoản người dùng"}, status=520)

    if currentUser.has_role("Giám Đốc") or str(currentUser.id) == data['id']:
        password = data['password']
        data['password'] = auth.encrypt_password(password, user.salt)
    else:
        return json({"error_code":"PERMISSION_DENY","error_message":"Không có quyền thực hiện hành động này"}, status=520)

async def predelete_user(request=None, data=None, Model=None, **kw):
    currentUser = await current_user(request)
    if (currentUser is None):
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"}, status=520)
    if currentUser.has_role("Giám Đốc") == False:
        return json({"error_code":"PERMISSION_DENY","error_message":"Không có quyền thực hiện hành động này"}, status=520)



sqlapimanager.create_api(User, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, prepost_user], PUT_SINGLE=[auth_func, preput_user], DELETE=[predelete_user]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    # exclude_columns= ["password","salt","active"],
    collection_name='user')


sqlapimanager.create_api(Role, max_results_per_page=1000000,
    methods=['GET'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='role')
sqlapimanager.create_api(DonVi, max_results_per_page=1000000,
    methods=['GET'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='donvi')

sqlapimanager.create_api(UserConnectionChannel, max_results_per_page=1000000,
    methods=['GET'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='userconnectionchannel')

# Báo cáo 1 Phụ lục 2
sqlapimanager.create_api(HSQLSucKhoeVaBenhTatNguoiLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='hsqlsuckhoevabenhtatnguoilaodong')

sqlapimanager.create_api(BangQLSucKhoeTruocKhiBoTriViecLam, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangqlsuckhoetruockhibotrivieclam')


sqlapimanager.create_api(BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
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
# Hết Báo cáo 1 Phụ lục 2

##############################################################################

# Báo cáo 1 Phụ lục 3
sqlapimanager.create_api(HSCCTaiNanLaoDongTaiCoSoLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='hscctainanlaodongtaicosolaodong')

sqlapimanager.create_api(BangHSCCTaiNanLaoDongTaiCoSoLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='banghscctainanlaodongtaicosolaodong')
# Hết báo cáo 1 Phụ lục 3

###################################################################################

# Báo cáo 1 Phụ lục 7
sqlapimanager.create_api(SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViec, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='sotheodoicongtachuanluyensocuucapcuutainoilamviec')

sqlapimanager.create_api(GiangVienThucHienHuanLuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='giangvienthuchienhuanluyen')

sqlapimanager.create_api(BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangdanhsachthanhvienlucluongsocuuduochuanluyen')

sqlapimanager.create_api(BangDanhSachNguoiLaoDongDuocHuanLuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='bangdanhsachnguoilaodongduochuanluyen')
# Hết báo cáo 1 Phụ lục 7

############################################################################################\

# Báo cáo 1 Phụ lục 8
sqlapimanager.create_api(BaoCaoYTeLaoDongCuaCoSoLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='baocaoytelaodongcuacosolaodong')

sqlapimanager.create_api(NguoiLamCongTacYTeTaiCoSoLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='nguoilamcongtacytetaicosolaodong')

sqlapimanager.create_api(CongTacThanhTra, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='congtacthanhtra')

sqlapimanager.create_api(DieuKienLaoDongVaSoLaoDongTiepXucYeuToCoHai, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='dieukienlaodongvasolaodongtiepxucyeutocohai')

sqlapimanager.create_api(NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='nghiviecdoomdautainanlaodongvabenhnghenghiep')

sqlapimanager.create_api(TinhHinhBenhNgheNghiepTaiCoSo, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tinhhinhbenhnghenghieptaicoso')    

sqlapimanager.create_api(DanhSachTruongHopBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachtruonghopbenhnghenghiep')

sqlapimanager.create_api(ThongKeTongSoTruongHopMacCacLoaiBenhThongThuong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='thongketongsotruonghopmaccacloaibenhthongthuong')

sqlapimanager.create_api(CacTruongHopMacBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghopmacbenhnghenghiep')


sqlapimanager.create_api(CacTruongHopTaiNanLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghoptainanlaodong')

# sqlapimanager.create_api(PhanLoaiSucKhoe, max_results_per_page=1000000,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
#     collection_name='phanloaisuckhoe')

sqlapimanager.create_api(CongTacHuanLuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='congtachuanluyen')

sqlapimanager.create_api(CacKienNghiDuKienVaKeHoachDuKienTrongKyToi, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cackiennghidukienvakehoachdukientrongkytoi')

sqlapimanager.create_api(KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='kinhphivesinhlaodongvachamsocsuckhoenguoilaodong')


# Hết báo cáo 1 Phụ lục 8
#############################################################################################
# Báo cáo 1 Phụ lục 9
sqlapimanager.create_api(BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='baocaohoatdongytelaodong6thangnamtuyenhuyen')

sqlapimanager.create_api(PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMo, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicosolaodongtheonganhnghevaquymo')

sqlapimanager.create_api(PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiem, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicosolaodongcoyeutocohainguyhiem')

sqlapimanager.create_api(KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHoc, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquaquantraccacyeutovikhihauvavatlyhoahoc')

sqlapimanager.create_api(KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquaquantraccacyeutobuitrongmoitruonglaodong')

sqlapimanager.create_api(KetQuaDanhGiaCacYeuToTiepXucNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquadanhgiacacyeutotiepxucnghenghiep')

sqlapimanager.create_api(TinhHinhNghiOm, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tinhhinhnghiom')

sqlapimanager.create_api(TongSoTruongHopMacCacLoaiBenhThongThuong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tongsotruonghopmaccacloaibenhthongthuong')

sqlapimanager.create_api(CacTruongHopMacBenhNgheNghiepPhuLuc9, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghopmacbenhnghenghiepphuluc9')

sqlapimanager.create_api(CacTruongHopTaiNanLaoDongPhuLuc9, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghoptainanlaodongphuluc9')

sqlapimanager.create_api(KetQuaKhamPhatHienBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquakhamphathienbenh')

sqlapimanager.create_api(DanhSachNguoiMacBenhNgheNghiep, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachnguoimacbenhnghenghiep')
    
sqlapimanager.create_api(TongHopTuBaoCaoCuaCacCoSoLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tonghoptubaocaocuacaccosolaodong')    

sqlapimanager.create_api(CacHoatDongDoDonViTrienKhai, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cachoatdongdodonvitrienkhai')

sqlapimanager.create_api(DanhSachCacTruongHopTaiNanLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachcactruonghoptainanlaodong')

sqlapimanager.create_api(PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuu, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicactruonghoptainanlaodongtheoviecsocuu')

sqlapimanager.create_api(PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghe, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicactruonghoptainanlaodongtheonganhnghe')


sqlapimanager.create_api(KinhPhiChiTra, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='kinhphichitra')            
# Hết báo cáo 1 Phụ lục 9 





###############################################################

# Báo cáo 1 Phụ lục 10
sqlapimanager.create_api(BaoCaoHoatDongYTeLaoDong6ThangNam, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='baocaohoatdongytelaodong6thangnam')     

sqlapimanager.create_api(TinhHinhThucHienVanBanPhapQuy, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tinhhinhthuchienvanbanphapquy')     
sqlapimanager.create_api(PhanLoaiCacCoSoLaoDongTheoNganhNgheVaQuyMo, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicaccosolaodongtheonganhnghevaquymo')   
sqlapimanager.create_api(PhanLoaiCoSoLaoDongYTCHNH, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicosolaodongytchnh')  

sqlapimanager.create_api(KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMT, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmt')  

sqlapimanager.create_api(KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10')  

sqlapimanager.create_api(KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLy, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquadanhgiacacyeutotiepxucnghenghiepvayeutotamly')        

sqlapimanager.create_api(TinhHinhNghiOmPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tinhhinhnghiomphuluc10')     

sqlapimanager.create_api(TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tongsotruonghopmaccacloaibenhthongthuongphuluc10')     


sqlapimanager.create_api(CacTruongHopMacBenhNgheNghiepPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghopmacbenhnghenghiepphuluc10')     


sqlapimanager.create_api(CacTruongHopTaiNanLaoDongPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cactruonghoptainanlaodongphuluc10')     



sqlapimanager.create_api(KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='ketquakhamphathienbenhnghenghiepphuluc10') 

sqlapimanager.create_api(DanhSachNguoiMacBenhNgheNghiepPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachnguoimacbenhnghenghiepphuluc10')    

sqlapimanager.create_api(TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='tonghoptubaocaocuacaccosolaodongphuluc10') 
sqlapimanager.create_api(CacHoatDongDoDonViTrienKhaiPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cachoatdongdodonvitrienkhaiphuluc10') 
sqlapimanager.create_api(DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCS, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachcactruonghoptainanlaodongduockhamtaics') 
sqlapimanager.create_api(PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicactruonghoptainanlaodongtheoviecsocuuphuluc10') 
sqlapimanager.create_api(PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='phanloaicactruonghoptainanlaodongtheonganhnghephuluc10') 

sqlapimanager.create_api(KinhPhiChiTraPhuLuc10, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='kinhphichitraphuluc10') 
sqlapimanager.create_api(DanhSachCacToChucQuanTracTrenDiaBan, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachcactochucquantractrendiaban') 

sqlapimanager.create_api(DanhSachCosoKhamBenhTrenDiaBan, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachcosokhambenhtrendiaban') 

sqlapimanager.create_api(DanhSachToChucHuanLuyenTrenDiaBan, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='danhsachtochuchuanluyentrendiaban') 

# Hết báo cáo 1 Phụ lục 10
###############################################################

# Báo cáo 1 Phụ lục 11
sqlapimanager.create_api(BaoCaoToChucDuDieuKienQuanTracMoiTruongLaoDongDuocCongBo, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='baocaotochucdudieukienquantracmoitruonglaodongduoccongbo') 



sqlapimanager.create_api(CacYeuToVatLyKhac, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cacyeutovatlykhac') 



sqlapimanager.create_api(CacLoaiBuiKhac, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cacloaibuikhac') 



sqlapimanager.create_api(CacHoaChatKhac, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cachoachatkhac') 




sqlapimanager.create_api(CacYeuToKhac, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='cacyeutokhac')                 



# Hết báo cáo 1 Phụ lục 11
###############################################################

# Báo cáo 1 Phụ lục 13
sqlapimanager.create_api(ChungChiDaoTaoVeQuanTracMoiTruongLaoDong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    # preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='chungchidaotaovequantracmoitruonglaodong')            
# Hết báo cáo 1 Phụ lục 13
