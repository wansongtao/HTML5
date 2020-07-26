window.onload = getMyLocation;

function getMyLocation() {
    //检查浏览器是否支持地理定位api
    if(navigator.geolocation) {
        //getCurrentPosition(successHandler, errorHandler, options) successHandler是一个函数，如果浏览器能成功地确定你的位置就会调用这个函数;errorHandler如果浏览器无法确定你的位置，则会调用这个函数(可选参数);options参数允许你定制地理定位方法(可选)
        navigator.geolocation.getCurrentPosition(displayLocaltion, displayError);
    } else {
        alert("Oops, no geolocaltion support.");
    }
}

//调用displayLocation时，地理定位API向它传入一个position对象，其中包含有关浏览器位置的信息，包括一个有纬度和经度的coordinates对象
function displayLocaltion(position) {
    //coords包含指向coordinates对象的一个引用
    var latitude = position.coords.latitude;  //获取经度
    var longitude = position.coords.longitude;  //获取纬度

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

    showMap(position.coords);
}

function displayError(error){
    //error对象有一个code属性，其中包含一个0-3的数。
    var errorTypes = {
        //这是“全包型”错误，如果其他错误都不合适就会使用这个错误。
        0: "Unknown error",

        //这表示用户拒绝了使用位置信息的请求
        1: "Permission denied by user",

        //这说明浏览器尝试过，但是没能得到你的位置。同样的，查看error.message来得到更多信息。
        2: "Position is not available",

        //地理定位有一个内部超时设置，如果超出了这个时限还没能确定位置，就会导致这个错误。
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code];

    if(error.code == 0 || error.code == 2){
        //对于错误0和2，有时error.message属性中会有一些额外的信息，所以把这些信息增加到errorMessage串。
        errorMessage = errorMessage + " " + error.message;
    }

    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

var map;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coordslongitude);

    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
}