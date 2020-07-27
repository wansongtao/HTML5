window.onload = function () {
    var url = "file:///G:/software_programming/Web/Html5/chapter6/sales.json";
    var request = new XMLHttpRequest();

    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200){
            updateSales(request.responseText);
        }
    };
    request.send(null);
}

// function displayLuck(luck) {
//     var p = document.getElementById("luck");
//     p.innerHTML = "Today you are " + luck;
// }