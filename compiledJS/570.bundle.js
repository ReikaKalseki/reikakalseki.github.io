(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[570],{212:(t,e,n)=>{"use strict";n.d(e,{M:()=>r});const r=!1;document.addEventListener("DOMContentLoaded",(function(){!function(){if(r){for(var t=document.getElementsByClassName("deembed-media");t.length>0;){let n=t[0],r=n.parentNode;if("VIDEO"==r.tagName){let t=document.createElement("div");t.innerHTML='<a href = "'+n.src+'">'+n.src+"</a>",r.parentNode.replaceChild(t,r)}else if("video"==r.className){var e=n.src.replace("embed/","watch?v=");r.innerHTML='<a href = "'+e+'">'+e+"</a>"}else"header-image"!=r.className?r.innerHTML=n.src+"<br>":r.innerHTML="";console.log("Hiding media '"+n.src+"'")}for(var n=document.getElementsByClassName("textarea"),a=0;a<n.length;a++)n[a].style.width="33%";let r=document.createElement("div");r.innerHTML="<div style = 'text-align: center; width: 33%; margin: auto; border: 3px solid red;'><h2 style = 'color: red; margin: 12px;'>This site is not designed for use on phones and other handheld devices, nor is any of its content relevant on such platforms. You may continue to browse it this way if you wish, but it is recommended that you visit the site with a proper computer.</h2></div>";let o=document.getElementById("navbar");o.parentNode.insertBefore(r,o.nextSibling);let i=document.getElementById("toc_container");i.parentNode.removeChild(i)}}()}))},570:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>b});var r=n(452),a=n(212);let o=999,i=0;function l(t,e,n,a,o,i){var l=document.createElementNS("http://www.w3.org/2000/svg","image");l.setAttributeNS(null,r.yJ,(0,r.Jj)(o)),l.setAttributeNS(null,r.eT,(0,r.Yh)(i)),l.setAttributeNS("http://www.w3.org/1999/xlink","href",(0,r.Fq)(e,"fceblocks")),l.setAttributeNS(null,r.HP,n.toString()),l.setAttributeNS(null,r.rR,a.toString()),l.setAttributeNS(null,r.pX,r.yK),t.appendChild(l)}function s(t,e,n){"cave"==n&&console.log("ERROR: ADDED CAVE ON NULL"),t[e]=[],t[e].push(n)}function h(t,e,n){null==t[e]||0==t[e].length?s(t,e,n):t[e][0]=n}function c(t,e,n){t[e].push(n)}function u(t,e){var n=t[e];return null==n||0==n.length?null:n[n.length-1]}function d(t,e){var n=t[e];return 0==n.length?null:n[0]}function m(t,e,n,r,a,o){var i=e/n;let l=r[t];var s=a[t],h=(o[t],"rock"),c=i-(l-.1);c>=0&&Math.random()*Math.random()*Math.random()*.8<c&&(h="bedrock");var u=i-(s-.1);return u>=0&&Math.random()*Math.random()*Math.random()*.8<u&&(h="deepstone"),h}function f(t,e,n,r,a,o,i){return i}function M(t,e,n,a,o,i,l,m,f){for(var M=function(t,e,n){var r=e/n,a=r<.2?1:1+.75*(r-.2);switch(t){case"hardresin":return[5,5];case"cave":return[2*a,4*a];case"biomass":return[1*a,1.5*a];case"coal":return[1.5*a,2*a];default:return[1.5*a,3*a]}}(i,o,t),v=.675*(0,r.sT)(M[0],M[1]),p=Math.max(0,Math.floor(a-v)),y=Math.max(0,Math.floor(o-v)),b=Math.min(e-1,Math.floor(a+v)),w=Math.min(t-1,Math.floor(o+v)),x=.75,N=(0,r.sT)(-x,x),S=(0,r.sT)(-x,x),k="hardresin"==i?0:"cave"==i?3.5*v:2*v,Y=0;Y<=k;Y++)for(var A=p;A<=b;A++)for(var E=y;E<=w;E++){var C=A-a,H=E-o;if(C*C+H*H<=v*v+.25){var T=Math.floor(A+Y*N),_=Math.floor(E+Y*S);let t=(0,r.Yy)(e,T,_);if("hardresin"==i)s(n,t,i);else if("cave"==i){if(null!=n[t]&&n[t].length>0){var L=u(n,t);if("cave"!=L&&"lava"!=L&&"crystal"!=L&&"magmarock"!=L&&"hardresin"!=L){var B=0==_?-1:(0,r.Yy)(e,T,_-1);(B<0||null!=n[B]&&n[B].length>0&&"lava"!=u(n,B))&&c(n,t,i)}}}else(null==n[t]||g(i,d(n,t)))&&h(n,t,i)}}}function g(t,e){return"hardresin"==t||("biomass"==t?null!=e&&e.startsWith("deepstone_g"):"deepstone"==e||"bedrock"==e||"rock"==e)}function v(t,e,n,r,a,o){var i=n/t,l=["coal","copper","tin"];return i>r[e]-.12&&l.push("iron"),i>r[e]-.06&&l.push("lithium"),i>r[e]+.05&&(l.push("gold"),l.push("nickel"),l.push("titanium")),Math.abs(i-a[e])<=.1&&l.push("biomass"),i>a[e]+.05&&l.push("chromium"),l[Math.floor(Math.random()*l.length)]}function p(t,e,n,r,a){var o=t/e,i=[];return o<n/2&&i.push("diamond"),o>n/2&&o<n-.04&&i.push("emerald"),o>n+.02&&o<(n+r)/2&&i.push("ruby"),o>(n+r)/2&&o<r-.04&&i.push("sapphire"),Math.abs(o-r)<.05&&i.push("topaz"),o>r+.07&&i.push("sugalite"),0==i.length?null:i[Math.floor(Math.random()*i.length)]}function y(t,e,n,r,a,o){r*=.85,a*=.85,o*=.85;var i=document.createElementNS("http://www.w3.org/2000/svg","ellipse");i.setAttributeNS(null,"cx",(16*(e+.5)*2).toString()),i.setAttributeNS(null,"cy",(16*(n+.5)*2).toString()),i.setAttributeNS(null,"rx",160..toString()),i.setAttributeNS(null,"ry",160..toString()),i.setAttributeNS(null,"fill","rgb("+r+", "+a+", "+o+")"),i.setAttributeNS(null,"style","mix-blend-mode: screen; filter: blur(32px);"),t.appendChild(i)}function b(){if(a.M)return;let t=document.body,e=document.documentElement,n=Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight)-64,h=document.getElementsByClassName("title-image")[0];null==h||null==h.src||""==h.src||h.src==window.location.href?n+=72:n+=48;let d=Math.max(n,window.innerHeight,document.body.clientHeight),g=Math.max(window.innerWidth,document.body.clientWidth),b=Math.ceil(d/32)+1,w=Math.ceil(g/32),x=32*w,N=32*b;console.log("Generating FCE chunk slice tileset with "+w+" columns and "+b+" rows");let S=document.createElementNS("http://www.w3.org/2000/svg","svg");S.setAttributeNS(null,"width",x.toString()),S.setAttributeNS(null,"height",N.toString());let k=new Array(w*b),Y=new Array(w),A=new Array(w),E=new Array(w);for(var C=0;C<w;C++)Y[C]=(0,r.sT)(.22,.28),A[C]=(0,r.sT)(.45,.55),E[C]=(0,r.sT)(.87,.95),C>0&&(Y[C]=Math.max(Math.min(Y[C],Y[C-1]+1),Y[C-1]-1),A[C]=Math.max(Math.min(A[C],A[C-1]+2),A[C-1]-2),E[C]=Math.max(Math.min(E[C],E[C-1]+1),E[C-1]-1));for(C=0;C<w;C++)for(var H=0;H<b;H++){let t=m(C,H,b,Y,A,E),e=(0,r.Yy)(w,C,H);k[e]=null,s(k,e,t)}!function(t,e,n,a,l,h){for(var d=-1,m=-1,f=-1,M=-1,g=-1,v=-1,p=(0,r.sc)(-3,4),y=(0,r.sc)(-3,4),b=Math.max(1,t/100),w=0;w<e;w++){var x=Math.floor(a[w]*t)-(0,r.sc)(1,4)*b,N=Math.floor(a[w]*t)+(0,r.sc)(0,1)*b,S=Math.floor(l[w]*t)-(0,r.sc)(2,4)*b,k=Math.floor(l[w]*t)+(0,r.sc)(2,4)*b,Y=Math.floor(h[w]*t)-(0,r.sc)(2,4)*b,A=Math.floor(h[w]*t)+(0,r.sc)(1,3)*b;w>0&&(x=Math.max(Math.min(x,d+.5),d-.5),N=Math.max(Math.min(N,m+.25),m-.25),S=Math.max(Math.min(S,M+1),M-1),k=Math.max(Math.min(k,f+.5),f-.5),Y=Math.max(Math.min(Y,v+1),v-1),A=Math.max(Math.min(A,g+.25),g-.25)),o=Math.min(o,Math.floor(Y)),i=Math.max(i,Math.ceil(A));for(var E=0;E<t;E++){var C=(0,r.Yy)(e,w,E);E>=x&&E<=N&&(s(n,C,"deepstone_b1"),E!=Math.ceil(x)&&E!=Math.floor(N)&&c(n,C,"cave")),E>=S&&E<=k&&(s(n,C,"deepstone_g1"),E!=Math.ceil(S)&&E!=Math.floor(k)&&c(n,C,"cave")),E>=Y&&E<=A&&(E!=Math.floor(A)&&E>=Math.floor(.95*t)-1*b?s(n,C,"lava"):(s(n,C,"deepstone_o1"),E!=Math.ceil(Y)&&E!=Math.floor(A)&&c(n,C,"cave")))}for(var H=S-N,T=Y-k,_=Math.min(6,Math.max(1,Math.floor(Math.min(H,T)/4))),L=Math.min(6,6/_),B=-_;B<0;B++){var D=6==L?3:Math.floor((1-B)*L);D<=6&&(s(n,(0,r.Yy)(e,w,B+Math.ceil(x)),"deepstone_b"+D),s(n,(0,r.Yy)(e,w,-B+Math.floor(N)),"deepstone_b"+D),s(n,(0,r.Yy)(e,w,B+Math.ceil(S)),"deepstone_g"+D),s(n,(0,r.Yy)(e,w,-B+Math.floor(k)),"deepstone_g"+D),s(n,(0,r.Yy)(e,w,B+Math.ceil(Y)),"deepstone_o"+D),s(n,(0,r.Yy)(e,w,-B+Math.floor(A)),"deepstone_o"+D))}m=N,d=x,f=k,M=S,g=A,v=Y;var I=!1;if(p<=-4&&(p=(0,r.sc)(2,4),I=!0),p>0){var J=x+1,O=N-1;for((I||1==p)&&(J=(0,r.sc)(J,J+1),O=Math.max(J,(0,r.sc)(O-3,O))),E=J;E<=O;E++)s(n,C=(0,r.Yy)(e,w,E),"crystal")}if(p--,y<=-4&&(y=(0,r.sc)(1,4)),y>0)for(J=Y+1,O=A-1,E=J=(0,r.sc)(J,J+3);E<=O;E++)"cave"==u(n,C=(0,r.Yy)(e,w,E))&&s(n,C,"magmarock");y--}}(b,w,k,Y,A,E),function(t,e,n,r,a,o){for(var i=t*e/32,l=0;l<i;l++){var s=Math.floor(Math.random()*e),h=Math.floor(Math.random()*t);M(t,e,n,s,h,v(t,s,h,r,a))}}(b,w,k,Y,A),function(t,e,n,a,o,i){for(var l=0;l<t/2.5;l++)M(t,e,n,(0,r.sc)(0,e),(0,r.sc)(0,t),"cave")}(b,w,k),function(t,e,n,a,o,i){for(var l=0;l<t/40;l++){var s=(0,r.sc)(6,e-6);M(t,e,n,s,(0,r.sc)(Math.floor(a[s]*t/2),Math.floor(i[s]*t-12)),"hardresin")}}(b,w,k,Y,0,E),function(t,e,n){for(var a=(0,r.sc)(0,4),o=0;o<e;o++){for(var i=Math.max(a-1,Math.min(a+1,(0,r.sc)(0,4))),l=0;l<i;l++)s(n,(0,r.Yy)(e,o,l),"resin");a=i}}(0,w,k);let T=function(t,e,n,a,o,i){for(var l=[],s=0;s<3*t;s++){var h=(0,r.sc)(2,e-2),d=(0,r.sc)(6,t-2),m=p(d,t,a[h],o[h],i[h]);if(null!=m){var f=(0,r.Yy)(e,h,d),M=u(n,f),g=u(n,(0,r.Yy)(e,h,d+1));"cave"==M&&"cave"!=g&&(c(n,f,"gem_"+m),l.push({x:h,y:d,type:m}))}}return l}(b,w,k,Y,A,E);for(function(t,e,n,a){for(var s=0,h=0,c=0;c<e;c++){s=0;for(var u=0;u<n;u++){let e=a[(0,r.Yy)(n,u,c)];if(r.hm&&e.length>0&&"cave"!=e[e.length-1]&&!e[e.length-1].startsWith("gem")&&"lava"!=e[e.length-1]&&(c<o||c>i)){var d=0==c?["cave"]:a[(0,r.Yy)(n,u,c-1)];d.length>0&&"cave"==d[d.length-1]&&e.push("snow")}for(var m=0;m<e.length;m++){var M=e[m];l(t,M=f(0,0,0,0,0,0,M),s,h,32,32)}s+=32}h+=32}}(S,b,w,k),C=0;C<T.length;C++){let t=T[C],e=0,n=0,r=0;switch(t.type){case"diamond":e=224,n=234,r=240;break;case"emerald":e=78,n=221;break;case"ruby":e=229,n=19;break;case"sapphire":e=36,n=87,r=242;break;case"topaz":e=245,n=195,r=67;break;case"sugalite":e=195,n=22,r=229}y(S,t.x,t.y,e,n,r)}let _="background-content",L=document.getElementById(_);for(null==L&&(L=document.createElement("div"),L.id=_,console.log("Injecting background element."),document.body.prepend(L));L.firstChild;)L.removeChild(L.firstChild);L.appendChild(S)}},452:(t,e,n)=>{"use strict";n.d(e,{XV:()=>o,hm:()=>s,Jt:()=>h,pX:()=>c,yK:()=>u,HP:()=>d,rR:()=>m,eT:()=>f,yJ:()=>M,sc:()=>w,sT:()=>x,Fq:()=>N,Jj:()=>S,Yh:()=>k,Yy:()=>Y});let r={};const a=new Date,o=a.getSeconds(),i=a.getMonth(),l=a.getDate(),s=11==i||0==i&&l<=10,h=9==i&&l>=10,c="visibility",u="visible",d="x",m="y",f="height",M="width";let g,v,p=-1,y=-1,b={};function w(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function x(t,e){return Math.random()*(e-t)+t}function N(t,e){return null==b[t]&&(b[t]=function(t){if(null==r[t]||void 0===r[t]){for(var e="images/"+t+"/",n=window.location.href,a=n.indexOf("sitecore"),o=(n=n.substring(a+9)).split("/").length-1,i=0;i<o;i++)e="../"+e;r[t]=e}return r[t]}(e)+t+".png"),b[t]}function S(t){return p!=t&&(p=t,g=p.toString()),g}function k(t){return y!=t&&(y=t,v=y.toString()),v}function Y(t,e,n){return e+n*t}}}]);
//# sourceMappingURL=570.bundle.js.map