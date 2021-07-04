const SCALE = 1;
const STARFIELD_SIZE = 2000;

import { xmas, hallow, viskey, visval, xkey, ykey, hkey, wkey, getRandomBetween, getRandomDecimalBetween, getOrCreateImgPath, getTileWidth, getTileHeight, getArrayIndex} from '../library'
import { isPhone} from '../browser'

interface machine {
	x: number;
	y: number;
	index: number;
	image:string;
	cargo:boolean;
	sides:string[];
  }

  interface point {
	x: number;
	y: number;
  }


function addImage(elem:HTMLElement, img:string, ix:number, iy:number, iw:number, ih:number) {
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, getTileWidth(iw));
	svgimg.setAttributeNS(null, hkey, getTileHeight(ih));
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "se"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	elem.appendChild(svgimg);
}

function buildImage(elem:HTMLElement, rows:number, cols:number, front:string[], back:string[], imgw:number, imgh:number) {
	var w = 64*SCALE;
	var h = 64*SCALE;
	var x = 0;
	var y = 0;
	
	if (xmas) {
		var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		svgimg.setAttributeNS(null, wkey, "320");
		svgimg.setAttributeNS(null, hkey, "320");
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath("xmas", "se"));
		svgimg.setAttributeNS(null, xkey, getRandomBetween(32, imgw-350).toString());
		svgimg.setAttributeNS(null, ykey, getRandomBetween(32, imgw-350).toString());
		svgimg.setAttributeNS(null, viskey, visval);
		elem.appendChild(svgimg);
	}
	
	if (hallow) {
		var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		svgimg.setAttributeNS(null, wkey, "320");
		svgimg.setAttributeNS(null, hkey, "320");
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath("hallow", "se"));
		svgimg.setAttributeNS(null, xkey, getRandomBetween(32, imgw-350).toString());
		svgimg.setAttributeNS(null, ykey, getRandomBetween(32, imgw-350).toString());
		svgimg.setAttributeNS(null, viskey, visval);
		elem.appendChild(svgimg);
	}
	
	for (var k = 0; k < rows; k++) {
		x = 0;
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			var img = front[idx];
			if (isTransparent(img) && back[idx] != "sky") {
				var bimg = modifyImageLocational(rows, cols, i, k, idx, back[idx]);
				addImage(elem, bimg, x, y, w, h);
			}
			if (img != "air") {
				//console.log("Got "+img+" @ "+i+", "+k);
				if (back[idx] != "sky")
					addImage(elem, "inner", x, y, w, h);
				if (img != "inner") {
					img = modifyImageLocational(rows, cols, i, k, idx, img);
					addImage(elem, img, x, y, w, h);
				}
			}
			x += w;
		}
		y += h;
	}
}

function isTransparent(img:string) {
	switch(img) {
		case "air":
		case "gravgen":
		case "conv_v":
		case "conv_h":
		case "convcorner-dl":
		case "convcorner-ul":
		case "convcorner-dr":
		case "convcorner-ur":
		case "prog":
		case "inner":
			return true;
		default:
			return false;
	}
}

function modifyImageLocational(rows:number, cols:number, x:number, y:number, idx:number, img:string) {	
	if (img == "armor") {
		if (xmas) {
			var v = Math.cos(x*0.25)+Math.cos(x*0.75)*0.43-Math.sin(y*0.47)*0.72;
			img = v > 0 ? "armor_green" : "armor_red";
		}
		if (hallow) {
			var v = Math.cos(x*0.25)+Math.cos(x*0.75)*0.43-Math.sin(y*0.47)*0.72;
			img = v > 0 ? "armor_black" : "armor_orange";
		}
	}
	return img;
}

