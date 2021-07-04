//import * as browser from '../browser.js'
//import * as library from '../library.js'

import { xmas, hallow, viskey, visval, xkey, ykey, hkey, wkey, getRandomBetween, getRandomDecimalBetween, getOrCreateImgPath, getTileWidth, getTileHeight, getArrayIndex} from '../library'
import { isPhone} from '../browser'

const SCALE = 1;

function addImage(elem:HTMLElement, img:string, ix:number, iy:number, iw:number, ih:number) {
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	if (img.startsWith("snowtree")) {
		iw = iw*1.5;
		ih = ih*1.5;
	}
	if (img.startsWith("geothermal")) {
		iw = iw*2;
		ih = ih*2;
		ix = Math.max(0, ix-1);
		iy = Math.max(0, iy-1);
		//console.log("Geo @ "+ix+", "+iy);
	}
	let svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, getTileWidth(iw));
	svgimg.setAttributeNS(null, hkey, getTileHeight(ih));
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "factiles"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	if (img == "domeglow")
		svgimg.setAttributeNS(null, "style", "mix-blend-mode: screen;");
	elem.appendChild(svgimg);
}

function buildImage(elem:HTMLElement, rows:number, cols:number, ground:string[], ore:string[], blocks:string[]) {
	var w = 32*SCALE;
	var h = 32*SCALE;
	var x = 0;
	var y = 0;
	for (var k = 0; k < rows; k++) {
		x = 0;
		for (var i = 0; i < cols; i++) {			
			var idx = getArrayIndex(cols, i, k);
			if (k < rows/2 && i < cols/2) {
				var gnd = ground[getArrayIndex(cols/2, i, k)];
				gnd = modifyImageLocational(ground, rows/2, cols/2, i, k, idx, gnd);
				addImage(elem, gnd, x*2, y*2, w*2, h*2);
			}
			var img = ore[idx];
			//console.log("Got "+img+" @ "+i+", "+k);
			img = modifyImageLocational(ore, rows, cols, i, k, idx, img);
			if (img != "air")
				addImage(elem, img, x, y, w, h);
			
			img = blocks[idx];
			//console.log("Got "+img+" @ "+i+", "+k);
			img = modifyImageLocational(blocks, rows, cols, i, k, idx, img);
			if (img != "air") {
				addImage(elem, img, x, y, w, h);
			}
			x += w;
		}
		y += h;
	}
}

function isTransparent(img:string) {
	switch(img) {
		case "air":
			return true;
		default:
			return false;
	}
}

function tryCorrectBeltJunctions(blocks:string[], rows:number, cols:number, x:number, y:number, idx:number, img:string) {
	var idxl = getArrayIndex(cols, x-1, y);
	var idxr = getArrayIndex(cols, x+1, y);
	var idxu = getArrayIndex(cols, x, y-1);
	var idxd = getArrayIndex(cols, x, y+1);
	if (blocks[idxl] == blocks[idxr] && (blocks[idxl] == "belt-left" || blocks[idxl] == "belt-right")) {
		return blocks[idxl];
	}
	if ((blocks[idxl] == "belt-dr" || blocks[idxl] == "belt-ur") && blocks[idxr] == "belt-right") {
		return "belt-right";
	}
	if ((blocks[idxr] == "belt-dl" || blocks[idxr] == "belt-ul") && blocks[idxl] == "belt-left") {
		return "belt-left";
	}
	if ((blocks[idxl] == "belt-dr" || blocks[idxl] == "belt-ur" || blocks[idxl] == "belt-right") && (blocks[idxr] == "belt-left" || blocks[idxr] == "belt-dl" || blocks[idxr] == "belt-ul")) {
		//console.log("Belt @ "+x+", "+y+" has left with right exit and vice versa.");
		return img == "belt-down" || img == "belt-ld" || img == "belt-rd" ? "belt-down" : "belt-up";
	}
	if (blocks[idxu] == blocks[idxd] && (blocks[idxd] == "belt-up" || blocks[idxd] == "belt-down")) {
		return blocks[idxd];
	}
	if ((blocks[idxd] == "belt-lu" || blocks[idxd] == "belt-ru") && blocks[idxu] == "belt-up") {
		return "belt-up";
	}
	if ((blocks[idxu] == "belt-ld" || blocks[idxu] == "belt-rd") && blocks[idxd] == "belt-down") {
		return "belt-down";
	}
	if ((blocks[idxu] == "belt-down" || blocks[idxu] == "belt-rd" || blocks[idxu] == "belt-ld") && (blocks[idxd] == "belt-up" || blocks[idxd] == "belt-ru" || blocks[idxd] == "belt-lu")) {
		//console.log("Belt @ "+x+", "+y+" has up with down exit and vice versa.");
		return img == "belt-right" || img == "belt-dr" || img == "belt-ur" ? "belt-right" : "belt-left";
	}
	return img;
}

