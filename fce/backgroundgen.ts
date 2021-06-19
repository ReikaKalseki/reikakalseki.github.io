var SCALE = 2;

var coldMin = 0.22;
var coldMax = 0.28;
var toxicMin = 0.45;
var toxicMax = 0.55;
var lavaMin = 0.87;
var lavaMax = 0.95;
var coldVar = 0.02;
var toxicVar = 0.05;

var lavaCeilRow = 999;
var lavaFloorRow = 0;

function addImage(elem, img, ix, iy, iw, ih) {
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, getTileWidth(iw));
	svgimg.setAttributeNS(null, hkey, getTileHeight(ih));
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "fceblocks"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	//if (img == "bedrock")
		//svgimg.setAttributeNS(null, "style", "color: #faa;");
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
			var imgs = terrain[idx];
			//console.log("Got "+img+" @ "+i+", "+k);
			if (xmas && imgs.length > 0 && imgs[imgs.length-1] != "cave" && !imgs[imgs.length-1].startsWith("gem") && imgs[imgs.length-1] != "lava" && (k < lavaCeilRow || k > lavaFloorRow)) {
				var imgsa = k == 0 ? ["cave"] : terrain[getArrayIndex(cols, i, k-1)];
				if (imgsa.length > 0 && imgsa[imgsa.length-1] == "cave")
					imgs.push("snow");
			}
			for (var n = 0; n < imgs.length; n++) {
				var img = imgs[n];
				img = modifyImageLocational(rows, cols, terrain, i, k, idx, img, xmas, hallow);
				addImage(elem, img, x, y, w, h);
			}
			x += w;
		}
		y += h;
	}
}

function isTransparent(img) {
	switch(img) {
		case "air":
		case "crystal":
		case "lptbeam_v":
		case "lptbeam_h":
			return true;
		default:
			return false;
	}
}

function setBlock(terrain, idx, img) {
	if (img == "cave")
		console.log("ERROR: ADDED CAVE ON NULL");
	terrain[idx] = [];
	terrain[idx].push(img);
}

function setBottomBlock(terrain, idx, img) {
	if (terrain[idx] == null || terrain[idx].length == 0)
		setBlock(terrain, idx, img);
	else
		terrain[idx][0] = img;
}

function addBlock(terrain, idx, img) {
	//console.log("---");
	//console.log(terrain[idx]);
	terrain[idx].push(img);
	//console.log(terrain[idx]);
	//console.log("---");
}

function getTopBlock(terrain, idx) {
	var li = terrain[idx]
	var ret = li == undefined || li.length == 0 ? null : li[li.length-1];
	//if (ret == "cave")
	//	ret = li.length >= 2 ? li[li.length-2] : null;
	return ret;
}

function getBottomBlock(terrain, idx) {
	var li = terrain[idx]
	return li.length == 0 ? null : li[0];
}

function getRandomRawGenBlockAt(x, y, rows, cold, toxic, lava) {
	var f = y/rows;
	var coldCtr = cold[x];
	var toxicCtr = toxic[x];
	var lavaCtr = lava[x];
	var ret = "rock";
	var deep1 = f-(coldCtr-0.1);
	if (deep1 >= 0 && Math.random()*Math.random()*Math.random()*0.8 < deep1) {
		ret = "bedrock";
	}
	var deep2 = f-(toxicCtr-0.1);
	if (deep2 >= 0 && Math.random()*Math.random()*Math.random()*0.8 < deep2) {
		ret = "deepstone";
	}
	return ret;
}

function modifyImageLocational(rows, cols, terrain, x, y, idx, img, xmas, hallow) {	
	return img;
}

function getOreVeinSize(ore, y, rows) {
	var f = y/rows;
	var s = f < 0.2 ? 1 : 1+(f-0.2)*0.75;
	switch(ore) {
		case "hardresin":
			return [5, 5];
		case "cave":
			return [2*s, 4*s];
		case "biomass":
			return [1*s, 1.5*s];
		case "coal":
			return [1.5*s, 2*s];
		default:
			return [1.5*s, 3*s];
	}
}

