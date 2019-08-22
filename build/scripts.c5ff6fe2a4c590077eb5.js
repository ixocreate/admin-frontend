!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict";var e=window,t=e.document,n="addEventListener",r="removeEventListener",i="getBoundingClientRect",s="horizontal",o=function(){return!1},a=e.attachEvent&&!e[n],u=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div");return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String},c=function(e){if(l(e)){var n=t.querySelector(e);if(!n)throw new Error("Selector "+e+" did not match a DOM element");return n}return e},f=function(e,t,n){var r=e[t];return void 0!==r?r:n},m=function(e,t,n,r){if(t){if("end"===r)return 0;if("center"===r)return e/2}else if(n){if("start"===r)return 0;if("center"===r)return e/2}return e},h=function(e,n){var r=t.createElement("div");return r.className="gutter gutter-"+n,r},d=function(e,t,n){var r={};return r[e]=l(t)?t:a?t+"%":u+"("+t+"% - "+n+"px)",r},g=function(e,t){var n;return(n={})[e]=t+"px",n};return function(u,l){void 0===l&&(l={});var v,p,y,z,S,b,_=u;Array.from&&(_=Array.from(_));var E=c(_[0]).parentNode,w=getComputedStyle?getComputedStyle(E):null,k=w?w.flexDirection:null,x=f(l,"sizes")||_.map(function(){return 100/_.length}),M=f(l,"minSize",100),U=Array.isArray(M)?M:_.map(function(){return M}),O=f(l,"expandToMin",!1),C=f(l,"gutterSize",10),D=f(l,"gutterAlign","center"),A=f(l,"snapOffset",30),j=f(l,"dragInterval",1),F=f(l,"direction",s),B=f(l,"cursor",F===s?"col-resize":"row-resize"),L=f(l,"gutter",h),T=f(l,"elementStyle",d),N=f(l,"gutterStyle",g);function R(e,t,n,r){var i=T(v,t,n,r);Object.keys(i).forEach(function(t){e.style[t]=i[t]})}function q(){return b.map(function(e){return e.size})}function H(e){return"touches"in e?e.touches[0][p]:e[p]}function I(e){var t=b[this.a],n=b[this.b],r=t.size+n.size;t.size=e/this.size*r,n.size=r-e/this.size*r,R(t.element,t.size,this._b,t.i),R(n.element,n.size,this._c,n.i)}function W(){var e=b[this.b].element,t=b[this.a].element[i](),n=e[i]();this.size=t[v]+n[v]+this._b+this._c,this.start=t[y],this.end=t[z]}function X(e){var t=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;var n=e[S];return 0===n?null:n-=F===s?parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)}(E);if(null===t)return e;if(U.reduce(function(e,t){return e+t},0)>t)return e;var n=0,r=[],i=e.map(function(i,s){var o=t*i/100,a=m(C,0===s,s===e.length-1,D),u=U[s]+a;return o<u?(n+=u-o,r.push(0),u):(r.push(o-u),o)});return 0===n?e:i.map(function(e,i){var s=e;if(0<n&&0<r[i]-n){var o=Math.min(n,r[i]-n);n-=o,s=e-o}return s/t*100})}function Y(i){if(!("button"in i&&0!==i.button)){var s=this,a=b[s.a].element,u=b[s.b].element;s.dragging||f(l,"onDragStart",o)(q()),i.preventDefault(),s.dragging=!0,s.move=(function(e){var t,n=b[this.a],r=b[this.b];this.dragging&&(t=H(e)-this.start+(this._b-this.dragOffset),1<j&&(t=Math.round(t/j)*j),t<=n.minSize+A+this._b?t=n.minSize+this._b:t>=this.size-(r.minSize+A+this._c)&&(t=this.size-(r.minSize+this._c)),I.call(this,t),f(l,"onDrag",o)())}).bind(s),s.stop=(function(){var n=this,i=b[n.a].element,s=b[n.b].element;n.dragging&&f(l,"onDragEnd",o)(q()),n.dragging=!1,e[r]("mouseup",n.stop),e[r]("touchend",n.stop),e[r]("touchcancel",n.stop),e[r]("mousemove",n.move),e[r]("touchmove",n.move),n.stop=null,n.move=null,i[r]("selectstart",o),i[r]("dragstart",o),s[r]("selectstart",o),s[r]("dragstart",o),i.style.userSelect="",i.style.webkitUserSelect="",i.style.MozUserSelect="",i.style.pointerEvents="",s.style.userSelect="",s.style.webkitUserSelect="",s.style.MozUserSelect="",s.style.pointerEvents="",n.gutter.style.cursor="",n.parent.style.cursor="",t.body.style.cursor=""}).bind(s),e[n]("mouseup",s.stop),e[n]("touchend",s.stop),e[n]("touchcancel",s.stop),e[n]("mousemove",s.move),e[n]("touchmove",s.move),a[n]("selectstart",o),a[n]("dragstart",o),u[n]("selectstart",o),u[n]("dragstart",o),a.style.userSelect="none",a.style.webkitUserSelect="none",a.style.MozUserSelect="none",a.style.pointerEvents="none",u.style.userSelect="none",u.style.webkitUserSelect="none",u.style.MozUserSelect="none",u.style.pointerEvents="none",s.gutter.style.cursor=B,s.parent.style.cursor=B,t.body.style.cursor=B,W.call(s),s.dragOffset=H(i)-s.end}}F===s?(v="width",p="clientX",y="left",z="right",S="clientWidth"):"vertical"===F&&(v="height",p="clientY",y="top",z="bottom",S="clientHeight"),x=X(x);var G=[];function J(e){var t=e.i===G.length,n=t?G[e.i-1]:G[e.i];W.call(n),I.call(n,t?n.size-e.minSize-n._c:e.minSize+n._b)}function K(e){var t=X(e);t.forEach(function(e,n){if(0<n){var r=G[n-1],i=b[r.a],s=b[r.b];i.size=t[n-1],s.size=e,R(i.element,i.size,r._b,i.i),R(s.element,s.size,r._c,s.i)}})}function P(e,t){G.forEach(function(n){if(!0!==t?n.parent.removeChild(n.gutter):(n.gutter[r]("mousedown",n._a),n.gutter[r]("touchstart",n._a)),!0!==e){var i=T(v,n.a.size,n._b);Object.keys(i).forEach(function(e){b[n.a].element.style[e]="",b[n.b].element.style[e]=""})}})}return(b=_.map(function(e,t){var r,i,s,o={element:c(e),size:x[t],minSize:U[t],i:t};if(0<t&&((r={a:t-1,b:t,dragging:!1,direction:F,parent:E})._b=m(C,t-1==0,!1,D),r._c=m(C,!1,t===_.length-1,D),"row-reverse"===k||"column-reverse"===k)){var u=r.a;r.a=r.b,r.b=u}if(!a&&0<t){var l=L(t,F,o.element);i=l,s=N(v,C,t),Object.keys(s).forEach(function(e){i.style[e]=s[e]}),r._a=Y.bind(r),l[n]("mousedown",r._a),l[n]("touchstart",r._a),E.insertBefore(l,o.element),r.gutter=l}return R(o.element,o.size,m(C,0===t,t===_.length-1,D),t),0<t&&G.push(r),o})).forEach(function(e){var t=e.element[i]()[v];t<e.minSize&&(O?J(e):e.minSize=t)}),a?{setSizes:K,destroy:P}:{setSizes:K,getSizes:q,collapse:function(e){J(b[e])},destroy:P,parent:E,pairs:G}}});