function modifyImageLocational(blocks:string[], rows:number, cols:number, x:number, y:number, idx:number, img:string) {
	if (img.startsWith("belt") && img.length == 7) { //corner
		img = tryCorrectBeltJunctions(blocks, rows, cols, x, y, idx, img);
	}
	else if (img == "blocker") {
		return "air";
	}
	return img;
}
/*
function getGroundAt(rows, cols, x, y) {
	return "grass"+getRandomBetween(0, 15);
}*/

function genBelt(rows:number, cols:number, blocks:string[]) {
	var side1 = getRandomBetween(0, 3);/*
	//var side2 = getRandomBetween(0, 3);
	var y1 = side1 == 0 || side1 == 2 ? (Math.random() < 0.5 ? 0 : rows) : getRandomBetween(0, rows);
	var x1 = side1 == 1 || side1 == 3 ? (Math.random() < 0.5 ? 0 : cols) : getRandomBetween(0, cols);
	//var y2 = side2 == 0 || side2 == 2 ? 0 : getRandomBetween(0, rows);
	//var x2 = side2 == 1 || side2 == 3 ? 0 : getRandomBetween(0, cols);
	var dx = side1 == 1 || side1 == 3 ? 0 : (side1 == );*/
	
	var x1 = 0;
	var y1 = 0;
	var dx = 0;
	var dy = 0;
	var dir = "";
	switch(side1) {
		case 0:
			x1 = getRandomBetween(0, cols-1);
			y1 = rows-1;
			dy = -1;
			dir = "up";
		break;
		case 1:
			x1 = 0;
			y1 = getRandomBetween(0, rows-1);
			dx = 1;
			dir = "right";
		break;
		case 2:
			x1 = getRandomBetween(0, cols-1);
			y1 = 0;
			dy = 1;
			dir = "down";
		break;
		case 3:
			x1 = cols-1;
			y1 = getRandomBetween(0, rows-1);
			dx = -1;
			dir = "left";
		break;
	}
	
	var flag = true;
	var x = x1;
	var y = y1;
	var turns = 0;
	while (flag) {
		var dprev = dir;
		var dirp = dir;
		var idx = getArrayIndex(cols, x, y);
		if (blocks[idx] != "air")
			break;
		var randd = Math.random();
		var ch = Math.min(0.35, turns*0.066);
		var wall = !canBeltMoveFrom(blocks, cols, rows, x, y, dx, dy);
		if (randd < ch || wall) {
			turns = 0;
			
			var v1 = randd < (wall ? 0.5 : 0.15);
			var down = dy != -1 && canBeltMoveFrom(blocks, cols, rows, x, y, 0, 1)
			var up = dy != 1 && canBeltMoveFrom(blocks, cols, rows, x, y, 0, -1)
			var left = dx != 1 && canBeltMoveFrom(blocks, cols, rows, x, y, -1, 0)
			var right = dx != -1 && canBeltMoveFrom(blocks, cols, rows, x, y, 1, 0)
			
			var list = [];
			if (down)
				list.push("down");
			if (up)
				list.push("up");
			if (left)
				list.push("left");
			if (right)
				list.push("right");
			
			if (list.length > 1)
				list = list.filter(item => item != dprev)
			
			if (list.length > 0) {
				var newdir = list[Math.floor(Math.random()*list.length)];
				switch(newdir) {
					case "left":
						dx = -1;
						dir = "left";
						dirp = dy == 1 ? "dl" : "ul";
						dy = 0;
					break;
					case "right":
						dx = 1;
						dir = "right";
						dirp = dy == 1 ? "dr" : "ur";
						dy = 0;
					break;
					case "up":
						dy = -1;
						dir = "up";
						dirp = dx == 1 ? "ru" : "lu";
						dx = 0;
					break;
					case "down":
						dy = 1;
						dir = "down";
						dirp = dx == 1 ? "rd" : "ld";
						dx = 0;
					break;
				}
			}
			else {
				dx = 0;
				dy = 0;
			}
		}
		else {
			turns++;
		}
		var flag2 = dx == 0 && dy == 0;
		if (flag2) {
			//console.log("Belt from "+dprev+" @ "+x+", "+y+" had nowhere to go");
			//dirp = dir;
		}
		blocks[idx] = "belt-"+dirp;
		x += dx;
		y += dy;
		flag = x >= 0 && x < cols && y >= 0 && y < rows && !flag2;
	}
}

