import * as SimplexNoise from 'simplex-noise'

import { xmas, hallow, viskey, visval, xkey, ykey, hkey, wkey, getRandomBetween, getRandomDecimalBetween, getOrCreateImgPath, getTileWidth, getTileHeight, getArrayIndex} from '../library'
import { isPhone} from '../browser'

const STARFIELD_SIZE = 2048;
const STAR_SIZE = 21;

interface star {
	x: number;
	y: number;
	index: number;
	cx: number;
	cy: number;
	connections: star[];
  }

function addImage(elem:HTMLElement, img:string, ix:number, iy:number, iw:number, ih:number, star:boolean) {
	img = modifyImageLocational(ix, iy, img);
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

function modifyImageLocational(x:number, y:number, img:string) {
	return img;
}

function connectStars(elem:HTMLElement, star:star, other:star) {
	if (Math.random() > 0.275)
		return;
	var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttributeNS(null, "x1", (star.x+STAR_SIZE/2).toString());
	line.setAttributeNS(null, "y1", (star.y+STAR_SIZE/2).toString());
	line.setAttributeNS(null, "x2", (other.x+STAR_SIZE/2).toString());
	line.setAttributeNS(null, "y2", (other.y+STAR_SIZE/2).toString());
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
	
		let tail = '</svg>';
	
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
	
	console.log("Generating starbound nav map background");
	
	let xmlns = "http://www.w3.org/2000/svg";
	let elem = document.createElementNS(xmlns, "svg") as HTMLElement;
	elem.setAttributeNS(null, "width", rw.toString());
    elem.setAttributeNS(null, "height", rh.toString());
		
	for (var i = 0; i < rw; i += STARFIELD_SIZE) {
		for (var k = 0; k < rh; k += STARFIELD_SIZE) {
			addImage(elem, xmas ? "bg_xmas" : "bg", i, k, STARFIELD_SIZE, STARFIELD_SIZE, false);
		}
	}
	
	let dStar = STAR_SIZE*3;
	let dd = STAR_SIZE*1.35;
	
	let cols = Math.ceil(rw/dStar);
	let rows = Math.ceil(rh/dStar);
	
	let stars = new Array(cols*rows);
	
	let simplex = new SimplexNoise();
	
	for (var i = 0; i < cols; i++) {
		for (var k = 0; k < rows; k++) {
			let dx = (i+0.5)*dStar;
			let dy = (k+0.5)*dStar;
			let posX = getRandomBetween(dx-dd, dx+dd);
			let posY = getRandomBetween(dy-dd, dy+dd);
			let entry = {x:posX, y:posY, cx:i, cy:k, index:getArrayIndex(cols, i, k), connections:[]};
			stars[entry.index] = entry;
			let value = Math.min(5, Math.abs(Math.round(simplex.noise2D(i*0.125, k*0.125)*6)));
			let img = "star"+value;
			addImage(elem, img, posX, posY, STAR_SIZE, STAR_SIZE, true);
		}
	}
	
	for (var i = 0; i < stars.length; i++) {
		let star = stars[i];
		
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
		let star = stars[i];
		
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