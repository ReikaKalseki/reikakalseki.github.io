document.addEventListener("DOMContentLoaded", function(event) {
	var location = window.location.href;
	var idx = location.indexOf("game=");
	var gamepath = location.substring(idx+1+4);
	var style = document.getElementById("copied-stylesheet");
	if (style != null) {
		console.log("Handling style persistence from "+location+", parsed to game "+gamepath);
		style.href='/'+gamepath+'/local-style.css';
	}
	
	var backgroundgen = document.getElementById("background-script");
	if (backgroundgen != null) {
		var url = backgroundgen.src;
		var idx0 = url.indexOf("sitecore")+9;
		url = url.substring(0, idx0)+gamepath+"/"+url.substring(idx0);
		console.log("Importing background script "+url);
		var script = document.createElement("script");
		script.src = url;
		document.head.appendChild(script);
	}
})