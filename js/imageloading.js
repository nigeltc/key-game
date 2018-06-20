var worldPics = [];
var warriorPic = document.createElement("img");
var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad -= 1;
    if (picsToLoad == 0) {
	// start game
	imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
    var imageList = [
	{varName: warriorPic, fileName: "warrior.png"},
	{worldType: WORLD_GROUND, fileName: "world_ground.png"},
	{worldType: WORLD_WALL, fileName: "world_wall.png"},
	{worldType: WORLD_GOAL, fileName: "world_goal.png"},
	{worldType: WORLD_DOOR, fileName: "world_door.png"},
	{worldType: WORLD_KEY, fileName: "world_key.png"}
    ];

    picsToLoad = imageList.length;
    for(var i=0; i<imageList.length; i++) {
	if (imageList[i].varName != undefined) {
	    beginLoadingImage(imageList[i].varName, imageList[i].fileName);
	} else {
	    loadImageForWorldCode(imageList[i].worldType, imageList[i].fileName);
	}
    }
}
