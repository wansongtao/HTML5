window.onload = function() {
    let previewBtn = document.getElementById("preview");

    previewBtn.addEventListener("click", previewHandle);

    //预览效果
    function previewHandle() {
        let myCanvas = document.getElementById("myCanvas");
        let context = myCanvas.getContext("2d");

        let bgColorObj = document.getElementById("bgColor");
        let index = bgColorObj.selectedIndex;
        let bgColor = bgColorObj.options[index].value;

        drawShape(myCanvas, context);
    }

    /**
     * @description 画图形
     * @param {*} myCanvas 
     * @param {*} context 
     */
    function drawShape(myCanvas, context) {
        let shape = document.getElementById("shape");
    }
};