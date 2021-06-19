var SCALE = 2;

function addImage(elem, img, ix, iy, iw, ih) {
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, getTileWidth(iw));
	svgimg.setAttributeNS(null, hkey, getTileHeight(ih));
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "mcblocks"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	elem.appendChild(svgimg);
}

function buildImage(elem, rows, cols, terrain, xmas, hallow) {
	var w = 16*SCALE;
	var h = 16*SCALE;
	var x = 0;
	var y = 0;
	for (var k = 0; k < rows; k++) {
		x = 0;
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			var img = terrain[idx];
			//console.log("Got "+img+" @ "+i+", "+k);
			img = modifyImageLocational(rows, cols, terrain, i, k, idx, img, xmas, hallow);
			if (isTransparent(img))
				addImage(elem, "cave", x, y, w, h);
			if (img != "air")
				addImage(elem, img, x, y, w, h);
			x += w;
		}
		y += h;
	}
}

function isTransparent(img) {
	switch(img) {
		case "air":
		case "mob_spawner":
		case "web":
		case "tallgrass":
		case "flower1":
		case "flower2":
		case "crystal_purple":
		case "crystal_green":
		case "crystal_white":
			return true;
		default:
			return false;
	}
}

function getRandomRawGenBlockAt(x, y, rows, skylim) {
	if (y == 0) {
		return "grass_side";
	}
	else if (y <= 4) {
		var t = Math.max(1, 3+Math.sin(time+x*0.873)+Math.cos(time*1.8734+x*0.7624));
		if (y <= t)
			return "dirt";
	}
	else if (y > rows-4-skylim) {
		var layer = rows-y-skylim;	
		if (layer <= Math.random()*5) {
			return "bedrock";
		}
	}
	return "stone";
}

function isWaterReplaceable(block) {
	return block == "air" || block == "cave" || block == "water" || block == "web";
}

function createWaterSource(rows, cols, terrain, idx, x, y, canSpread) {
	terrain[idx] = "water";
	var idx2 = getArrayIndex(cols, x, y+1);
	if (terrain[idx2] == "lava") {
		terrain[idx2] = "obsidian";
	}
	
	if (isWaterReplaceable(terrain[idx2])) {
		createWaterSource(rows, cols, terrain, idx2, x, y+1, true);
	}
	else if (canSpread) {
		var flow = 2;
		for (var i = 0; i <= flow; i++) {
			var idx3 = getArrayIndex(cols, x+i, y);
			//console.log("Spreading right into "+terrain[idx3]);
			if (isWaterReplaceable(terrain[idx3])) {
				createWaterSource(rows, cols, terrain, idx3, x+i, y, false);
				if (isWaterReplaceable(terrain[idx3+cols])) {
					break;
				}
			}
			else {
				break;
			}
		}
		for (var i = 0; i <= flow; i++) {
			var idx3 = getArrayIndex(cols, x-i, y);
			//console.log("Spreading left into "+terrain[idx3]);
			if (isWaterReplaceable(terrain[idx3])) {
				createWaterSource(rows, cols, terrain, idx3, x-i, y, false);
				if (isWaterReplaceable(terrain[idx3+cols])) {
					break;
				}
			}
			else {
				break;
			}
		}
	}
}

function applyLiquids(rows, cols, terrain) {
	var lavalevel = Math.floor(rows*0.8)-1;
	for (var k = lavalevel; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			if (terrain[idx] == "cave")
				terrain[idx] = "lava";
		}
	}
	for (var k = 0; k <= lavalevel+1; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			if (isWaterReplaceable(terrain[idx]) && Math.random() < 0.02) {
				createWaterSource(rows, cols, terrain, idx, i, k, true);
				//return;
			}
		}
	}
}

function cleanFloatingBlocks(rows, cols, terrain) {
	for (var k = 0; k < rows; k++) {
		for (var i = 0; i < cols; i++) {
			var idx = getArrayIndex(cols, i, k);
			var idxu = getArrayIndex(cols, i, k-1);
			var idxd = getArrayIndex(cols, i, k+1);
			var idxl = getArrayIndex(cols, i-1, k);
			var idxr = getArrayIndex(cols, i+1, k);
			if (terrain[idx] != "cave" && terrain[idxu] == "cave" && terrain[idxd] == "cave" && terrain[idxl] == "cave" && terrain[idxr] == "cave") {
				terrain[idx] = "cave";
				//console.log("Found floater at "+i+", "+k);
			}
		}
	}
}

