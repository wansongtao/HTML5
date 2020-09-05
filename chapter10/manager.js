//发送一个对象时，工作线程会得到这个对象的一个副本。工作线程做出的任何修改都不会影响主页面中的对象。
window.onload = function() {
    //新建一个工作线程对象   param: 工作线程脚本
    let worker = new Worker("worker.js");

    //使用工作线程的postMessage方法向它发送一个消息，可以发送字符串、数组、json对象.
    worker.postMessage("ping");  //可以省略

    //只要从这个工作线程接收到一个消息就会调用这个函数。
    worker.onmessage = function(event) {
        //event.data 工作线程返回的数据, event.target 发出这个消息的工作线程的一个引用
        let message = `Worker says ${event.data}`;

        document.getElementById("output").innerHTML = message;
    }


    //处理工作线程中的错误
    /*worker.onerror = function(error) {
        //error.filename
        //error.lineno
        //error.message
    }*/

    //终止一个线程
    worker.terminate();
}