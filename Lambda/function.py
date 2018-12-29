import boto3
import os
import zipfile
import logging
import Augmentor
import botocore
from subprocess import call
from PIL import Image
logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3r = boto3.resource('s3')
s3c = boto3.client('s3')

def convert_bytes(num):
    for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0

def get_file_size(file_path):
    if os.path.isfile(file_path):
        file_info = os.stat(file_path)
        return convert_bytes(file_info.st_size)


def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
            print(file)
            ziph.write(os.path.join(root, file))

def download_image(bucket, img_name):
    try:
        s3r.Bucket(bucket).download_file(img_name, '/tmp/' + img_name)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise

def upload_augmented_image(bucket, img_name):
    i = 1
    folder_name = img_name[:img_name.find('.')]
    for root,dirs,files in os.walk('/tmp/output'):
        for file in files:
            new_img_name = img_name[:img_name.find('.')] + '_' + str(i) + img_name[img_name.find('.'):]
            s3c.upload_file(os.path.join(root,file), bucket, folder_name + '/' +  new_img_name)
            i += 1

    # Zipping the augmented files and uploading them
    os.chdir('/tmp/')
    zipf = zipfile.ZipFile('temp.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('./output/', zipf)
    zipf.close()

    s3c.upload_file('./temp.zip', bucket, folder_name + '/' + img_name[:img_name.find('.')] + '.zip')

def augment(num_of_augments):

    p = Augmentor.Pipeline('/tmp')
    p.rotate(probability = 0.7, max_left_rotation = 20, max_right_rotation = 20)
    p.rotate90(probability=0.2)
    p.rotate270(probability=0.3)
    p.flip_left_right(probability=0.8)
    p.flip_top_bottom(probability=0.3)
    p.zoom(probability = 0.7, min_factor = 1.1, max_factor = 1.2)
    p.sample(num_of_augments)


def compress():
    for root,dirs,files in os.walk('./tmp/'):
        for file in files:
            im = Image.open(os.path.join(root,file))
            filesize = get_file_size(os.path.join(root, file))

            if (filesize[len(filesize) - 2:] == "MB"):
                # this shouldnt ever happen if max upload is 500kb but if it does...
                im.save("tmp/opt_" + str(file),'JPEG',optimize=True,quality=5)

            elif (filesize[len(filesize) - 2:] == "KB"):
                if (float(filesize[:filesize.find(' ')]) < 200):
                    im.save("tmp/opt_" + str(file),'JPEG', optimize=True, quality=100)

                elif (float(filesize[:filesize.find(' ')]) < 400):
                    im.save("tmp/opt_" + str(file), 'JPEG', optimize=True, quality=50)

                elif (float(filesize[:filesize.find(' ')]) < 600):
                    im.save("tmp/opt_" + str(file) ,'JPEG', optimize=True, quality=40)

                elif (float(filesize[:filesize.find(' ')]) < 800):
                    im.save("tmp/opt_" + str(file), 'JPEG', optimize=True, quality=20)

                elif (float(filesize[:filesize.find(' ')]) < 1024):
                    im.save("tmp/opt_" + str(file),'JPEG', optimize=True, quality=10)

                else:
                    im.save("tmp/opt_" + str(file),'JPEG', optimize=True, quality=2)
            else :
                # if in bytes
                im.save("tmp/opt_" + str(file),'JPEG',optimize=True,quality=100)

    call('find ./tmp/ -type f ! -name "opt_*" -delete',shell=True)


def handler(event, context):

    src_bucket = event['Records'][0]['s3']['bucket']['name']
    src_img_name = event['Records'][0]['s3']['object']['key']

    response = s3c.head_object(Bucket=src_bucket, Key=src_img_name)
    logger.info('Response: {}'.format(response))

    num_of_augments = response['Metadata']['num-of-augments']

    download_image(src_bucket, src_img_name)

    compress()

    augment(num_of_augments)

    dst_bucket = src_bucket + '-augmented'
    dst_img_name = 'augment_' + src_img_name
    upload_augmented_image(dst_bucket, dst_img_name)

    call('rm -rf /tmp/*', shell=True)
