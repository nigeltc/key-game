
const groundSpeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.06;
const minSpeedToTurn = 0.5;

function Warrior() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.img;
    this.name = "Unknown Warrior";

    this.keyHeldGas = false;
    this.keyHeldReverse = false;
    this.keyHeldTurnLeft = false;
    this.keyHeldTurnRight = false; 
    
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
	this.speed = 0;
	for(var j=0; j<worldRows; j++) {
	    for(var i=0; i<worldColumns; i++) {
		var idx = rowColToArrayIndex(i, j);
		if ( worldGrid[idx] == WORLD_PLAYER_START ) {
		    //console.log("row=" + j + ", col=" + i);
		    worldGrid[idx] = WORLD_ROAD;
		    this.ang = - Math.PI/2;
		    this.x = (i * worldWidth) + (worldWidth / 2);
		    this.y = (j * worldHeight) + (worldHeight / 2);
		    return;
		}
	    }
	}
    }

    this.move = function() {
	this.speed *= groundSpeedDecayMult;
	
	if (this.keyHeldGas) {
	    this.speed += drivePower;
	}
	if (this.keyHeldReverse) {
	    this.speed -= reversePower;
	}
	if (Math.abs(this.speed) > minSpeedToTurn) {
	    if (this.keyHeldTurnRight ) {
		this.ang += turnRate;
	    }
	    if (this.keyHeldTurnLeft ) {
		this.ang -= turnRate;
	    }
	}
	
	this.x += Math.cos(this.ang) * this.speed;
	this.y += Math.sin(this.ang) * this.speed;

	warriorWorldHandling(this);
    }

    this.draw = function() {
	drawBitmapCenteredWithRotation(this.img, this.x, this.y, this.ang);
    }
}

