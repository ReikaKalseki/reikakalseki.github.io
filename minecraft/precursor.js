function populateObfBlocks() {		
				var divs = document.getElementsByClassName('obfuscated-text-container');
				for (var i = 0; i < divs.length; i++) {
					var div = divs[i];
					var min = parseInt(div.dataset.minlength);
					var max = parseInt(div.dataset.maxlength);
					var amt = getRandomBetween(min, max);
					console.log("Generating "+amt+"/"+min+"-"+max+" precursor chars to fill div #"+i);
					var n = 0;
					for (var k = 0; k < amt; k++) {
						var num = getRandomBetween(0, 63);
						 addChar(div, num);
						 n++;
						if (Math.random() < 0.175 && n >= 2) {
							addChar(div, 64);
							n = 0;
						}
					}
				}
			}
			
			function addChar(div, num) {
				var img = document.createElement("img");  
						img.className = "precursor-char";
						var name = "lorescript_"+num;
						img.src = getOrCreateImgPath(name, "precursor");
						div.appendChild(img);
			}
			
window.addEventListener("load", function(event) {populateObfBlocks()});