function canBeltMoveFrom(blocks:string[], cols:number, rows:number, x:number, y:number, dx:number, dy:number) {
	var x2 = x+dx;
	var y2 = y+dy;
	var idx = getArrayIndex(cols, x2, y2);
	return x2 < 0 || x2 >= cols || y2 < 0 || y2 >= rows || blocks[idx] == "air" || (blocks[idx].startsWith("belt") && Math.random() < 0.5);
}

function generateDecorations(rows:number, cols:number, ground:string[], blocks:string[], tw:number, th:number, w:number, h:number) {
	var list = [];
	for (var n = 0; n < Math.floor(rows/4); n++) {
		//var posX = getRandomBetween(6, cols-6);
		//var posY = getRandomBetween(6, rows-6);
		var type = "rock"+getRandomBetween(1, 4);
		var sz = type == "rock1" ? 128 : 64;
		var posX = getRandomBetween(sz/2, tw-sz/2);
		var posY = getRandomBetween(sz/2, th-sz/2);
		var minX = Math.floor(posX/w);
		var minY = Math.floor(posY/h);
		var maxX = Math.ceil((posX+sz/2)/w);
		var maxY = Math.ceil((posY+sz/2)/h);
		var canPlace = true;
		for (var i = minX; i <= maxX && canPlace; i++) {
			for (var k = minY; k <= maxY && canPlace; k++) {
				var idx = getArrayIndex(cols, i, k);
				if (blocks[idx] != "air") {
					canPlace = false;
				}
			}
		}
		if (canPlace) {
			for (var i = minX; i <= maxX; i++) {
				for (var k = minY; k <= maxY; k++) {
					var idx = getArrayIndex(cols, i, k);
					blocks[idx] = "blocker";
				}
			}
			var entry = {image:type, x:posX, y:posY, size:sz};
			//console.log("Placing "+entry.image+" @ "+entry.x+", "+entry.y);
			list.push(entry);
		}
	}
	
	for (var n = 0; n < Math.max(5, Math.floor(rows/15)); n++) {
		var rootX = getRandomBetween(256, tw-256);
		var rootY = getRandomBetween(256, th-256);
		for (var n2 = 0; n2 < 3; n2++) {
			var building = getRandomBuilding();
			var sz = (building == "turret" || building == "plasma") ? 64 : 128;
			var posX = getRandomBetween(rootX-sz, rootX+sz);
			var posY = getRandomBetween(rootY-sz, rootY+sz);
			var minX = Math.floor(posX/w);
			var minY = Math.floor(posY/h);
			var maxX = Math.ceil((posX+sz/2)/w);
			var maxY = Math.ceil((posY+sz/2)/h);
			var canPlace = true;
			for (var i = minX; i <= maxX && canPlace; i++) {
				for (var k = minY; k <= maxY && canPlace; k++) {
					var idx = getArrayIndex(cols, i, k);
					if (blocks[idx] != "air") {
						canPlace = false;
					}
				}
			}
			if (canPlace) {
				for (var i = minX; i <= maxX; i++) {
					for (var k = minY; k <= maxY; k++) {
						var idx = getArrayIndex(cols, i, k);
						blocks[idx] = "blocker";
					}
				}
				var entry = {image:building, x:posX, y:posY, size:sz};
				//console.log("Placing "+entry.image+" @ "+entry.x+", "+entry.y);
				list.push(entry);
			}
		}
	}
	
	for (var n = 0; n < Math.floor(rows/16); n++) {
		var sz = 192;
		var posX = getRandomBetween(sz/2, tw-sz/2);
		var posY = getRandomBetween(sz/2, th-sz/2);
		var minX = Math.floor(posX/w);
		var minY = Math.floor(posY/h);
		var maxX = Math.ceil((posX+sz/2)/w);
		var maxY = Math.ceil((posY+sz/2)/h);
		var canPlace = true;
		for (var i = minX; i <= maxX && canPlace; i++) {
			for (var k = minY; k <= maxY && canPlace; k++) {
				var idx = getArrayIndex(cols, i, k);
				if (blocks[idx] != "air") {
					canPlace = false;
				}
			}
		}
		if (canPlace) {
			for (var i = minX; i <= maxX; i++) {
				for (var k = minY; k <= maxY; k++) {
					var idx = getArrayIndex(cols, i, k);
					blocks[idx] = "blocker";
				}
			}
			var entry = {image:"spawner", x:posX, y:posY, size:sz};
			//console.log("Placing "+entry.image+" @ "+entry.x+", "+entry.y);
			list.push(entry);
			
			for (var n2 = 0; n2 < 3; n2++) {
				//posX = getRandomBetween(entry.x-sz, entry.x+sz);
				//posY = getRandomBetween(entry.y-sz, entry.y+sz);
				var ang = getRandomBetween(0, 360)*Math.PI/180;
				var dr = getRandomDecimalBetween(sz/3, sz);
				posX = entry.x+sz/2+Math.cos(ang)*dr;
				posY = entry.y+sz/2+Math.sin(ang)*dr;
				list.push({image:"worm", x:posX, y:posY, size:96});
			}
			
			for (var n2 = 0; n2 < 9; n2++) {
				//posX = getRandomBetween(entry.x-sz, entry.x+sz);
				//posY = getRandomBetween(entry.y-sz, entry.y+sz);
				var ang = getRandomBetween(0, 360)*Math.PI/180;
				var dr = getRandomDecimalBetween(sz/3, sz);
				posX = entry.x+sz/2+Math.cos(ang)*dr;
				posY = entry.y+sz/2+Math.sin(ang)*dr;
				var mob = "biter"+getRandomBetween(1, 4);
				if (Math.random() < 0.1)
					mob = "fly";
				list.push({image:mob, x:posX, y:posY, size:64});
			}
		}
	}
	
	for (var n = 0; n < Math.floor(rows*cols/12); n++) {
		var sz = 128;
		var posX = getRandomBetween(sz/2, tw-sz/2);
		var posY = getRandomBetween(sz/2, th-sz/2);
		var blockX = Math.floor((posX+sz/2)/w);
		var blockY = Math.floor((posY+sz/2)/h);
		var idx = getArrayIndex(cols, blockX, blockY);
		var canPlace = blocks[idx] == "air";
		if (canPlace) {
			var idx2 = getArrayIndex(Math.floor(cols/2), Math.floor(blockX/2), Math.floor(blockY/2));
			//console.log("Placing "+entry.image+" @ "+entry.x+", "+entry.y+" on tile index "+idx2+" = "+gr	ound[idx2]);
			var sand = ground[idx2].startsWith("dirt") || ground[idx2].startsWith("ice");
			if (sand && xmas)
				continue;
			var entry = {image:"tree"+getRandomBetween(sand ? 1 : 3, sand ? 2 : 5), x:posX, y:posY, size:sz};
			if (xmas)
				entry.image = "snowtree"+getRandomBetween(1, 3);
			list.push(entry);
		}
	}
	
	return list;
}

