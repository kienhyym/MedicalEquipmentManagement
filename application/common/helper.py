import time
from datetime import datetime, date
import dateutil.relativedelta
from dateutil import tz
from gatco.response import json
from application.database import db
from application.extensions import auth
from application.server import app
import string
import random
# from gatco_restapi.helpers import to_dict


UPTOKEN = "MhZBy93zMUa5UwpLB3G2qYxFNSAdZpvCwk1UhUhREfMmB1W0SsR8eeDRV1VKggaBo1jtLrbeuNqWDaKlsrkwuLefDXNH1O8dDiwfxxhP9vBCwaLOrT9JvbOWWstN4sQv"


def now_timestamp(milisecond=True):
    if milisecond == True:
        return round(time.time() * 1000)
    else:
        return round(time.time())


def get_local_today(timezone=7):
    today = datetime.utcnow() + dateutil.relativedelta.relativedelta(hours=timezone)
    
    return today

def get_current_tenant_id(request):
    return request['session'].get('current_tenant_id')



async def get_tennat_id(request):
    return app.config['TENANT_ID']


async def pre_post_set_user_tenant_id(data=None, request=None, **kw):  
    uid = await current_user(request)
    tennat_id = await get_tennat_id(request)
    if data is not None:
        data["user_id"] = uid["id"]
        data["tenant_id"] = tennat_id


async def pre_get_many_tenant_user_id(search_params=None, request=None, **kw):
    currentUser = auth.current_user(request)
    current_tenant_id = get_tennat_id(request)
    if search_params is None or 'filters' not in search_params or search_params['filters'] is None:
        search_params = {
            'filters': {}
        }

    if currentUser is not None:
        search_params["filters"] = search_params["filters"] if search_params["filters"] is not None else {}
        # search_params["filters"]['tenant_id'] = {"$eq": current_tenant_id}
        search_params["filters"]['user_id'] = {"$eq": currentUser["id"]}
    else:
        return json({"error_code": ERROR_CODE['AUTH_ERROR'], "error_message": ERROR_MSG['AUTH_ERROR']}, status=STATUS_CODE['AUTH_ERROR'])

# async def pre_get_many_user_tenant_id(search_params=None, request=None, **kw):
#     currentUser = auth.current_user(request)
#     # current_tenant_id = get_tennat_id(request)
#     if search_params is None or 'filters' not in search_params or search_params['filters'] is None:
#         search_params = {
#             'filters': {}
#         }

#     if currentUser is not None:
#         search_params["filters"] = search_params["filters"] if search_params["filters"] is not None else {}
#         search_params["filters"]['user_id'] = {"$eq": currentUser["id"]}
#     else:
#         return json({"error_code": ERROR_CODE['AUTH_ERROR'], "error_message": ERROR_MSG['AUTH_ERROR']}, status=STATUS_CODE['AUTH_ERROR'])

async def pre_get_many_user_tenant_id(search_params=None, request=None, **kw):
    tenant_id = await get_tennat_id(request)
    currentUser = await current_user(request)
    if currentUser is not None:
        search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"tenant_id":{"$eq": tenant_id}}]} \
                                    or {"tenant_id":{"$eq": tenant_id}}
        # search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"tennant_id":{"$eq": tenant_id}}]}
                                
async def super_access(request, **kw):
    super_key = request.headers.get('UP-TOKEN', None)
    print("=====super_key====", super_key)
    print("UP-TOKEN", UPTOKEN)

    currentUser = await current_user(request)
    if current_user is None:
        if (super_key is not None and super_key == UPTOKEN):
            pass
        else:
            return {
                "valid": False,
                "error": {
                    "error_code": ERROR_CODE['AUTH_ERROR'],
                    "error_message": ERROR_MSG['AUTH_ERROR']
                },
                "status": 523
            }
    else:
        pass


# async def pre_order_by(search_params=None, **kw):
# # search_params["filters"] = ("filters" in search_params)
#     if search_params is None:
#     search_params = {}

#     if search_params.get('filter', None) is not None and isinstance(search_params['order_by'], list):
#     # converted_orders = []
#     # for _ in search_params['order_by']:
#     # order = {}
#     # if is not None and len() > 0 and _.get('direction', None) is not None:
#     # if _.get('direction', None) == "asc":
#     # order[_['field']] = 1
#     # else:
#     # order[_['field']] = -1
#     # converted_orders.append(order)
#     # search_params['order_by'] = converted_orders
#     # else:
#     # search_params["order_by"] = [{"created_at": -1}]


def auth_func(request=None, **kw):
    uid = auth.current_user(request)
    if uid is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"},status=520)
    
def deny_func(request=None, **kw):
    return json({"error_code":"PERMISSION_DENY","error_message":"Không có quyền thực hiện hành động này!"},status=520)
    
def no_generator(size=6,chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))


def get_day_of_week():
    return datetime.now().weekday() + 1

def get_user_with_permission(obj):
    obj["tenants"] = [
      {
         "id":"upstart",
         "tenant_no":"upstart",
         "tenant_name":"Upstart Software Solution"
      }
    ]
    return obj

async def current_user(request):
    uid = auth.current_user(request)
    if uid is not None:
        return uid
    return None

