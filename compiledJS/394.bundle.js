(self.webpackChunksitecore=self.webpackChunksitecore||[]).push([[394],{21:(e,t,o)=>{var r;!function(){"use strict";var i=.5*(Math.sqrt(3)-1),n=(3-Math.sqrt(3))/6,l=1/6,a=(Math.sqrt(5)-1)/4,s=(5-Math.sqrt(5))/20;function h(e){var t;t="function"==typeof e?e:e?function(){var e=0,t=0,o=0,r=1,i=u();e=i(" "),t=i(" "),o=i(" ");for(var n=0;n<arguments.length;n++)(e-=i(arguments[n]))<0&&(e+=1),(t-=i(arguments[n]))<0&&(t+=1),(o-=i(arguments[n]))<0&&(o+=1);return i=null,function(){var i=2091639*e+2.3283064365386963e-10*r;return e=t,t=o,o=i-(r=0|i)}}(e):Math.random,this.p=c(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var o=0;o<512;o++)this.perm[o]=this.p[255&o],this.permMod12[o]=this.perm[o]%12}function c(e){var t,o=new Uint8Array(256);for(t=0;t<256;t++)o[t]=t;for(t=0;t<255;t++){var r=t+~~(e()*(256-t)),i=o[t];o[t]=o[r],o[r]=i}return o}function u(){var e=4022871197;return function(t){t=t.toString();for(var o=0;o<t.length;o++){var r=.02519603282416938*(e+=t.charCodeAt(o));r-=e=r>>>0,e=(r*=e)>>>0,e+=4294967296*(r-=e)}return 2.3283064365386963e-10*(e>>>0)}}h.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(e,t){var o,r,l=this.permMod12,a=this.perm,s=this.grad3,h=0,c=0,u=0,d=(e+t)*i,m=Math.floor(e+d),g=Math.floor(t+d),f=(m+g)*n,p=e-(m-f),x=t-(g-f);p>x?(o=1,r=0):(o=0,r=1);var b=p-o+n,w=x-r+n,M=p-1+2*n,y=x-1+2*n,v=255&m,T=255&g,k=.5-p*p-x*x;if(k>=0){var F=3*l[v+a[T]];h=(k*=k)*k*(s[F]*p+s[F+1]*x)}var R=.5-b*b-w*w;if(R>=0){var Y=3*l[v+o+a[T+r]];c=(R*=R)*R*(s[Y]*b+s[Y+1]*w)}var O=.5-M*M-y*y;if(O>=0){var C=3*l[v+1+a[T+1]];u=(O*=O)*O*(s[C]*M+s[C+1]*y)}return 70*(h+c+u)},noise3D:function(e,t,o){var r,i,n,a,s,h,c,u,d,m,g=this.permMod12,f=this.perm,p=this.grad3,x=.3333333333333333*(e+t+o),b=Math.floor(e+x),w=Math.floor(t+x),M=Math.floor(o+x),y=(b+w+M)*l,v=e-(b-y),T=t-(w-y),k=o-(M-y);v>=T?T>=k?(s=1,h=0,c=0,u=1,d=1,m=0):v>=k?(s=1,h=0,c=0,u=1,d=0,m=1):(s=0,h=0,c=1,u=1,d=0,m=1):T<k?(s=0,h=0,c=1,u=0,d=1,m=1):v<k?(s=0,h=1,c=0,u=0,d=1,m=1):(s=0,h=1,c=0,u=1,d=1,m=0);var F=v-s+l,R=T-h+l,Y=k-c+l,O=v-u+2*l,C=T-d+2*l,j=k-m+2*l,A=v-1+.5,S=T-1+.5,L=k-1+.5,W=255&b,E=255&w,q=255&M,X=.6-v*v-T*T-k*k;if(X<0)r=0;else{var z=3*g[W+f[E+f[q]]];r=(X*=X)*X*(p[z]*v+p[z+1]*T+p[z+2]*k)}var N=.6-F*F-R*R-Y*Y;if(N<0)i=0;else{var D=3*g[W+s+f[E+h+f[q+c]]];i=(N*=N)*N*(p[D]*F+p[D+1]*R+p[D+2]*Y)}var I=.6-O*O-C*C-j*j;if(I<0)n=0;else{var _=3*g[W+u+f[E+d+f[q+m]]];n=(I*=I)*I*(p[_]*O+p[_+1]*C+p[_+2]*j)}var U=.6-A*A-S*S-L*L;if(U<0)a=0;else{var V=3*g[W+1+f[E+1+f[q+1]]];a=(U*=U)*U*(p[V]*A+p[V+1]*S+p[V+2]*L)}return 32*(r+i+n+a)},noise4D:function(e,t,o,r){var i,n,l,h,c,u,d,m,g,f,p,x,b,w,M,y,v,T=this.perm,k=this.grad4,F=(e+t+o+r)*a,R=Math.floor(e+F),Y=Math.floor(t+F),O=Math.floor(o+F),C=Math.floor(r+F),j=(R+Y+O+C)*s,A=e-(R-j),S=t-(Y-j),L=o-(O-j),W=r-(C-j),E=0,q=0,X=0,z=0;A>S?E++:q++,A>L?E++:X++,A>W?E++:z++,S>L?q++:X++,S>W?q++:z++,L>W?X++:z++;var N=A-(u=E>=3?1:0)+s,D=S-(d=q>=3?1:0)+s,I=L-(m=X>=3?1:0)+s,_=W-(g=z>=3?1:0)+s,U=A-(f=E>=2?1:0)+2*s,V=S-(p=q>=2?1:0)+2*s,B=L-(x=X>=2?1:0)+2*s,G=W-(b=z>=2?1:0)+2*s,H=A-(w=E>=1?1:0)+3*s,P=S-(M=q>=1?1:0)+3*s,J=L-(y=X>=1?1:0)+3*s,K=W-(v=z>=1?1:0)+3*s,Q=A-1+4*s,Z=S-1+4*s,$=L-1+4*s,ee=W-1+4*s,te=255&R,oe=255&Y,re=255&O,ie=255&C,ne=.6-A*A-S*S-L*L-W*W;if(ne<0)i=0;else{var le=T[te+T[oe+T[re+T[ie]]]]%32*4;i=(ne*=ne)*ne*(k[le]*A+k[le+1]*S+k[le+2]*L+k[le+3]*W)}var ae=.6-N*N-D*D-I*I-_*_;if(ae<0)n=0;else{var se=T[te+u+T[oe+d+T[re+m+T[ie+g]]]]%32*4;n=(ae*=ae)*ae*(k[se]*N+k[se+1]*D+k[se+2]*I+k[se+3]*_)}var he=.6-U*U-V*V-B*B-G*G;if(he<0)l=0;else{var ce=T[te+f+T[oe+p+T[re+x+T[ie+b]]]]%32*4;l=(he*=he)*he*(k[ce]*U+k[ce+1]*V+k[ce+2]*B+k[ce+3]*G)}var ue=.6-H*H-P*P-J*J-K*K;if(ue<0)h=0;else{var de=T[te+w+T[oe+M+T[re+y+T[ie+v]]]]%32*4;h=(ue*=ue)*ue*(k[de]*H+k[de+1]*P+k[de+2]*J+k[de+3]*K)}var me=.6-Q*Q-Z*Z-$*$-ee*ee;if(me<0)c=0;else{var ge=T[te+1+T[oe+1+T[re+1+T[ie+1]]]]%32*4;c=(me*=me)*me*(k[ge]*Q+k[ge+1]*Z+k[ge+2]*$+k[ge+3]*ee)}return 27*(i+n+l+h+c)}},h._buildPermutationTable=c,void 0===(r=function(){return h}.call(t,o,t,e))||(e.exports=r),t.SimplexNoise=h,e.exports=h}()},394:(e,t,o)=>{"use strict";o.r(t),o.d(t,{flipWithChance:()=>j,default:()=>A});var r=o(621),i=o(212),n=o(21);const l=.5,a=[s("shallow",4,0,.5,2,0,0,2,1,"rock-shallow",1,"water-base",.5,1),s("kelp",8,40,.25,0,2,2,3,2,"rock-kelp",4,"water-kelp",.5,.5),s("redgrass",8,90,.75,0,2,1,1,.5,"rock-medium",2,"water-redgrass",.75,2),s("koosh",6,150,.5,1,4,2,3,1,"rock-deep",3,"water-koosh",2,1),s("jellyshroom",8,200,0,0,2,1,4,1,"rock-scale",1,"water-jelly",1.5,2),s("grandreef",10,300,.5,3,4,2,6,2,"rock-deep",3,"water-greef",1,1.5),s("bloodkelp",8,450,.75,1,4,2,1,1,"rock-scale",1,"water-bkelp",1.5,1.25),s("lostriver",12,700,0,0,3,1,2,1,"rock-lr",2,"water-lr",1,1),s("lava",15,1e3,0,0,1,1,0,0,"lava",6,"water-ilz",2,.25),s("void",1,1400,0,0,0,0,0,0,"void",3,"none",0,0)];function s(e,t,o,r,i,n,l,a,s,h,c,u,d,m){return{name:e,height:{rowsRequired:t,floorFraction:r,minFloorRows:i},variationCeil:{rate:l,range:n},variationFloor:{rate:s,range:a},depth:o,baseTerrainTexture:h,terrainVariants:c,waterColor:u,oreSpawnRate:d,plantSpawnRate:m}}const h=new n;function c(e,t){const o=[];let r=e,i=0,n=0;for(const e of a)if(e.height.rowsRequired<=r&&(o.push({biome:e,index:n,height:new Array(t),highest:9999,lowest:-1}),r-=e.height.rowsRequired,i+=e.height.rowsRequired,n++),r<=0)break;const l=e/i;for(const e of o){const r=Math.floor(l*e.biome.height.rowsRequired),i=(0==e.index?0:o[e.index-1].lowest+1)+r,n=e.index==o.length-1?{rate:0,range:0}:o[e.index+1].biome.variationCeil,a=Math.min(3,e.biome.variationFloor.rate,n.rate),s=Math.min(20,.5*r*(1-e.biome.height.floorFraction),e.biome.variationFloor.range,n.range),h=x(t,a,i-s,i+s);for(let r=0;r<t;r++){const t={biome:e,topRow:0,bottomRow:0,rowsAllocated:0,airCeiling:0,airFloor:0,solidFloor:0,x:0};e.height[r]=t,t.topRow=0==e.index?0:o[e.index-1].height[r].bottomRow+1,t.airCeiling=t.topRow,t.airFloor=t.bottomRow,t.solidFloor=t.bottomRow,t.bottomRow=h[r],t.rowsAllocated=t.bottomRow-t.topRow+1,e.highest=Math.min(e.highest,t.topRow),e.lowest=Math.max(e.lowest,t.bottomRow)}}for(;o[o.length-1].highest>=e;)o.pop();o[o.length-1].lowest=e-1;for(let r=0;r<t;r++)o[o.length-1].height[r].bottomRow=e-1;return console.log("Calculated biome stack is:"),console.log(o),o}function u(e,t,o){if(1==t.length||e<t[1].height[o].topRow)return t[0];if(e>=t[t.length-1].height[o].topRow)return t[t.length-1];for(const r of t)if(e>=r.height[o].topRow&&e<=r.height[o].bottomRow)return r;return console.log("No biome available at row="+e+" of "+t+" @ "+o),null}function d(e,t,o,r,i,n){if(!(t=f(t))||"air"==t||"empty"==t)return null;let l=function(e,t,o,r){let i=document.createElement("div");return i.className="tile-subnautica-"+t,e.appendChild(i),i}(e,t);return l.style.position="relative",l.style.left=o.toString()+"px",l.style.top=r.toString()+"px",l.style.transformOrigin="top left",l}function m(e,t,o){let r=document.createElement("div");return r.className="tile-subnautica-"+t,r.style.zIndex=o.toString(),e.appendChild(r),r}function g(e,t,o){const r=(t-o.height[e].topRow)/o.height[e].rowsAllocated,i=t>=o.height[e].bottomRow+1-2;if("bloodkelp"==o.biome.name&&i)return"bkelp-floor";let n=o.biome.baseTerrainTexture;const l=(1+h.noise2D(.1*e,.1*t))/2;let a=1+Math.floor(l*o.biome.terrainVariants);return"lostriver"==o.biome.name?r<.2?(n="lr",a=4):r<.3&&(n="lr",a=3):"cove"==o.biome.name&&(n="lr",a=r<.25?8:r<.9975?7:6),n+a}function f(e){return(0,r.w7)()&&(e&&(e.includes("water-")||e.includes("cave-")||e.includes("brine-"))?e="dark-"+e:e&&e.endsWith("-glow_toggle")&&(e=null)),e}function p(e,t,o,i,n,l,a,s,h){const c=(0,r.sT)(a[0],a[1]),u=(0,r.sT)(a[0],a[1]),d=Math.max(0,Math.floor(i-c)),m=Math.max(0,Math.floor(n-u)),g=Math.min(t-1,Math.floor(i+c)),f=Math.min(e-1,Math.floor(n+u)),p=.95,x=(0,r.sT)(-p,p),b=(0,r.sT)(-p,p);for(let a=d;a<=g;a++)for(let d=m;d<=f;d++){const m=a-i,g=d-n;if(m*m+g*g<=c*u+.5){const i=a+Math.floor(x*g),n=d+Math.floor(b*m);if(i<0||n<0||i>=t||n>=e)continue;const c=(0,r.Yy)(t,i,n);!(c>=0&&c<o.length)||s&&s(c)||h.includes(c)||(o[c].backgroundWater=l,h.push(c),(l.includes("water")||l.includes("cave"))&&(o[c].isAir=!0))}}}function x(e,t,o,i){const n=new Array(e);let l=-1;for(let a=0;a<e;a++){let e=(0,r.sc)(o,i);const s=e-l;l>=0&&Math.abs(s)>t&&(e=l+Math.sign(s)),l=e,n[a]=e}return n}function b(e,t,o,i,n,l){const a=x(e,o.biome.variationFloor.rate,o.highest+(o.lowest-o.highest)*n,o.lowest-1-l);for(let i=0;i<e;i++){const n=o.height[i];if(n.airFloor=Math.min(a[i],n.bottomRow-1),n.solidFloor=n.airFloor,o.index<=6&&4!=o.index)for(let l=n.topRow;l<=n.bottomRow;l++){const a=(0,r.Yy)(e,i,l);t[a].tileOverlay=o.biome.waterColor,l<=n.airFloor&&(t[a].backgroundWater=o.biome.waterColor,t[a].isAir=!0)}}}function w(e,t,o,r,i,n,l){return M(e,t,o,r,i,0,0,n,l)}function M(e,t,o,r,i,n,l,a,s){r*=128,i*=128,a&&(r+=a),s&&(i+=s);let h=[];return o.mainTexture&&h.push(d(e,o.mainTexture,r,i)),o.illumTexture&&h.push(d(t,o.illumTexture,r,i)),h}function y(e,t,o,i,n,l,a,s,h){const c=(0,r.sc)(-32,32);for(let e=l;e<=n;e++){const u=e==n,d=e==l?s:u&&h?h:a;w(t,o,d[(0,r.sc)(0,d.length-1)],i,e,c)}}function v(e,t,o,i,n,l,a,s,h){const c=(0,r.sc)(-16,16);for(let e=n;e>=l;e--){const r=e==n,u=e==l?h:r||!s?a:s;let d=u.mainTexture?u.mainTexture:u.illumTexture;if(d&&"*"==d.charAt(d.length-2)){const r=parseInt(d.charAt(d.length-1));d=d.substring(0,d.length-2);const n=u.illumTexture?u.illumTexture.substring(0,u.illumTexture.indexOf("*"))+u.illumTexture.substring(u.illumTexture.indexOf("*")+2):null;for(let l=0;l<r;l++){let r=e-l;w(t,o,T(u,d,n,(l+1).toString()+"-left"),i,r,c),w(t,o,T(u,d,n,(l+1).toString()+"-right"),i+1,r,c)}e-=r-1}else w(t,o,T(u,d,null,"-left"),i,e,c),w(t,o,T(u,d,null,"-right"),i+1,e,c)}}function T(e,t,o,r){return{mainTexture:(t||e.mainTexture)+r,illumTexture:e.illumTexture?(o||e.illumTexture)+r:null}}function k(e){return{mainTexture:e,illumTexture:e+"-glow"}}function F(e){return{mainTexture:null,illumTexture:e}}function R(e){let t=[{mainTexture:"quartz"}];return e.index>=3&&e.index<=7&&t.push({mainTexture:"lithium"}),e.index>=3&&4!=e.index&&e.index<=6&&t.push(k("azurite")),e.index>=4&&e.index<=7&&t.push({mainTexture:"magnetite"}),e.index>=5&&e.index<=7&&t.push(k("ruby")),e.index>=6&&e.index<=7&&t.push(k("uranium")),6==e.index&&t.push(F("abysso")),7==e.index&&t.push({mainTexture:"sulfur"}),e.index>=7&&t.push({mainTexture:"nickel"}),e.index>=8&&t.push(F("kyanite")),0==t.length?null:t[(0,r.sc)(0,t.length-1)]}function Y(e){let t=[];return 0==e.index&&(t.push(k("wigglegrass")),t.push(k("acidmushroom"))),e.index>=2&&e.index<=3&&t.push({mainTexture:"redwort"}),e.index>=2&&e.index<=5&&4!=e.index&&t.push(k("alkaliplant")),(e.index>=4&&e.index<=5||2==e.index)&&t.push(F("violetbeau")),e.index>=5&&e.index<=7&&t.push(k("gabefeather")),5==e.index&&t.push(k("membrain")),e.index>=6&&t.push({mainTexture:"whitemushroom"}),7==e.index&&(t.push(k("ghostweed")),t.push(k("crabkelp"))),0==t.length?null:t[(0,r.sc)(0,t.length-1)]}function O(e){let t=[];return e.index<=5&&4!=e.index&&(t.push(k("peeper")),t.push({mainTexture:"bladderfish"})),0==e.index&&t.push(k("rabbitray")),0!=e.index&&3!=e.index||t.push(k("boomerang")),3!=e.index&&7!=e.index||(t.push(k("mesmer1")),t.push(k("mesmer2"))),1==e.index&&t.push(k("hoopfish")),2!=e.index&&4!=e.index||t.push(k("biter")),2!=e.index&&6!=e.index&&7!=e.index||t.push(k("reginald")),4==e.index&&t.push(k("oculus")),4!=e.index&&5!=e.index||t.push({mainTexture:"eyeye"}),6==e.index&&t.push(k("blighter")),6!=e.index&&7!=e.index||t.push(k("spinefish")),e.index>=8&&t.push(k("magmarang")),0==t.length?null:t[(0,r.sc)(0,t.length-1)]}function C(e,t,o,i,n,l,a,s,h,c){const u=Math.ceil(l/128),d=Math.ceil(a/128),m=(0,r.sc)(u,e-u);let g=s?function(e,t,o){const i=o?(0,r.sT)(t,o):t;let n=Math.floor(e.highest+(e.lowest-e.highest)*i);return n<e.highest?e.highest:n>e.lowest?e.lowest:n}(n,s,h):(0,r.sc)(n.highest,n.lowest);for(let t=Math.max(0,m-u);t<=Math.min(m+u,e-1);t++)g=Math.max(n.height[t].airCeiling+1,Math.min(n.height[t].solidFloor-d-1,g));c&&(g=Math.min(c,g));let f=M(t,o,i,m,g);(0,r.MY)(f,5),j(f,.5)}function j(e,t){Math.random()<t&&(0,r.L_)(e)}function A(){if(i.M)return;document.body,document.documentElement;var e=document.body.offsetHeight,t=Math.max(window.innerWidth,document.body.clientWidth);let o=Math.ceil(e/64),n=Math.ceil(t/64);console.log("Generating subnautica tileset with "+n+" columns and "+o+" rows");let a="background-content",s=document.getElementById(a);for(null==s&&(s=document.createElement("div"),s.id=a,console.log("Injecting background element."),document.body.prepend(s));s.firstChild;)s.removeChild(s.firstChild);const h=c(o,n);let d=new Array(n*o),T=document.createElement("div");s.appendChild(T),T.className="tile-layer",T.style.width=t.toString()+"px",T.style.height=e.toString()+"px",T.classList.add("tile-layer");let A=document.createElement("div");A.style.width=t.toString()+"px",A.style.height=e.toString()+"px",A.style.position="relative",A.style.left="0px",A.style.top="0px",A.classList.add("entity-layer"),s.appendChild(A);let S=document.createElement("div");S.style.width=t.toString()+"px",S.style.height=e.toString()+"px",S.style.position="relative",S.style.left="0px",S.style.top="0px",S.classList.add("tile-layer"),s.appendChild(S);let L=document.createElement("div");L.style.width=t.toString()+"px",L.style.height=e.toString()+"px",L.style.position="relative",L.style.left="0px",L.style.top="0px",L.classList.add("entity-layer"),s.appendChild(L);for(let e=0;e<n;e++)for(let t=0;t<o;t++){const o=(0,r.Yy)(n,e,t),i={};i.x=e,i.y=t,i.biome=u(t,h,e),i.baseTexture=g(e,t,i.biome),d[o]=i}for(const e of h)b(n,d,e,0,e.biome.height.floorFraction,e.biome.height.minFloorRows);h.length>4&&function(e,t,o,i,n,l){let a=i[4];const s=x(t,1.5,0,Math.min(3,.25*(a.lowest-a.highest))),h=x(t,.5,0,Math.min(8,.33*(a.lowest-a.highest))),c=Math.min(.25*(a.lowest-a.highest),5),u=Math.min(.25*(a.lowest-a.highest),3);for(let e=0;e<t;e++){const i=a.height[e],n=i.topRow+c+s[e],l=i.bottomRow-u-h[e];i.airCeiling=Math.floor(n),i.airFloor=Math.floor(l),i.solidFloor=Math.floor(l);for(let i=n;i<=l;i++){const n=(0,r.Yy)(t,e,i);o[n].biome==a&&(o[n].backgroundWater="jellycave-light",o[n].isAir=!0)}for(let i=n-2;i<=l+3;i++)o[(0,r.Yy)(t,e,i)].tileOverlay="jellycave-light"}for(let e=0;e<t-1;e++)if(0==(0,r.sc)(0,2)&&Math.abs(a.height[e].airFloor-a.height[e+1].airFloor)<=1){let i=Math.max(a.height[e].airFloor,a.height[e+1].airFloor);0==(0,r.sc)(0,2)?v(0,n,l,e,i,i-1,k("jellyshroom-bottom"),null,F("jellyshroom-top")):v(0,n,l,e,i,i-1,k("jellyshroom2-bottom"),null,F("jellyshroom2-top")),o[(0,r.Yy)(t,e,i)].groundObjects=2,o[(0,r.Yy)(t,e+1,i)].groundObjects=2,o[(0,r.Yy)(t,e,i-1)].groundObjects=2,o[(0,r.Yy)(t,e+1,i-1)].groundObjects=2,e+=2}}(0,n,d,h,A,L);let W=null;h.length>2&&(W=function(e,t,o,i){let n=i[2],l=[],a=999;for(let e=(0,r.sc)(3,5);e<t-4;e++){let i=n.height[e].airFloor,s=Math.max(n.height[e].topRow+2,Math.ceil((n.height[e].topRow+n.height[e].bottomRow)/2),i-Math.ceil((0,r.sT)(Math.max(.25*n.height[e].rowsAllocated,3),Math.max(Math.ceil(.67*n.height[e].rowsAllocated),7))));if(i-s>=2){const h=0==(0,r.sc)(0,2);let c=[];a=Math.min(a,s);for(let l=s;l<=i;l++){const i=l==s?1:Math.min(1,(0,r.sc)(0,2));for(let a=e-i;a<=e+i;a++){const e=(0,r.Yy)(t,a,l);o[e].tileOverlay=null,h&&(o[e].backgroundWater=null),n.height[a].airFloor=Math.min(n.height[a].airFloor,l-1),h&&(n.height[a].solidFloor=Math.min(n.height[a].solidFloor,l-1)),o[e].isAir=!1,c.push(e)}}l.push({centerX:e,baseY:i,top:s,gridSlots:c,foreground:!1}),e+=(0,r.sc)(5,9)}}return{towers:l,highestY:a}}(0,n,d,h),function(e,t,o,i,n,l){let a=i[2];for(let e=0;e<t;e++)if((0,r.sc)(0,5)>0){let i=Math.ceil(a.height[e].airFloor);o[(0,r.Yy)(t,e,i)].isAir&&w(n,l,{mainTexture:"red-grass"},e,i)}}(0,n,d,h,A,L));let E=null;h.length>1&&(function(e,t,o,i,n,l){let a=i[1];for(let e=0;e<t;e++)if((0,r.sc)(0,3)>0){const o=a.height[e],i=(0,r.sc)(0,6);let s=-1,h=-1;switch(i){case 0:case 1:case 2:s=o.solidFloor,h=Math.max(o.topRow,s-(0,r.sc)(4,8)),y(0,n,l,e,s,h,[{mainTexture:"creepvine-1"},{mainTexture:"creepvine-2"},{mainTexture:"creepvine-3"},{mainTexture:"creepvine-4"},{mainTexture:"creepvine-5"}],[{mainTexture:"creepvine-top1"}],null);break;case 3:case 4:case 5:e<t-1&&Math.abs(a.height[e].solidFloor-a.height[e+1].solidFloor)<=1&&(s=Math.max(a.height[e].solidFloor,a.height[e+1].solidFloor),h=Math.max(o.topRow,s-3),v(0,n,l,e,s,h,{mainTexture:"large-creepvine-bottom*2"},5==i?k("creepvine-seed"):{mainTexture:"large-creepvine-center"},{mainTexture:"large-creepvine-top*3"}),e+=1)}}}(0,n,0,h,A,L),E=function(e,t,o,i,n,l,a){let s=i[1],h=[];const c=a?function(e){for(let t of a.towers)if(t.gridSlots.includes(e))return!0;return!1}:null;for(let i=0;i<5;i++)p(e,t,o,(0,r.sc)(2,t-3),(0,r.sc)(s.highest+6,s.lowest),"cave",[3,5],c,h);for(let e=0;e<125;e++){const e=o[h[(0,r.sc)(0,h.length-1)]];if(e.y<s.height[e.x].topRow)continue;const i=(0,r.Yy)(t,e.x,e.y-1);if(!h.includes(i)){const t=(0,r.sc)(1,3);for(let o=0;o<t;o++)w(n,l,F("stinger"),e.x,e.y,(0,r.sc)(-48,48))}}return h}(o,n,d,h,A,L,W)),h.length>3&&function(e,t,o,i,n,l){let a=i[3];for(let e=0;e<t-1;e++)if((0,r.sc)(0,4)>0&&Math.abs(a.height[e].solidFloor-a.height[e+1].solidFloor)<=1){let i=Math.max(a.height[e].solidFloor,a.height[e+1].solidFloor);v(0,n,l,e,i,i-1,k("koosh-bottom"),null,k("koosh-top")),o[(0,r.Yy)(t,e,i)].groundObjects=2,o[(0,r.Yy)(t,e+1,i)].groundObjects=2,o[(0,r.Yy)(t,e,i-1)].groundObjects=2,o[(0,r.Yy)(t,e+1,i-1)].groundObjects=2,e+=2}}(0,n,d,h,A,L),h.length>5&&function(e,t,o,i,n,l){let a=i[5];for(let e=0;e<t-1;e++)if((0,r.sc)(0,3)>0&&Math.abs(a.height[e].solidFloor-a.height[e+1].solidFloor)<=1){let t=Math.max(a.height[e].solidFloor,a.height[e+1].solidFloor);v(0,n,l,e,t,Math.max(a.height[e].topRow+2,a.height[e+1].topRow+2,t-(0,r.sc)(2,5)),{mainTexture:"reef-pod-bottom*2"},{mainTexture:"reef-pod-middle"},k("reef-pod-top*2")),e+=2}}(0,n,0,h,A,L),h.length>6&&function(e,t,o,i,n,l){let a=i[6];for(let e=0;e<t;e++)if((0,r.sc)(0,1)>0){let t=a.height[e].solidFloor;y(0,n,l,e,t,Math.max(a.height[e].topRow,t-(0,r.sc)(3,12)),[{mainTexture:"bkelp-middle1"},{mainTexture:"bkelp-middle2"},{mainTexture:"bkelp-middle3"}],[{mainTexture:"bkelp-top1"},{mainTexture:"bkelp-top2"}],[k("bkelp-bottom1"),k("bkelp-bottom2")])}}(0,n,0,h,A,L);let q=null;h.length>7&&(q=function(e,t,o,i,n,l){const a=Math.random()<.5,s=[(0,r.sc)(7,t/2),(0,r.sc)(t/2,t-7)];let h=a?5:t-6,c=Math.round((a?(s[1]+t)/2:s[0]/2)-2),u=i[7];const d=x(t,.5,0,Math.min(2,.25*(u.lowest-u.highest))),m=x(t,.5,0,Math.min(4,.33*(u.lowest-u.highest))),g=Math.min(.25*(u.lowest-u.highest),3),f=Math.min(.25*(u.lowest-u.highest),5),p=(0,r.sc)(2,5),b=(0,r.sc)(2,5),w=new Array(t);for(let e=0;e<t;e++){const i=u.height[e];let n=i.topRow+g+d[e];Math.abs(e-c)<=2&&(m[e]=0);let l=i.bottomRow-f-m[e],x=u.highest+.6*(u.lowest-u.highest);const M=Math.abs(h-e);M<=2?(l=i.bottomRow,M<=1&&(x=i.bottomRow+1)):M<=5&&(l+=9-M),a?(e>=s[0]&&(l-=p,x-=e>s[0]?p:p/2),e>=s[1]&&(l-=b,x-=e>s[1]?b:b/2)):(e<=s[1]&&(l-=p,x-=e<s[1]?p:p/2),e<=s[0]&&(l-=b,x-=e<s[0]?b:b/2)),l>i.bottomRow&&(l=i.bottomRow),i.airCeiling=Math.floor(n),i.airFloor=Math.floor(x-1),i.solidFloor=Math.floor(l),w[e]=Math.floor(x)+3;for(let i=n;i<=l;i++){const n=(0,r.Yy)(t,e,i);o[n].backgroundWater=u.biome.waterColor,o[n].tileOverlay=i>=x?"brine":u.biome.waterColor+"-light",Math.abs(i-x)<=1&&M>2&&(o[n].baseTexture=Math.random()<.5?"lr2":"lr1")}}let y=w[c]-4;M(n,l,k("lrskull"),c,y+.4);let v=t-h;const T=u.lowest-5,F=new Array(t);let R=(0,r.sc)(0,t),Y=(0,r.sc)(0,t),O=(0,r.sc)(0,t);for(let e=0;e<t;e++){if(a&&e<h||!a&&e>h){F[e]=-1;continue}const i=Math.min(Math.abs(e-R),Math.abs(e-Y),Math.abs(e-O)),n=Math.abs(e-v),l=u.height[e];let s=Math.max(w[e],l.solidFloor)+(n<5?2:3),c=u.lowest-3;const d=n<=2||0==i;F[e]=d?T-1:1==i?c-1:c;for(let l=s;l<=c;l++){const a=(0,r.Yy)(t,e,l);o[a].tileOverlay="water-cove",l>=T-(0,r.sc)(1,2)?o[a].baseTexture="lr6":o[a].baseTexture=l>=.7*s+.3*T?"lr7":"lr8",l>=T&&(d||(3==n||1==i)&&l==c?o[a].tileOverlay=null:(o[a].tileOverlay="brine-cove",o[a].baseTexture="lr6")),l>=T&&(o[a].baseTexture=l==T?Math.random()<.5?"lr2":"lr1":"rock-deep1")}}let C=F[v]-1;const j=0==(0,r.sc)(0,1);M(n,l,k("cove-tree"),j?v-1:v-2,C-1.33);const A=Math.floor((s[0]+s[1])/2);return{shaftLocation:h,coveFloor:F,treeX:v,treeY:C,skullX:c,skullY:y,middleLakeXCenter:A,middleLakeLevel:w[A]-3}}(0,n,d,h,A,L),h.length>8&&function(e,t,o,i,n,l,a){let s=i[8];const h=[],c=[],u=x(t,2,0,3);for(let i=0;i<t;i++){const n=s.height[i],l=(0,r.sc)(0,3);c[i]=Math.min(e-1,n.bottomRow-3)+u[i]-3,n.solidFloor=Math.floor(c[i]),n.airCeiling=n.topRow+2;for(let e=n.airCeiling;e<=c[i];e++){const a=(0,r.Yy)(t,i,e);o[a].tileOverlay=s.biome.waterColor;let u=e;i-t/2<7&&(u+=l);const d=(i-t/2)*(i-t/2)+(u-c[i])*(u-c[i])*1.25;d<=256&&d>=81?(h.push(a),o[a].backgroundWater=s.biome.waterColor,o[a].isAir=!0):n.solidFloor=Math.max(n.solidFloor,e-1)}}const d=n<6?t-6:5;for(let i=d-2;i<=d+2;i++){const n=s.height[i],l=Math.min(e-1,n.bottomRow-3);for(let e=n.topRow;e<=l;e++){const n=(0,r.Yy)(t,i,e);h.includes(n)||(h.push(n),o[n].backgroundWater=s.biome.waterColor,o[n].isAir=!0)}}for(let e=n-2;e<=n+2;e++)for(let i=s.height[e].topRow;i<=c[e];i++){const l=(0,r.Yy)(t,e,i);let a=Math.abs(e-n)<2?s.biome.waterColor:"magma";"magma"!=a&&h.includes(l)||(h.push(l),o[l].tileOverlay=a,o[l].isAir=!0)}for(let e=0;e<t;e++)3==u[e]&&(o[(0,r.Yy)(t,e,c[e])].tileOverlay="magma",s.height[e].solidFloor--);for(let i=0;i<t-1;i++)if(0==(0,r.sc)(0,2)&&Math.abs(s.height[i].solidFloor-s.height[i+1].solidFloor)<=1){let n=Math.min(e-1,Math.round(Math.max(s.height[i].solidFloor,s.height[i+1].solidFloor)));0==(0,r.sc)(0,2)?v(0,l,a,i,n,n-1,k("lavashroom-bottom"),null,F("lavashroom-top")):v(0,l,a,i,n,n-1,k("lavashroom2-bottom"),null,F("lavashroom2-top")),o[(0,r.Yy)(t,i,n)].groundObjects=2,o[(0,r.Yy)(t,i+1,n)].groundObjects=2,o[(0,r.Yy)(t,i,n-1)].groundObjects=2,o[(0,r.Yy)(t,i+1,n-1)].groundObjects=2,i+=2}}(o,n,d,h,q.shaftLocation,A,L)),function(e,t,o,i,n,l,a){for(const s of i){const i=12*s.biome.plantSpawnRate,h=6*s.biome.oreSpawnRate;for(let h=0;h<i;h++){const i=Y(s);if(i){let h=(0,r.sc)(0,t-1);if(n&&7==s.index&&Math.abs(h-n.shaftLocation)<=2)continue;let c=Math.min(s.height[h].solidFloor,e-1);const u=(0,r.Yy)(t,h,c);if(o[u].groundObjects>=1)continue;if("wigglegrass"==i.mainTexture||"acidmushroom"==i.mainTexture||"whitemushroom"==i.mainTexture){const e=(0,r.sc)(2,5);for(let t=0;t<e;t++)w(l,a,i,h,c,(0,r.sc)(-60,60))}else{const e="membrain"!=i.mainTexture?48:24;w(l,a,i,h,c,(0,r.sc)(-e,e))}o[u].groundObjects++}}for(let i=0;i<h;i++){const i=R(s);if(i){let h=(0,r.sc)(0,t-1);if(n&&7==s.index&&Math.abs(h-n.shaftLocation)<=2)continue;let c=Math.min(s.height[h].solidFloor,e-1);const u=(0,r.Yy)(t,h,c);if(o[u].groundObjects>=1)continue;const d="abysso"==i.illumTexture||"azurite"==i.mainTexture?48:24;w(l,a,i,h,c,(0,r.sc)(-d,d)),o[u].groundObjects++}}}if(!(i.length<=7)&&n)for(let e=0;e<t;e++)if(n.coveFloor[e]>=0&&0==(0,r.sc)(0,3)&&Math.abs(n.treeX-e)>1){const s=R(i[7]);if(s){const i=n.coveFloor[e],h=(0,r.Yy)(t,e,i);if(o[h].groundObjects>=1)continue;const c="abysso"==s.illumTexture||"azurite"==s.mainTexture?48:24;w(l,a,s,e,i,(0,r.sc)(-c,c)),o[h].groundObjects++}}}(o,n,d,h,q,A,L),function(e,t,o,i,n,l,a,s,h){for(const e of i){const i=Math.max(5,.8*(e.lowest-e.highest));for(let a=0;a<i;a++){const i=O(e);if(i){let a=(0,r.sc)(0,t-1),s=Math.round((0,r.sc)(0==e.index?0:e.height[a].airCeiling+1,e.height[a].solidFloor-1));const h=(0,r.Yy)(t,a,s);if(h>=o.length||h<0||!o[h].isAir)continue;const c="biter"!=i.mainTexture&&"blighter"!=i.mainTexture&&"rabbitray"!=i.mainTexture&&"mesmer2"!=i.mainTexture?(0,r.sc)(1,3):1,u=Math.random()<.33&&c>1?(0,r.sc)(-90,90):(0,r.sc)(-30,30),d=Math.random()<.5;for(let e=0;e<c;e++){const e=w(n,l,i,a,s,(0,r.sc)(-48,48),(0,r.sc)(-48,48));(0,r.Fl)(e,u),d&&(0,r.L_)(e)}}}}if(a)for(let e=0;e<16;e++){const e=o[a[(0,r.sc)(0,a.length-1)]];(0,r.MY)(w(n,l,k("shuttlebug"),e.x,e.y,(0,r.sc)(-16,16),(0,r.sc)(-16,16)),180)}}(0,n,d,h,A,L,E),function(e,t,o,i,n,l,a,s){if(i.length>1)for(let e=0;e<3;e++)C(t,n,l,{mainTexture:"stalker"},i[1],512,192);if(i.length>2&&a&&a.highestY-i[2].highest>3&&(Math.random()<=.67&&C(t,n,l,k("reefback1"),i[2],1536,512,.125,.5,a?a.highestY-4:null),Math.random()<=.67&&C(t,n,l,k("reefback2"),i[2],1536,512,.125,.5,a?a.highestY-4:null)),i.length>3){Math.random()<=.67&&C(t,n,l,k("ampeel"),i[3],512,256);const e=(0,r.sc)(0,3);for(let o=0;o<e;o++)C(t,n,l,k("boneshark"),i[3],384,192)}if(i.length>4&&(C(t,n,l,{mainTexture:"crabsnake1"},i[4],384,288,.5),C(t,n,l,{mainTexture:"crabsnake2"},i[4],512,64,.5)),i.length>5){C(t,n,l,k("ghostlevi"),i[5],1152,384,.2,.5);for(let e=0;e<3;e++){const e=(0,r.sc)(1,2);C(t,n,l,k("deepstalker"+e),i[5],1==e?384:512,1==e?205:192,.5,.8)}}if(i.length>6&&(C(t,n,l,k("ampeel2"),i[6],512,320),C(t,n,l,k("warper"),i[6],256,192)),i.length>7&&s){const e=i[7].height[s.shaftLocation].bottomRow-(0,r.sc)(3,6)-5;for(let t=0;t<2;t++)j(M(n,l,k("prowler"),s.shaftLocation+(0,r.sc)(-2,2),e-t),.5),j(M(n,l,k("prowler"),s.middleLakeXCenter+(0,r.sc)(-2,2),s.middleLakeLevel-2-t),.5),j(M(n,l,k("prowler"),s.skullX+(0,r.sc)(-2,2),s.skullY+(0,r.sc)(-3,1)-t),.5);const t=(0,r.sc)(0,6);0!=t&&M(n,l,F("ghostrays1"),s.treeX-3.5,s.treeY-2),1!=t&&M(n,l,F("ghostrays2"),s.treeX-3.5,s.treeY-2)}i.length>8&&(Math.random()<=.5&&C(t,n,l,k("dragon"),i[8],1280,640,.4),Math.random()<=.67&&C(t,n,l,{mainTexture:"crimsonray1"},i[8],512,256),Math.random()<=.67&&C(t,n,l,{mainTexture:"crimsonray2"},i[8],512,256),Math.random()<=.8&&C(t,n,l,k("larva"),i[8],128,64))}(0,n,0,h,A,L,W,q),function(e,t,o,i,n){for(var a=0;a<o;a++){let o=document.createElement("div"),l=document.createElement("div");for(var s=0;s<i;s++){const e=n[(0,r.Yy)(i,s,a)];let t=o,h=l,c=f(e.baseTexture);c||(c="empty"),t=m(t,c,0),(0,r.w7)()&&(e.backgroundWater&&"empty"!=e.backgroundWater||e.tileOverlay&&"empty"!=e.tileOverlay||(e.tileOverlay="cave")),e.backgroundWater&&(e.backgroundWater=f(e.backgroundWater),e.backgroundWater&&(t=m(t,e.backgroundWater,1)));let u=!1;e.tileOverlay&&(e.tileOverlay=f(e.tileOverlay),e.tileOverlay&&(h=m(h,e.tileOverlay,4),u=!0)),u||(h=m(h,"empty",4))}e.appendChild(o),t.appendChild(l)}(0,r.xE)(e,l),(0,r.xE)(t,l)}(T,S,o,n,d),(0,r.xE)(A,l),(0,r.xE)(L,l)}}}]);
//# sourceMappingURL=394.bundle.js.map