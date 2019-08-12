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
# import cv2

    
# @app.route('/api/v1/upload/image', methods=['GET'])
# def save_file_image(request):
#     data = request.json
#     # if data is not None:

#     image = cv2.imread('/home/kien/Documents/workspace/SoLaoDong/repo/static/img/backgroun.jpg')
#     image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     cv2.imwrite('/home/kien/Documents/workspace/SoLaoDong/repo/static/img/test01.jpg', image_gray) 

#     return json({})



@app.route('/api/v1/upload/file', methods=['POST'])
async def upload_file(request):
    ret = None
    url = app.config['FILE_SERVICE_URL']
    fsroot = app.config['FS_ROOT']
    if request.method == 'POST':
        try:
            file = request.files.get('file', None)
            if file :
                rand = ''.join(random.choice(string.digits) for _ in range(15))
                file_name = os.path.splitext(file.name)[0]
                extname = os.path.splitext(file.name)[1]
    #             newfilename = file_name + "-" + rand + extname
                newfilename = file_name + rand + extname
                
                async with aiofiles.open(fsroot + newfilename, 'wb+') as f:
                    await f.write(file.body)
                
                return json({
                        "error_code": "OK",
                        "error_message": "successful",
                        "id":rand,
                        "link":url  + "/" + newfilename,
                        "filename":newfilename,
                        "filename_organization":file_name,
                        "extname":extname
                    }, status=200)
        except Exception as e:
            raise e
    return json({
        "error_code": "Upload Error",
        "error_message": "Could not upload file to store"
    }, status=520)
