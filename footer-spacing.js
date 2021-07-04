function setFooterSize() {		
				let footer = document.getElementById('footer-block');
				if (footer == null || typeof(footer) == "undefined")
					return;
				let current = footer.getBoundingClientRect().bottom;
				let height = window.innerHeight;
				let diff = height-current;
				//console.log("Height diff = "+diff);
				let sp = document.getElementById('footer-spacing');
				if (sp == null || typeof(sp) == "undefined")
					return;
				sp.style.paddingTop = (diff < 0 ? 75 : diff-48)+"px";
				//console.log("Setting divider padding to "+sp.style.paddingTop);
			}
			
window.addEventListener("load", function(event) {setFooterSize()});