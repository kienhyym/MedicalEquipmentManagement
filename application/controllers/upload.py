import os, sys
# from boto.s3.connection import S3Connection
from application.extensions import sqlapimanager
from application.server import app
from flask import Flask, request, Response

from application.database import db, redisdb
from gatco.response import json, text, html
# from werkzeug.utils import secure_filename
import io
from PIL import Image
import time
import random, string
import aiofiles

PATH_TO_TEST_IMAGES_DIR = './images'

app = Flask(__name__)

@app.route('/')
def index():
    return Response(open('./static/getImage.html').read(), mimetype="text/html")

# save the image as a picture
@app.route('/image', methods=['POST'])
def image():

    i = request.files['image']  # get the image
    f = ('%s.jpeg' % time.strftime("%Y%m%d-%H%M%S"))
    i.save('%s/%s' % (PATH_TO_TEST_IMAGES_DIR, f))

    return Response("%s saved" % f)

@app.route('/api/v1/upload/file', methods=['POST'])
async def upload_file(request):
    url = app.config['FILE_SERVICE_URL']
    fsroot = app.config['FS_ROOT']
    if request.method == 'POST':
        file = request.files.get('file', None)

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
    
    return json({
        "error_code": "Upload Error",
        "error_message": "Could not upload file to store"
    }, status=520)

