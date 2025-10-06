const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // 解析请求的URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // 如果请求根路径，返回index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // 构建文件路径
    let filePath = path.join(__dirname, 'src', pathname);
    
    // 获取文件扩展名
    const extname = path.extname(filePath);
    
    // 设置默认内容类型
    let contentType = 'text/html';
    
    // 根据文件扩展名设置内容类型
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
    }
    
    // 读取文件
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 文件不存在
                res.writeHead(404);
                res.end('File not found');
            } else {
                // 服务器错误
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            // 成功读取文件
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*' // 允许跨域访问
            });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🎬 iVideo 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 服务目录: ${path.join(__dirname, 'src')}`);
});