function getRandomFunctionalBlock(i:number, k:number, idx:number) {
	var f = Math.random()*1.5;
	var entry = null;
	if (f < 0.05) {
		entry = {image:"gravgen", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.15) {
		entry = {image:"assembler_b", cargo:true, x:i, y:k, index:idx, sides:["l", "r", "d"]};
	}
	else if (f < 0.25) {
		entry = {image:"timer", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.4) {
		entry = {image:"battery", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.5) {
		entry = {image:"prog", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.75) {
		entry = {image:"catwalk", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.8) {
		entry = {image:"door", cargo:false, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	else if (f < 0.9) {
		entry = {image:"cent", cargo:true, x:i, y:k, index:idx, sides:["u", "d"]};
	}
	else if (f < 1.1) {
		entry = {image:"blast_b", cargo:true, x:i, y:k, index:idx, sides:["d"]};
	}
	else if (f < 1.3) {
		entry = {image:"stone_br", cargo:true, x:i, y:k, index:idx, sides:["d", "r"]};
	}
	else {
		entry = {image:"cargo", cargo:true, x:i, y:k, index:idx, sides:["l", "r", "u", "d"]};
	}
	return entry;
}

function placeRoom(x:number, y:number, rows:number, cols:number, front:string[], back:string[], points:machine[]) {
	var w = getRandomBetween(2, 4);
	var h = getRandomBetween(4, 5);
	for (var k = 0; k < h; k++) {
		for (var i = -w; i <= w; i++) {
			var idx = getArrayIndex(cols, x+i, y+k);
			var edge = (Math.abs(i) == w || k == 0 || k == h-1);// && (k != h-2 || back[idx] != "interiorwall");
			front[idx] = edge ? "interiorwall" : "inner";
			back[idx] = "interiorwall";
		}
	}
	var n = getRandomBetween(2, w*2-1);
	for (var i = 0; i < n; i++) {
		var px = getRandomBetween(x-w, x+w);
		var idx = getArrayIndex(cols, px, y+h-2);
		if (front[idx] != "inner" && front[idx] != "interiorwall" && front[idx] != "air")
			continue;
		var entry = getRandomFunctionalBlock(px, y+h-2, idx);
		front[idx] = entry.image;
		if (front[idx] == "assembler_b") {
			front[getArrayIndex(cols, px, y+h-3)] = "assembler_t";
		}
		if (front[idx] == "blast_b") {
			front[getArrayIndex(cols, px, y+h-3)] = "blast_t";
		}
			
		if (front[idx] == "stone_br") {
			front[getArrayIndex(cols, px, y+h-3)] = "stone_tr";
			front[getArrayIndex(cols, px-1, y+h-3)] = "stone_tl";
			front[getArrayIndex(cols, px-1, y+h-2)] = "stone_bl";
		}
			
		if (entry.cargo)
			points.push(entry);
	}
}

function putConveyorAt(rows:number, cols:number, front:string[], back:string[], idx:number, type:string) {
	if (back[idx] == "armor" || back[idx] == "interiorwall" || back[idx] == "sky" || back[idx] == "cargo") {
		if (back[idx] == "cargo" || front[idx] == "cargo" || front[idx].startsWith("conv"))
			type = "cargo";
		front[idx] = (back[idx] == "armor") ? "cargo" : type;
	}
}

function tryConnectConveyor(rows:number, cols:number, front:string[], back:string[], p1:point, p2:point) {
	//console.log("Connecting "+p1.x+","+p1.y+" -> "+p2.x+","+p2.y);
	for (var i = Math.min(p1.x, p2.x)+1; i < Math.max(p1.x, p2.x); i++) {
		putConveyorAt(rows, cols, front, back, getArrayIndex(cols, i, p1.y), "conv_h");
	}
	for (var i = Math.min(p1.y, p2.y)+1; i < Math.max(p1.y, p2.y); i++) {
		putConveyorAt(rows, cols, front, back, getArrayIndex(cols, p2.x, i), "conv_v");
	}
	var corner = "convcorner";
	if (p2.y < p1.y) {
		if (p2.x < p1.x) {
			corner = "convcorner-ur";
		}
		else {
			corner = "convcorner-ul";
		}
	}
	else {
		if (p2.x < p1.x) {
			corner = "convcorner-dr";
		}
		else {
			corner = "convcorner-dl";
		}
	}
	putConveyorAt(rows, cols, front, back, getArrayIndex(cols, p2.x, p1.y), corner);
}

function makeConveyors(rows:number, cols:number, front:string[], back:string[], points:machine[]) {
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			if (Math.random() < 0.2) {
				var idx = getArrayIndex(cols, i, k);
				if (back[idx] == "interiorwall" && front[idx] == "inner") {
					var idxd = getArrayIndex(cols, i, k+1);
					if (front[idxd] == "interiorwall") {
						back[idx] = "cargo";
						//var entry = {x:i, y:k, index:getArrayIndex(cols, i, k), sides:["l", "r", "u", "d"]};
						//points.push(entry);
					}
				}
			}
		}
	}
	if (points.length >= 2) {
		for (var i = 0; i < Math.max(1, points.length/3); i++) {
			var p1 = points[getRandomBetween(0, points.length-1)]
			var p2 = points[getRandomBetween(0, points.length-1)]
			tryConnectConveyor(rows, cols, front, back, p1, p2);
		}
	}
	//for (var i = 0; k < points.length; i++) {
	//	var entry = points[i];
	//}
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
	/*
			if (front[idx] == "conv_h" || front[idx] == "conv_v" || front[idx].startsWith("convcorner")) {
				var c = 0;
				if (front[getArrayIndex(cols, i+1, k)] == "conv_h" || front[getArrayIndex(cols, i+1, k)] == "assembler_b")
					c++;
				if (front[getArrayIndex(cols, i-1, k)] == "conv_h" || front[getArrayIndex(cols, i-1, k)] == "assembler_b")
					c++;
				if (front[getArrayIndex(cols, i, k-1)] == "conv_v" || front[getArrayIndex(cols, i, k-1)] == "assembler_b")
					c++;
				if (front[getArrayIndex(cols, i, k+1)] == "conv_v" || front[getArrayIndex(cols, i, k+1)] == "assembler_t")
					c++;
				if (c >= 3) {
					front[idx] = "cargo";
				}
			}
			else 
	*/		if (front[idx] == "assembler_b") {
				front[getArrayIndex(cols, i, k-1)] = "assembler_t";
			}
			else if (front[idx] == "assembler_t") {
				front[getArrayIndex(cols, i, k+1)] = "assembler_b";
			}
			
			if (front[idx] == "blast_b") {
				front[getArrayIndex(cols, i, k-1)] = "blast_t";
			}
			else if (front[idx] == "blast_t") {
				front[getArrayIndex(cols, i, k+1)] = "blast_b";
			}
			
			if (front[idx] == "stone_br") {
				front[getArrayIndex(cols, i, k-1)] = "stone_tr";
				front[getArrayIndex(cols, i-1, k-1)] = "stone_tl";
				front[getArrayIndex(cols, i-1, k)] = "stone_bl";
			}
		}
	}
}

function makeHalls(rows:number, cols:number, front:string[], back:string[]) {
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			if (front[idx] == "interiorwall") {
				var idxl = getArrayIndex(cols, i-1, k);
				var idxr = getArrayIndex(cols, i+1, k);
				var idxu = getArrayIndex(cols, i, k-1);
				var idxd = getArrayIndex(cols, i, k+1);
				if (front[idxu] == "interiorwall" && front[idxd] == "interiorwall" && front[idxl] == "inner" && back[idxr] == "inner") {
					var idxld = getArrayIndex(cols, i-1, k+1);
					var idxrd = getArrayIndex(cols, i+1, k+1);
					if (front[idxld] == "interiorwall" && front[idxrd] == "interiorwall") {
						front[idx] = "inner";
					}
				}
			}
		}
	}
}

function wrapInArmor(rows:number, cols:number, front:string[], back:string[]) {
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			if (back[idx] == "sky") {
				var idxl = getArrayIndex(cols, i-1, k);
				var idxr = getArrayIndex(cols, i+1, k);
				var idxu = getArrayIndex(cols, i, k-1);
				var idxd = getArrayIndex(cols, i, k+1);
				if (back[idxu] == "interiorwall" || back[idxd] == "interiorwall" || back[idxl] == "interiorwall" || back[idxr] == "interiorwall") {
					back[idx] = "armor";
				}
			}
		}
	}
}

