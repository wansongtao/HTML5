
//我们需要把数据放在一个服务器上，这样XMLHttpRequest才能使用HTTP协议获取数据
window.onload = function () {
    try {
        //跨域要使用jsonp  
        //var url = "http://localhost/chapter6/sales.json";
        //var url = "http://gumball.wickedlysmart.com/gumball/gumball.html";

        /**
         * @description 异步请求函数
         * @param {*} apiTyep get/post
         * @param {*} url address
         * @param {*} callback 回调函数
         */
        function ajax(apiTyep, url, callback) {
            //新建一个XMLHttpRequest对象
            var request = new XMLHttpRequest();

            //初始化对象 默认异步
            request.open(apiTyep, url);

            function myReadyStateChange() {
                if(request.readyState == 4) {
                    if (request.status == 200){
                        //JSON.parse反串列化，将一个json串转换为一个js对象
                        callback(JSON.parse(request.responseText));
                    }
                    else {
                        throw {message: "请求数据失败"};
                    }
                }
        
            }

            //发送请求,get请求不包含任何信息
            request.send(null);

            //每当readystate属性发生变化时都会触发这个事件
            request.onreadystatechange = myReadyStateChange;
        }

        //跨域不使用XMLHttpRequest对象
        //ajax("GET", url, updateSales);

        setInterval(handleRefresh, 3000);

        /**
         * @description 生成跨域脚本文件
         */
        function handleRefresh() {
            /*
                大多数浏览器都有一个有趣的特性，如果你反复地获取同一个URL，
                浏览器为了提高效率会把它缓存起来，所以你会反复得到同意的
                缓存文件。
             */
            try{
                //跨域的URL地址，后面添加的一个随机时间是为了避免浏览器缓存文件
                var url = "http://gumball.wickedlysmart.com?callback=updateSalesTest&random=" + (new Date()).getTime();

                var newScriptElement = document.createElement("script");
                newScriptElement.setAttribute("src", url);
                newScriptElement.setAttribute("id", "jsonp");

                var oldScriptElement = document.getElementById("jsonp");
                var head = document.getElementsByTagName("head")[0];

                if(oldScriptElement == null) {
                    head.appendChild(newScriptElement);
                } else {
                    //如果已存在则替换掉之前的script
                    head.replaceChild(newScriptElement, oldScriptElement);
                }
            }
            catch(ex) {
                alert(ex.message);
            }
        }
    } catch(ex) {
        alert(ex.message);
    }
};

/**
 * @description 将返回的数据输出在页面上
 * @param {*} responseText 服务器返回的数据（已经转换为js对象了）
*/
function updateSalesTest(responseText) {
    try {
        var salesDiv = document.getElementById("sales");
            
        for(var i = 0; i < responseText.length; i++) {
            //创建一个div节点
            var div = document.createElement("div");

            //给这个div添加一个类
            div.setAttribute("class", "saleItem");

            //给这个div添加一些文本
            div.innerHTML = responseText[i].name + "sold" + 
            responseText[i].sales + "gumballs";

            //将这个div添加到页面中
            salesDiv.appendChild(div);
        }
    }
    catch(ex) {
        alert(ex.message);
    }
    
}