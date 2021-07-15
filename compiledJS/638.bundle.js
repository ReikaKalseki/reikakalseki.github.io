(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[638],{938:(t,e,n)=>{"use strict";function r(t,e,n){var r,i,o;void 0===e&&(e=50),void 0===n&&(n={});var l=null!=(r=n.isImmediate)&&r,a=null!=(i=n.callback)&&i,c=n.maxWait,s=Date.now(),u=[];function d(){if(void 0!==c){var t=Date.now()-s;if(t+e>=c)return c-t}return e}var y=function(){var e=[].slice.call(arguments),n=this;return new Promise((function(r,i){var c=l&&void 0===o;if(void 0!==o&&clearTimeout(o),o=setTimeout((function(){if(o=void 0,s=Date.now(),!l){var r=t.apply(n,e);a&&a(r),u.forEach((function(t){return(0,t.resolve)(r)})),u=[]}}),d()),c){var y=t.apply(n,e);return a&&a(y),r(y)}u.push({resolve:r,reject:i})}))};return y.cancel=function(t){void 0!==o&&clearTimeout(o),u.forEach((function(e){return(0,e.reject)(t)})),u=[]},y}n.d(e,{D:()=>r})},638:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>u});var r=n(938),i=n(621),o=n(212);const l=2048;function a(t,e,n,r,o,l,a){if(a){let i=document.createElement("div");i.className="tile-stellaris-"+e,i.setAttribute("style","mix-blend-mode: screen;"),i.style.position="absolute",i.style.top=r.toString()+"px",i.style.left=n.toString()+"px",i.style.width=o.toString()+"px",i.style.height=l.toString()+"px",t.appendChild(i)}else{e=function(t,e,n){return n}(0,0,e);var c=document.createElementNS("http://www.w3.org/2000/svg","image");c.setAttributeNS(null,i.yJ,o.toString()),c.setAttributeNS(null,i.eT,l.toString()),c.setAttributeNS("http://www.w3.org/1999/xlink","href",(0,i.Fq)(e,"stellaris")),c.setAttributeNS(null,i.HP,n.toString()),c.setAttributeNS(null,i.rR,r.toString()),c.setAttributeNS(null,i.pX,i.yK),t.appendChild(c)}}function c(t,e,n){if(e.connections.includes(n))n.connections.includes(e)||n.connections.push(e);else{var r=document.createElementNS("http://www.w3.org/2000/svg","line");r.setAttributeNS(null,"x1",(e.x+16).toString()),r.setAttributeNS(null,"y1",(e.y+16).toString()),r.setAttributeNS(null,"x2",(n.x+16).toString()),r.setAttributeNS(null,"y2",(n.y+16).toString()),r.setAttributeNS(null,"stroke","rgb(0, 212, 255)"),i.hm&&(Math.random()<.5?r.setAttributeNS(null,"stroke","rgb(255, 0, 0)"):r.setAttributeNS(null,"stroke","rgb(0, 192, 0)")),r.setAttributeNS(null,"stroke-width","2"),r.setAttributeNS(null,"style","mix-blend-mode: screen;"),t.appendChild(r),e.connections.push(n),n.connections.push(e)}}function s(t){if(2==t.length)return{p1:[t[0]],p2:[t[1]]};let e=new Array,n=new Array,r=t.length-1,i=new Array,o=new Array,l=new Array,a=new Array;i[0]=0,o[0]=2,l[0]=1,a[0]=t[0]+2*t[1];for(var c=1;c<r-1;c++)i[c]=1,o[c]=4,l[c]=1,a[c]=4*t[c]+2*t[c+1];for(i[r-1]=2,o[r-1]=7,l[r-1]=0,a[r-1]=8*t[r-1]+t[r],c=1;c<r;c++){var s=i[c]/o[c-1];o[c]=o[c]-s*l[c-1],a[c]=a[c]-s*a[c-1]}for(e[r-1]=a[r-1]/o[r-1],c=r-2;c>=0;--c)e[c]=(a[c]-l[c]*e[c+1])/o[c];for(c=0;c<r-1;c++)n[c]=2*t[c+1]-e[c+1];return n[r-1]=.5*(t[r]+e[r-1]),{p1:e,p2:n}}function u(){if(o.M)return;let t=document.body,e=document.documentElement;var n=Math.max(t.offsetHeight,e.clientHeight,e.offsetHeight,window.innerHeight,document.body.clientHeight),r=Math.max(window.innerWidth,document.body.clientWidth);console.log("Generating stellaris galaxy map background");let u=document.createElementNS(i.DI,"svg");u.setAttributeNS(null,"width",r.toString()),u.setAttributeNS(null,"height",n.toString());for(var d=0;d<r;d+=l)for(var y=0;y<n;y+=l)a(u,"starfield",d,y,l,l,!1);let h=43.2,g=Math.ceil(r/96),f=Math.ceil(n/96),m=new Array(g*f);for(d=0;d<g;d++)for(y=0;y<f;y++){var p=96*(d+.5),x=96*(y+.5),v=(0,i.sc)(p-h,p+h),S=(0,i.sc)(x-h,x+h),b=Math.random(),w={image:b<.04?"hole":b<.1?"pulsar":b<.15?"neutron":"star"+(0,i.sc)(0,7),x:v,y:S,cx:d,cy:y,index:(0,i.Yy)(g,d,y),connections:[]};m[w.index]=w}let A=m[(0,i.Yy)(g,(0,i.sc)(4,g-4),(0,i.sc)(4,f-4))];for(d=0;d<m.length;d++)(E=m[d]).cx>0&&Math.random()<.33&&(k=m[(0,i.Yy)(g,E.cx-1,E.cy)]).connections.length<3&&c(u,E,k),E.cy>0&&Math.random()<.33&&(k=m[(0,i.Yy)(g,E.cx,E.cy-1)]).connections.length<3&&c(u,E,k);for(d=0;d<m.length;d++){if((E=m[d]).connections.length,E==A){for(c(u,E,m[(0,i.Yy)(g,E.cx-1,E.cy)]),c(u,E,m[(0,i.Yy)(g,E.cx+1,E.cy)]),c(u,E,m[(0,i.Yy)(g,E.cx,E.cy-1)]),c(u,E,m[(0,i.Yy)(g,E.cx,E.cy+1)]),E.meiza=E.connections[(0,i.sc)(0,3)],E.reylana=E.meiza;E.reylana==E.meiza;)E.reylana=E.connections[(0,i.sc)(0,3)];for(E.freyskol=E.meiza;E.freyskol==E.meiza||E.freyskol==E.reylana;)E.freyskol=E.connections[(0,i.sc)(0,3)];for(E.lanka=E.meiza;E.lanka==E.meiza||E.lanka==E.reylana||E.lanka==E.freyskol;)E.lanka=E.connections[(0,i.sc)(0,3)]}if(E.cx>0)c(u,E,k=m[(0,i.Yy)(g,E.cx-1,E.cy)]);else if(E.cy>0)c(u,E,k=m[(0,i.Yy)(g,E.cx,E.cy-1)]);else if(Math.random()<.33)c(u,E,k=m[(0,i.Yy)(g,E.cx+1,E.cy)]);else{var k;c(u,E,k=m[(0,i.Yy)(g,E.cx,E.cy+1)])}}A.meiza.image="pulsar",A.reylana.image="star1",A.freyskol.image="star6",A.lanka.image="star4",A.image="star0",function(t,e,n,r,o){let l=[],c=[];l.push(o),o.borderDistance=-1;for(var u=(0,i.sc)(4,9),d=0;d<u;d++){let t=[];for(var y=0;y<l.length;y++){let e=l[y];if(void 0!==e.connections&&e.connections.length>0)for(var h=0;h<e.connections.length;h++){let n=e.connections[h];l.includes(n)||t.includes(n)||t.push(n)}}for(y=0;y<t.length;y++)l.push(t[y]),t[y].borderDistance=d,t[y].isAleran=!0}for(d=0;d<l.length;d++){var g=l[d];if(void 0!==g.connections&&g.connections.length>0)for(y=0;y<g.connections.length;y++){var f=g.connections[y];if(!l.includes(f)){let t={x:(g.x+f.x+32)/2,y:(g.y+f.y+32)/2};t.angle=Math.atan2(t.y-16-o.y,t.x-16-o.x),c.push(t),g.isAleranBorder=!0}}}c.sort(((t,e)=>t.angle-e.angle));for(var m=c,p=s(m.map((t=>t.x))),x=s(m.map((t=>t.y))),v=m[0],S="M"+v.x+" "+v.y,b=(d=0,m.length-1);d<b;d++){var w={x:p.p1[d],y:x.p1[d]},A={x:p.p2[d],y:x.p2[d]};S=S+" C "+w.x+" "+w.y+" "+A.x+" "+A.y+" "+m[d+1].x+" "+m[d+1].y}(function(t,e){var n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttributeNS(null,"stroke","#785FB6"),n.setAttributeNS(null,"stroke-width","15"),n.setAttributeNS(null,"fill","#785FB6"),n.setAttributeNS(null,"fill-opacity","0.4"),n.setAttributeNS(null,"stroke-opacity","0.85"),n.setAttributeNS(null,"d",e),t.appendChild(n)})(t,S+=" Z"),a(t,"aleran",o.x-128,o.y-128,256,256,!1)}(u,0,0,0,A);let N="background-content",C=document.getElementById(N);for(null==C&&(C=document.createElement("div"),C.id=N,console.log("Injecting background element."),document.body.prepend(C));C.firstChild;)C.removeChild(C.firstChild);for(C.appendChild(u),u=document.createElement("div"),u.id="bcg-stars",u.style.position="absolute",u.style.width=r.toString()+"px",u.style.height=n.toString()+"px",d=0;d<m.length;d++){var E;a(u,(E=m[d]).image,E.x,E.y,32,32,!0)}C.appendChild(u),C.style.width=r.toString()+"px",C.style.height=n.toString()+"px"}window.addEventListener("resize",(0,r.D)(u,100))}}]);
//# sourceMappingURL=638.bundle.js.map