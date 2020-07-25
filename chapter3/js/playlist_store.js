//保存用户输入的内容
function save(item) {
    var playlistArray = getStoreArray("playlist");

    //将用户输入的内容存储到数组中
    playlistArray.push(item);

    //将playlist = JSON.stringify(playlistArray)存储到本地
    //JSON.stringify()将json格式的数据转换为字符串
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

//加载已存储的内容
function loadPlaylist() {
    var playlistArray = getSaveSongs();
    var ul = document.getElementById("playlist");

    if(playlistArray != null){
        for (var i = 0; i < playlistArray.length; i++){
            var li = document.createElement("li");
            
            li.innerHTML = playlistArray[i];
            ul.appendChild(li);
        }
    }
}

function getSaveSongs() {
    return getStoreArray("playlist");
}

function getStoreArray(key) {
    //读取本地存储的内容
    var playlistArray = localStorage.getItem(key);

    if(playlistArray == null || playlistArray == ""){
        playlistArray = new Array();
    }
    else {
        //JSON.parse() 将字符串转换为json格式
        playlistArray = JSON.parse(playlistArray);
    }
    return playlistArray;
}