function setPageBackground() {
	if (isPhone)
		return;
	
		let tail = '</svg>';
	let w = 64*SCALE;
	let h = 64*SCALE;
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
  
	let rh = Math.max(height, window.innerHeight, document.body.clientHeight);
	let rw = Math.max(window.innerWidth, document.body.clientWidth);

//console.log(rw+" x "+rh);

  
let rows = Math.ceil(rh/h);
let cols = Math.ceil(rw/w);
let tw = cols*w;
	let th = rows*h;
	
	console.log("Generating SE tileset with "+cols+" columns and "+rows+" rows");
	
	let xmlns = "http://www.w3.org/2000/svg";
	let elem = document.createElementNS(xmlns, "svg") as HTMLElement;
	elem.setAttributeNS(null, "width", tw.toString());
    elem.setAttributeNS(null, "height", th.toString());
	
	for (var i = 0; i < rw; i += STARFIELD_SIZE) {
		for (var k = 0; k < rh; k += STARFIELD_SIZE) {
			addImage(elem, "starfield", i, k, STARFIELD_SIZE, STARFIELD_SIZE);
		}
	}
		
	let back = new Array(cols*rows);
	let front = new Array(cols*rows);
	
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			back[idx] = "sky";
			front[idx] = "air";
		}
	}
	
	let points:machine[] = [];
	
	for (var k = 0; k < rows*0.75; k++) {
		placeRoom(getRandomBetween(4, cols-4), getRandomBetween(2, rows-2), rows, cols, front, back, points);
	}
	
	makeHalls(rows, cols, front, back);
	wrapInArmor(rows, cols, front, back);
	makeConveyors(rows, cols, front, back, points);
	
	buildImage(elem, rows, cols,  front, back, rw, rh);
	
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

window.addEventListener("load", function(event) {setPageBackground()});