import os, sys
# from boto.s3.connection import S3Connection
from application.extensions import sqlapimanager
from application.server import app
from application.database import db, redisdb
from gatco.response import json, text, html
# from werkzeug.utils import secure_filename
import io
from PIL import Image
import time
import random, string
import aiofiles

    
# @app.route('/api/v1/upload/file', methods=['POST'])
# async def upload_file(request):
#     ret = None
#     url = app.config['FILE_SERVICE_URL']
#     fsroot = app.config['FS_ROOT']
#     if request.method == 'POST':
#         try:
#             file = request.files.get('file', None)
#             if file :
#                 rand = ''.join(random.choice(string.digits) for _ in range(15))
#                 file_name = os.path.splitext(file.name)[0]
#                 extname = os.path.splitext(file.name)[1]
#     #             newfilename = file_name + "-" + rand + extname
#                 newfilename = file_name + rand + extname
                
#                 async with aiofiles.open(fsroot + newfilename, 'wb+') as f:
#                     await f.write(file.body)
                
#                 return json({
#                         "error_code": "OK",
#                         "error_message": "successful",
#                         "id":rand,
#                         "link":url  + "/" + newfilename,
#                         "filename":newfilename,
#                         "filename_organization":file_name,
#                         "extname":extname
#                     }, status=200)
#         except Exception as e:
#             raise e
#     return json({
#         "error_code": "Upload Error",
#         "error_message": "Could not upload file to store"
#     }, status=520)



@app.route('/api/v1/upload/file', methods=['POST'])
async def upload_file(request):
    url = app.config['FILE_SERVICE_URL']
    print('------url-------------------------------------',url)
    # url = "http://103.74.122.206:20808"
    fsroot = app.config['FS_ROOT']
    if request.method == 'POST':
        file = request.files.get('file', None)
        print('------file-------------------------------------',file)

        image = request.files.get('image')

        if file :
            rand = ''.join(random.choice(string.digits) for _ in range(15))
            file_name = os.path.splitext(file.name)[0]
            # print("-----------------Hello World------------------------",file_name)
            extname = os.path.splitext(file.name)[1]
#             newfilename = file_name + "-" + rand + extname
            newfilename = file_name + extname 
            new_filename = newfilename.replace(" ", "_")
            async with aiofiles.open(fsroot + new_filename, 'wb+') as f:
                await f.write(file.body)
            print("-----------------Hello World------------------------",new_filename)

            return json({
                    "error_code": "OK",
                    "error_message": "successful",
                    "id":rand,
                    "link":url  + "/" + new_filename,
                    "filename":newfilename,
                    "filename_organization":file_name,
                    "extname":extname
                }, status=200)

        else:
            rand = ''.join(random.choice(string.digits) for _ in range(15))
            file_name = os.path.splitext(file.name)[0]
            # extname = os.path.splitext(file.name)[1]
#             newfilename = file_name + "-" + rand + extname
            newfilename = file_name + extname 
            new_filename = newfilename.replace(" ", "_")
            async with aiofiles.open(fsroot + new_filename, 'wb+') as f:
                await f.write(file.body)

            return json({
                    "error_code": "OK",
                    "error_message": "successful",
                    "id":rand,
                    "link":url  + "/" + new_filename,
                    "filename":newfilename,
                    "filename_organization":file_name,
                    "extname":extname
                }, status=200)

    
    return json({
        "error_code": "Upload Error",
        "error_message": "Could not upload file to store"
    }, status=520)


@app.route('/api/v1/upload/file2', methods=['POST'])
async def upload_file(request):

    url = app.config['FILE_SERVICE_URL']
    fsroot = app.config['FS_ROOT']

    data = request.json

    print('data', data)

    img_uri = data['imgURI']

    # if request.method == 'POST':

    rand = ''.join(random.choice(string.digits) for _ in range(15))
    # file_name = os.path.splitext('xxxxxxxxxxxxxxxxx')

    # extname = os.path.splitext('xxxxxx')
    # newfilename = file_name + extname 

    # new_filename = newfilename.replace(" ", "_")
    async with aiofiles.open(fsroot + 'xxxxxxx', 'wb+') as f:
        await f.write(str(img_uri))

    return json({
            "error_code": "OK",
            "error_message": "successful",
            "id":rand,
            "link":url  + "/xxxxxxx" ,
            "filename":'xxxxxxx',
            "filename_organization":'xxxxxxx',
            "extname":'xxxxxxx'
        }, status=200)
    
    # return json({
    #     "error_code": "Upload Error",
    #     "error_message": "Could not upload file to store"
    # }, status=520)
