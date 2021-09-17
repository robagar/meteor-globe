(this["webpackJsonpmeteor-globe"]=this["webpackJsonpmeteor-globe"]||[]).push([[0],{183:function(e,t,n){},184:function(e,t,n){},189:function(e,t,n){},190:function(e,t,n){},197:function(e,t,n){},220:function(e,t){},222:function(e,t){},233:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(44),i=n.n(o),c=n(304),s=n(311),l=(n(180),n(155)),u=Object(l.a)({palette:{mode:"dark"}}),d=(n(183),n(22)),j=n(8),b=n(320),f=n(321),h=n(315),v=n(314),m=n(310),x=n(308),p=n(322),O=n(323),g=n(154),y=n.n(g),M=n(300),w=n(303),k=n(142),C=n(31),_=n(19),D=n(27),S=n(293),L=n(312),N=6371.37;function F(e){return Math.PI*e/180}function I(e,t,n){var r=F(e),a=F(t),o=n+N;return[o*Math.cos(r)*Math.cos(-a),o*Math.sin(r),o*Math.cos(r)*Math.sin(-a)]}function U(e){var t=e.latitude,n=e.longitude,r=e.height,a=F(t),o=F(n),i=N+r;return[i*Math.cos(a)*Math.cos(-o),i*Math.sin(a),i*Math.cos(a)*Math.sin(-o)]}var P=n(26),T=n(13),A=n(292),E=(n(184),n(1));function z(e){var t=e.meteor,n=t.showerCode,r=t.beginTime,a=t.magnitude,o=t.duration,i=t.stationCodes;return Object(E.jsxs)("div",{className:"root",children:[Object(E.jsx)("div",{className:"shower",children:n}),Object(E.jsx)("div",{className:"beginTime",children:r}),Object(E.jsxs)("div",{className:"magnitude",children:["Mag ",a]}),Object(E.jsxs)("div",{className:"duration",children:[o,"s"]}),Object(E.jsx)("div",{className:"stationCodes",children:i.join(", ")})]})}var B=new T.Color("white"),G=new T.Color("goldenrod"),R=new T.Color("hotpink"),V=new T.Matrix4;function K(e){var t=e.data,n=e.selectedMeteor,a=e.selectMeteor,o=Object(r.useRef)(),i=Object(r.useRef)();Object(D.b)((function(e){var r=e.camera;i.current!==o.current&&(console.warn("new InstancedMesh",o.current),i.current=o.current);var a=o.current;if(a){var c,s=Object(P.a)(t);try{for(s.s();!(c=s.n()).done;){var l=c.value,u=l.index;a.setMatrixAt(u,H(l,r.position));var j=B;l===n?j=R:u===d.current&&(j=G),a.setColorAt(u,j)}}catch(f){s.e(f)}finally{s.f()}for(var b=t.length;b<1e4;++b)a.setMatrixAt(b,V);a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0)}}));var c=Object(r.useState)(void 0),s=Object(j.a)(c,2),l=s[0],u=s[1],d=Object(r.useRef)(),b=Object(D.d)().invalidate;return Object(E.jsx)(E.Fragment,{children:t.length&&Object(E.jsxs)("instancedMesh",{ref:o,args:[void 0,void 0,1e4],onClick:function(e){var n=e.instanceId;void 0!==n&&(a(t[n]),b())},onPointerOver:function(e){var n=e.instanceId;void 0!==n&&(u(t[n]),d.current!==n&&(d.current=n))},onPointerOut:function(e){u(void 0),d.current===e.instanceId&&(d.current=void 0)},children:[Object(E.jsx)("planeGeometry",{args:[1,1]}),Object(E.jsx)("shaderMaterial",{vertexShader:"\n    varying vec2 vUv;\n    varying vec3 vColor;\n\n    void main() {\n      vUv = uv;\n      vColor = instanceColor;\n      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0);\n    }\n  ",fragmentShader:"\n    varying vec2 vUv;\n    varying vec3 vColor;\n\n    void main() {\n      float x = vUv.x;\n      float y = vUv.y;\n      float c = (x < 0.5 ? x : (1.0 - x)) * 2.0;\n      float p = 0.75;\n      float l = y < p ? (y / p) : (1.0 - y) / (1.0 - p);\n      float opacity = c * l;\n      gl_FragColor = vec4(vColor, opacity);\n    }\n  ",transparent:!0,depthWrite:!1}),l&&Object(E.jsx)(A.a,{calculatePosition:function(e,t,n){return function(e,t,n,r){var a=r();if(!(e.parent instanceof T.InstancedMesh&&void 0!==a))return[-9999999,-9999999];e.parent.getMatrixAt(a,Y);var o=J.setFromMatrixPosition(Y);o.project(t);var i=n.width/2,c=n.height/2;return[o.x*i+i,-o.y*c+c]}(e,t,n,(function(){return d.current}))},children:Object(E.jsx)(z,{meteor:l})})]})})}var J=new T.Vector3,Y=new T.Matrix4;function H(e,t){var n=e.begin,r=e.end,a=1-.2*e.magnitude,o=U(n),i=U(r),c=Object(j.a)(o,3),s=c[0],l=c[1],u=c[2],d=Object(j.a)(i,3),b=[(s+d[0])/2,(l+d[1])/2,(u+d[2])/2],f=b[0],h=b[1],v=b[2],m=new T.Vector3(f,h,v),x=new T.Vector3(i[0]-o[0],i[1]-o[1],i[2]-o[2]),p=x.length(),O=Math.max(.1,2*a),g=x.clone();g.normalize();var y=m.clone().sub(t).normalize(),M=g.clone().cross(y).normalize(),w=g.clone().cross(M).normalize(),k=g.clone().cross(w),C=new T.Matrix4,_=k,D=g,S=w;C.makeBasis(_,D,S);var L=new T.Quaternion;L.setFromRotationMatrix(C);var N=new T.Vector3(O,p,1),F=new T.Matrix4;return F.compose(m,L,N),F}n(189);function Q(e){var t=e.meteors,n=e.selectedMeteor,r=e.selectMeteor,a={fov:75,near:10,far:1e5,position:I(50.22,-4.95,1500)},o=Object(S.a)({map:"/meteor-globe/textures/2_no_clouds_4k.jpeg",bumpMap:"/meteor-globe/textures/elev_bump_4k.jpeg",specularMap:"/meteor-globe/textures/water_4k.png"});return Object(E.jsxs)(D.a,{className:"globeCanvas",frameloop:"demand",camera:a,children:[Object(E.jsx)(L.a,{minDistance:6571.37,maxDistance:16371.369999999999,zoomSpeed:.1,rotateSpeed:.1}),Object(E.jsx)("ambientLight",{intensity:.1}),Object(E.jsx)("directionalLight",{color:"white",position:I(0,0,1)}),Object(E.jsxs)("mesh",{children:[Object(E.jsx)("sphereGeometry",{args:[N,128,128]}),Object(E.jsx)("meshPhongMaterial",Object(_.a)({},o))]}),Object(E.jsx)(K,{data:t,selectedMeteor:n,selectMeteor:r})]})}n(190);function W(e){var t=e.meteor,n=t.showerCode,r=t.beginTime,a=t.magnitude,o=t.duration,i=t.stationCodes;return Object(E.jsxs)("div",{className:"root",children:[Object(E.jsx)("div",{className:"shower",children:n}),Object(E.jsx)("div",{className:"beginTime",children:r}),Object(E.jsxs)("div",{className:"magnitude",children:["Mag ",a]}),Object(E.jsxs)("div",{className:"duration",children:[o,"s"]}),Object(E.jsx)("div",{className:"stationCodes",children:i.join(", ")})]})}var Z=n(156),q=n(309),X=n(30),$=n(23),ee=n.n($),te=n(145),ne=n(146),re=n(147),ae=n(42);Object(ae.c)();var oe=new re.a({highlightedMarker:"",markers:new Map([["UK003C",{identifier:"UK003C",latitude:50.224871,longitude:-4.949858,label:"UK003C"}]]),loading:!0,meteorDataInfo:{url:"",title:""},meteors:[],selectedMeteor:void 0}),ie={url:"https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_yesterday.txt",title:"Yesterday"},ce={url:"https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_latest_daily.txt",title:"Latest Daily"};function se(){return(se=Object(X.a)(ee.a.mark((function e(t){var n;return ee.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.info("[meteors] LOAD",t.title,t.url),oe.update((function(e){e.meteorDataInfo=t,e.loading=!0,e.selectedMeteor=void 0,e.meteors=[]})),e.prev=2,e.next=5,le(t.url);case 5:n=e.sent,oe.update((function(e){e.loading=!1,e.meteors=n}));case 7:return e.prev=7,oe.update((function(e){e.loading=!1})),e.finish(7);case 10:case"end":return e.stop()}}),e,null,[[2,,7,10]])})))).apply(this,arguments)}function le(e){var t,n,r,a,o,i,c,s;return ee.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:t=[],n=0,r=!1,a=!1,l.prev=4,i=function(){var e=s.value;if(0===e.length)return"continue";if("\r"===e[0]&&(e=e.slice(1)),"#"===e[0])return"continue";var r=e.split(";");if(83!==r.length)return"continue";var a=function(e){var t=r[e];return t?t.trim():""},o=function(e){return parseFloat(a(e))},i=a(1),c=a(3),l={latitude:o(60),longitude:o(62),height:o(64)},u={latitude:o(66),longitude:o(68),height:o(70)},d=o(58),j=o(72),b=o(73),f=o(74),h=o(76),v=a(82).split(",");t.push({index:n++,beginTime:i,showerCode:c,begin:l,end:u,peakHeight:f,magnitude:b,duration:j,mass:h,averageSpeed:d,stationCodes:v})},c=Object(te.a)(Object(ne.a)(e));case 7:return l.next=9,ee.a.awrap(c.next());case 9:if(!(r=!(s=l.sent).done)){l.next=16;break}if("continue"!==i()){l.next=13;break}return l.abrupt("continue",13);case 13:r=!1,l.next=7;break;case 16:l.next=22;break;case 18:l.prev=18,l.t0=l.catch(4),a=!0,o=l.t0;case 22:if(l.prev=22,l.prev=23,!r||null==c.return){l.next=27;break}return l.next=27,ee.a.awrap(c.return());case 27:if(l.prev=27,!a){l.next=30;break}throw o;case 30:return l.finish(27);case 31:return l.finish(22);case 32:return l.abrupt("return",t);case 33:case"end":return l.stop()}}),null,null,[[4,18,22,32],[23,,27,31]],Promise)}function ue(e){var t=e.anchorEl,n=e.open,r=e.onClose,a=e.onLoadMeteors,o=e.showLoadDailyDialog;return Object(E.jsxs)(Z.a,{open:n,onClose:r,anchorEl:t,children:[Object(E.jsx)(q.a,{onClick:function(){a(ie)},children:ie.title}),Object(E.jsx)(q.a,{onClick:function(){a(ce)},children:ce.title}),Object(E.jsx)(q.a,{onClick:o,children:"Daily..."})]})}var de=n(306),je=n(302),be=n(319),fe=n(316),he=n(313),ve=n(317),me=n(318),xe=n(305),pe=n(150),Oe=n.n(pe),ge=n(151),ye=n(3),Me=n(4),we=n(152),ke="https://globalmeteornetwork.org/data/traj_summary_data/",Ce=Object(we.a)(/<a href="(traj_summary_([0-9]{8})_solrange_([0-9]{3}.[0-9])\x2D([0-9]{3}.[0-9]).txt)">/g,{filename:1,date:2,solarLongitudeFrom:3,solarLongitudeTo:4}),_e=function(){function e(){Object(ye.a)(this,e),this._dailyFileNamesByDate=new Map,this._dailyInitialized=!1}return Object(Me.a)(e,[{key:"url",value:function(e){return ke+e}},{key:"dailyMeteorsUrl",value:function(e){var t=e.toFormat("yyyyMMdd"),n=this._dailyFileNamesByDate.get(t);if(n)return this.url("daily/".concat(n));throw Error("No daily data available for ".concat(e))}},{key:"dailyMeteorsInfo",value:function(e){return{title:"Daily "+e.toLocaleString(C.DateTime.DATE_FULL),url:this.dailyMeteorsUrl(e)}}},{key:"dailyInitialized",get:function(){return this._dailyInitialized}},{key:"initDailyMeteorsAvailable",value:function(){var e=Object(X.a)(ee.a.mark((function e(){var t,n,r,a,o,i,c,s;return ee.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._dailyInitialized){e.next=20;break}return e.prev=1,e.next=4,fetch(ke+"daily/");case 4:if(!(t=e.sent).ok){e.next=12;break}return e.next=8,t.text();case 8:n=e.sent,r=n.matchAll(Ce),a=Object(P.a)(r);try{for(a.s();!(o=a.n()).done;)(i=o.value).groups&&(c=i.groups.date,s=i.groups.filename,console.info(c,s),this._dailyFileNamesByDate.set(c,s))}catch(l){a.e(l)}finally{a.f()}case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.error(e.t0);case 17:return e.prev=17,this._dailyInitialized=!0,e.finish(17);case 20:case"end":return e.stop()}}),e,this,[[1,14,17,20]])})));return function(){return e.apply(this,arguments)}}()},{key:"dailyMeteorsAvailable",value:function(e){var t=e.toFormat("yyyyMMdd");return this._dailyFileNamesByDate.has(t)}}]),e}(),De=Object(r.createContext)(null);function Se(e){var t=e.children,n={gmn:Object(ge.a)((function(){return new _e}))};return Object(E.jsx)(De.Provider,{value:n,children:t})}function Le(){var e=Object(r.useContext)(De);if(e)return e;throw Error("useGMN used outside GMNProvider")}function Ne(e){var t=e.open,n=e.onClose,a=e.onLoadMeteors,o=Le().gmn,i=Object(r.useState)(o.dailyInitialized),c=Object(j.a)(i,2),s=c[0],l=c[1];Oe()(Object(X.a)(ee.a.mark((function e(){return ee.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||s){e.next=4;break}return e.next=3,o.initDailyMeteorsAvailable();case 3:l(!0);case 4:case"end":return e.stop()}}),e)}))));var u=Object(r.useState)(null),d=Object(j.a)(u,2),b=d[0],f=d[1],h=function(){return Object(E.jsx)(xe.a,{label:"dd/mm/yyyy",value:b,onChange:f,renderInput:function(e){return Object(E.jsx)(de.a,Object(_.a)({},e))},inputFormat:"dd/MM/yyyy",shouldDisableDate:function(e){return e>C.DateTime.now()||!o.dailyMeteorsAvailable(e)}})};return Object(E.jsxs)(je.a,{open:t,onClose:n,children:[Object(E.jsx)(be.a,{children:"Load Daily Meteors"}),Object(E.jsxs)(fe.a,{children:[!s&&Object(E.jsx)(he.a,{children:Object(E.jsx)(h,{})}),s&&Object(E.jsx)(h,{})]}),Object(E.jsx)(ve.a,{children:Object(E.jsx)(me.a,{disabled:null===b,onClick:function(){console.info(b),b&&a(b)},children:"Load"})})]})}n(197);var Fe=n(153),Ie=n.n(Fe);function Ue(){return(Ue=Object(X.a)(ee.a.mark((function e(t){var n,r,a;return ee.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if(!(n=e.sent).ok){e.next=11;break}return e.next=6,n.text();case 6:return r=e.sent,a=Ie()(r,{columns:!0}),e.abrupt("return",a.map((function(e){return{identifier:e.camera_id,latitude:e.obs_latitude,longitude:e.obs_longitude}})));case 11:return e.abrupt("return",Promise.reject(n.statusText));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Pe(){(function(e){return Ue.apply(this,arguments)})("/meteor-globe/data/cameradetails.csv").then((function(e){oe.update((function(t){var n,r=t.markers,a=Object(P.a)(e);try{for(a.s();!(n=a.n()).done;){var o=n.value;r.set(o.identifier,Object(_.a)(Object(_.a)({},o),{},{label:o.identifier}))}}catch(i){a.e(i)}finally{a.f()}}))})).catch((function(e){console.error("[cameras] load failed",e)}))}C.Settings.defaultZone="Europe/London";var Te=new URLSearchParams(window.location.search),Ae=new Intl.NumberFormat;function Ee(){var e=Object(r.useState)(),t=Object(j.a)(e,2),n=t[0],a=t[1],o=oe.useState((function(e){return e.markers})),i=oe.useState((function(e){return e.meteors})),c=oe.useState((function(e){return e.selectedMeteor}));Object(r.useEffect)(Pe,[]);var s=Le().gmn,l=Object(r.useCallback)((function(e){(function(e){return se.apply(this,arguments)})(e).catch((function(t){console.error("loading",e,t),a("Failed to load ".concat(e.title))}))}),[]);Object(r.useEffect)((function(){l(function(e){var t=e.get("test");if(null!==t)switch(t){case"one_perseid":return{url:"/meteor-globe/data/one_perseid.txt",title:"Test - One Perseid"};default:return{url:"/meteor-globe/data/traj_summary_20210812_solrange_140.0-141.0.txt",title:"Test - Lots of Perseids"}}return ie}(Te))}),[l]);var u=function(){var e=oe.useState((function(e){return e.loading})),t=oe.useState((function(e){return e.meteorDataInfo.title})),n=oe.useState((function(e){return e.meteors.length})),a=Object(r.useState)(!1),o=Object(j.a)(a,2),i=o[0],c=o[1],u=Object(r.useState)(null),d=Object(j.a)(u,2),m=d[0],x=d[1],p=Object(r.useState)(!1),O=Object(j.a)(p,2),g=O[0],M=O[1];return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(b.a,{color:"transparent",sx:{boxShadow:"none"},children:Object(E.jsxs)(f.a,{children:[Object(E.jsx)(h.a,{onClick:function(e){c(!i),x(e.currentTarget)},children:Object(E.jsx)(y.a,{})}),Object(E.jsxs)(v.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:[e&&"Loading ".concat(t,"..."),!e&&t,1===n&&" \u2014 1 meteor",n>1&&" \u2014 ".concat(Ae.format(n)," meteors")]})]})}),Object(E.jsx)(ue,{open:i,onClose:function(){return c(!1)},anchorEl:m,onLoadMeteors:function(e){l(e),c(!1)},showLoadDailyDialog:function(){M(!0),c(!1)}}),Object(E.jsx)(Ne,{open:g,onClose:function(){return M(!1)},onLoadMeteors:function(e){var t=s.dailyMeteorsInfo(e);console.info(t),l(t),M(!1)}})]})};return Object(E.jsx)(E.Fragment,{children:Object(E.jsxs)(M.b,{dateAdapter:w.a,children:[Object(E.jsx)(m.a,{open:void 0!==n,children:Object(E.jsx)(x.a,{severity:"error",onClose:function(){return a(void 0)},children:n})}),Object(E.jsxs)(k.a,{style:{display:"flex",flexFlow:"column"},children:[Object(E.jsx)(u,{}),Object(E.jsxs)(p.a,{sx:{flex:"1 1 auto"},children:[Object(E.jsx)(Q,{markers:Object(d.a)(o.values()),meteors:i,selectedMeteor:c,selectMeteor:function(e){console.info("SELECT",e),oe.update((function(t){t.selectedMeteor=e}))}}),c&&Object(E.jsx)(W,{meteor:c})]}),Object(E.jsx)(ze,{})]})]})})}function ze(){return Object(E.jsxs)(v.a,{variant:"body2",color:"text.secondary",align:"center",children:["Copyright \xa9 ",(new Date).getFullYear()," ",Object(E.jsx)(O.a,{color:"inherit",href:"https://github.com/robagar/meteor-globe",target:"_blank",rel:"noopener",children:"Rob Agar"})," (UK003C) "," \u2014 ","Meteor data from the ",Object(E.jsx)(O.a,{color:"inherit",href:"https://globalmeteornetwork.org/",target:"_blank",rel:"noopener",children:"Global Meteor Network"})]})}i.a.render(Object(E.jsx)(a.a.StrictMode,{children:Object(E.jsxs)(s.a,{theme:u,children:[Object(E.jsx)(c.a,{}),Object(E.jsx)(a.a.Suspense,{fallback:Object(E.jsx)("div",{children:"Loading... "}),children:Object(E.jsx)(Se,{children:Object(E.jsx)(Ee,{})})})]})}),document.getElementById("root"))}},[[233,1,2]]]);
//# sourceMappingURL=main.3203697a.chunk.js.map