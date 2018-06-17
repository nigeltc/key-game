

const worldWidth = 40;
const worldHeight = 40;
const worldGap = 2;
const worldColumns = 20;
const worldRows = 15;
//               1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
		4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
		1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
		1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
		0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
		0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4];
var worldGrid = [];
const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYER_START = 2;
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function isObstacleAtColRow(col, row) {
    if ((col >= 0) &&
	(col < worldColumns) &&
	(row >= 0) &&
	(row < worldRows)) {
	var worldIndexUnderCoord = rowColToArrayIndex(col, row);
	return worldGrid[worldIndexUnderCoord] != WORLD_ROAD;
    } else {
	return false;
    }
}

function returnTileTypeAtColRow(col, row) {
    if ((col >= 0) &&
	(col < worldColumns) &&
	(row >= 0) &&
	(row < worldRows)) {
	var worldIndexUnderCoord = rowColToArrayIndex(col, row);
	return worldGrid[worldIndexUnderCoord];
    } else {
	return WORLD_WALL;
    }
}

function drawWorlds() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var j=0; j<worldRows; j++) {
	for(var i=0; i<worldColumns; i++) {
	    var tileKindHere = worldGrid[arrayIndex];
	    var useImg = worldPics[tileKindHere];
	    canvasContext.drawImage(useImg, drawTileX, drawTileY);
	    drawTileX += worldWidth;
	    arrayIndex++;
	}
	drawTileY += worldHeight;
	drawTileX = 0;
    }
}

function rowColToArrayIndex(col, row) {
    return worldColumns * row + col;
}

function warriorWorldHandling(whichWarrior) {
    var warriorWorldCol = Math.floor(whichWarrior.x / worldWidth);
    var warriorWorldRow = Math.floor(whichWarrior.y / worldHeight);
    var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);
    if ((warriorWorldCol >= 0) &&
	(warriorWorldCol < worldColumns) &&
	(warriorWorldRow >= 0) &&
	(warriorWorldRow < worldRows)) {
	var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
	if (tileHere == WORLD_GOAL) {
	    console.log(whichWarrior.name + " WINS!");
	    loadLevel(levelOne);
	} else if (tileHere != WORLD_ROAD) {
	    // lose speed on collision with wall
	    whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
	    whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;
	    whichWarrior.speed *= -0.5;
	}
    }
}