function genOreVein(rows, cols, terrain, x, y, ore, cold, toxic, lava) {
	var s = getOreVeinSize(ore, y, rows);
	//s[0] = 1;
	//s[1] = 9;
	var r = getRandomDecimalBetween(s[0], s[1])*0.675;
	var mx = Math.max(0, Math.floor(x-r));
	var my = Math.max(0, Math.floor(y-r));
	var px = Math.min(cols-1, Math.floor(x+r));
	var py = Math.min(rows-1, Math.floor(y+r));
	var ms = 0.75;
	var slopeX = getRandomDecimalBetween(-ms, ms);
	var slopeY = getRandomDecimalBetween(-ms, ms);
	//console.log("Generated ore type "+ore+" @ "+x+", "+y+" with sizes "+rx+", "+ry+" to range "+mx+"->"+px+"; "+my+"->"+py+"; slopes are "+slopeX+", "+slopeY);
	var l = ore == "hardresin" ? 0 : (ore == "cave" ? r*3.5 : r*2);
	for (var d = 0; d <= l; d++) {
		for (var i = mx; i <= px; i++) {
			for (var k = my; k <= py; k++) {
				var di = i-x;
				var dk = k-y;
				if (di*di+dk*dk <= r*r+0.25) {
					var dx = Math.floor(i+d*slopeX);
					var dy = Math.floor(k+d*slopeY);
					var idx = getArrayIndex(cols, dx, dy);
					if (ore == "hardresin")
						setBlock(terrain, idx, ore);
					else if (ore == "cave") {
						if (terrain[idx] != null && terrain[idx].length > 0) {
							var top = getTopBlock(terrain, idx);
							if (top != "cave" && top != "lava" && top != "crystal" && top != "magmarock" && top != "hardresin") {
								var idx2 = dy == 0 ? -1 : getArrayIndex(cols, dx, dy-1);
								if (idx2 < 0 || (terrain[idx2] != null && terrain[idx2].length > 0 && getTopBlock(terrain, idx2) != "lava"))
									addBlock(terrain, idx, ore);
							}
						}
					}
					else if (terrain[idx] == null || isValidRock(ore, getBottomBlock(terrain, idx)))
						setBottomBlock(terrain, idx, ore);
				}
			}
		}
	}
}

function isValidRock(ore, rock) {
	if (ore == "hardresin")
		return true;
	if (ore == "biomass")
		return rock != null && rock.startsWith("deepstone_g");
	return rock == "deepstone" || rock == "bedrock" || rock == "rock";
}

function getRandomOreType(rows, x, y, cold, toxic, lava) {
	var f = y/rows;
	var list = ["coal", "copper", "tin"];
	if (f > cold[x]-0.12) {
		list.push("iron");
	}
	if (f > cold[x]-0.06) {
		list.push("lithium");
	}
	if (f > cold[x]+0.05) {
		list.push("gold");
		list.push("nickel");
		list.push("titanium");
	}
	if (Math.abs(f-toxic[x]) <= 0.1) {
		list.push("biomass");
	}
	if (f > toxic[x]+0.05) {
		//list.push("molybdenum");
		list.push("chromium");
	}
	return list[Math.floor(Math.random()*list.length)];
}

function genOreVeins(rows, cols, terrain, cold, toxic, lava) {
	var veins = rows*cols/32;
	//veins = 1;
	for (var i = 0; i < veins; i++) {
		var x = Math.floor(Math.random()*cols);
		var y = Math.floor(Math.random()*rows);
		var ore = getRandomOreType(rows, x, y, cold, toxic, lava);
		genOreVein(rows, cols, terrain, x, y, ore, cold, toxic, lava);
		//console.log("Generated "+ore+" at "+x+", "+y);
	}
}

