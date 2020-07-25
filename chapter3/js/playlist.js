
window.onload = init;

function init() {
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;

    loadPlaylist();  //加载已存储的内容
}

function handleButtonClick() {
    var textInput = document.getElementById("songTextInput");
    var songName = textInput.value;

    //创建li元素
    var li = document.createElement("li");
    var ul = document.getElementById("playlist");

    //设置li元素的文本内容
    li.innerHTML = songName;
    ul.appendChild(li);  //将li元素放入ul元素内，会放到其他li元素的后面

    save(songName);   //保存用户输入的内容
}

//jQuery写法
// $(function () {
//     $("#addButton").click(function () {
//         var textInput = $("#songTextInput").val();

//         if(textInput != ""){
//             //使用HTML标签创建元素
//             var liText = '<li>'+ textInput +'</li>';

//             //使用jQuery创建元素
//             var liText2 = $("<li></li>").text(textInput);

//             //$("#playlist").append(liText);
//             $("#playlist").append(liText2);
//         } else {
//             alert("Null!");
//         }
//     });
// }); 