function modifyImageLocational(rows, cols, terrain, x, y, idx, img, xmas, hallow) {
	if (img == "grass_side") {
		var idxu = getArrayIndex(cols, x, y-1);
		if (terrain[idxu] != "sky" && !isTransparent(terrain[idxu]))
			img = "dirt";
	}
	if (xmas) {
		if (img == "grass_side")
			img = "grass_side_xmas";
		if (img == "crystalcol")
			img = "crystalcol_xmas";
		if (img == "tallgrass")
			img = "tallgrass_xmas";
	}
	if (img == "tallgrass" && hallow && Math.random() < 0.33)
		img = "pumpkin";
	if (Math.random() < 0.04 && img == "cave" && terrain[idx+cols] == "stone") {
		var f = Math.random();
		if (f < 0.33)
			img = "crystal_purple";
		else if (f < 0.67)
			img = "crystal_white";
		else
			img = "crystal_green";
	}
	return img;
}

function getOreVeinSize(ore) {
	if (ore.startsWith("rock_"))
		return [2.25, 4.5];
	switch(ore) {
		case "diamond_ore":
		case "lapis_ore":
		case "calcite":
			return [0.5, 1.5];
		case "iron_ore":
		case "gold_ore":
		case "copper_ore":
		case "tin_ore":
		case "nickel_ore":
		case "cadmium":
		case "indium":
			return [1.5, 3];
		case "redstone_ore":
		case "coal_ore":
		case "fluorite":
		case "magnetite":
			return [2, 3.5];
		case "dirt":
		case "gravel":
			return [2.5, 4];
		case "cave":
		case "air":
			return [2.5, 5];
		default:
			return [0, 0];
	}
}

function genOreVein(rows, cols, terrain, x, y, ore) {
	var s = getOreVeinSize(ore);
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
	//console.log("Generated ore type "+ore+" @ "+x+", "+y+" with sizes "+rx+", "+ry+" to range "+mx+"->"+px+"; "+my+"->"+py+"; slopes are "+slopeX+", "+slopeY);
	for (var i = mx; i <= px; i++) {
		for (var k = my; k <= py; k++) {
			var di = i-x;
			var dk = k-y;
			if (di*di+dk*dk <= rx*ry+0.5) {
				var dx = i+Math.floor(slopeX*dk);
				var dy = k+Math.floor(slopeY*di);
				var idx = getArrayIndex(cols, dx, dy);
				if (terrain[idx] == null || terrain[idx] == "stone" || terrain[idx].startsWith("rock_") || (terrain[idx] == "cobblestone" && ore == "cave"))
					terrain[idx] = ore;
			}
		}
	}
}

function getRandomRockType(rows, y) { //no opal, because cannot tint
	var f = y/rows;
	var list = ["granite", "hornfel", "quartz"];
	if (f < 0.5) {
		list.push("basalt");
		list.push("shale");
		list.push("limestone");
		list.push("sandstone");
	}
	if (f < 0.75 && f > 0.25) {
		list.push("slate");
		list.push("gneiss");
		list.push("granulite");
		list.push("schist");
	}
	if (f > 0.5) {
		list.push("marble");
		list.push("peridotite");
	}
	if (f > 0.75) {
		list.push("pumice");
		list.push("onyx");
		list.push("migmatite");
	}
	return list[Math.floor(Math.random()*list.length)];
}

function getRandomOreType(rows, y) {
	var f = y/rows;
	var list = ["coal_ore"];
	if (f > 0.2) {
		list.push("iron_ore");
	}
	if (f > 0.5) {
		list.push("gold_ore");
		list.push("lapis_ore");
	}
	if (f > 0.75) {
		list.push("redstone_ore");
		list.push("diamond_ore");
		list.push("emerald_ore");
		list.push("cadmium");
		list.push("indium");
	}
	if (f < 0.2) {
		list.push("magnetite");
	}
	if (f < 0.4) {
		list.push("fluorite");
	}
	if (f > 0.15 && f < 0.35) {
		list.push("calcite");
	}
	if (f > 0.1 && f < 0.5) {
		//list.push("copper_ore");
		//list.push("tin_ore");
	}
	if (f > 0.4 && f < 0.75) {
		//list.push("nickel_ore");
	}
	return list[Math.floor(Math.random()*list.length)];
}

function genOreVeins(rows, cols, terrain) {
	var veins = rows*cols/56;
	//veins = 1;
	for (var i = 0; i < veins; i++) {
		var x = Math.floor(Math.random()*cols);
		var y = Math.floor(Math.random()*rows);
		var ore = getRandomOreType(rows, y);
		genOreVein(rows, cols, terrain, x, y, ore);
		//console.log("Generated "+ore+" at "+x+", "+y);
	}
}

