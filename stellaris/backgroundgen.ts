var STARFIELD_SIZE = 2048;
var STAR_SIZE = 32;

function addImage(elem, img, ix, iy, iw, ih, star) {
	img = modifyImageLocational(ix, iy, img, xmas, hallow);
	//var pre = '<image x="'+ix+'" y="'+iy+'" width="'+iw+'" height="'+ih+'" xlink:href="'+getImageRoot();
	//var post = '.png" />';
	//return pre+img+post;
	var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	svgimg.setAttributeNS(null, wkey, iw.toString());
	svgimg.setAttributeNS(null, hkey, ih.toString());
	svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', getOrCreateImgPath(img, "stellaris"));
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
	if (star.connections.includes(other)) {
		if (!other.connections.includes(star)) {
			other.connections.push(star);
		}
		return;
	}
	var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttributeNS(null, "x1", star.x+STAR_SIZE/2);
	line.setAttributeNS(null, "y1", star.y+STAR_SIZE/2);
	line.setAttributeNS(null, "x2", other.x+STAR_SIZE/2);
	line.setAttributeNS(null, "y2", other.y+STAR_SIZE/2);
	line.setAttributeNS(null, "stroke", "rgb(0, 212, 255)");
	if (xmas) {
		if (Math.random() < 0.5)
			line.setAttributeNS(null, "stroke", "rgb(255, 0, 0)");
		else
			line.setAttributeNS(null, "stroke", "rgb(0, 192, 0)");
	}
	line.setAttributeNS(null, "stroke-width", "2");
	line.setAttributeNS(null, "style", "mix-blend-mode: screen;");
	elem.appendChild(line);
	star.connections.push(other);
	other.connections.push(star);
}

function generateTerritory(elem, w, h, stars, alera) {
	var region = [];
	var edges = [];

	region.push(alera);
	alera.borderDistance = -1;
	var n = getRandomBetween(4, 9);
	for (var i = 0; i < n; i++) {
		//console.log(i+"/"+n+": ");
		var next = [];
		for (var k = 0; k < region.length; k++) {
			var star = region[k];
			if (typeof star.connections !== 'undefined' && star.connections.length > 0) {
				for (var a = 0; a < star.connections.length; a++) {
					var other = star.connections[a];
					if (!region.includes(other) && !next.includes(other)) {
						next.push(other);
					}
				}
			}
		}
		//console.log(next);
		for (var k = 0; k < next.length; k++) {
			region.push(next[k]);
			next[k].borderDistance = i;
			next[k].isAleran = true;
		}
	}
	
	for (var i = 0; i < region.length; i++) {
		var star = region[i];
		if (typeof star.connections !== 'undefined' && star.connections.length > 0) {
			//console.log(star);
			//console.log(star.connections);
			for (var k = 0; k < star.connections.length; k++) {
				var other = star.connections[k];
				if (!region.includes(other)) {
					var entry = {x:(star.x+other.x+STAR_SIZE)/2, y:(star.y+other.y+STAR_SIZE)/2}
					entry.angle = Math.atan2(entry.y-STAR_SIZE/2-alera.y, entry.x-STAR_SIZE/2-alera.x);
					edges.push(entry);
					star.isAleranBorder = true;
				}
			}
		}
	}
	
	edges.sort((a, b) => a.angle - b.angle);
	
	//console.log(edges);
	//console.log(region);
	
	var points = edges;

	var cpX  = computeControlPoints(points.map(p => p.x));
	var cpY  = computeControlPoints(points.map(p => p.y));
  
  var start = points[0];
  var data = "M"+start.x+" "+start.y;
  
  for (var i = 0, l = points.length - 1; i < l; i++) {
	  var cp1 = {x: cpX.p1[i], y: cpY.p1[i]};
	  var cp2 = {x: cpX.p2[i], y: cpY.p2[i]};
    //drawSpline(elem, points[i], cp1, cp2, points[i + 1])
	//data = data+" L "+points[i].x+" "+points[i].y;
	data = data+" C "+cp1.x+" "+cp1.y+" "+cp2.x+" "+cp2.y+" "+points[i + 1].x+" "+points[i + 1].y;
  }
  data = data+" Z";
  
  drawSpline(elem, data);
  
  addImage(elem, "aleran", alera.x-128, alera.y-128, 256, 256, false);
}

