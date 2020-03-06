const ws = require('nodejs-websocket');
 let clientCount = 0;
 let cache = '';
// 创建一个websocket的服务器
const server = ws.createServer(function(conn){

    // 1.启动服务器和前端，用户连接成功后，输出 new connection
    clientCount++;
    console.log('new connection',clientCount);

    // 使新打开的客户端页面保留上一个页面的信息
    conn.sendText(cache);

    // 3. 接收客户端的消息
    conn.on('text', (data)=>{
        // console.log('接收到来自客户端的消息：', data);
        cache = data ;

        // 3.1 广播给每一个客户端
        boardcast(data);

        // 4. 发送消息给客户端
        // conn.sendText('你好客户端，我是服务器端！');
    });

    // 6.处理用户断掉连接时的错误
    conn.on('error', (err)=>{
        console.log(err);
    });

    // 用户端断开连接时触发
    conn.on('close', ()=>{
        console.log('用户断开了链接');
    });

}).listen(8001);

console.log('websocket server listen port is 8001');

function boardcast(data){
    // server.connections保存着每个连接进来的用户
    server.connections.forEach((conn)=>{
        conn.sendText(data);
    });
}
