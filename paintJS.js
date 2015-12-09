
var myCanvas = null;
var mousePos = {
    x: 0,
    y: 0
};

var myInterval = null;
var isDrawing = false;
var context = null;

var drawing = function(e) {

    mousePos.x = e.clientX - this.offsetLeft;
    mousePos.y = e.clientY - this.offsetTop;

    if (isDrawing) {
        context.moveTo(mousePos.x, mousePos.y);
        context.lineTo(mousePos.x, mousePos.y);
        context.closePath();
        context.stroke();
    }
};

var startDrawing = function(e) {
    context.beginPath();
    isDrawing = true;
};

var stopDrawing = function() {
    //clearInterval(myInterval);

    isDrawing = false;
};

var resetCanvas = function() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
};

var changeColor = function() {
    context.strokeStyle = this.id;
};

var changeSize = function() {
    if (this.id == "small")
        context.lineWidth = "6";
    else if (this.id == "medium")
        context.lineWidth = "10";
    else if (this.id == "fat")
        context.lineWidth = "14";
    else if (this.id == "superFat")
        context.lineWidth = "30";
};

var erase = function() {
    context.lineWidth = "14";
    context.strokeStyle = "white";
};


window.addEventListener("load", function() {

    var colorButtons = window.document.getElementsByClassName("color");
    for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].style.backgroundColor = colorButtons[i].id;
        colorButtons[i].addEventListener("click", changeColor);
    }

    myCanvas = window.document.createElement("canvas");
    myCanvas.className = "myCanvas";
    myCanvas.width = 800;
    myCanvas.height = 600;





    context = myCanvas.getContext('2d');
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);
    context.stroke();


    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = "6";




    window.document.body.appendChild(myCanvas);

    myCanvas.addEventListener("mousemove", drawing);
    myCanvas.addEventListener("mousedown", startDrawing);
    myCanvas.addEventListener("mouseup", stopDrawing);
    myCanvas.addEventListener("mouseleave", stopDrawing);


    window.document.getElementById("resetButton").addEventListener("click", resetCanvas);
    window.document.getElementById("eraseButton").addEventListener("click", erase);

    var sizeButtons = window.document.getElementsByClassName("size");
    for (var j = 0; j < sizeButtons.length; j++) {
        sizeButtons[j].addEventListener("click", changeSize);
    }


    window.document.getElementById("downloadLnk").addEventListener('click', function() {
        var dt = myCanvas.toDataURL('image/png');
        this.href = dt;
    }, false);
});