//Credit to https://jsfiddle.net/prafuitu/8m2n5qg6/
function computeControlPoints(K)
{
	if (K.length == 2) {
  	return {
    	p1:[K[0]],
      p2:[K[1]]
    };
  }

	p1=new Array();
	p2=new Array();
	n = K.length-1;
	
	/*rhs vector*/
	a=new Array();
	b=new Array();
	c=new Array();
	r=new Array();
	
	/*left most segment*/
	a[0]=0;
	b[0]=2;
	c[0]=1;
	r[0] = K[0]+2*K[1];
	
	/*internal segments*/
	for (i = 1; i < n - 1; i++)
	{
		a[i]=1;
		b[i]=4;
		c[i]=1;
		r[i] = 4 * K[i] + 2 * K[i+1];
	}
			
	/*right segment*/
	a[n-1]=2;
	b[n-1]=7;
	c[n-1]=0;
	r[n-1] = 8*K[n-1]+K[n];
	
	/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
	for (i = 1; i < n; i++)
	{
		m = a[i]/b[i-1];
		b[i] = b[i] - m * c[i - 1];
		r[i] = r[i] - m*r[i-1];
	}
 
	p1[n-1] = r[n-1]/b[n-1];
	for (i = n - 2; i >= 0; --i)
		p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
		
	/*we have p1, now compute p2*/
	for (i=0;i<n-1;i++)
		p2[i]=2*K[i+1]-p1[i+1];
	
	p2[n-1]=0.5*(K[n]+p1[n-1]);
	
	return {p1:p1, p2:p2};
}

function drawSpline(svg, data) {
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttributeNS(null, 'stroke', "#785FB6");
  path.setAttributeNS(null, 'stroke-width', "5");
  path.setAttributeNS(null, 'fill', "#785FB6");
  path.setAttributeNS(null, 'fill-opacity', "0.4");
  path.setAttributeNS(null, 'stroke-opacity', "0.85");
  path.setAttributeNS(null, 'd', data);
  svg.appendChild(path);
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
	
	console.log("Generating stellaris galaxy map background");
	
	var xmlns = "http://www.w3.org/2000/svg";
	var elem = document.createElementNS(xmlns, "svg");
	elem.setAttributeNS(null, "width", rw);
    elem.setAttributeNS(null, "height", rh);
		
	for (var i = 0; i < rw; i += STARFIELD_SIZE) {
		for (var k = 0; k < rh; k += STARFIELD_SIZE) {
			addImage(elem, "starfield", i, k, STARFIELD_SIZE, STARFIELD_SIZE, false);
		}
	}
	
	var dStar = STAR_SIZE*3;
	var dd = STAR_SIZE*1.35;
	
	var cols = Math.ceil(rw/dStar);
	var rows = Math.ceil(rh/dStar);
	
	var stars = new Array(cols*rows);
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			var dx = (i+0.5)*dStar;
			var dy = (k+0.5)*dStar;
			var posX = getRandomBetween(dx-dd, dx+dd);
			var posY = getRandomBetween(dy-dd, dy+dd);
		
			var img = "";
			var f = Math.random();
			if (f < 0.04)
				img = "hole";
			else if (f < 0.1)
				img = "pulsar";
			else if (f < 0.15)
				img = "neutron";
			else
				img = "star"+getRandomBetween(0, 7);
			
			var entry = {image:img, x:posX, y:posY, cx:i, cy:k, index:getArrayIndex(cols, i, k), connections:[]};
			stars[entry.index] = entry;
		}
	}
	
	var alera = stars[getArrayIndex(cols, getRandomBetween(4, cols-4), getRandomBetween(4, rows-4))];
	
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
		if (star == alera) {
			connectStars(elem, star, stars[getArrayIndex(cols, star.cx-1, star.cy)]);
			connectStars(elem, star, stars[getArrayIndex(cols, star.cx+1, star.cy)]);
			connectStars(elem, star, stars[getArrayIndex(cols, star.cx, star.cy-1)]);
			connectStars(elem, star, stars[getArrayIndex(cols, star.cx, star.cy+1)]);
			star.meiza = star.connections[getRandomBetween(0, 3)];
			star.reylana = star.meiza;
			while (star.reylana == star.meiza)
				star.reylana = star.connections[getRandomBetween(0, 3)];
			star.freyskol = star.meiza;
			while (star.freyskol == star.meiza || star.freyskol == star.reylana)
				star.freyskol = star.connections[getRandomBetween(0, 3)];
			star.lanka = star.meiza;
			while (star.lanka == star.meiza || star.lanka == star.reylana || star.lanka == star.freyskol)
				star.lanka = star.connections[getRandomBetween(0, 3)];
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
	
	alera.meiza.image = "pulsar";
	alera.reylana.image = "star1";
	alera.freyskol.image = "star6";
	alera.lanka.image = "star4";
	alera.image = "star0";
	
	generateTerritory(elem, rw, rh, stars, alera);
	
	for (var i = 0; i < stars.length; i++) {
		var star = stars[i];
		addImage(elem, star.image, star.x, star.y, STAR_SIZE, STAR_SIZE, true);
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