function genRockVeins(rows, cols, terrain) {
	var veins = rows*cols/64;
	//veins = 1;
	for (var i = 0; i < veins; i++) {
		var x = Math.floor(Math.random()*cols);
		var y = Math.floor(Math.random()*rows);
		var ore = "rock_"+getRandomRockType(rows, y);
		genOreVein(rows, cols, terrain, x, y, ore);
		//console.log("Generated "+ore+" at "+x+", "+y);
	}
}

function genGravelDirt(rows, cols, terrain) {
	var veins = rows*cols/150;
	for (var i = 0; i < veins; i++) {
		var x = Math.floor(Math.random()*cols);
		var y = Math.floor(Math.random()*rows);
		var ore = Math.random() < 0.5 ? "gravel" : "dirt";
		genOreVein(rows, cols, terrain, x, y, ore);
	}
}

function generateCaves(rows, cols, terrain) {
	for (var i = 0; i < 8; i++) {
		var x = getRandomBetween(0, cols);
		var y = getRandomBetween(0, rows);
		genOreVein(rows, cols, terrain, x, y, "cave")
	}
}

function generateStructures(rows, cols, terrain, skylim) {
	if (Math.random() < 0.75) {
		var x = getRandomBetween(2, cols-2);
		var y = getRandomBetween(skylim+4, rows-7);
		console.log("Generating a dungeon @ "+x+", "+y);
		var w = Math.random() < 0.5 ? 4 : 3;
		var h = Math.min(w, Math.random() < 0.5 ? 4 : 3);
		for (var i = -w; i <= w; i++) {
			for (var k = 0; k <= h; k++) {
				var dx = x+i;
				var dy = y+k;
				var bk = "cobblestone";
				if (k == h) {
					if (Math.random() < 0.75)
						bk = "cobblestone_mossy";
				}
				else if (k == h-1 && i == 0) {
					bk = "mob_spawner";	
				}
				else if (Math.abs(i) != w) {
					bk = "air";
				}
				var idx = getArrayIndex(cols, dx, dy);
				terrain[idx] = bk;
			}
		}
	}
	if (Math.random() < 0.75) {
		var shafts = getRandomBetween(1, 3);
		console.log("Generating "+shafts+" mineshaft pieces.");
		for (var s = 0; s < shafts; s++) {
			var facing = Math.random() < 0.8;
			var y = getRandomBetween(skylim+4, rows-5);
			if (facing) {
				var x = getRandomBetween(1, cols-1);
				for (var i = -1; i <= 1; i++) {
					for (var k = 0; k <= 2; k++) {
						var dx = x+i;
						var dy = y+k;
						var bk = "cave";
						if (k == 0)
							bk = "planks_oak";
						else if (Math.random() < 0.4 && Math.abs(i) == 1)
							bk = "planks_oak";
						if (Math.random() < 0.15)
							bk = bk == "cave" ? "web" : "web_on_wood";
						var idx = getArrayIndex(cols, dx, dy);
						terrain[idx] = bk;
					}
				}
			}
			else {
				var w = getRandomBetween(5, Math.ceil(cols/3));
				var x = getRandomBetween(w, cols-w);
				var woff = getRandomBetween(0, 5);
				var twoSpawners = Math.random() < 0.5;
				for (var i = -w; i <= w; i++) {
					for (var k = 0; k <= 2; k++) {
						var dx = x+i;
						var dy = y+k;
						var bk = "cave";
						var spawnerCol = twoSpawners ? (i == 0) : (Math.abs(i) == Math.floor(w/1.5));
						var woodCol = (i+256)%6 == woff;
						if (woodCol) {
							bk = "planks_oak";
						}
						if (k == 2 && spawnerCol) {
							bk = "mob_spawner";
						}
						else if (Math.random() < 0.67)
							bk = bk == "cave" ? "web" : "web_on_wood";
						var idx = getArrayIndex(cols, dx, dy);
						terrain[idx] = bk;
					}
				}
			}
		}
	}
}

