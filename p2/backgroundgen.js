const SCALE = 1;

import { xmas, hallow, viskey, visval, xkey, ykey, hkey, wkey, getRandomBetween, getRandomDecimalBetween, getOrCreateImgPath, getTileWidth, getTileHeight, getArrayIndex} from '../library'
import { isPhone} from '../browser'

function addImage(elem:HTMLElement, img:string, ix:number, iy:number, iw:number, ih:number) {
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, getTileWidth(iw));
	svgimg.setAttributeNS(null, hkey, getTileHeight(ih));
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "portal/tiles"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	if (img.startsWith("lightbridge") || img == "laser_snow")
		svgimg.setAttributeNS(null, "style", "mix-blend-mode: screen;");
	elem.appendChild(svgimg);
}

function buildImage(elem:HTMLElement, rows:number, cols:number, terrain:string[], blocks:string[][]) {
	var w = 128*SCALE;
	var h = 128*SCALE;
	var x = 0;
	var y = 0;
	var lasers = [];
	for (var k = 0; k < rows; k++) {
		x = 0;
		for (var i = 0; i < cols; i++) {
			let idx = getArrayIndex(cols, i, k);
			let imgs = blocks[idx];
			addImage(elem, terrain[idx], x, y, w, h);
			if (imgs.length != 1 || imgs[0] != "air") {
				//console.log("Got "+img+" @ "+i+", "+k);
				for (var n = 0; n < imgs.length; n++) {
					var img = imgs[n];
					if (img != "air") {
						img = modifyImageLocational(rows, cols, terrain, i, k, idx, img);
						addImage(elem, img, x, y, w, h);
						if (xmas && img.startsWith("laser")) {
							lasers.push({x:x, y:y});
						}
					}
				}
			}
			x += w;
		}
		y += h;
	}
	for (var i = 0; i < lasers.length; i++) {
		var tile = lasers[i];
		var flakes = getRandomBetween(4, 9);
		for (var m = 0; m < flakes; m++) {
			addImage(elem, "laser_snow", getRandomBetween(tile.x-36, tile.x+w-12), getRandomBetween(tile.y-36, tile.y+h-12), 48*SCALE, 48*SCALE);
		}
	}
}

function getRandomTileAt(x:number, y:number, rows:number) {
	return "black"+getRandomBetween(0, 15);
}

function modifyImageLocational(rows:number, cols:number, terrain:string[], x:number, y:number, idx:number, img:string) {
	return img;
}

function placePortalSurface(terrain:string[], blocks:string[][], rows:number, cols:number, blue:boolean, orange:boolean) {
	var w = getRandomBetween(1, 6);
	var h = getRandomBetween(1, 3);
	var x = getRandomBetween(0, cols-1);
	var y = getRandomBetween(0, rows-1);
	var x2 = Math.min(x+w, cols);
	var y2 = Math.min(y+h, rows);
	for (var i = x; i < x2; i++) {
		for (var k = y; k < y2; k++) {
			var tex = "white"+getRandomBetween(0, 3);
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = tex;
			if (blue && Math.random() < 0.1) {
				addBlock(blocks, idx, "portal_b");
				blue = false;
			}
			else if (orange && Math.random() < 0.1) {
				addBlock(blocks, idx, "portal_o");
				orange = false;
			}
		}
	}
	return [blue, orange];
}

function placeTestElements(blocks:string[][], rows:number, cols:number) {
	for (var i = 1; i < rows-1; i++) {
		if (Math.random() < 0.1) {
			generateBeam(blocks, rows, cols, 0, i);
		}
	}
	for (var i = 1; i < cols-1; i++) {
		if (Math.random() < 0.1) {
			generateBeam(blocks, rows, cols, i, 0);
		}
	}
}

function generateBeam(blocks:string[][], rows:number, cols:number, x:number, y:number) {
	var type = Math.random() < 0.5 ? (Math.random() < 0.5 ? "lightbridge" : "laser") : (xmas ? "funnel_xmas" : (Math.random() < 0.35 ? "funnel_o" : "funnel"));
	var dx = (x == 0 ? 1 : 0);
	var dy = 1-dx;
	type = type+(dx == 0 ? "_v" : "_h");
	while (x < cols && y < rows) {
		addBlock(blocks, getArrayIndex(cols, x, y), type);
		x += dx;
		y += dy;
	}
}

function addBlock(blocks:string[][], idx:number, img:string) {
	if (blocks[idx].length == 1 && blocks[idx][0] == "air") {
		blocks[idx] = [];
	}
	blocks[idx].push(img);
}

function setPageBackground() {
	if (isPhone)
		return;
	
	let tail = '</svg>';
	let w = 128*SCALE;
	let h = 128*SCALE;
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
	
	console.log("Generating portal tileset with "+cols+" columns and "+rows+" rows");
	
	let xmlns = "http://www.w3.org/2000/svg";
	let elem = document.createElementNS(xmlns, "svg") as HTMLElement;
	elem.setAttributeNS(null, "width", tw.toString());
    elem.setAttributeNS(null, "height", th.toString());
	
	let terrain:string[] = new Array(cols*rows);
	let blocks:string[][] = new Array(cols*rows);
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			var img = getRandomTileAt(i, k, rows);
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = img;
			blocks[idx] = ["air"];
		}
	}
	
	let blue = true;
	let orange = true;
	
	for (var i = 0; i < rows/4; i++) {
		var ret = placePortalSurface(terrain, blocks, rows, cols, blue, orange);
		blue = ret[0];
		orange = ret[1];
	}
	
	placeTestElements(blocks, rows, cols);
	
	buildImage(elem, rows, cols, terrain, blocks);
	
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