(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[162],{162:(r,a,e)=>{"use strict";e.r(a),e.d(a,{default:()=>M});var t=e(621),o=e(212);function s(r,a){let e=document.createElement("div");return e.className="tile-minecraft-"+a,r.appendChild(e),e}function n(r,a,e,o,s){switch(r){case"mob_spawner":return"dark_mob_spawner";case"crystal_green":return"dark_crystal_green";case"crystal_white":return"dark_crystal_white";case"crystal_purple":return"dark_crystal_purple";case"redstone_ore":return"dark_redstone_ore";case"fluorite":return"dark_fluorite";case"log_night":return"dark_glowlog";case"leaves_night":return"dark_glowleaves";case"rune":return"dark_rune";default:return"lava"==e[(0,t.Yy)(a,o,s+1)]?"dark_weak":"dark"}}function c(r){switch(r){case"air":case"mob_spawner":case"web":case"crystal_purple":case"crystal_green":case"crystal_white":case"flower1":case"flower2":case"tallgrass":case"tallgrass_xmas":return!0;default:return!1}}function i(r,a,e,o){if(0==a)return"grass_side";if(a<=4){if(a<=Math.max(1,3+Math.sin(t.XV+.873*r)+Math.cos(1.8734*t.XV+.7624*r)))return"dirt"}else if(a>e-4-o&&e-a-o<=5*Math.random())return"bedrock";return"stone"}function l(r){return"air"==r||"cave"==r||"water"==r||"web"==r}function h(r,a,e,o,s,n,c){e[o]="water";var i=(0,t.Yy)(a,s,n+1);if("lava"==e[i]&&(e[i]="obsidian"),l(e[i]))h(r,a,e,i,s,n+1,!0);else if(c){for(var f=0;f<=2&&l(e[u=(0,t.Yy)(a,s+f,n)])&&(h(r,a,e,u,s+f,n,!1),!l(e[u+a]));f++);for(f=0;f<=2;f++){var u;if(!l(e[u=(0,t.Yy)(a,s-f,n)]))break;if(h(r,a,e,u,s-f,n,!1),l(e[u+a]))break}}}function f(r,a,e,o,s,n,i){if("grass_side"==i){var l=(0,t.Yy)(a,o,s-1);"sky"==e[l]||c(e[l])||(i="dirt")}if(t.hm&&("grass_side"==i&&(i="grass_side_xmas"),"crystalcol"==i&&(i="crystalcol_xmas"),"tallgrass"==i&&(i="tallgrass_xmas")),"tallgrass"==i&&t.Jt&&Math.random()<.33&&(i="pumpkin"),Math.random()<.04&&"cave"==i&&"stone"==e[n+a]){var h=Math.random();i=h<.33?"crystal_purple":h<.67?"crystal_white":"crystal_green"}return(0,t.w7)()&&("sky"==i||i.startsWith("tallgrass")||i.startsWith("flower")||"log"==i||"leaves"==i)&&(i+="_night"),i}function u(r,a,e,o,s,n){for(var c=function(r){if(r.startsWith("rock_"))return[2.25,4.5];switch(r){case"diamond_ore":case"lapis_ore":case"calcite":return[.5,1.5];case"iron_ore":case"gold_ore":case"copper_ore":case"tin_ore":case"nickel_ore":case"cadmium":case"indium":return[1.5,3];case"redstone_ore":case"coal_ore":case"fluorite":case"magnetite":return[2,3.5];case"dirt":case"gravel":return[2.5,4];case"cave":case"air":return[2.5,5];default:return[0,0]}}(n),i=(0,t.sT)(c[0],c[1]),l=(0,t.sT)(c[0],c[1]),h=Math.max(0,Math.floor(o-i)),f=Math.max(0,Math.floor(s-l)),u=Math.min(a-1,Math.floor(o+i)),d=Math.min(r-1,Math.floor(s+l)),m=.75,v=(0,t.sT)(-m,m),y=(0,t.sT)(-m,m),M=h;M<=u;M++)for(var _=f;_<=d;_++){var g=M-o,p=_-s;if(g*g+p*p<=i*l+.5){var w=M+Math.floor(v*p),k=_+Math.floor(y*g),Y=(0,t.Yy)(a,w,k);(null==e[Y]||"stone"==e[Y]||e[Y].startsWith("rock_")||"cobblestone"==e[Y]&&"cave"==n)&&(e[Y]=n)}}}function d(r,a){var e=a/r,t=["granite","hornfel","quartz"];return e<.5&&(t.push("basalt"),t.push("shale"),t.push("limestone"),t.push("sandstone")),e<.75&&e>.25&&(t.push("slate"),t.push("gneiss"),t.push("granulite"),t.push("schist")),e>.5&&(t.push("marble"),t.push("peridotite")),e>.75&&(t.push("pumice"),t.push("onyx"),t.push("migmatite")),t[Math.floor(Math.random()*t.length)]}function m(r,a){var e=a/r,t=["coal_ore"];return e>.2&&t.push("iron_ore"),e>.5&&(t.push("gold_ore"),t.push("lapis_ore")),e>.75&&(t.push("redstone_ore"),t.push("diamond_ore"),t.push("emerald_ore"),t.push("cadmium"),t.push("indium")),e<.2&&t.push("magnetite"),e<.4&&t.push("fluorite"),e>.15&&e<.35&&t.push("calcite"),t[Math.floor(Math.random()*t.length)]}function v(r,a,e,o,s){let n=o[s];if(n<=4)return!1;var c=t.hm,i=Math.min(n-1,c?(0,t.sc)(8,12):(0,t.sc)(4,8));if(i<=(c?8:5))return!1;if("sky"!=e[(0,t.Yy)(a,s-2,n-i)])return!1;if("sky"!=e[(0,t.Yy)(a,s+2,n-i)])return!1;if("sky"!=e[(0,t.Yy)(a,s,n-i)])return!1;if("sky"!=e[(0,t.Yy)(a,s-2,n-i+2)])return!1;if("sky"!=e[(0,t.Yy)(a,s+2,n-i+2)])return!1;if(c){for(var l=0;l<=i;l++)e[(0,t.Yy)(a,s,n-l)]=0==l?"dirt":"log_spruce";var h=2;for(l=Math.max(2,i-6);l<=i;l++){for(var f=s-h;f<=s+h;f++)e[(0,t.Yy)(a,f,n-l)]="leaves_spruce";(h+=Math.random()<=.5?1:2)>3&&(h-=3),l+1==i-1&&(h=1),l+1==i&&(h=0)}}else{var u=Math.random()<=.35,d=u?"leaves_birch":"leaves";for(l=0;l<=i;l++)e[(0,t.Yy)(a,s,n-l)]=0==l?"dirt":u?"log_birch":"log";for(l=i-3;l<=i;l++)for(h=l>=i-1?1:2,u||l!=i||(h=0),f=s-h;f<=s+h;f++)e[(0,t.Yy)(a,f,n-l)]=d}return console.log("Generating tree at "+s+", "+n),!0}function y(r,a,e,o,s){var n=o[s];if(n<7)return!1;console.log("Generating pylon at "+s+", "+n);for(var c=s-3;c<=s+3;c++)for(var i=n;i<=o[c];i++)e[(0,t.Yy)(a,c,i)]="crystalstone";for(c=s-3;c<=s+3;c+=2){var l=c==s-3||c==s+3?5:7;for(i=1;i<l;i++)e[(0,t.Yy)(a,c,n-i)]="crystalcol";e[(0,t.Yy)(a,c,n-l)]="rune"}return e[(0,t.Yy)(a,s-2,n-3)]="crystalbeam",e[(0,t.Yy)(a,s+2,n-3)]="crystalbeam",!0}function M(){if(o.M)return;document.body,document.documentElement;var r=document.body.offsetHeight,a=Math.max(window.innerWidth,document.body.clientWidth);let e=Math.ceil(r/32),M=Math.ceil(a/32);console.log("Generating MC chunk slice tileset with "+M+" columns and "+e+" rows from "+a+" x "+r);let _=new Array(M*e),g=Math.max(0,Math.min(14,Math.ceil(.1*e))),p=new Array(M),w=Math.floor(g/3),k=(0,t.sT)(-1,1),Y=(0,t.sT)(w,g);for(var b=0;b<M;b++)p[b]=Math.floor(Y),Y+=k,Y=Math.max(w,Math.min(g,Y)),(Math.random()<.3||Y>=g-1||Y<=w+1)&&(k+=(0,t.sT)(-.2,.2),Y>=g-1&&(k=Math.min(k,0)),Y<=w+1&&(k=Math.max(k,0)),k=Math.max(-1,Math.min(1,k)));for(b=0;b<M;b++)for(let r=0;r<p[b];r++)_[(0,t.Yy)(M,b,r)]="sky";for(b=0;b<M;b++)for(let r=p[b];r<e;r++){let a=i(b,r-p[b],e,p[b]);_[(0,t.Yy)(M,b,r)]=a}!function(r,a,e,o){for(var s=0;s<2;s++)for(var n=(0,t.sc)(3,a-3),c=n-2;c<=n+2;c++){var i=(0,t.Yy)(a,c-1,o[c]),l=(0,t.Yy)(a,c+1,o[c]);if(!("grass_side"!=e[i]&&"water"!=e[i]&&"ice"!=e[i]&&"dirt"!=e[i]||"grass_side"!=e[l]&&"ice"!=e[l]&&"water"!=e[l]&&"dirt"!=e[l])){var h=(0,t.Yy)(a,c,o[c]+1);e[d=(0,t.Yy)(a,c,o[c])]=t.hm?"ice":"water","dirt"==e[h]&&(e[h]="grass_side")}}var f=!1;for(s=0;s<2&&!f;s++)f=y(0,a,e,o,(0,t.sc)(3,a-3));var u=0;for(s=0;s<(t.hm?8:4)&&u<3;s++)v(0,a,e,o,(0,t.sc)(3,a-3))&&u++;for(c=0;c<r;c++){var d;if(o[c]>0&&Math.random()<.6&&"grass_side"==e[(0,t.Yy)(a,c,o[c])]&&"sky"==e[d=(0,t.Yy)(a,c,o[c]-1)]){var m="tallgrass",M=Math.random();M<.1?m="flower2":M<.25&&(m="flower1"),e[d]=m}}}(e,M,_,p),function(r,a,e,o){if(Math.random()<.75){var s=(0,t.sc)(2,a-2),n=(0,t.sc)(o+4,r-7);console.log("Generating a dungeon @ "+s+", "+n);for(var c=Math.random()<.5?4:3,i=Math.min(c,Math.random()<.5?4:3),l=-c;l<=c;l++)for(var h=0;h<=i;h++){var f=s+l,u=n+h,d="cobblestone";h==i?Math.random()<.75&&(d="cobblestone_mossy"):h==i-1&&0==l?d="mob_spawner":Math.abs(l)!=c&&(d="air"),e[(0,t.Yy)(a,f,u)]=d}}if(Math.random()<.75){var m=(0,t.sc)(1,3);console.log("Generating "+m+" mineshaft pieces.");for(var v=0;v<m;v++){var y=Math.random()<.8;if(n=(0,t.sc)(o+4,r-5),y)for(s=(0,t.sc)(1,a-1),l=-1;l<=1;l++)for(h=0;h<=2;h++)f=s+l,u=n+h,d="cave",(0==h||Math.random()<.4&&1==Math.abs(l))&&(d="planks_oak"),Math.random()<.15&&(d="cave"==d?"web":"web_on_wood"),e[(0,t.Yy)(a,f,u)]=d;else{c=(0,t.sc)(5,Math.ceil(a/3)),s=(0,t.sc)(c,a-c);var M=(0,t.sc)(0,5),_=Math.random()<.5;for(l=-c;l<=c;l++)for(h=0;h<=2;h++){f=s+l,u=n+h,d="cave";var g=_?0==l:Math.abs(l)==Math.floor(c/1.5);(l+256)%6==M&&(d="planks_oak"),2==h&&g?d="mob_spawner":Math.random()<.67&&(d="cave"==d?"web":"web_on_wood"),e[(0,t.Yy)(a,f,u)]=d}}}}}(e,M,_,g),function(r,a,e){for(var o=0;o<8;o++)u(r,a,e,(0,t.sc)(0,a),(0,t.sc)(0,r),"cave")}(e,M,_),function(r,a,e){for(var t=r*a/64,o=0;o<t;o++){var s=Math.floor(Math.random()*a),n=Math.floor(Math.random()*r);u(r,a,e,s,n,"rock_"+d(r,n))}}(e,M,_),function(r,a,e){for(var t=r*a/56,o=0;o<t;o++){var s=Math.floor(Math.random()*a),n=Math.floor(Math.random()*r);u(r,a,e,s,n,m(r,n))}}(e,M,_),function(r,a,e){for(var t=r*a/150,o=0;o<t;o++)u(r,a,e,Math.floor(Math.random()*a),Math.floor(Math.random()*r),Math.random()<.5?"gravel":"dirt")}(e,M,_),function(r,a,e){for(var o=0;o<r;o++)for(var s=0;s<a;s++){var n=(0,t.Yy)(a,s,o),c=(0,t.Yy)(a,s,o-1),i=(0,t.Yy)(a,s,o+1),l=(0,t.Yy)(a,s-1,o),h=(0,t.Yy)(a,s+1,o);"cave"!=e[n]&&"cave"==e[c]&&"cave"==e[i]&&"cave"==e[l]&&"cave"==e[h]&&(e[n]="cave")}}(e,M,_),function(r,a,e){for(var o=Math.floor(.8*r)-1,s=o;s<r;s++)for(var n=0;n<a;n++)"cave"==e[c=(0,t.Yy)(a,n,s)]&&(e[c]="lava");for(s=0;s<=o+1;s++)for(n=0;n<a;n++){var c;l(e[c=(0,t.Yy)(a,n,s)])&&Math.random()<.02&&h(r,a,e,c,n,s,!0)}}(e,M,_);let x="background-content",C=document.getElementById(x);for(null==C&&(C=document.createElement("div"),C.id=x,console.log("Injecting background element."),document.body.prepend(C));C.firstChild;)C.removeChild(C.firstChild);C.className="tile-layer",C.style.width="50%",C.style.height="50%",function(r,a,e,o){for(var i=0;i<a;i++){let a=document.createElement("div");for(var l=0;l<e;l++){var h=(0,t.Yy)(e,l,i),u=o[h];let r=a;if(c(u=f(0,e,o,l,i,h,u))&&(r=s(a,"cave")),"air"!=u&&(r=s(r,u)),(0,t.w7)()){let a=n(u,e,o,l,i);"air"!=a&&(r=s(r,a))}}r.appendChild(a)}(0,t.xE)(r,2)}(C,e,M,_)}}}]);
//# sourceMappingURL=162.bundle.js.map