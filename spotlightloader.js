function setVideoBox(url:string|undefined) {
	let embed = '<iframe width="960" height="540" src="';
	embed += url;
	embed += '"></iframe>';
	(document.getElementById("spotlight-box") as HTMLDivElement).innerHTML = embed;
}

function onButtonClick(this:HTMLButtonElement) {
	var type = this.dataset.type;
	if (type == "link") {
		window.open(this.dataset.url);
	}
	else if (type == "video") {
		setVideoBox(this.dataset.url);
	}
	else {
		alert("Unrecognized spotlight format '"+type+"'!");
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	var list = document.getElementsByClassName("spotbtn");
	for (var i = 0; i < list.length; i++) {
		let btn = list[i] as HTMLButtonElement;
		btn.onclick = onButtonClick.bind(btn);
	}
});