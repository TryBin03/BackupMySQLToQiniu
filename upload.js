import * as qiniu from 'qiniu'

import  {getToken} from  './qiniu_config.js'

const uploadToken = getToken("bucket") // 桶名称

console.log(uploadToken)

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; // 空间对应的机房，需自行更改
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();


const parts  = process.env.NODE_ENV.split('@')
const file = parts[1] + '.zip'
const filePath = parts[0] + '/' + file

const key=parts[2] + '/' + file;  //上传到服务器的名称
const localFile = filePath; // 本地文件路径
formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log('上传成功')
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});

