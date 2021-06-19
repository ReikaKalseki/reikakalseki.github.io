var STARFIELD_SIZE = 2048;
var STAR_SIZE = 21;

function addImage(elem, img, ix, iy, iw, ih, star) {
	img = modifyImageLocational(ix, iy, img, xmas, hallow);
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, iw.toString());
	svgimg.setAttributeNS(null, hkey, ih.toString());
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "starbound"));
	svgimg.setAttributeNS(null, xkey, ix.toString());
	svgimg.setAttributeNS(null, ykey, iy.toString());
	svgimg.setAttributeNS(null, viskey, visval);
	if (star)
		svgimg.setAttributeNS(null, "style", "mix-blend-mode: screen;");
	
	elem.appendChild(svgimg);
}

function modifyImageLocational(x, y, img, xmas, hallow) {
	return img;
}

function connectStars(elem, star, other) {
	if (Math.random() > 0.275)
		return;
	var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttributeNS(null, "x1", star.x+STAR_SIZE/2);
	line.setAttributeNS(null, "y1", star.y+STAR_SIZE/2);
	line.setAttributeNS(null, "x2", other.x+STAR_SIZE/2);
	line.setAttributeNS(null, "y2", other.y+STAR_SIZE/2);
	line.setAttributeNS(null, "stroke", "rgb(160, 160, 160)");
	line.setAttributeNS(null, "stroke-width", "1");
	line.setAttributeNS(null, "stroke-dasharray", "4");
	line.setAttributeNS(null, "style", "mix-blend-mode: screen;");
	elem.appendChild(line);
	star.connections.push(other);
	other.connections.push(star);
}

function setPageBackground() {
	if (isPhone)
		return;
	
	var tail = '</svg>';
	
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
	
	console.log("Generating starbound nav map background");
	
	var xmlns = "http://www.w3.org/2000/svg";
	var elem = document.createElementNS(xmlns, "svg");
	elem.setAttributeNS(null, "width", rw);
    elem.setAttributeNS(null, "height", rh);
		
	for (var i = 0; i < rw; i += STARFIELD_SIZE) {
		for (var k = 0; k < rh; k += STARFIELD_SIZE) {
			addImage(elem, xmas ? "bg_xmas" : "bg", i, k, STARFIELD_SIZE, STARFIELD_SIZE, false);
		}
	}
	
	var dStar = STAR_SIZE*3;
	var dd = STAR_SIZE*1.35;
	
	var cols = Math.ceil(rw/dStar);
	var rows = Math.ceil(rh/dStar);
	
	var stars = new Array(cols*rows);
	
	var simplex = new SimplexNoise();
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			var dx = (i+0.5)*dStar;
			var dy = (k+0.5)*dStar;
			var posX = getRandomBetween(dx-dd, dx+dd);
			var posY = getRandomBetween(dy-dd, dy+dd);
			var entry = {x:posX, y:posY, cx:i, cy:k, index:getArrayIndex(cols, i, k), connections:[]};
			stars[entry.index] = entry;
			var value = Math.min(5, Math.abs(Math.round(simplex.noise2D(i*0.125, k*0.125)*6)));
			var img = "star"+value;
			addImage(elem, img, posX, posY, STAR_SIZE, STAR_SIZE, true);
		}
	}
	
	for (var i = 0; i < stars.length; i++) {
		var star = stars[i];
		
		if (star.cx > 0 && Math.random() < 0.33) {
			var other = stars[getArrayIndex(cols, star.cx-1, star.cy)]
			if (other.connections.length < 3)
				connectStars(elem, star, other);
		}
		if (star.cy > 0 && Math.random() < 0.33) {
			var other = stars[getArrayIndex(cols, star.cx, star.cy-1)]
			if (other.connections.length < 3)
				connectStars(elem, star, other);
		}
		
	}
	for (var i = 0; i < stars.length; i++) {
		var star = stars[i];
		
		if (star.connections.length == 0) {
			//console.log("unconnected star: "+star)
		}
		if (star.cx > 0) {
			var other = stars[getArrayIndex(cols, star.cx-1, star.cy)]
			connectStars(elem, star, other);
		}
		else if (star.cy > 0) {
			var other = stars[getArrayIndex(cols, star.cx, star.cy-1)]
			connectStars(elem, star, other);
		}
		else if (Math.random() < 0.33) {
			var other = stars[getArrayIndex(cols, star.cx+1, star.cy)]
			connectStars(elem, star, other);
		}
		else {
			var other = stars[getArrayIndex(cols, star.cx, star.cy+1)]
			connectStars(elem, star, other);
		}
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