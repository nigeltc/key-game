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
	{varName: warriorPic, fileName: "player1car.png"},
	{worldType: WORLD_ROAD, fileName: "track_road.png"},
	{worldType: WORLD_WALL, fileName: "track_wall.png"},
	{worldType: WORLD_GOAL, fileName: "track_goal.png"},
	{worldType: WORLD_TREE, fileName: "track_tree.png"},
	{worldType: WORLD_FLAG, fileName: "track_flag.png"}
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
