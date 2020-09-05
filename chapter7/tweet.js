function ajax(apiType, url) {
    var myRequest = new XMLHttpRequest();

    myRequest.open(apiType, url);

    myRequest.send(null);

    function stateChange() {
        if(myRequest.readyState == 4) {
            if (myRequest.status == 200) {
                console.log(myRequest.responseText);
                return JSON.parse(myRequest.responseText);
            }
        }
    }

    myRequest.onreadystatechange = stateChange;
}

ajax("GET", "http://localhost/chapter7/tweet.json");