function getRandomBuilding() {
	if (true) return "dome";
	var types = ["turret", "plasma", "well", "dome"];
	return types[getRandomBetween(0, types.length-1)];
}

function genDirt(rows:number, cols:number, ground:string[]) {
	var x = getRandomBetween(4, cols-4);
	var y = getRandomBetween(4, rows-4);
	
	//console.log("Genning dirt @ "+x+", "+y);
	
	var s = [2, 5];
	//s[0] = 1;
	//s[1] = 9;
	var rx = getRandomDecimalBetween(s[0], s[1]);
	var ry = getRandomDecimalBetween(s[0], s[1]);
	var mx = Math.max(0, Math.floor(x-rx));
	var my = Math.max(0, Math.floor(y-ry));
	var px = Math.min(cols-1, Math.floor(x+rx));
	var py = Math.min(rows-1, Math.floor(y+ry));
	var ms = 0.75;
	var slopeX = getRandomDecimalBetween(-ms, ms);
	var slopeY = getRandomDecimalBetween(-ms, ms);
	for (var i = mx; i <= px; i++) {
		for (var k = my; k <= py; k++) {
			var di = i-x;
			var dk = k-y;
			if (di*di+dk*dk <= rx*ry+0.5) {
				var dx = i+Math.floor(slopeX*dk);
				var dy = k+Math.floor(slopeY*di);
				var idx = getArrayIndex(cols, dx, dy);
				ground[idx] = xmas ? ("ice"+getRandomBetween(0, 15)) : ("dirt"+getRandomBetween(0, 20));
				//console.log("Placing dirt @ "+dx+", "+dy+" (idx = "+idx);
			}
		}
	}
}

