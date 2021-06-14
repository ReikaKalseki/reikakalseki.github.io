var SCALE = 1;

function addImage(elem, img, ix, iy, iw, ih) {
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

function buildImage(elem, rows, cols, terrain, blocks, xmas, hallow) {
	var w = 128*SCALE;
	var h = 128*SCALE;
	var x = 0;
	var y = 0;
	var lasers = [];
	for (var k = 0; k < rows; k++) {
		x = 0;
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			var imgs = blocks[idx];
			addImage(elem, terrain[idx], x, y, w, h);
			if (imgs != "air") {
				//console.log("Got "+img+" @ "+i+", "+k);
				for (var n = 0; n < imgs.length; n++) {
					var img = imgs[n];
					if (img != "air") {
						img = modifyImageLocational(rows, cols, terrain, i, k, idx, img, xmas, hallow);
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

function getRandomTileAt(x, y, rows) {
	return "black"+getRandomBetween(0, 15);
}

function modifyImageLocational(rows, cols, terrain, x, y, idx, img, xmas, hallow) {
	return img;
}

function placePortalSurface(terrain, blocks, rows, cols, blue, orange) {
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

function placeTestElements(blocks, rows, cols) {
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

function generateBeam(blocks, rows, cols, x, y) {
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

function addBlock(blocks, idx, img) {
	if (blocks[idx] == "air") {
		blocks[idx] = [];
	}
	blocks[idx].push(img);
}

function setPageBackground() {
	if (isPhone)
		return;
	
	var tail = '</svg>';
	var w = 128*SCALE;
	var h = 128*SCALE;
	var x = 0;
	var y = 0;
	
	//var height = findHighestNode(0, document.documentElement.childNodes);
	var body = document.body;
    var html = document.documentElement;
	var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)-64;
	
	var titleImg = document.getElementsByClassName("title-image")[0];
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

  
  var rows = Math.ceil(rh/h);
  var cols = Math.ceil(rw/w);
	var tw = cols*w;
	var th = rows*h;
	
	console.log("Generating portal tileset with "+cols+" columns and "+rows+" rows");
	
	var xmlns = "http://www.w3.org/2000/svg";
	var elem = document.createElementNS(xmlns, "svg");
	elem.setAttributeNS(null, "width", tw);
    elem.setAttributeNS(null, "height", th);
	
	var terrain = new Array(cols*rows);
	var blocks = new Array(cols*rows);
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			var img = getRandomTileAt(i, k, rows);
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = img;
			blocks[idx] = "air";
		}
	}
	
	var blue = true;
	var orange = true;
	
	for (var i = 0; i < rows/4; i++) {
		var ret = placePortalSurface(terrain, blocks, rows, cols, blue, orange);
		blue = ret[0];
		orange = ret[1];
	}
	
	placeTestElements(blocks, rows, cols);
	
	buildImage(elem, rows, cols, terrain, blocks, xmas, hallow);
	
	var tag = "background-content";
	var container = document.getElementById(tag);
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