function generateSurface(rows, cols, terrain, sky, winter) {	
	for (var n = 0; n < 2; n++) {
		var lakeCtr = getRandomBetween(3, cols-3);
		for (var i = lakeCtr-2; i <= lakeCtr+2; i++) {
			var idxl = getArrayIndex(cols, i-1, sky[i]);
			var idxr = getArrayIndex(cols, i+1, sky[i]);
			if ((terrain[idxl] == "grass_side" || terrain[idxl] == "water" || terrain[idxl] == "ice" || terrain[idxl] == "dirt") && (terrain[idxr] == "grass_side" || terrain[idxr] == "ice" || terrain[idxr] == "water" || terrain[idxr] == "dirt")) {
				var idxb = getArrayIndex(cols, i, sky[i]+1);
				var idx = getArrayIndex(cols, i, sky[i]);
				terrain[idx] = winter ? "ice" : "water";
				if (terrain[idxb] == "dirt")
					terrain[idxb] = "grass_side";
			}
		}
	}
	
	var flag = false;
	for (var n = 0; n < 2 && !flag; n++) {
		var pylonCtr = getRandomBetween(3, cols-3);
		flag = generatePylonAt(rows, cols, terrain, sky, pylonCtr);
	}
	
	var count = 0;
	for (var n = 0; n < (winter ? 8 : 4) && count < 3; n++) {
		var treeCtr = getRandomBetween(3, cols-3);
		if (generateTreeAt(rows, cols, terrain, sky, treeCtr, winter))
			count++;
	}
	/*
	if (Math.random() < 0.6) {
		var burrowCtr = getRandomBetween(6, cols-6);
		generateBurrowAt(rows, cols, terrain, sky, burrowCtr);
	}*/
	
	for (var i = 0; i < rows; i++) {
		if (sky[i] > 0 && Math.random() < 0.6) {
			var idx0 = getArrayIndex(cols, i, sky[i]);
			if (terrain[idx0] == "grass_side") {
				var idx = getArrayIndex(cols, i, sky[i]-1);
				if (terrain[idx] == "sky") {
					var plant = "tallgrass";
					var rr = Math.random();
					if (rr < 0.1)
						plant = "flower2";
					else if (rr < 0.25)
						plant = "flower1";
					terrain[idx] = plant;
				}
			}
		}
	}
}

function generateTreeAt(rows, cols, terrain, sky, treeCtr, xmas) {
	var yCtr = sky[treeCtr];
	
	if (yCtr <= 4)
		return false;
	
	var spruce = xmas;//Math.random() <= 0.25;
	
	var h = Math.min(yCtr-1, spruce ? getRandomBetween(8, 12) : getRandomBetween(4, 8));
	//console.log(h);
	if (h <= (spruce ? 8 : 5))
		return false;
	
	//console.log("Trying tree @ "+treeCtr+", "+yCtr);
	
	if (terrain[getArrayIndex(cols, treeCtr-2, yCtr-h)] != "sky") {
		//console.log("Space blocked @ "+(treeCtr-2)+", "+(yCtr-h)+": "+terrain[getArrayIndex(cols, treeCtr-2, yCtr-h)]);
		return false;
	}
	if (terrain[getArrayIndex(cols, treeCtr+2, yCtr-h)] != "sky") {
		//console.log("Space blocked @ "+(treeCtr+2)+", "+(yCtr-h)+": "+terrain[getArrayIndex(cols, treeCtr+2, yCtr-h)]);
		return false;
	}
	if (terrain[getArrayIndex(cols, treeCtr, yCtr-h)] != "sky") {
		//console.log("Space blocked @ "+(treeCtr)+", "+(yCtr-h)+": "+terrain[getArrayIndex(cols, treeCtr, yCtr-h)]);
		return false;
	}
	if (terrain[getArrayIndex(cols, treeCtr-2, yCtr-h+2)] != "sky") {
		//console.log("Space blocked @ "+(treeCtr-2)+", "+(yCtr-h+2)+": "+terrain[getArrayIndex(cols, treeCtr-2, yCtr-h+2)]);
		return false;
	}
	if (terrain[getArrayIndex(cols, treeCtr+2, yCtr-h+2)] != "sky") {
		//console.log("Space blocked @ "+(treeCtr+2)+", "+(yCtr-h+2)+": "+terrain[getArrayIndex(cols, treeCtr+2, yCtr-h+2)]);
		return false;
	}
	
	if (spruce) {
		for (var y = 0; y <= h; y++) {
			var idx = getArrayIndex(cols, treeCtr, yCtr-y);
			terrain[idx] = y == 0 ? "dirt" : "log_spruce";
		}
		var r = 2;
		for (var y = Math.max(2, h-6); y <= h; y++) {
			//console.log("r = "+r+" @ y="+y);
			for (var i = treeCtr-r; i <= treeCtr+r; i++) {
				var idx = getArrayIndex(cols, i, yCtr-y);
				terrain[idx] = "leaves_spruce";
			}
			r += Math.random() <= 0.5 ? 1 : 2;
			if (r > 3)
				r -= 3;
			if (y+1 == h-1)
				r = 1;
			if (y+1 == h)
				r = 0;
		}
	}
	else {
		var birch = Math.random() <= 0.35;
		var leaf = birch ? "leaves_birch" : "leaves";
		for (var y = 0; y <= h; y++) {
			var idx = getArrayIndex(cols, treeCtr, yCtr-y);
			terrain[idx] = y == 0 ? "dirt" : (birch ? "log_birch" : "log");
		}
		for (var y = h-3; y <= h; y++) {
			var r = y >= h-1 ? 1 : 2;
			if (!birch && y == h)
				r = 0;
			for (var i = treeCtr-r; i <= treeCtr+r; i++) {
				var idx = getArrayIndex(cols, i, yCtr-y);
				terrain[idx] = leaf;
			}
		}
	}
	
	console.log("Generating tree at "+treeCtr+", "+yCtr);
	
	return true;
}

