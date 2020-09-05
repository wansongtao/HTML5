window.onload = function() {
    let previewBtn = document.getElementById("preview");

    previewBtn.addEventListener("click", previewHandle);

    //预览效果
    function previewHandle() {
        try {
            //获取画布对象，并调用画布的2d属性
            let myCanvas = document.getElementById("myCanvas");
            let context = myCanvas.getContext("2d");

            //获取用户选择的画布背景颜色
            let bgColorObj = document.getElementById("bgColor");
            let index = bgColorObj.selectedIndex;
            let bgColor = bgColorObj.options[index].value;

            //设置接下来内容的颜色
            context.fillStyle = bgColor;

            //在画布上画一个和画布等高等宽的矩形
            context.fillRect(0, 0, myCanvas.clientWidth, myCanvas.height);

            drawlogo(myCanvas, context);
            drawShape(myCanvas, context);
            drawText(myCanvas, context);
        }
        catch(ex) {
            alert(ex.message);
        }
    }

    /**
     * @description 在画布上显示用户选择的图形
     * @param {*} myCanvas 
     * @param {*} context 
     */
    function drawShape(myCanvas, context) {
        try {
            //获取用户选择的图形
            let shapeObj = document.getElementById("shape");
            let index = shapeObj.selectedIndex;
            let shape = shapeObj[index].value;

            if (shape == "smileface") {
                //画一个半径为300的圆(脸)
                context.beginPath();
                context.arc(400, 300, 200, 0, 2 * Math.PI, true);
                context.lineWidth = 2;
                context.stroke();

                //左眼
                context.beginPath();
                context.arc(320, 250, 50, 0, 2 * Math.PI, true);
                context.lineWidth = 2;
                context.stroke();

                //右眼
                context.beginPath();
                context.arc(480, 250, 50, 0, 2 * Math.PI, true);
                context.lineWidth = 2;
                context.stroke();

                //鼻子
                context.beginPath();
                context.moveTo(400, 350);
                context.lineTo(400, 400);
                context.lineWidth = 2;
                context.stroke();

                //嘴巴
                context.beginPath();
                context.arc(400, 410, 50, 20 * Math.PI / 180, 160 * Math.PI / 180, false);
                context.lineWidth = 2;
                context.stroke();
            }else if (shape == "square") {
                //位置可能重合            
                for (var loopCount = 0; loopCount < 10; loopCount++) {
                    //随机生成方块的边长
                    let w = Math.ceil(Math.random() * 20);

                    //直到生成一个边长不为0的方块
                    while(!w) {
                        w = Math.ceil(Math.random() * 20);
                    }

                    //随机生成一个画布里x、y
                    let x = Math.floor(Math.random() * myCanvas.width);
                    let y = Math.floor(Math.random() * myCanvas.height);

                    context.fillStyle = "green";

                    context.fillRect(x, y, w, w);
                }
            } else if(shape == "triangle") {
                //随机生成一个画布里x、y
                let x = Math.floor(Math.random() * myCanvas.width);
                let y = Math.floor(Math.random() * myCanvas.height);

                //在画布里开始一个路径
                context.beginPath();

                //起始点
                context.moveTo(x, y);

                //从一个点描路径到另一个点
                context.lineTo(x + 200, y + 100);
                context.lineTo(x + 100, y + 300);

                //将最后一个点和起始点连接起来
                context.closePath();

                //线宽
                context.lineWidth = 2;

                //线的颜色
                context.strokeStyle = "red";

                //用线描路径
                context.stroke();
            } else if(shape == "circle") {
                for(let loopCount = 0; loopCount < 10; loopCount++) {
                    //随机生成一个半径，最小10
                    let radius = Math.ceil(Math.random() * 50 + 10);

                    //随机生成一个画布里x、y
                    let x = Math.floor(Math.random() * myCanvas.width);
                    let y = Math.floor(Math.random() * myCanvas.height);

                    //开始路径
                    context.beginPath();

                    //param1: x, param2: y, param3: radius, param4/param5: 开始弧度和结束弧度, param6: true逆时针, false
                    context.arc(x, y, radius, 0, 2 * Math.PI, false);

                    //指定用来填充圆的颜色
                    context.fillStyle = "pink";

                    //填充满
                    context.fill();
                }
            }
            else {
                throw {message: "Please select shape."};
            }
        } catch(ex) {
            alert(ex.message);
        }
    }

    /**
     * @description 在画布上显示用户选择的文本
     * @param {*} myCanvas 
     * @param {*} context 
     */
    function drawText(myCanvas, context) {
        //获取用户选择的文本颜色
        let textColorObj = document.getElementById("textColor");
        let colorIndex = textColorObj.selectedIndex;
        let textColor = textColorObj[colorIndex].value;

        context.fillStyle = textColor;

        //获取用户选择的文本
        let textObj = document.getElementById("text");
        let textIndex = textObj.selectedIndex;
        let text = textObj[textIndex].value;

        //文本样式
        context.font = "bold 1.2em sans-serif";

        //文本对齐
        context.textAlign = "center";

        //param1: text, param2: x, param3: y, param4: width  超出这个宽度，将缩放
        context.fillText(text, 400, 80, 400);
    }

    /**
     * @description 添加图像
     * @param {*} myCanvas 
     * @param {*} context 
     */
    function drawlogo(myCanvas, context) {
        let myImg = new Image();
        myImg.src = "../uploads/ia_100000000053.gif";

        //图像并不总会立即加载，所以在绘制图像之前需要确保图像已经完全加载。
        myImg.onload = function() {
            //param1: image对象, param2: x, param3: y, param4: width, param5: height
            context.drawImage(myImg, 0, 0, 100, 100);
        }
    }
};