$(function() {
    /**
     * 要显示的照片索引
     */
    var mycount = 0;
    
    /**
     * @description 轮播图定时器ID，方便清除定时器
     */
    var autoImgID;

    /**
     * @description 自动轮播照片
     */
    function autoImg() {
        autoImgID = setInterval(function() {            
            //显示当前索引的照片，隐藏其他兄弟照片
            $(".focusimg a:first img").eq(mycount).show().siblings("img").hide();
            
            //移除这个元素的鼠标悬停样式
            $(".focusimg ul li a").removeClass("a-white");

            //给当前悬停的元素添加鼠标悬停样式
            $(".focusimg ul li a").eq(mycount).addClass("a-white");

            mycount++;

            // 当索引大小超过照片数量时，重新从零开始
            if (mycount > $(".focusimg a:first img").length - 1) {
                mycount = 0;
            }
        }, 2000);
    }

    //运行
    autoImg();

    /**
     * 照片上面的小圆点,鼠标悬停/点击时，显示当前索引的照片
     */
    function mouseHoverImg () {
        //清除定时器
       clearInterval(autoImgID);

    //    $(this).preventDefault();

        //获取当前鼠标悬停元素的索引
        mycount = $(".focusimg ul li a").index(this);

        //显示相同索引的照片
        $(".focusimg a:first img").eq(mycount).show().siblings("img").hide();

        //移除这个元素的鼠标悬停样式
        $(".focusimg ul li a").removeClass("a-white");

        //给当前悬停的元素添加鼠标悬停样式
        $(this).addClass("a-white");

        autoImg();
    }
   
    /**
     * @description 显示前一张或后一张照片
     */
    function changeImg() {
        //清除定时器
        clearInterval(autoImgID);

        if($(this).hasClass("beforeimg")) {
            mycount--;

            //当索引小于0时，从最后一张照片开始
            if(mycount < 0) {
                mycount = $(".focusimg a:first img").length - 1;
            }
        } else {
            mycount++;

            //当到达最后一张照片时，从第一张开始
            if(mycount > $(".focusimg a:first img").length - 1) {
                mycount = 0;
            }
        }
        
        //显示当前索引的照片，隐藏其他的照片
        $(".focusimg a:first img").eq(mycount).show().siblings("img").hide();

        //移除这个元素的鼠标悬停样式
        $(".focusimg ul li a").removeClass("a-white");

        //给当前悬停的元素添加鼠标悬停样式
        $(".focusimg ul li a").eq(mycount).addClass("a-white");

        autoImg();
    }

    //照片上面的小圆点悬停事件
    $(".focusimg ul li a").hover(mouseHoverImg);
    $(".beforeimg").on("click", changeImg);
    $(".afterimg").on("click", changeImg);
    $(".focusimg ul li a").on("click", mouseHoverImg);

    /**
     * @description 京东简要服务模块服务列表鼠标悬停变换照片
     */
    function servicesAfterImg() {
        //uploads/ia_100000022.png
        var imgUrl = $(this).find("img").attr("src");

        var myRegExp = /\d*\./;
        var myNum = parseInt(imgUrl.match(myRegExp), 10) + 1;

        var changeUrl = imgUrl.replace(myRegExp, myNum + ".");

        $(this).find("img").attr("src", changeUrl);
    }

    /**
     * @description 京东简要服务模块服务列表鼠标移出变回之前的照片
     */
    function servicesBeforeImg () {
        //uploads/ia_100000022.png
        var imgUrl = $(this).find("img").attr("src");

        var myRegExp = /\d*\./;
        var myNum = parseInt(imgUrl.match(myRegExp), 10) - 1;

        var changeUrl = imgUrl.replace(myRegExp, myNum + ".");

        $(this).find("img").attr("src", changeUrl);
    }

    $(".services-list ul li a").hover(servicesAfterImg, servicesBeforeImg);

    /**
     * @description 输出秒杀时间：秒杀持续时间两小时
     */
    function seckillTime() {
        var myTime = new Date();

        var localTime = myTime.toTimeString();

        var myRegExp = /\d{2}/g;

        var timeArray = localTime.match(myRegExp);

        /**
         * @description 保存秒杀开始的秒数
         */
        var mySeconds;

        //输出几点场  每两小时一场
        if(timeArray[0] % 2 == 0 || timeArray[0] == "00") {
            //偶数点 类如：8:00 秒杀才刚开始
            $(".timetitle strong").text(timeArray[0] + ":00"); 
            mySeconds = myTime.getMinutes() * 60 + myTime.getSeconds();
        }
        else {
            // 奇数点 类如：9:00 秒杀已经开始了一个小时
            var myHours = parseInt(timeArray[0], 10) - 1;

            if(myHours < 10) {
                myHours = "0" + myHours;
            }

            $(".timetitle strong").text(myHours + ":00");

            mySeconds = 3600 +  myTime.getMinutes() * 60 + myTime.getSeconds();
        }

        //秒杀剩余的小时数
        var seckillHours = Math.floor((3600 * 2 - mySeconds) / 3600);
        //秒杀剩余的分钟数
        var seckillMinutes = Math.floor((3600 * 2 - mySeconds) % 3600 / 60);
        //秒杀剩余的秒数
        var seckillseconds = (3600 * 2 - mySeconds) % 3600 % 60;

        if(seckillMinutes < 10) {
            seckillMinutes = "0" + seckillMinutes;
        }

        if(seckillseconds < 10) {
            seckillseconds = "0" + seckillseconds;
        }

        $(".seckill-clock-box").eq(0).text("0" + seckillHours);
        $(".seckill-clock-box").eq(1).text(seckillMinutes);
        $(".seckill-clock-box").eq(2).text(seckillseconds);
    }

    //秒杀定时器
    var seckillTimeId = setInterval(seckillTime, 1000);

    function beforeList() {
        $("#autolist").animate({left: '0'}); 
    }

    function afterList() {
        $("#autolist").animate({left: '-800px'}); 
    }

    $(".beforeul").on("click", beforeList);
    $(".afterul").on("click", afterList);

    /**
     * 两张照片的无缝滚动 : 第一张和第三张相同
     */
    function seckillAutoImg() {
        var imgDirection = 0;
        
        setInterval(function() {
            //jquery动画函数：animate({param}, speed, callback);
            if(imgDirection == 0) {
                $(".rolldiv").animate({left: '-190px'}, "slow");
                imgDirection = 1;
            }
            else {
                $(".rolldiv").animate({left: '-380px'}, "slow", function() {
                    //当移动到最后一张照片时，立即跳回第一张
                    $(".rolldiv").animate({left: '0'}, 0);
                });
                imgDirection = 0;
            }
        }, 2000);
    }

    seckillAutoImg(); 
});