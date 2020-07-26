window.onload = function () {
    var url = "http://wickedlysmart.com/ifeelluckytoday";
    var request = new XMLHttpRequest();

    request.open("GET", url);

    if(request.status == 200){
        displayLuck(request.responseText);
    }
    request.send(null);
}

function displayLuck(luck) {
    var p = document.getElementById("luck");
    p.innerHTML = "Today you are " + luck;
}