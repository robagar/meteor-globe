(this["webpackJsonpmeteor-globe"]=this["webpackJsonpmeteor-globe"]||[]).push([[0],{103:function(e,t){},105:function(e,t){},114:function(e,t,n){"use strict";n.r(t);var r=n(7),a=n.n(r),i=n(63),o=n.n(i),c=(n(74),n(14)),s=n(8),u=n(16),l=n(117),h=n(119),d=6371.37;function f(e){return Math.PI*e/180}function b(e,t,n){var r=f(e),a=f(t),i=n+d;return[i*Math.cos(r)*Math.cos(-a),i*Math.sin(r),i*Math.cos(r)*Math.sin(-a)]}function j(e){var t=e.latitude,n=e.longitude,r=e.height,a=f(t),i=f(n),o=d+r;return[o*Math.cos(a)*Math.cos(-i),o*Math.sin(a),o*Math.cos(a)*Math.sin(-i)]}var m=n(116),p=n(118),v=n(69),x=n(19);Object(x.c)();var g=new v.a({highlightedMarker:"",markers:new Map([["UK003C",{identifier:"UK003C",latitude:50.224871,longitude:-4.949858,label:"UK003C"}]]),meteors:[]}),O=n(12);function k(e){var t=e.identifier,n=e.latitude,r=e.longitude,a=e.altitude,i=void 0===a?5:a,o=e.radius,c=void 0===o?5:o,s=e.label,u=e.labelSize,l=void 0===u?30:u,h=g.useState((function(e){return e.highlightedMarker}))===t,d=function(e){e?g.update((function(e){e.highlightedMarker=t})):g.update((function(e){e.highlightedMarker===t&&(e.highlightedMarker="")}))};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("mesh",{onPointerOver:function(e){return d(!0)},onPointerOut:function(e){return d(!1)},position:b(n,r,i),children:[Object(O.jsx)("sphereGeometry",{args:[4*c,8,8]}),Object(O.jsx)("meshBasicMaterial",{visible:!1})]}),Object(O.jsxs)("mesh",{position:b(n,r,i),children:[Object(O.jsx)("sphereGeometry",{args:[c,16,16]}),Object(O.jsx)("meshBasicMaterial",{color:"hotpink"})]}),s&&Object(O.jsx)(m.a,{visible:h,position:b(n,r,i+10),children:Object(O.jsx)(p.a,{anchorX:"left",anchorY:"top",fontSize:l,color:"white",children:s})})]})}var M=n(10),y=n(4);function w(e){var t=e.begin,n=e.end,a=1-.2*e.magnitude,i=j(t),o=j(n),c=Object(M.a)(i,3),s=c[0],l=c[1],h=c[2],d=Object(M.a)(o,3),f=[(s+d[0])/2,(l+d[1])/2,(h+d[2])/2],b=f[0],m=f[1],p=f[2],v=new y.Vector3(b,m,p),x=new y.Vector3(o[0]-i[0],o[1]-i[1],o[2]-i[2]),g=x.length(),k=Math.max(.1,2*a),w=x.clone();w.normalize();var _=Object(r.useRef)();Object(u.b)((function(e){var t=e.camera,n=v.clone().sub(t.position).normalize(),r=w.clone().cross(n).normalize(),a=w.clone().cross(r).normalize(),i=w.clone().cross(a),o=_.current;if(o){var c=new y.Matrix4,s=i,u=w,l=a;c.makeBasis(s,u,l),o.quaternion.setFromRotationMatrix(c)}}));return Object(O.jsxs)("mesh",{ref:_,position:f,children:[Object(O.jsx)("planeGeometry",{args:[k,g]}),Object(O.jsx)("shaderMaterial",{vertexShader:"\n    varying vec2 vUv;\n\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n    }\n  ",fragmentShader:"\n    varying vec2 vUv;\n\n    void main() {\n      float x = vUv.x;\n      float y = vUv.y;\n      float c = (x < 0.5 ? x : (1.0 - x)) * 2.0;\n      float p = 0.75;\n      float l = y < p ? (y / p) : (1.0 - y) / (1.0 - p);\n      float opacity = c * l;\n      gl_FragColor = vec4(1, 1, 1, opacity);\n    }\n  ",transparent:!0})]})}function _(e){var t=e.markers,n=e.meteors,r={fov:75,near:10,far:1e5,position:b(50.22,-4.95,1500)},a=Object(l.a)({map:"/meteor-globe/textures/2_no_clouds_4k.jpeg",bumpMap:"/meteor-globe/textures/elev_bump_4k.jpeg",specularMap:"/meteor-globe/textures/water_4k.png"});return Object(O.jsxs)(u.a,{frameloop:"demand",camera:r,children:[Object(O.jsx)(h.a,{minDistance:6571.37,zoomSpeed:1,rotateSpeed:1}),Object(O.jsx)("ambientLight",{intensity:.1}),Object(O.jsx)("directionalLight",{color:"white",position:b(0,0,1)}),Object(O.jsxs)("mesh",{children:[Object(O.jsx)("sphereGeometry",{args:[d,128,128]}),Object(O.jsx)("meshPhongMaterial",Object(s.a)({},a))]}),t.map((function(e){return Object(O.jsx)(k,Object(s.a)({},e),"marker-".concat(e.identifier))})),n.map((function(e,t){return Object(O.jsx)(w,Object(s.a)({},e),"meteor-".concat(t))}))]})}n(80);var S=n(13),U=n.n(S),z=n(15),P=n(18),C=n(66),B=n.n(C);function F(){return(F=Object(P.a)(U.a.mark((function e(t){var n,r,a;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if(!(n=e.sent).ok){e.next=11;break}return e.next=6,n.text();case 6:return r=e.sent,a=B()(r,{columns:!0}),e.abrupt("return",a.map((function(e){return{identifier:e.camera_id,latitude:e.obs_latitude,longitude:e.obs_longitude}})));case 11:return e.abrupt("return",Promise.reject(n.statusText));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(){(function(e){return F.apply(this,arguments)})("/meteor-globe/data/cameradetails.csv").then((function(e){console.info("[cameras]",e),g.update((function(t){var n,r=t.markers,a=Object(z.a)(e);try{for(a.s();!(n=a.n()).done;){var i=n.value;r.set(i.identifier,Object(s.a)(Object(s.a)({},i),{},{label:i.identifier}))}}catch(o){a.e(o)}finally{a.f()}}))})).catch((function(e){console.error("[cameras] load failed",e)}))}var E=n(67),K=n(68);function L(){(function(e){var t,n,r,a,i,o,c;return U.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:t=[],n=!1,r=!1,s.prev=3,i=function(){var e=c.value;if(0===e.length)return"continue";if("\r"===e[0]&&(e=e.slice(1)),"#"===e[0])return"continue";var n=e.split(";");if(83!==n.length)return"continue";var r=function(e){var t=n[e];return t?t.trim():""},a=function(e){return parseFloat(r(e))},i=a(1),o=r(3),s={latitude:a(60),longitude:a(62),height:a(64)},u={latitude:a(66),longitude:a(68),height:a(70)},l=a(72),h=a(73),d=a(74),f=a(76),b=r(82).split(",");t.push({time:i,showerCode:o,begin:s,end:u,peakHeight:d,magnitude:h,duration:l,mass:f,stationCodes:b})},o=Object(E.a)(Object(K.a)(e));case 6:return s.next=8,U.a.awrap(o.next());case 8:if(!(n=!(c=s.sent).done)){s.next=15;break}if("continue"!==i()){s.next=12;break}return s.abrupt("continue",12);case 12:n=!1,s.next=6;break;case 15:s.next=21;break;case 17:s.prev=17,s.t0=s.catch(3),r=!0,a=s.t0;case 21:if(s.prev=21,s.prev=22,!n||null==o.return){s.next=26;break}return s.next=26,U.a.awrap(o.return());case 26:if(s.prev=26,!r){s.next=29;break}throw a;case 29:return s.finish(26);case 30:return s.finish(21);case 31:g.update((function(e){e.meteors=t}));case 32:case"end":return s.stop()}}),null,null,[[3,17,21,31],[22,,26,30]],Promise)})("https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_yesterday.txt").catch((function(e){console.error("[meteors] load failed",e)}))}var V=function(){var e=g.useState((function(e){return e.markers})),t=g.useState((function(e){return e.meteors}));return Object(r.useEffect)(G,[]),Object(r.useEffect)(L,[]),Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(_,{markers:Object(c.a)(e.values()),meteors:t})})};o.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(a.a.Suspense,{fallback:Object(O.jsx)("div",{children:"Loading... "}),children:Object(O.jsx)(V,{})})}),document.getElementById("root"))},74:function(e,t,n){},80:function(e,t,n){}},[[114,1,2]]]);
//# sourceMappingURL=main.60d97842.chunk.js.map