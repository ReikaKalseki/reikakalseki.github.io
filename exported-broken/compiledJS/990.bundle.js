(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[990],{990:(t,e,l)=>{"use strict";l.r(e),l.d(e,{default:()=>u});var r=l(621),o=l(212);const a={red:(0,r.$W)("ff0000"),orange:(0,r.$W)("FF7F00"),yellow:(0,r.$W)("ffD800"),green:(0,r.$W)("00ff00"),cyan:(0,r.$W)("00ffff"),argon:(0,r.$W)("4CCCFF"),blue:(0,r.$W)("0045ff"),purple:(0,r.$W)("A426FF"),magenta:(0,r.$W)("FF00FF"),white:(0,r.$W)("ffffff")},i=["argon","argon","purple","red","yellow","yellow","orange","purple","green","magenta","blue"];function s(t,e,l,r){let o=document.createElement("div");return o.className="tile-factorio-"+e,"air"!=e&&null!=e||(o.style.width=l.toString()+"px",o.style.height=r.toString()+"px"),t.appendChild(o),o}function n(t,e,l,r,o,a,i=1){let n=s(t,e,l,r);return n.style.position="relative",n.style.left=o.toString()+"px",n.style.top=a.toString()+"px",null!=e&&void 0!==e&&e.startsWith("oil")&&(i*=1.5),n.style.transformOrigin="top left",n.style.transform="scale("+i+")","spawner"==e&&(n.style.transform=n.style.transform+" translate(-16px)"),n}function h(t,e,l,o,a){for(var i=32*a,n=32*a,h=0;h<e;h++){let e=document.createElement("div");for(var f=0;f<l;f++){let t=(0,r.Yy)(l,f,h),a=o[t];a=c(o,0,l,f,h,0,a),s(e,a,i,n)}t.appendChild(e)}(0,r.xE)(t,1)}function c(t,e,l,o,a,i,s){if(null!=s&&void 0!==s&&s.startsWith("belt")&&7==s.length)s=function(t,e,l,o,a,i,s){var n=(0,r.Yy)(l,o-1,a),h=(0,r.Yy)(l,o+1,a),c=(0,r.Yy)(l,o,a-1),f=(0,r.Yy)(l,o,a+1);return t[n]!=t[h]||"belt-left"!=t[n]&&"belt-right"!=t[n]?"belt-dr"!=t[n]&&"belt-ur"!=t[n]||"belt-right"!=t[h]?"belt-dl"!=t[h]&&"belt-ul"!=t[h]||"belt-left"!=t[n]?"belt-dr"!=t[n]&&"belt-ur"!=t[n]&&"belt-right"!=t[n]||"belt-left"!=t[h]&&"belt-dl"!=t[h]&&"belt-ul"!=t[h]?t[c]!=t[f]||"belt-up"!=t[f]&&"belt-down"!=t[f]?"belt-lu"!=t[f]&&"belt-ru"!=t[f]||"belt-up"!=t[c]?"belt-ld"!=t[c]&&"belt-rd"!=t[c]||"belt-down"!=t[f]?"belt-down"!=t[c]&&"belt-rd"!=t[c]&&"belt-ld"!=t[c]||"belt-up"!=t[f]&&"belt-ru"!=t[f]&&"belt-lu"!=t[f]?s:"belt-right"==s||"belt-dr"==s||"belt-ur"==s?"belt-right":"belt-left":"belt-down":"belt-up":t[f]:"belt-down"==s||"belt-ld"==s||"belt-rd"==s?"belt-down":"belt-up":"belt-left":"belt-right":t[n]}(t,0,l,o,a,0,s);else if("blocker"==s)return"air";return s}function f(t,e,l){var o=0,a=0,i=0,s=0,n="";switch((0,r.sc)(0,3)){case 0:o=(0,r.sc)(0,e-1),a=t-1,s=-1,n="up";break;case 1:o=0,a=(0,r.sc)(0,t-1),i=1,n="right";break;case 2:o=(0,r.sc)(0,e-1),a=0,s=1,n="down";break;case 3:o=e-1,a=(0,r.sc)(0,t-1),i=-1,n="left"}for(var h=!0,c=o,f=a,y=0;h;){var u=n,p=n,m=(0,r.Yy)(e,c,f);if("air"!=l[m])break;var g=Math.random(),b=Math.min(.35,.066*y),M=!d(l,e,t,c,f,i,s);if(g<b||M){y=0;var x=-1!=s&&d(l,e,t,c,f,0,1),v=1!=s&&d(l,e,t,c,f,0,-1),w=1!=i&&d(l,e,t,c,f,-1,0),Y=-1!=i&&d(l,e,t,c,f,1,0),k=[];if(x&&k.push("down"),v&&k.push("up"),w&&k.push("left"),Y&&k.push("right"),k.length>1&&(k=k.filter((t=>t!=u))),k.length>0)switch(k[Math.floor(Math.random()*k.length)]){case"left":i=-1,n="left",p=1==s?"dl":"ul",s=0;break;case"right":i=1,n="right",p=1==s?"dr":"ur",s=0;break;case"up":s=-1,n="up",p=1==i?"ru":"lu",i=0;break;case"down":s=1,n="down",p=1==i?"rd":"ld",i=0}else i=0,s=0}else y++;var S=0==i&&0==s;l[m]="belt-"+p,f+=s,h=(c+=i)>=0&&c<e&&f>=0&&f<t&&!S}}function d(t,e,l,o,a,i,s){var n=o+i,h=a+s,c=(0,r.Yy)(e,n,h);return n<0||n>=e||h<0||h>=l||"air"==t[c]||t[c].startsWith("belt")&&Math.random()<.5}function y(t,e,l){for(var o=(0,r.sc)(4,e-4),a=(0,r.sc)(4,t-4),i=[2,5],s=(0,r.sT)(i[0],i[1]),n=(0,r.sT)(i[0],i[1]),h=Math.max(0,Math.floor(o-s)),c=Math.max(0,Math.floor(a-n)),f=Math.min(e-1,Math.floor(o+s)),d=Math.min(t-1,Math.floor(a+n)),y=.75,u=(0,r.sT)(-y,y),p=(0,r.sT)(-y,y),m=h;m<=f;m++)for(var g=c;g<=d;g++){var b=m-o,M=g-a;if(b*b+M*M<=s*n+.5){var x=m+Math.floor(u*M),v=g+Math.floor(p*b);l[(0,r.Yy)(e,x,v)]=r.hm?"ice"+(0,r.sc)(0,15):"dirt"+(0,r.sc)(0,20)}}}function u(){if(o.M)return;let t=document.body;document.documentElement;var e=t.scrollHeight,l=Math.max(window.innerWidth,t.scrollWidth);let s=Math.ceil(e/32),d=Math.ceil(l/32),u=32*d,p=32*s;console.log("Generating Factorio tileset with "+d+" columns and "+s+" rows");for(var m=new Array(Math.ceil(d*s/4)),g=new Array(d*s),b=new Array(d*s),M=0;M<d;M++)for(var x=0;x<s;x++){let t=(0,r.Yy)(d,M,x),e="air";if(b[t]=e,g[t]=e,M<Math.ceil(d/2)&&x<Math.ceil(s/2)){let t=r.hm||Math.random()<.125?15:3;m[(0,r.Yy)(Math.ceil(d/2),M,x)]=(r.hm?"snow":"grass")+(0,r.sc)(0,t)}}for(M=0;M<Math.floor(s/6);M++)y(s/2,d/2,m);var v=function(t,e,l){for(var o=[],a=0;a<t*e/200;a++){var i=(0,r.sc)(2,9),s=(0,r.sc)(i+2,e-i-2),n=(0,r.sc)(i+2,t-i-2),h=Math.max(0,Math.floor(s-i)),c=Math.max(0,Math.floor(n-i)),f=Math.min(e-1,Math.floor(s+i)),d=Math.min(t-1,Math.floor(n+i)),y=7,u=Math.random(),p="coal";if(u<.1?p="oil":u<.4?p="copper":u<.7&&(p="iron"),Math.random()<.2&&(p="geothermal_"),"oil"==p||"geothermal_"==p){y="oil"==p?3:5;for(var m=0;m<2*i;m++){var g=(0,r.sc)(h,f),b=(0,r.sc)(c,d);"air"==l[v=(0,r.Yy)(e,g,b)]&&(l[v]=p+(0,r.sc)(0,y),"geothermal_"==p&&(o.push({x:g,y:b}),g>0&&(l[(0,r.Yy)(e,g-1,b)]="blocker"),g<e&&(l[(0,r.Yy)(e,g+1,b)]="blocker"),b>0&&(l[(0,r.Yy)(e,g,b-1)]="blocker"),b<t&&(l[(0,r.Yy)(e,g,b+1)]="blocker")))}}else for(var M=h;M<=f;M++)for(var x=c;x<=d;x++){var v,w=M-s,Y=x-n;w*w+Y*Y<=i*i+.5&&"air"==l[v=(0,r.Yy)(e,M,x)]&&(l[v]=p+(0,r.sc)(0,y))}}return o}(s,d,g);let w=function(t,e,l,o,a,i,s,n){for(var h,c=[],f=0;f<Math.floor(t/4);f++){for(var d="rock"+(0,r.sc)(1,4),y="rock1"==d?128:64,u=(0,r.sc)(y/2,a-y/2),p=(0,r.sc)(y/2,i-y/2),m=Math.floor(u/s),g=Math.floor(p/n),b=Math.ceil((u+y/2)/s),M=Math.ceil((p+y/2)/n),x=!0,v=m;v<=b&&x;v++)for(var w=g;w<=M&&x;w++)"air"!=o[(0,r.Yy)(e,v,w)]&&(x=!1);if(x){for(v=m;v<=b;v++)for(w=g;w<=M;w++)o[(0,r.Yy)(e,v,w)]="blocker";var Y={image:d,x:u,y:p,size:y,scale:.5};c.push(Y)}}for(f=0;f<Math.max(5,Math.floor(t/15));f++)for(var k=(0,r.sc)(256,a-256),S=(0,r.sc)(256,i-256),C=0;C<3;C++){var W=(void 0,(h=["turret","plasma","well","dome"])[(0,r.sc)(0,h.length-1)]);for(y="turret"==W||"plasma"==W?64:128,"well"==W&&(y=256),u=(0,r.sc)(k-y,k+y),p=(0,r.sc)(S-y,S+y),m=Math.floor(u/s),g=Math.floor(p/n),b=Math.ceil((u+y/2)/s),M=Math.ceil((p+y/2)/n),x=!0,v=m;v<=b&&x;v++)for(w=g;w<=M&&x;w++)"air"!=o[(0,r.Yy)(e,v,w)]&&(x=!1);if(x){for(v=m;v<=b;v++)for(w=g;w<=M;w++)o[(0,r.Yy)(e,v,w)]="blocker";Y={image:W,x:u,y:p,size:y,scale:.5},c.push(Y)}}for(f=0;f<Math.floor(t/16);f++){for(y=192,u=(0,r.sc)(y/2,a-y/2),p=(0,r.sc)(y/2,i-y/2),m=Math.floor(u/s),g=Math.floor(p/n),b=Math.ceil((u+y/2)/s),M=Math.ceil((p+y/2)/n),x=!0,v=m;v<=b&&x;v++)for(w=g;w<=M&&x;w++)"air"!=o[(0,r.Yy)(e,v,w)]&&(x=!1);if(x){for(v=m;v<=b;v++)for(w=g;w<=M;w++)o[(0,r.Yy)(e,v,w)]="blocker";for(Y={image:"spawner",x:u,y:p,size:y,scale:.75},c.push(Y),C=0;C<3;C++){var z=(0,r.sc)(0,360)*Math.PI/180,E=(0,r.sT)(y/3,y);for(u=Y.x+y/2+Math.cos(z)*E,p=Y.y+y/2+Math.sin(z)*E,m=Math.floor(u/s),g=Math.floor(p/n),b=Math.ceil((u+y/2)/s),M=Math.ceil((p+y/2)/n),x=!0,v=m;v<=b&&x;v++)for(w=g;w<=M&&x;w++)"air"!=o[(0,r.Yy)(e,v,w)]&&(x=!1);if(x){for(v=m;v<=b;v++)for(w=g;w<=M;w++)o[(0,r.Yy)(e,v,w)]="blocker";c.push({image:"worm",x:u,y:p,size:96,scale:.75})}}for(C=0;C<9;C++){z=(0,r.sc)(0,360)*Math.PI/180,E=(0,r.sT)(y/3,y),u=Y.x+y/2+Math.cos(z)*E,p=Y.y+y/2+Math.sin(z)*E;var F="biter"+(0,r.sc)(1,4);Math.random()<.1&&(F="fly"),c.push({image:F,x:u,y:p,size:64,scale:1})}}}for(f=0;f<Math.floor(t*e/12);f++){y=128,u=(0,r.sc)(y/2,a-y/2),p=(0,r.sc)(y/2,i-y/2);var $=Math.floor((u+y/2)/s),R=Math.floor((p+y/2)/n);if(x="air"==o[(0,r.Yy)(e,$,R)]){var T=(0,r.Yy)(Math.floor(e/2),Math.floor($/2),Math.floor(R/2)),_=l[T].startsWith("dirt")||l[T].startsWith("ice");if(_&&r.hm)continue;Y={image:"tree"+(0,r.sc)(_?1:3,_?2:5),x:u,y:p,size:y,scale:1},r.hm&&(Y.image="snowtree"+(0,r.sc)(1,3),Y.scale*=1.5),c.push(Y)}}return c}(s,d,m,b,u,p,32,32);for(M=0;M<Math.floor(s/1.5);M++)f(s,d,b);let Y="background-content",k=document.getElementById(Y);for(null==k&&(k=document.createElement("div"),k.id=Y,console.log("Injecting background element."),document.body.prepend(k));k.firstChild;)k.removeChild(k.firstChild);let S=document.createElement("div"),C=document.createElement("div"),W=document.createElement("div"),z=document.createElement("div"),E=document.createElement("div"),F=document.createElement("div");k.appendChild(S),k.appendChild(C),k.appendChild(W),k.appendChild(z),(0,r.w7)()&&k.appendChild(F),k.appendChild(E),S.style.width=l.toString()+"px",S.style.height=e.toString()+"px",S.style.position="relative",S.style.left="0px",S.style.top="0px",C.style.width=l.toString()+"px",C.style.height=e.toString()+"px",C.style.position="relative",C.style.left="0px",C.style.top="0px",C.classList.add("entity-layer"),W.style.width=l.toString()+"px",W.style.height=e.toString()+"px",W.classList.add("tile-layer"),z.style.width=l.toString()+"px",z.style.height=e.toString()+"px",z.style.position="relative",z.style.left="0px",z.style.top="0px",z.classList.add("entity-layer"),E.style.width=l.toString()+"px",E.style.height=e.toString()+"px",E.style.position="relative",E.style.left="0px",E.style.top="0px",E.style.setProperty("mix-blend-mode","screen"),E.classList.add("entity-layer"),S.classList.add("tile-layer"),h(S,Math.ceil(s/2),Math.ceil(d/2),m,2),function(t,e,l,o,a,i=1,s=0,h=0){for(var f=0,d=0,y=0;y<e;y++){f=0;for(var u=0;u<l;u++){let e=o[(0,r.Yy)(l,u,y)];if(e=c(o,0,l,u,y,0,e),"air"!=e){let l=f;s>0&&(l+=(Math.random()-.5)*s*2);let r=d;h>0&&(r+=(Math.random()-.5)*h*2),n(t,e,a,a,l,r,i)}f+=a}d+=a}(0,r.xE)(t,1)}(C,s,d,g,32,.75,4,4),h(W,s,d,b,1);try{for(let[t,e]of Object.entries(a)){let l=".tile-factorio-glowcolor_"+t+"::after",r=512,o=0;document.styleSheets[0].addRule(l,"width: "+r+"px;"),document.styleSheets[0].addRule(l,"height: "+r+"px;"),document.styleSheets[0].addRule(l,"top: "+o+"px;"),document.styleSheets[0].addRule(l,"left: "+o+"px;"),document.styleSheets[0].addRule(l,"background: radial-gradient(rgba("+e.r+","+e.g+","+e.b+",255) 0%, rgba("+e.r+","+e.g+","+e.b+",0) 70%);"),document.styleSheets[0].addRule(l,"mix-blend-mode: screen;")}}catch(t){console.log("Could not access ruleset: "+t)}let $=[],R=[];for(M=0;M<w.length;M++){var T=w[M].x-16,_=w[M].y-16,L=1*w[M].size;"dome"==w[M].image?($.push({image:"domeglow",x:T-192,y:_-160,size:4*L}),w[M].scale=1):("fly"==w[M].image||w[M].image.startsWith("biter"))&&R.push({x:w[M].x-w[M].size/2,y:w[M].y-w[M].size/2,size:w[M].size}),n(z,w[M].image,L,L,T,_,w[M].scale)}for(M=0;M<$.length;M++)n(E,$[M].image,$[M].size,$[M].size,$[M].x,$[M].y);let A=[];for(var I=0;I<Math.floor(s/2);I++){let t=(0,r.sc)(0,10),o=i[t];n(z,"biolumbush"+t,64,64,T=(0,r.sc)(64,l-64),_=(0,r.sc)(64,e-64),.75),A.push({color:o,x:T,y:_})}if((0,r.w7)()){for(F.style.width=l.toString()+"px",F.style.height=e.toString()+"px",F.style.backgroundColor="#395060",F.style.setProperty("mix-blend-mode","multiply"),M=0;M<v.length;M++)n(F,"light",256,256,32*v[M].x-48,32*v[M].y-45,.33);for(M=0;M<R.length;M++)n(F,"light",256,256,R[M].x-16,R[M].y-16,.25);for(console.log(A),I=0;I<A.length;I++){let t=A[I];for(M=0;M<2;M++){let e=n(F,"glowcolor_"+t.color,512,512,t.x-22,t.y-22,.175);e.style.width="512px",e.style.height="512px"}}for(I=0;I<Math.floor(s/3);I++){var P="biolumtree"+(0,r.sc)(0,1);let t=(0,r.v4)(a);for(n(z,P,64,64,T=(0,r.sc)(64,l-64),_=(0,r.sc)(64,e-64),1),x=-1;x<=1;x++)for(M=0;M<2;M++){let e=n(F,"glowcolor_"+t,512,512,T+2,_+32*x,.25);e.style.width="512px",e.style.height="512px"}}}(0,r.xE)(z,1)}}}]);
//# sourceMappingURL=990.bundle.js.map