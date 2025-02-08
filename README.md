# BackupMySQLToQiniu
在操作数据过程中，可能会导致数据错误，甚至数据库奔溃，而有效的定时备份能很好地保护数据库。使用本仓库加上`crontab`可以实现定时备份MySQL

## 配置
### 默认配置（`backup.conf`）
修改成你的配置，还可以在通过传入配置文件名称的方式实现多配置（后面会讲到）。
```
# 需要备份的数据库名称
dbName=bf_test
# 文件路径（实际路径会加上dbName）
dataPath=/bf/data
# zip包密码，建议设置复杂一点
zipPwd=myPassword

# MySQL用户
MySQLUser=root
# MySQL用户密码
MySQLPwd=MySQLPwd

# 桶名称
bucketName=你的七牛云桶名称
# 七牛云ak
qiniuAccessKey=你的七牛云ak
# 七牛云sk
qiniuSecretKey=你的七牛云sk
```
## 使用
### 默认配置
默认使用 `backup.conf` 作为配置文件
```sh
bash bf.sh
```
### 指定配置文件
使用 `backup-test.conf` 作为配置文件
```sh
bash bf.sh backup-test.conf
```
> ## 注意!!!：配置文件需要和`bf.sh`放在同一目录
### 在`crontab`中使用
```sh
# 每天3点备份test数据库
0 3 * * * bash bf.sh backup-test.conf
# 每天3点15分备份dev数据库
15 3 * * * bash bf.sh backup-dev.conf
# 每天3点30分备份job数据库
30 3 * * * bash bf.sh backup-job.conf
```