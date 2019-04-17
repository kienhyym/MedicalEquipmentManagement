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


@app.route('api/v1/current_user')
async def get_current_user(request):
    error_msg = None
    currentUser = await current_user(request)
    if currentUser is not None:
        user_info = await get_user_with_permission(currentUser)
        return json(user_info)
    else:
        error_msg = "Tài khoản không tồn tại"
    return json({
        "error_code": "USER_NOT_FOUND",
        "error_message":error_msg
    }, status = 520)
    
@app.route('api/v1/logout')
@app.route('/logout')
async def logout(request):
    try:
        auth.logout_user(request)
    except:
        pass
    return json({})
 
 

@app.route('api/v1/login', methods=['POST'])
async def login(request):
    username = request.json.get("data", None)
    password = request.json.get("password", None)
    user = db.session.query(User).filter(or_(User.email == username, User.phone_number == username)).first()
    if (user is not None) and auth.verify_password(password, user.password, user.salt):
        auth.login_user(request, user)
        result = await get_user_with_permission(user)
        return json(result)
    return json({"error_code":"LOGIN_FAILED","error_message":"Tài khoản hoặc mật khẩu không đúng"}, status=520)
 

