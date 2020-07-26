window.onload = playlist;

function playlist(){
    var addSongButton = document.getElementById("songInputButton");

    addSongButton.onclick = handleButtonClick;
    onloadPlaylist();
}

function handleButtonClick() {
    var inputText = document.getElementById("songInputText").value;

    if(inputText == ""){
        alert("Null");
    }
    else {
        var ul = document.getElementById("playlist");
        var li = document.createElement("li");

        li.innerHTML = inputText;
        ul.appendChild(li);

        Save(inputText);
    }
}

function Save(item) {
    var playlistArray = getStoreArray("playlist2");

    playlistArray.push(item);
    localStorage.setItem("playlist2", JSON.stringify(playlistArray));
}

function getStoreArray(key){
    var playlistArray = localStorage.getItem(key);

    if(playlistArray == "" || playlistArray == null){
        playlistArray = new Array();
    }
    else {
        playlistArray = JSON.parse(playlistArray);
    }

    return playlistArray;
}

function getSongList(){
    return getStoreArray("playlist2");
}

function onloadPlaylist(){
    var playlistArray = getSongList();
    var ul = document.getElementById("playlist");

    for(var i = 0; i < playlistArray.length; i++){
        var li = document.createElement("li");
        
        li.innerHTML = playlistArray[i];
        ul.appendChild(li);
    }
}