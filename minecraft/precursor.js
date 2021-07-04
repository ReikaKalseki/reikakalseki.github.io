import { getRandomBetween, getOrCreateImgPath} from '../library'

function populateObfBlocks() {
				var divs = document.getElementsByClassName('obfuscated-text-container');
				for (var i = 0; i < divs.length; i++) {
					let div = divs[i] as HTMLDivElement;
					let min = parseInt(div.dataset.minlength as string);
					let max = parseInt(div.dataset.maxlength as string);
					let amt = getRandomBetween(min, max);
					console.log("Generating "+amt+"/"+min+"-"+max+" precursor chars to fill div #"+i);
					let n = 0;
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
			
			function addChar(div:HTMLDivElement, num:number) {
				let img = document.createElement("img") as HTMLImageElement;  
						img.className = "precursor-char";
						let name = "lorescript_"+num;
						img.src = getOrCreateImgPath(name, "precursor");
						div.appendChild(img);
			}
			
window.addEventListener("load", function(event) {populateObfBlocks()});