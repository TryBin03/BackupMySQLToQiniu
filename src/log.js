const fs = require('fs'); // 添加这行代码
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

class Logger {
    constructor(options = {}) {
        // 默认配置
        const defaultOptions = {
            level: 'info', // 默认日志级别
            logDir: path.join(__dirname, '../logs'), // 默认日志目录
            filename: 'app-%DATE%.log', // 默认日志文件名
            datePattern: 'YYYY-MM-DD', // 按天分割日志
            maxSize: '20m', // 每个文件最大 20MB
            maxFiles: '14d', // 保留最近 14 天的日志
            format: winston.format.combine(
                winston.format.timestamp(), // 添加时间戳
                winston.format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        };

        // 合并用户配置和默认配置
        this.options = Object.assign({}, defaultOptions, options);
        // this.options = { ...defaultOptions, ...options };

        // 确保日志目录存在
        if (!fs.existsSync(this.options.logDir)) {
            fs.mkdirSync(this.options.logDir, { recursive: true });
        }

        // 创建 Logger 实例
        this.logger = winston.createLogger({
            level: this.options.level,
            format: this.options.format,
            transports: [
                new DailyRotateFile({
                    dirname: this.options.logDir,
                    filename: this.options.filename,
                    datePattern: this.options.datePattern,
                    maxSize: this.options.maxSize,
                    maxFiles: this.options.maxFiles,
                }),
                new winston.transports.Console({ // 同时输出到控制台
                    format: winston.format.combine(
                        winston.format.colorize(), // 控制台日志添加颜色
                        winston.format.simple() // 简单格式
                    ),
                }),
            ],
        });
    }

    // 记录日志的方法
    log(level, message, meta = {}) {
        this.logger.log(level, message, meta);
    }

    // 快捷方法
    info(message, meta) {
        this.log('info', message, meta);
    }

    warn(message, meta) {
        this.log('warn', message, meta);
    }

    error(message, meta) {
        this.log('error', message, meta);
    }

    debug(message, meta) {
        this.log('debug', message, meta);
    }
}

// 导出工具类
module.exports = Logger;