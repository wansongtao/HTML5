window.onload = function() {
    var button = document.getElementById("previewButton");

    button.onclick = previewHandler;

    /**
     * 预览按钮触发事件
     */
    function previewHandler() {
        //首先得到画布元素并要求得到它的2d绘制上下文
        var canvas = document.getElementById("tshirtCanvas");
        var context = canvas.getContext("2d");

        fillBackgroundColor(canvas, context);

        //获取用户要画的图形
        var selectObj = document.getElementById("shape");
        var index = selectObj.selectedIndex;
        var shape = selectObj[index].value;

        if (shape == "squares") {
            var myColor = 106051;
            for (var squares = 0; squares < 20; squares++) {
                myColor += 5020;
                drawSquare(canvas, context, myColor);
            }
        } else if (shape == "triangle") {
            drawTriangle(canvas, context);
        } else if (shape == "circles") {
            drawCircles(canvas, context);
        }
        else {
            drawSmileFace(context);
        }

        drawText(canvas, context);
        drawBird(canvas, context);
    }

    /**
     * @description 在画布里画一个随机边长和随机位置的方块
     * @param {*} canvas 画布
     * @param {*} context 画布上下文
     */
    function drawSquare(canvas, context, myColor) {
        //一个随机边长
        var w = Math.ceil(Math.random() * 40);

        //避免生成边长为零的方块
        while(!w) {
            w = Math.ceil(Math.random() * 40);
        }
        
        //画布里随机x坐标
        var x = Math.floor(Math.random() * canvas.width);

        //画布随机y坐标
        var y = Math.floor(Math.random() * canvas.height);

        //设置一个属性，告诉画布不管你接下来要画什么，都要用这种颜色
        var scolor = "\#" + myColor;
        context.fillStyle = scolor;

        //在画布里画出具体的方块
        context.fillRect(x, y, w, w);
    }

    /**
     * @description 画三角形
     * @param {*} canvas 
     * @param {*} context 
     */
    function drawTriangle(canvas, context) {
        //开始一个新路径
        context.beginPath();

        //移动到画布的一个指定点
        context.moveTo(10, 50);

        //描路径，从一个点描到另一个点
        context.lineTo(50, 50);
        context.lineTo(100, 150);

        //将路径的起始点连接到当前路径的最后一个点
        context.closePath();

        //线宽
        context.lineWidth = 5;

        //用线描路径
        context.stroke();

        context.fillStyle = "red";

        context.fill();
    }

    /**
     * @description 画圆
     * @param {*} canvas 
     * @param {*} context 
     */
    function drawCircles(canvas, context) {
        context.beginPath();

        /*param1: x, param2: y, param3: radius, param4 param5: 弧的起始角和终止角,
         param6: direction（true: 逆时针， false：顺时针）*/
        context.arc(100, 100, 20, 0, degreesToRadians(360), true);

        context.fillStyle = "orange";
        context.fill();
    }

    /**
     * @description 返回一个弧度
     * @param {*} degrees 
     */
    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    /**
     * @description 每次点击按钮后清空上一次画布里的内容
     * @param {*} canvas 
     * @param {*} context 
     */
    function fillBackgroundColor(canvas, context) {
        //获取用户想要的画布背景色
        var selectObj = document.getElementById("backgroundColor");
        var index = selectObj.selectedIndex;
        var bgColor = selectObj.options[index].value;

        //设置颜色
        context.fillStyle = bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * @description 画笑脸
     * @param {*} context 
     */
    function drawSmileFace(context) {
        //脸
        context.beginPath();
        context.arc(300, 300, 200, 0, degreesToRadians(360), true);
        context.lineWidth = 5;
        context.stroke();

        //左眼
        context.beginPath();
        context.arc(200, 250, 25, 0, 2 * Math.PI, true);
        context.lineWidth = 5;
        context.stroke();

        //右眼
        context.beginPath();
        context.arc(400, 250, 25, 0, 2 * Math.PI, true);
        context.lineWidth = 5;
        context.stroke();

        //鼻子
        context.beginPath();
        context.moveTo(300, 300);
        context.lineTo(300, 350);
        context.lineWidth = 5;
        context.stroke();

        //嘴
        context.beginPath();
        context.arc(300, 350, 75, degreesToRadians(20), degreesToRadians(160), false);
        context.lineWidth = 5;
        context.stroke();
    }

    /**
     * @description 将服务器传回来的数据添加到页面上
     * @param {*} tweets 
     */
    function updateTweets(tweets) {
        var tweetsSelection = document.getElementById("tweets");

        for (var i = 0; i < tweets.length; i++) {
            var option = document.createElement("option");

            option.text = tweets[i].text;
            option.value = tweets[i].text.replace("\"", "'");

            tweetsSelection.options.add(option);

            /*var option = "<option value='"+ tweets[i].text +"'>" + tweets[i].text +"</option>";

            tweetsSelection.appendChild(option);*/
        }

        //确保选中第一个
        tweetsSelection.selectedIndex = 0;
    }

    /**
     * @description 在画布上输出文本
     * @param {*} canvas 
     * @param {*} context 
     */
    function drawText(canvas, context) {
        //获取用户要的字体颜色
        var selectObj = document.getElementById("foregroundColor");
        var index = selectObj.selectedIndex;
        var fgColor = selectObj[index].value;

        //设置画布里内容的颜色
        context.fillStyle = fgColor;

        //获取用户选择的文本
        selectObj = document.getElementById("tweets");
        index = selectObj.selectedIndex;
        var tweets = selectObj.options[index].value;

        //字体样式
        context.font = "bold 1em sans-serif";

        //文本对齐
        context.textAlign = "left";

        //param1: text, param2: x, param3: y, param4: maxwidth（如果文本宽度大于这个值，会导致文本相应缩放）
        context.fillText(tweets, 200, 80, 200);
    }

    /**
     * @description 在画布上添加照片
     * @param {*} canvas 
     * @param {*} context 
     */
    function drawBird(canvas, context) {
        var twitterBrid = new Image();

        twitterBrid.src = "../uploads/header1.png";

        //图像并不总会立即加载，所以在绘制图像之前需要确保图像已经完全加载。
        twitterBrid.onload = function() {
            //param1: image对象, param2: x, param3: y, param4: width, param5: height
            context.drawImage(twitterBrid, 300, 520, 190, 120);
        }
    }
};