function generateBurrowAt(rows, cols, terrain, sky, burrowCtr) {
	var yCtr = sky[burrowCtr];
}

function generatePylonAt(rows, cols, terrain, sky, pylonCtr) {
	var yCtr = sky[pylonCtr];
	
	if (yCtr < 7)
		return false;
	
	console.log("Generating pylon at "+pylonCtr+", "+yCtr);
	for (var i = pylonCtr-3; i <= pylonCtr+3; i++) {
		for (var y = yCtr; y <= sky[i]; y++) {
			var idx = getArrayIndex(cols, i, y);
			terrain[idx] = "crystalstone";
		}
	}
	for (var i = pylonCtr-3; i <= pylonCtr+3; i += 2) {
		var edge = i == pylonCtr-3 || i == pylonCtr+3;
		var top = edge ? 5 : 7;
		for (var y = 1; y < top; y++) {
			var idx = getArrayIndex(cols, i, yCtr-y);
			terrain[idx] = "crystalcol";
		}
		terrain[getArrayIndex(cols, i, yCtr-top)] = "rune";
	}
	
	terrain[getArrayIndex(cols, pylonCtr-2, yCtr-3)] = "crystalbeam";
	terrain[getArrayIndex(cols, pylonCtr+2, yCtr-3)] = "crystalbeam";
	
	return true;
}

function setPageBackground() {
	if (isPhone)
		return;
	
	var tail = '</svg>';
	var w = 16*SCALE;
	var h = 16*SCALE;
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
	
	console.log("Generating MC chunk slice tileset with "+cols+" columns and "+rows+" rows");
	
	var xmlns = "http://www.w3.org/2000/svg";
	var elem = document.createElementNS(xmlns, "svg");
	elem.setAttributeNS(null, "width", tw);
    elem.setAttributeNS(null, "height", th);
	
	var terrain = new Array(cols*rows);
	
	var skylim = Math.max(0, Math.min(14, Math.ceil(rows*0.1)));
	var sky = new Array(cols);
	var minSky = Math.floor(skylim/3);
	
	var slope = getRandomDecimalBetween(-1, 1);
	var skyH = getRandomDecimalBetween(minSky, skylim);
	//console.log("Slope of "+slope+" from "+skyH);
	for (var i = 0; i < cols; i++) {
		sky[i] = Math.floor(skyH);
		//console.log(sky[i]+" @ "+i);
		skyH += slope;
		skyH = Math.max(minSky, Math.min(skylim, skyH));
		if (Math.random() < 0.3 || skyH >= skylim-1 || skyH <= minSky+1) {
			slope += getRandomDecimalBetween(-0.2, 0.2);
			if (skyH >= skylim-1)
				slope = Math.min(slope, 0);
			if (skyH <= minSky+1)
				slope = Math.max(slope, 0);
			slope = Math.max(-1, Math.min(1, slope));
			//console.log("Bending slope to "+slope);
		}
	}
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < sky[i]; k++) {
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = "sky";
		}
	}
	
	for (var i = 0; i < cols; i++) {
		for (var k = sky[i]; k < rows; k++) {
			var img = getRandomRawGenBlockAt(i, k-sky[i], rows, sky[i]);
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = img;
		}
	}
	
	generateSurface(rows, cols, terrain, sky, xmas);
	generateStructures(rows, cols, terrain, skylim);
	generateCaves(rows, cols, terrain);
	genRockVeins(rows, cols, terrain);
	genOreVeins(rows, cols, terrain);
	genGravelDirt(rows, cols, terrain);
	cleanFloatingBlocks(rows, cols, terrain);
	applyLiquids(rows, cols, terrain);
	
	buildImage(elem, rows, cols, terrain, xmas, hallow);
	
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