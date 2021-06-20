var images = {minecraft:"i-imgur-com_8RWgxVJ.png", stellaris:"i-imgur-com_2F21dYgUx.jpg", fce:"i-imgur-com_2FgNtglD6.jpg", factorio:"i-imgur-com_2F9slqiIR.jpg", p2:"i-imgur-com_2FYCaKfCN.png", se:"i-imgur-com_2F49lF5zd.jpg", starbound:"i-imgur-com_2FR7PKAx0.png"};

var url = window.location.href;
var idx = url.indexOf("sitecore");
url = url.substring(idx+9);
idx = url.indexOf("/");
var game = "null";
if (idx >= 0) {
	url = url.substring(0, idx);
	game = url;
}

console.log("Current site section is "+game);

function applyBackground() {
	var img = images[game];
	if (img != null && url != "" && typeof(img) != "undefined") {
		document.body.style.backgroundImage = "url('/imagedownloads/"+img+"')";
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundSize = "cover";
		console.log("Setting background to "+img);
	}
	else {
		document.body.style.backgroundImage = "url('/images/text-bcg.png')";
		document.body.style.backgroundRepeat = "repeat";
		document.body.style.backgroundSize = "auto";
		
		var area = document.getElementsByClassName("textarea");
		for (var i = 0; i < area.length; i++) {
			area[i].className = "textarea-core";
		}
	}

	var list = document.getElementsByClassName("dynamic-core-game-reference");
	for (var i = 0; i < list.length; i++) {
		list[i].href = list[i].href.replace("[GAMENAME]", game);
		//console.log(list[i].href);
	}
}

document.addEventListener("DOMContentLoaded", applyBackground);