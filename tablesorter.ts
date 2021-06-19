//source calls: <button class = "table-sorting-button" data-column = "$prop.name()" data-reverse = "false" data-target = "map-table-content" data-source = "maps-${prop.name()}" onclick="sortTable(this)" ><i class="fas fa-sort"></i></button>

function sortTable(btn) {
 var column = btn.dataset.column;
 var srcname = btn.dataset.source;
 console.log("from "+btn.dataset.reverse);
 if (btn.dataset.reverse == "true") {
	 btn.dataset.reverse = "false";
	 srcname = srcname+"-rev";
 }
 else {
	 btn.dataset.reverse = "true";
 }
 console.log("to "+btn.dataset.reverse);
 var srcdiv = document.getElementById(srcname);
 var tgtdiv = document.getElementById(btn.dataset.target);
//	console.log(srcdiv.innerHTML);
 tgtdiv.innerHTML = srcdiv.innerHTML;
 
    var btns = document.getElementsByClassName("table-sorting-button");
    for(var i = 0; i < btns.length; i++){
        if(btn != btns[i]){
            btns[i].dataset.reverse = "false"
        }
    }
}