function generateOre(rows:number, cols:number, ore:string[]) {
	for (var n = 0; n < rows*cols/200; n++) {
		var r = getRandomBetween(2, 9);
		var x = getRandomBetween(r+2, cols-r-2);
		var y = getRandomBetween(r+2, rows-r-2);
		var mx = Math.max(0, Math.floor(x-r));
		var my = Math.max(0, Math.floor(y-r));
		var px = Math.min(cols-1, Math.floor(x+r));
		var py = Math.min(rows-1, Math.floor(y+r));
		var maxtype = 7;
		var f = Math.random();
		var type = "coal";
		if (f < 0.1)
			type = "oil";
		else if (f < 0.4)
			type = "copper";
		else if (f < 0.7)
			type = "iron";
		if (Math.random() < 0.2)
			type = "geothermal_";
		if (type == "oil" || type == "geothermal_") {
			maxtype = type == "oil" ? 3 : 5;
			for (var m = 0; m < r*2; m++) {
				var dx = getRandomBetween(mx, px);
				var dy = getRandomBetween(my, py);
				var idx = getArrayIndex(cols, dx, dy);
				if (ore[idx] == "air") {
					ore[idx] = type+getRandomBetween(0, maxtype);
					if (type == "geothermal_") {
						if (dx > 0)
							ore[getArrayIndex(cols, dx-1, dy)] = "air";
						if (dx < cols)
							ore[getArrayIndex(cols, dx+1, dy)] = "air";
						if (dy > 0)
							ore[getArrayIndex(cols, dx, dy-1)] = "air";
						if (dy < rows)
							ore[getArrayIndex(cols, dx, dy+1)] = "air";
					}
				}
			}
		}
		else {
			for (var i = mx; i <= px; i++) {
				for (var k = my; k <= py; k++) {
					var di = i-x;
					var dk = k-y;
					if (di*di+dk*dk <= r*r+0.5) {
						var idx = getArrayIndex(cols, i, k);
						if (ore[idx] == "air")
							ore[idx] = type+getRandomBetween(0, maxtype);
					}
				}
			}
		}
	}
}

