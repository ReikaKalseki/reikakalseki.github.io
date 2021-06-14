function setSelectedGameVersion(btn) {
 var ver = btn.dataset.value;
 var div = document.getElementById("game-version-cache");
 div.innerHTML = ver;
 
 div = document.getElementById("mod-version-list-"+ver);
 var box = document.getElementById("modver-box");
 box.innerHTML = "";
	var children = div.children;
	for (var i = 0; i < children.length; i++) {
	  var entry = children[i];
	  var name = entry.innerHTML;
	  
	  box.innerHTML += '<button type="button" class = "verbtn" data-value = "'+name+'" data-date = "'+entry.dataset.date+'" onclick = "setSelectedModVersion(this)"><span>'+name+'<div class = "spacer"></div><i class="fas fa-angle-right"></i></span></button><br>'
	}
}

function setSelectedModVersion(btn) {
 var ver = btn.dataset.value;
 var div = document.getElementById("mod-version-cache");
 div.innerHTML = ver;
 div.dataset.date = btn.dataset.date;
 if (div.dataset.date != "")
	div.dataset.date = " ("+div.dataset.date+")";
 //console.log(ver+" on "+div.dataset.date);
 updateChangeData();
}

function updateChangeData() {
  var text = document.getElementById("changedata");
			var gv = document.getElementById("game-version-cache");
			var mv = document.getElementById("mod-version-cache");
			var gameVer = gv.innerHTML;
			var modVer = mv.innerHTML;
  text.innerHTML = "<h2>"+modVer+" ["+gameVer+"]"+mv.dataset.date+"</h2><br>";
  var list = document.getElementsByClassName("modchangecheck");
	for (var i = 0; i < list.length; i++) {
		if (list[i].checked == true) {
			var mod = list[i].dataset.value;
			var key = gameVer+"|"+modVer+"|"+mod;
			var div = document.getElementById(key);
			//console.log("'"+key+"' > "+div);
			if (div != null) {
				text.innerHTML += "<h3>"+list[i].dataset.mod+"</h3>"+div.innerHTML+"<br>";
			}
        }
	}
}