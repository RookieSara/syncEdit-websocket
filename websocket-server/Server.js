//基于nodejs-websocket
const ws = require("nodejs-websocket");


let clientCount = 0;
let cache = '';

const server = ws.createServer(function (conn) {
    clientCount++;
    //连接后执行
    console.log("建立连接，客户端个数",clientCount);

    // 使新打开的客户端页面保留上一个页面的信息
    conn.sendText(cache);

    //接收到消息触发
    conn.on("text", (data)=> {
        console.log(data);

        cache = data;
     // 广播给其他的客户端，实时同步输入内容
        broadCast(data);
    });

    //连接断开后触发
    conn.on("close", function () {
        console.log("Connection closed");
    });

    //异常时触发
    conn.on("error", () =>{
        console.log("触发异常");
    })
}).listen(8001);

console.log("websocket server listen port is" + 8001);

function broadCast(data) {
    server.connections.forEach(function (connection) {
       connection.send(data);
    })
}