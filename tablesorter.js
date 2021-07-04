//source calls: <button class = "table-sorting-button" data-column = "$prop.name()" data-reverse = "false" data-target = "map-table-content" data-source = "maps-${prop.name()}" onclick="sortTable(this)" ><i class="fas fa-sort"></i></button>

function sortTable(btn:HTMLButtonElement) {
 let column = btn.dataset.column as string;
 let srcname = btn.dataset.source as string;
 console.log("from "+btn.dataset.reverse);
 if (btn.dataset.reverse == "true") {
	 btn.dataset.reverse = "false";
	 srcname = srcname+"-rev";
 }
 else {
	 btn.dataset.reverse = "true";
 }
 console.log("to "+btn.dataset.reverse);
 let srcdiv = document.getElementById(srcname) as HTMLDivElement;
 let tgtdiv = document.getElementById((btn.dataset.target) as string) as HTMLDivElement;
//	console.log(srcdiv.innerHTML);
 tgtdiv.innerHTML = srcdiv.innerHTML;
 
    var btns = document.getElementsByClassName("table-sorting-button");
    for(var i = 0; i < btns.length; i++){
        if(btn != btns[i]){
            (btns[i] as HTMLButtonElement).dataset.reverse = "false"
        }
    }
}