import * as qiniu from 'qiniu'

export const getToken = (bucket, ak, sk) => {
        var accessKey = ak; //七牛云ak
        var secretKey = sk; //七牛云sk
        var bucket = bucket
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

        var options = {
                scope: bucket
        }

        var putPolicy = new qiniu.rs.PutPolicy(options);

        return  putPolicy.uploadToken(mac);
}