function generateLayers(rows, cols, terrain, cold, toxic, lava) {
	var lastColdCeil = -1;
	var lastColdFloor = -1;
	var lastToxicFloor = -1;
	var lastToxicCeil = -1;
	var lastLavaFloor = -1;
	var lastLavaCeil = -1;
	var crysw = getRandomBetween(-3, 4);
	var magw = getRandomBetween(-3, 4);
	var dd = Math.max(1, rows/100);
	for (var i = 0; i < cols; i++) {
		var coldCeil = Math.floor(cold[i]*rows)-getRandomBetween(1, 4)*dd;
		var coldFloor = Math.floor(cold[i]*rows)+getRandomBetween(0, 1)*dd;
		var toxicCeil = Math.floor(toxic[i]*rows)-getRandomBetween(2, 4)*dd;
		var toxicFloor = Math.floor(toxic[i]*rows)+getRandomBetween(2, 4)*dd;
		var lavaCeil = Math.floor(lava[i]*rows)-getRandomBetween(2, 4)*dd;
		var lavaFloor = Math.floor(lava[i]*rows)+getRandomBetween(1, 3)*dd;
		if (i > 0) {	
			coldCeil = Math.max(Math.min(coldCeil, lastColdCeil+0.5), lastColdCeil-0.5);
			coldFloor = Math.max(Math.min(coldFloor, lastColdFloor+0.25), lastColdFloor-0.25);
			toxicCeil = Math.max(Math.min(toxicCeil, lastToxicCeil+1), lastToxicCeil-1);
			toxicFloor = Math.max(Math.min(toxicFloor, lastToxicFloor+0.5), lastToxicFloor-0.5);
			lavaCeil = Math.max(Math.min(lavaCeil, lastLavaCeil+1), lastLavaCeil-1);
			lavaFloor = Math.max(Math.min(lavaFloor, lastLavaFloor+0.25), lastLavaFloor-0.25);
		}
		lavaCeilRow = Math.min(lavaCeilRow, Math.floor(lavaCeil));
		lavaFloorRow = Math.max(lavaFloorRow, Math.ceil(lavaFloor));
		for (var k = 0; k < rows; k++) {
			var idx = getArrayIndex(cols, i, k);
			if (k >= coldCeil && k <= coldFloor) {
				setBlock(terrain, idx, "deepstone_b1");
				if (k != Math.ceil(coldCeil) && k != Math.floor(coldFloor))
					addBlock(terrain, idx, "cave");
			}
			
			if (k >= toxicCeil && k <= toxicFloor) {
				setBlock(terrain, idx, "deepstone_g1");
				if (k != Math.ceil(toxicCeil) && k != Math.floor(toxicFloor))
					addBlock(terrain, idx, "cave");
			}
			
			if (k >= lavaCeil && k <= lavaFloor) {
				if (k != Math.floor(lavaFloor) && k >= Math.floor(lavaMax*rows)-1*dd) {
					setBlock(terrain, idx, "lava");
				}
				else {
					setBlock(terrain, idx, "deepstone_o1");
					if (k != Math.ceil(lavaCeil) && k != Math.floor(lavaFloor))
						addBlock(terrain, idx, "cave");
				}
			}
		}
		var gap1 = toxicCeil-coldFloor;
		var gap2 = lavaCeil-toxicFloor;
		var blend = Math.min(6, Math.max(1, Math.floor(Math.min(gap1, gap2)/4)));
		var step = Math.min(6, 6/blend);
		//console.log("Gaps "+gap1+", "+gap2+" -> "+blend+", "+step);
		
		for (var d = -blend; d < 0; d++) {
			var varr = step == 6 ? 3 : Math.floor(((-d+1)*step));
			if (varr <= 6) {
				setBlock(terrain, getArrayIndex(cols, i, d+Math.ceil(coldCeil)), "deepstone_b"+varr);
				setBlock(terrain, getArrayIndex(cols, i, -d+Math.floor(coldFloor)), "deepstone_b"+varr);
				
				setBlock(terrain, getArrayIndex(cols, i, d+Math.ceil(toxicCeil)), "deepstone_g"+varr);
				setBlock(terrain, getArrayIndex(cols, i, -d+Math.floor(toxicFloor)), "deepstone_g"+varr);
				
				setBlock(terrain, getArrayIndex(cols, i, d+Math.ceil(lavaCeil)), "deepstone_o"+varr);
				setBlock(terrain, getArrayIndex(cols, i, -d+Math.floor(lavaFloor)), "deepstone_o"+varr);
			}
			//console.log(varr+" @ "+d);
		}
		
		lastColdFloor = coldFloor;
		lastColdCeil = coldCeil;
		lastToxicFloor = toxicFloor;
		lastToxicCeil = toxicCeil;
		lastLavaFloor = lavaFloor;
		lastLavaCeil = lavaCeil;
		
		var flag = false;
		if (crysw <= -4) {
			crysw = getRandomBetween(2, 4);
			flag = true;
		}
		if (crysw > 0) {
			var cm = coldCeil+1;
			var cm2 = coldFloor-1;
			if (flag || crysw == 1) {
				cm = getRandomBetween(cm, cm+1);
				cm2 = Math.max(cm, getRandomBetween(cm2-3, cm2));
			}
			for (var k = cm; k <= cm2; k++) {
				var idx = getArrayIndex(cols, i, k);
				//if (getTopBlock(terrain, idx) == "cave")
					setBlock(terrain, idx, "crystal");
			}
		}
		crysw--;
		
		if (magw <= -4) {
			magw = getRandomBetween(1, 4);
		}
		if (magw > 0) {
			var cm = lavaCeil+1;
			cm = getRandomBetween(cm, cm+3);
			var cm2 = lavaFloor-1;
			for (var k = cm; k <= cm2; k++) {
				var idx = getArrayIndex(cols, i, k);
				if (getTopBlock(terrain, idx) == "cave")
					setBlock(terrain, idx, "magmarock");
			}
		}
		magw--;
	}
}

