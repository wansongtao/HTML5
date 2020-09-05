/*
    工作线程可以访问localstorage，也也已作出XMLHttpRequest请求

*/

//接收消息
onmessage = pingPong;  //也可以省略

function pingPong(event) {
    if (event.data == "ping") {
        //传回数据
        postMessage("pong");
    }
}

/**
 * Web工作线程有一个全局函数如下，可以使用这个函数向工作线程中导入一个或多个js文件
 */
//  importScripts(url1, url2, url3, ...);

//让一个工作线程停止工作
//close();