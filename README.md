# BackupMySQLToQiniu
在操作数据过程中，可能会导致数据错误，甚至数据库奔溃，而有效的定时备份能很好地保护数据库。使用本仓库加上`crontab`可以实现定时备份MySQL

## 配置
### bf.sh
```sh
# 程序路径
path=/backup
# 备份数据保存地址
backUpFolder="$path/data/$dbName"
# MySQL用户
MySQLUser=MySQL 
# MySQL用户密码
MySQLPwd=MySQL
# zip包密码，建议设置复杂一点
zipPwd=password
```
### qiniu_config.js
```js
//七牛云ak
var accessKey = 'XXX';
//七牛云sk
var secretKey = 'XXX';
```
### upload.js
```js
// 桶名称
const uploadToken = getToken("bucket")
```
