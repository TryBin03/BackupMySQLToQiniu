import * as qiniu from 'qiniu'

import  {getToken} from './qiniu_config.js'
const Logger = require('./log'); // 使用 require 导入
const logger = new Logger(); // 初始化日志对象


const parts = process.env.NODE_ENV.split('@')

const uploadToken = getToken(parts[3], parts[4], parts[5]) // 桶名称

logger.info(uploadToken)

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; // 空间对应的机房，需自行更改
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

const file = parts[1] + '.zip'
const filePath = parts[0] + '/' + file

const key=parts[2] + '/' + file;  //上传到服务器的名称
const localFile = filePath; // 本地文件路径
logger.info("上传文件【"+ localFile + "】...")
formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode === 200) {
    logger.info('上传成功(' + respInfo.statusCode + ')');
    logger.info(JSON.stringify(respInfo));
  } else {
    logger.error('上传失败(' + respInfo.statusCode + ')');
    logger.error(JSON.stringify(respInfo));
  }
});

