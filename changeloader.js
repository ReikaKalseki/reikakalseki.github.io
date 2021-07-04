function setSelectedGameVersion(btn:HTMLButtonElement) {
 let ver = btn.dataset.value as string;
 let div = document.getElementById("game-version-cache") as HTMLDivElement;
 div.innerHTML = ver;
 
 div = document.getElementById("mod-version-list-"+ver) as HTMLDivElement;
 let box = document.getElementById("modver-box") as HTMLDivElement;
 box.innerHTML = "";
	var children = div.children;
	for (var i = 0; i < children.length; i++) {
	  let entry = children[i] as HTMLDivElement;
	  let name = entry.innerHTML;
	  
	  box.innerHTML += '<button type="button" class = "verbtn-mod" data-value = "'+name+'" data-date = "'+entry.dataset.date+'" onclick = "setSelectedModVersion(this)"><span><div class = "modver-width">'+name+'</div><i class="fas fa-angle-right"></i></span></button><br>'
	}
	
var list = document.getElementsByClassName("selver-game");
	for (var i = 0; i < list.length; i++) {
		list[i].classList.remove("selver-game");
	}
 btn.classList.add("selver-game");
 
 (document.getElementById("changedata") as HTMLDivElement).innerHTML = (document.getElementById("changedata-empty-cache") as HTMLDivElement).innerHTML;
(document.getElementById("changedata-header") as HTMLDivElement).innerHTML = "Changes";
}

function setSelectedModVersion(btn:HTMLButtonElement) {
 let ver = btn.dataset.value as string;
 let div = document.getElementById("mod-version-cache") as HTMLDivElement;
 div.innerHTML = ver;
 div.dataset.date = btn.dataset.date;
 if (div.dataset.date != "")
	div.dataset.date = " ("+div.dataset.date+")";
 //console.log(ver+" on "+div.dataset.date);
var list = document.getElementsByClassName("selver-mod");
	for (var i = 0; i < list.length; i++) {
		list[i].classList.remove("selver-mod");
	}
 btn.classList.add("selver-mod");
 updateChangeData();
}

function updateChangeData() {
  let text = document.getElementById("changedata") as HTMLDivElement;
			let gv = document.getElementById("game-version-cache") as HTMLDivElement;
			let mv = document.getElementById("mod-version-cache") as HTMLDivElement;
			let gameVer = gv.innerHTML;
			let modVer = mv.innerHTML;
			if (modVer == null || modVer == "" || typeof(modVer) == "undefined")
		return;				
 // text.innerHTML = "<h2 class = \"changelog-version-title\">"+modVer+" ["+gameVer+"]"+mv.dataset.date+"</h2>";
 text.innerHTML = "";
  
  let header = document.getElementById("changedata-header") as HTMLDivElement;
  header.innerHTML = "Changes in "+modVer+" ["+gameVer+"]"+mv.dataset.date+":";
  
  var list = document.getElementsByClassName("modchangecheck");
	for (var i = 0; i < list.length; i++) {
		let obj = list[i] as HTMLInputElement;
		if (obj.checked == true) {
			var mod = obj.dataset.value;
			var key = gameVer+"|"+modVer+"|"+mod;
			var div = document.getElementById(key);
			//console.log("'"+key+"' > "+div);
			if (div != null) {
				text.innerHTML += "<h3>"+obj.dataset.mod+"</h3>"+div.innerHTML+"<br>";
			}
        }
	}
}