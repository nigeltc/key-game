
function Warrior() {
    this.x = 75;
    this.y = 75;
    this.prevX = 75;
    this.prevY = 75;
    this.speed = 5;
    this.img;
    this.name = "Unknown Warrior";

    this.keyHeldUp = false;
    this.keyHeldRight = false;
    this.keyHeldDown = false;
    this.keyHeldLeft = false; 
    
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
	this.controlKeyUp = upKey;
	this.controlKeyRight = rightKey;
	this.controlKeyDown = downKey;
	this.controlKeyLeft = leftKey;
    }
    
    this.reset = function(whichImage, warriorName) {
	this.img = whichImage;
	this.name = warriorName;
	for(var j=0; j<worldRows; j++) {
	    for(var i=0; i<worldColumns; i++) {
		var idx = rowColToArrayIndex(i, j);
		if ( worldGrid[idx] == WORLD_PLAYER_START ) {
		    //console.log("row=" + j + ", col=" + i);
		    worldGrid[idx] = WORLD_GROUND;
		    this.ang = - Math.PI/2;
		    this.x = (i * worldWidth) + (worldWidth / 2);
		    this.y = (j * worldHeight) + (worldHeight / 2);
		    this.prevX = this.x;
		    this.prevY = this.y;
		    return;
		}
	    }
	}
    }

    this.move = function() {
	var nextX = this.x;
	var nextY = this.y;
	if (this.keyHeldUp) {
	    nextY -= this.speed;
	}
	if (this.keyHeldDown) {
	    nextY += this.speed;
	}
	if (this.keyHeldRight) {
	    nextX += this.speed;
	}
	if (this.keyHeldLeft) {
	    nextX -= this.speed;
	}
	console.log("(" + this.x + "," + this.y + ") -> (" + nextX + "," + nextY + ")");

	var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
	console.log("tile=" + walkIntoTileIndex);
	if(walkIntoTileIndex == WORLD_GOAL) {
	    console.log(this.name + " WINS!");
	    loadLevel(levelOne);
	} else if(walkIntoTileIndex == WORLD_GROUND) {
	    this.x = nextX;
	    this.y = nextY;
	}
    }

    this.draw = function() {
	drawBitmapCentered(this.img, this.x, this.y);
    }
}