function generateCaves(rows, cols, terrain, cold, toxic, lava) {
	for (var i = 0; i < rows/2.5; i++) {
		var x = getRandomBetween(0, cols);
		var y = getRandomBetween(0, rows);
		genOreVein(rows, cols, terrain, x, y, "cave", cold, toxic, lava)
	}
}

function generateResinBalls(rows, cols, terrain, cold, toxic, lava) {
	for (var i = 0; i < rows/40; i++) {
		var x = getRandomBetween(6, cols-6);
		var y = getRandomBetween(Math.floor(cold[x]*rows/2), Math.floor(lava[x]*rows-12));
		genOreVein(rows, cols, terrain, x, y, "hardresin", cold, toxic, lava)
	}
}

function generateSurfaceResin(rows, cols, terrain) {
	var t0 = getRandomBetween(0, 4);
	for (var i = 0; i < cols; i++) {
		var t = Math.max(t0-1, Math.min(t0+1, getRandomBetween(0, 4)));
		for (var k = 0; k < t; k++) {
			var idx = getArrayIndex(cols, i, k);
			setBlock(terrain, idx, "resin");
		}
		t0 = t;
	}
}

function getRandomCrystal(y, rows, cold, toxic, lava) {
	var f = y/rows;
	var list = [];
	if (f < cold/2) {
		list.push("diamond");
	}
	if (f > cold/2 && f < cold-0.04) {
		list.push("emerald");
	}
	if (f > cold+0.02 && f < (cold+toxic)/2) {
		list.push("ruby");
	}
	if (f > (cold+toxic)/2 && f < toxic-0.04) {
		list.push("sapphire");
	}
	if (Math.abs(f-toxic) < 0.05) {
		list.push("topaz");
	}
	if (f > toxic+0.07) {
		list.push("sugalite");
	}
	return list.length == 0 ? null : list[Math.floor(Math.random()*list.length)];
}

function generateCrystalGlow(elem, x, y, r, g, b) {
	r *= 0.85;
	g *= 0.85;
	b *= 0.85;
	var line = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
	line.setAttributeNS(null, "cx", (x+0.5)*16*SCALE);
	line.setAttributeNS(null, "cy", (y+0.5)*16*SCALE);
	line.setAttributeNS(null, "rx", 5*16*SCALE);
	line.setAttributeNS(null, "ry", 5*16*SCALE);
	line.setAttributeNS(null, "fill", "rgb("+r+", "+g+", "+b+")");
	line.setAttributeNS(null, "style", "mix-blend-mode: screen; filter: blur(32px);");
	elem.appendChild(line);
}

