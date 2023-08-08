import * as qiniu from 'qiniu'

export const getToken = (bucket) => {
        var accessKey = 'XXX'; //七牛云ak
        var secretKey = 'XXX'; //七牛云sk
        var bucket = bucket
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

        var options = {
                scope: bucket
        }

        var putPolicy = new qiniu.rs.PutPolicy(options);

        return  putPolicy.uploadToken(mac);
}