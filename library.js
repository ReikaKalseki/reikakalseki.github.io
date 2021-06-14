var root = [];
var date = new Date(); //new Date("December 16, 2016 11:13:00");//
var time = date.getSeconds();
var month = date.getMonth();
var day = date.getDate();
var xmas = month == 11 || (month == 0 && day <= 10); //between dec 1 and jan 10
var hallow = month == 9 && day >= 10; //between oct 10 and oct 31	
var viskey = 'visibility';
var visval = 'visible';
var xkey = 'x';
var ykey = 'y';
var hkey = 'height';
var wkey = 'width';
var tileWidthNum = -1;
var tileHeightNum = -1;
var tileWidth;
var tileHeight;
var imagePaths = {};

function absDiff(a, b) {
	return Math.abs(Math.abs(a) - Math.abs(b))
}

function getImageRoot(folderName) {
	if (root[folderName] == null || typeof(root[folderName]) == "undefined") {
		var ret = "images/"+folderName+"/";
		var url = window.location.href;
		//console.log(url);
		var idx = url.indexOf("sitecore");
		url = url.substring(idx+9);
		//console.log(url);
		var levels = url.split("/").length-1;
		for (var i = 0; i < levels; i++)
			ret = "../"+ret;
		root[folderName] = ret;
		//console.log("Calculated root "+root[folderName]);
	}
	return root[folderName];
}

function getRandomBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomDecimalBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function getOrCreateImgPath(img, folder) {
	if (imagePaths[img] == null) {
		imagePaths[img] = getImageRoot(folder)+img+".png";
		//console.log("Computed image path '"+imagePaths[img]+"' for image '"+img+"'");
	}
	return imagePaths[img];
}

function getTileWidth(iw) {
	if (tileWidthNum != iw) {
		tileWidthNum = iw;
		tileWidth = tileWidthNum.toString();
	}
	return tileWidth;
}

function getTileHeight(ih) {
	if (tileHeightNum != ih) {
		tileHeightNum = ih;
		tileHeight = tileHeightNum.toString();
	}
	return tileHeight;
}

function getArrayIndex(cols, x, y) {
	return x+y*cols;
}