
var canvas;
var canvasContext;

var blueWarrior = new Warrior();

window.onload = function() {
    canvas = document.getElementById("game-canvas");
    canvasContext = canvas.getContext("2d");

    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("LOADING...", canvas.width/2, canvas.height/2, "white");
    
    loadImages();

}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();
    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    worldGrid = whichLevel.slice();
    blueWarrior.reset(warriorPic, "Blue Storm");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueWarrior.move();
}

function drawAll() {
    //clearScreen();
    drawWorlds();
    blueWarrior.draw();
    
    //colorText(mouseX + "," + mouseY, mouseX, mouseY, "yellow");
    //var mouseWorldCol = Math.floor(mouseX / worldWidth);
    //var mouseWorldRow = Math.floor(mouseY / worldHeight);
    //var worldIndexUnderMouse = rowColToArrayIndex(mouseWorldCol, mouseWorldRow);
    //colorText(mouseWorldCol + "," + mouseWorldRow + ":" + worldIndexUnderMouse, mouseX, mouseY, "yellow");
}

