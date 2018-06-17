var mouseX = 0;
var mouseY = 0;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function keySet(evt, whichWarrior, setTo) {
    if (evt.keyCode == whichWarrior.controlKeyLeft) {
	whichWarrior.keyHeldLeft = setTo;
    }

    if (evt.keyCode == whichWarrior.controlKeyRight) {
	whichWarrior.keyHeldRight = setTo;
    }

    if (evt.keyCode == whichWarrior.controlKeyUp) {
	whichWarrior.keyHeldUp = setTo;
    }

    if (evt.keyCode == whichWarrior.controlKeyDown) {
	whichWarrior.keyHeldDown = setTo;
    }

    //evt.preventDefault();
}

function keyPressed(evt) {
    //console.log("key pressed: " + evt.keyCode);
    keySet(evt, blueWarrior, true);
    //evt.preventDefault();
}

function keyReleased(evt) {
    //console.log("key released: " + evt.keyCode);
    keySet(evt, blueWarrior, false);
    //evt.preventDefault();
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    //console.log("("+mouseX+","+mouseY+")");
}

function setupInput() {
    //console.log("setupInput()");
    canvas.addEventListener("mousemove", updateMousePos);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    blueWarrior.setupInput(KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT);
}

