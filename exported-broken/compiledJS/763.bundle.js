(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[763],{763:(e,t,n)=>{"use strict";function a(e){let t=e.dataset.value,n=document.getElementById("game-version-cache");n.innerHTML=t,n=document.getElementById("mod-version-list-"+t);let a=document.getElementById("modver-box");a.innerHTML="",n.scrollTop=0;for(var s=n.children,c=0;c<s.length;c++){let e=s[c],t=e.innerHTML,n=document.createElement("button");n.type="button",n.className="verbtn-mod",0==c&&(n.id="newestmodver"),n.dataset.value=t,n.dataset.date=e.dataset.date,n.dataset.modset=e.dataset.modset,n.innerHTML='<span><div class = "modver-width">'+t+'</div><i class="fas fa-angle-right"></i></span>',n.addEventListener("click",(function(){d(n)})),a.appendChild(n)}var m=document.getElementsByClassName("selver-game");for(c=0;c<m.length;c++)m[c].classList.remove("selver-game");e.classList.add("selver-game"),document.getElementById("changedata").innerHTML=document.getElementById("changedata-empty-cache").innerHTML,document.getElementById("changedata-header").innerHTML="Changes",l()}function d(e){let t=e.dataset.value,n=document.getElementById("mod-version-cache");n.innerHTML=t,n.dataset.date=e.dataset.date,n.dataset.modset=e.dataset.modset,""!=n.dataset.date&&(n.dataset.date=" ("+n.dataset.date+")");for(var a=document.getElementsByClassName("selver-mod"),d=0;d<a.length;d++)a[d].classList.remove("selver-mod");e.classList.add("selver-mod"),l()}function s(){var e=document.getElementsByClassName("modchangecheck");let t=document.getElementById("allmodcheck");for(var n=0;n<e.length;n++){let a=e[n];a!=t&&(a.checked=t.checked)}l()}function l(){let e=document.getElementById("changedata"),t=document.getElementById("game-version-cache"),n=document.getElementById("mod-version-cache"),a=t.innerHTML,d=n.innerHTML,s=!0;null!=d&&""!=d&&void 0!==d||(s=!1),s&&(e.innerHTML="",document.getElementById("changedata-header").innerHTML="Changes in "+d+" ["+a+"]"+n.dataset.date+":");let l=[];for(var c=document.getElementsByClassName("modchangecheck"),m=0;m<c.length;m++){let t=c[m],n=t.dataset.value;if("all"!=n&&1==t.checked&&(l.push(n),s)){var o=a+"|"+d+"|"+n,r=document.getElementById(o);null!=r&&(e.innerHTML+="<h3>"+t.dataset.mod+"</h3>"+r.innerHTML+"<br>")}}s&&""==e.innerHTML&&(e.innerHTML="There are no changes in this version for the mods you have selected.");let i=document.getElementsByClassName("verbtn-mod");for(m=0;m<i.length;m++){let e=i[m];e.dataset.modset.split("|").filter((e=>l.includes(e))).length>0?e.classList.remove("empty-mod"):e.classList.add("empty-mod")}}function c(){for(var e=document.getElementsByClassName("modchangecheck"),t=0;t<e.length;t++){let n=e[t];"all"==n.dataset.value?(n.addEventListener("click",s),n.id="allmodcheck"):n.addEventListener("click",l)}for(e=document.getElementsByClassName("verbtn-game"),t=0;t<e.length;t++){let n=e[t];n.addEventListener("click",(function(){a(n)}))}document.getElementById("newverbtn").addEventListener("click",(function(){a(document.getElementById("newestgamever")),d(document.getElementById("newestmodver"))}))}n.r(t),n.d(t,{default:()=>c})}}]);
//# sourceMappingURL=763.bundle.js.map