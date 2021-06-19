function setFooterSize() {		
				var footer = document.getElementById('footer-block');
				if (footer == null || typeof(footer) == "undefined")
					return;
				var current = footer.getBoundingClientRect().bottom;
				var height = window.innerHeight;
				var diff = height-current;
				//console.log("Height diff = "+diff);
				var sp = document.getElementById('footer-spacing');
				if (sp == null || typeof(sp) == "undefined")
					return;
				sp.style.paddingTop = (diff < 0 ? 40 : diff-48)+"px";
				//console.log("Setting divider padding to "+sp.style.paddingTop);
			}
			
window.addEventListener("load", function(event) {setFooterSize()});