

const worldWidth = 50;
const worldHeight = 50;
const worldGap = 2;
const worldColumns = 16;
const worldRows = 12;
//              1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6
var levelOne =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
		 1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
		 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
		 1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
		 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
		 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
		 1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
		 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var worldGrid = [];
const WORLD_GROUND = 0;
const WORLD_WALL = 1;
const WORLD_PLAYER_START = 2;
const WORLD_GOAL = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;

function isObstacleAtColRow(col, row) {
    if ((col >= 0) &&
	(col < worldColumns) &&
	(row >= 0) &&
	(row < worldRows)) {
	var worldIndexUnderCoord = rowColToArrayIndex(col, row);
	return worldGrid[worldIndexUnderCoord] != WORLD_GROUND;
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

function tileTypeHasTransparency(tileType) {
    if ((tileType == WORLD_DOOR) ||
	(tileType == WORLD_KEY) ||
	(tileType == WORLD_GOAL)) {
	return true;
    }
    return false;
}

function drawWorlds() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var j=0; j<worldRows; j++) {
	for(var i=0; i<worldColumns; i++) {
	    var tileKindHere = worldGrid[arrayIndex];
	    var useImg = worldPics[tileKindHere];
	    if (tileTypeHasTransparency(tileKindHere)) {
		canvasContext.drawImage(worldPics[WORLD_GROUND], drawTileX, drawTileY);
	    }
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

function getTileTypeAtPixelCoord(x, y) {
    var warriorWorldCol = Math.floor(x / worldWidth);
    var warriorWorldRow = Math.floor(y / worldHeight);
    var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

    if((warriorWorldCol >= 0) &&
       (warriorWorldCol < worldColumns) &&
       (warriorWorldRow >= 0) &&
       (warriorWorldRow < worldRows)) {
	var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);
	return tileHere;
    }

    // outside the map, everything is wall
    return WORLD_WALL;
}

function getTileIndexAtPixelCoord(x, y) {
    var warriorWorldCol = Math.floor(x / worldWidth);
    var warriorWorldRow = Math.floor(y / worldHeight);
    var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

    if((warriorWorldCol >= 0) &&
       (warriorWorldCol < worldColumns) &&
       (warriorWorldRow >= 0) &&
       (warriorWorldRow < worldRows)) {
	return worldIndexUnderWarrior;
    }

    return undefined;
}