export default function setPageBackground() {
	if (isPhone)
		return;
	
		let tail = '</svg>';
		let w = 32*SCALE;
		let h = 32*SCALE;
		let x = 0;
		let y = 0;
	
	//var height = findHighestNode(0, document.documentElement.childNodes);
	let body = document.body;
    let html = document.documentElement;
	let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)-64;
	
	let titleImg = document.getElementsByClassName("title-image")[0] as HTMLImageElement;
	if (titleImg == null || titleImg.src == null || titleImg.src == "" || titleImg.src == window.location.href) {
		height += 72;
	}
	else {
		height += 48;
	}
	
	//console.log("Total height is "+height+", document content is: "+document.documentElement.innerHTML);
  
	var rh = Math.max(height, window.innerHeight, document.body.clientHeight);
	var rw = Math.max(window.innerWidth, document.body.clientWidth);

//console.log(rw+" x "+rh);

  
let rows = Math.ceil(rh/h);
  let cols = Math.ceil(rw/w);
	let tw = cols*w;
	let th = rows*h;
	
	console.log("Generating Factorio tileset with "+cols+" columns and "+rows+" rows");
	
	let xmlns = "http://www.w3.org/2000/svg";
	let elem = document.createElementNS(xmlns, "svg") as HTMLElement;
	elem.setAttributeNS(null, "width", tw.toString());
    elem.setAttributeNS(null, "height", th.toString());
	
	var ground = new Array(Math.ceil(cols*rows/4));
	var ore = new Array(cols*rows);
	var blocks = new Array(cols*rows);
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			let idx = getArrayIndex(cols, i, k);
			let img = "air"
			blocks[idx] = img;
			ore[idx] = img;
			if (i < cols/2 && k < rows/2) {
				let max = xmas ? 15 : (Math.random() < 0.125 ? 15 : 3);
				ground[getArrayIndex(cols/2, i, k)] = (xmas ? "snow" : "grass")+getRandomBetween(0, max);
			}
		}
	}
	
	for (var i = 0; i < Math.floor(rows/6); i++)
		genDirt(rows/2, cols/2, ground);
	
	generateOre(rows, cols, ore);
	
	let deco = generateDecorations(rows, cols, ground, blocks, tw, th, w, h);
	
	for (var i = 0; i < Math.floor(rows/1.5); i++)
		genBelt(rows, cols, blocks);
	
	buildImage(elem, rows, cols, ground, ore, blocks);
	
	let domes = [];	
	for (var i = 0; i < deco.length; i++) {
		var dx = deco[i].x-w/2;
		var dy = deco[i].y-h/2;
		var ds = deco[i].size*SCALE;
		addImage(elem, deco[i].image, dx, dy, ds, ds);
		if (deco[i].image == "dome") {
			domes.push({image:"domeglow", x:dx-SCALE*192, y:dy-SCALE*160, size:ds*4});
		}
	}
	for (var i = 0; i < domes.length; i++) {
		addImage(elem, domes[i].image, domes[i].x, domes[i].y, domes[i].size, domes[i].size);
	}
	
	let tag = "background-content";
	let container = document.getElementById(tag);
	if (container == null) {
		container = document.createElement("div")
		container.id = tag;
		console.log("Injecting background element.");
		document.body.prepend(container);
	}
	  while (container.firstChild) {
		container.removeChild(container.firstChild);
	  }
	  //console.log(elem);
	container.appendChild(elem);
}

//window.addEventListener("load", function(event) {setPageBackground()});