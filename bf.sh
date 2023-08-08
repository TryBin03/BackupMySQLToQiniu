# 需要备份的数据库名称
dbName=$1
# MySQL用户
MySQLUser=MySQL 
# MySQL用户密码
MySQLPwd=MySQL
# zip包密码，建议设置复杂一点
zipPwd=password

# 设定 文件夹
backUpFolder="/backup/data/$dbName"  #定时保存打包数据库的文件 的位置
date_now=`date +%Y_%m_%d_%H%M`
backFileName=$dbName_$date_now

# 进入到指定文件夹
if [ ! -d $backUpFolder ];then
   mkdir -p $backUpFolder
fi
cd $backUpFolder

mysqldump -u$MySQLUser -p$MySQLPwd $dbName > $backFileName

#打包备份数据库 
zip -rP $zipPwd  $backFileName.zip $backFileName

# 移除临时文件
rm -rf $backFileName

NODE_ENV=$backUpFolder@$backFileName@$dbName node /backup/start.js # 此程序位置