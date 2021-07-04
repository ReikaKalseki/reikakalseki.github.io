let root: { [key: string]: string } = {};
export const date = new Date(); //new Date("December 16, 2016 11:13:00");//
export const time = date.getSeconds();
export const month = date.getMonth();
export const day = date.getDate();
export const xmas = month == 11 || (month == 0 && day <= 10); //between dec 1 and jan 10
export const hallow = month == 9 && day >= 10; //between oct 10 and oct 31	
export const viskey = 'visibility';
export const visval = 'visible';
export const xkey = 'x';
export const ykey = 'y';
export const hkey = 'height';
export const wkey = 'width';
let tileWidthNum = -1;
let tileHeightNum = -1;
let tileWidth:string;
let tileHeight:string;
let imagePaths: { [key: string]: string } = {};

export function absDiff(a:number, b:number) {
	return Math.abs(Math.abs(a) - Math.abs(b))
}

export function getImageRoot(folderName:string) {
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

export function getRandomBetween(min:number, max:number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDecimalBetween(min:number, max:number) {
	return Math.random() * (max - min) + min;
}

export function getOrCreateImgPath(img:string, folder:string) {
	if (imagePaths[img] == null) {
		imagePaths[img] = getImageRoot(folder)+img+".png";
		//console.log("Computed image path '"+imagePaths[img]+"' for image '"+img+"'");
	}
	return imagePaths[img];
}

export function getTileWidth(iw:number) {
	if (tileWidthNum != iw) {
		tileWidthNum = iw;
		tileWidth = tileWidthNum.toString();
	}
	return tileWidth;
}

export function getTileHeight(ih:number) {
	if (tileHeightNum != ih) {
		tileHeightNum = ih;
		tileHeight = tileHeightNum.toString();
	}
	return tileHeight;
}

export function getArrayIndex(cols:number, x:number, y:number) {
	return x+y*cols;
}