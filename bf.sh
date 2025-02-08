#!/bin/bash

# 获取当前脚本的目录路径
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

DEFAULT_CONFIG="backup.conf"

# 如果用户提供了配置文件路径，则使用用户的配置文件
if [ "$1" ]; then
  CONFIG_FILE="$1"
else
  CONFIG_FILE="$DEFAULT_CONFIG"
fi

CONFIG_FILE="$SCRIPT_DIR/$CONFIG_FILE"

# 检查文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
  echo "错误: 配置文件 $CONFIG_FILE 不存在"
  exit 1
fi

# 读取配置文件
source $CONFIG_FILE

# 设定 文件夹
backUpFolder="$dataPath/$dbName"  #定时保存打包数据库的文件 的位置
date_now=`date +%Y_%m_%d_%H%M`
backFileName=$dbName_$date_now

# 进入到指定文件夹
if [ ! -d $backUpFolder ];then
   mkdir -p $backUpFolder
fi
cd $backUpFolder

mysqldump -h 127.0.0.1 -P 33711 -u$MySQLUser -p$MySQLPwd $dbName > $backFileName

#打包备份数据库 
zip -rP $zipPwd $backFileName.zip $backFileName

# 移除临时文件
rm -rf $backFileName

# 备份文件位置@备份文件名称（无后缀）@数据库名称@桶名称@七牛云Ak@七牛云SK
NODE_ENV=$backUpFolder@$backFileName@$dbName@$bucketName@$qiniuAccessKey@$qiniuSecretKey node $SCRIPT_DIR/src/start.js # 此程序位置

# 删除90天前的备份文件
find $backUpFolder -type f -name "*.zip" -mtime +90 -exec rm -f {} \;