function generateCrystals(rows, cols, terrain, cold, toxic, lava) {
	var placed = [];
	for (var i = 0; i < rows*3; i++) {
		var x = getRandomBetween(2, cols-2);
		var y = getRandomBetween(6, rows-2);
		var cry = getRandomCrystal(y, rows, cold[x], toxic[x], lava[x]);
		if (cry == null)
			continue;
		var idx = getArrayIndex(cols, x, y);
		var top = getTopBlock(terrain, idx);
		var top2 = getTopBlock(terrain, getArrayIndex(cols, x, y+1));
		if (top == "cave" && top2 != "cave") {
			addBlock(terrain, idx, "gem_"+cry);
			//generateCrystalGlow(elem, rows, cols, terrain, x, y, idx);
			placed.push({x:x, y:y, type:cry});
		}
	}
	return placed;
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

  
  var rows = Math.ceil(rh/h)+1;
  var cols = Math.ceil(rw/w);
	var tw = cols*w;
	var th = rows*h;
	
	console.log("Generating FCE chunk slice tileset with "+cols+" columns and "+rows+" rows");
	
	var xmlns = "http://www.w3.org/2000/svg";
	var elem = document.createElementNS(xmlns, "svg");
	elem.setAttributeNS(null, "width", tw);
    elem.setAttributeNS(null, "height", th);
	
	var terrain = new Array(cols*rows);
	
	var cold = new Array(cols);
	var toxic = new Array(cols);
	var lava = new Array(cols);
	
	for (var i = 0; i < cols; i++) {
		cold[i] = getRandomDecimalBetween(coldMin, coldMax);
		toxic[i] = getRandomDecimalBetween(toxicMin, toxicMax);
		lava[i] = getRandomDecimalBetween(lavaMin, lavaMax);
		if (i > 0) {
			cold[i] = Math.max(Math.min(cold[i], cold[i-1]+1), cold[i-1]-1); 
			toxic[i] = Math.max(Math.min(toxic[i], toxic[i-1]+2), toxic[i-1]-2); 
			lava[i] = Math.max(Math.min(lava[i], lava[i-1]+1), lava[i-1]-1); 
		}
	}
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			var img = getRandomRawGenBlockAt(i, k, rows, cold, toxic, lava);
			var idx = getArrayIndex(cols, i, k);
			terrain[idx] = null;
			setBlock(terrain, idx, img);
		}
	}
	
	generateLayers(rows, cols, terrain, cold, toxic, lava);
	genOreVeins(rows, cols, terrain, cold, toxic, lava);
	generateCaves(rows, cols, terrain, cold, toxic, lava);
	generateResinBalls(rows, cols, terrain, cold, toxic, lava);
	generateSurfaceResin(rows, cols, terrain);
	var crys = generateCrystals(rows, cols, terrain, cold, toxic, lava);
	//generateLPTs(rows, cols, terrain);
	
	buildImage(elem, rows, cols, terrain, xmas, hallow);
	
	for (var i = 0; i < crys.length; i++) {
		var cry = crys[i];
		var r = 0;
		var g = 0;
		var b = 0;
		switch(cry.type) {
			case "diamond":
				r = 224;
				g = 234;
				b = 240;
				break;
			case "emerald":
				r = 78;
				g = 221;
				break;
			case "ruby":
				r = 229;
				g = 19;
				break;
			case "sapphire":
				r = 36;
				g = 87;
				b = 242;
				break;
			case "topaz":
				r = 245;
				g = 195;
				b = 67;
				break;
			case "sugalite":
				r = 195;
				g = 22;
				b = 229;
				break;
		}
		generateCrystalGlow(elem, cry.x, cry.y, r, g, b);
	}
	
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