(this["webpackJsonpdvorak-typing"]=this["webpackJsonpdvorak-typing"]||[]).push([[0],[,,,,,function(e,t,r){e.exports=r(14)},,,,,function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(3),s=r.n(c),u=(r(10),r(1)),o=r(4),i=r.n(o),l=(r(11),{default:["` 1 2 3 4 5 6 7 8 9 0 [ ] {bksp}","{tab} ' , . p y f g c r l / = \\","{lock} a o e u i d h t n s - {enter}","{shift} ; q j k x b m w v z {shift}","{space}"],shift:["~ ! @ # $ % ^ & * ( ) { } {bksp}",'{tab} " < > P Y F G C R L ? + |',"{lock} A O E U I D H T L S _ {enter}","{shift} : Q J K X B M W V Z {shift}","{space}"]}),y=(r(12),function(e){var t=[{class:"next-key",buttons:e.nextKey}];return a.a.createElement(i.a,{onChange:function(e){console.log("Input changed",e)},onKeyPress:function(e){console.log("Button pressed",e)},layout:l,physicalKeyboardHighlight:!0,theme:"hg-theme-default hg-layout-default",buttonTheme:t})}),f=["the","quick","brown","fox","jumps","over","lazy","dog"],d=(r(13),function(e){var t=e.isOn,r=e.handleToggle;return a.a.createElement(a.a.Fragment,null,a.a.createElement("input",{checked:t,onChange:r,className:"react-switch-checkbox",id:"react-switch-new",type:"checkbox"}),a.a.createElement("label",{style:{background:t&&"#06D6A0"},className:"react-switch-label",htmlFor:"react-switch-new"},a.a.createElement("span",{className:"react-switch-button"})))}),h=function(){var e=localStorage.getItem("forceDvorakMode");return K(e)},K=function(e){return null!==e&&"true"===e.toLowerCase()},m=function(e){var t=e.options,r=Object(n.useState)(" Let's Dvorak! Press Space to start!"),c=Object(u.a)(r,2),s=c[0],o=c[1],i=Object(n.useState)(0),l=Object(u.a)(i,2),h=l[0],K=l[1],m=Object(n.useState)(0),b=Object(u.a)(m,2),g=b[0],p=b[1],v=Object(n.useState)(0),k=Object(u.a)(v,2),w=k[0],j=k[1],E=Object(n.useState)(30),O=Object(u.a)(E,2),S=O[0],x=O[1],C=Object(n.useState)("paused"),D=Object(u.a)(C,2),I=D[0],M=D[1],L=Object(n.useState)(t.forceDvorakMode),P=Object(u.a)(L,2),B=P[0],T=P[1],F=Object(n.useState)("Space"),q=Object(u.a)(F,2),z=q[0],J=q[1],N=Object(n.useCallback)((function(){var e=function(e){return e[Math.floor(Math.random()*e.length)]}(f);o(e),J(e[0])}),[]),Q=Object(n.useCallback)((function(){N(),x(30),M("playing"),p(0),j(0),K(0)}),[N]);Object(n.useEffect)((function(){if("paused"!==I&&"end"!==I){if(S){var e=setInterval((function(){x(S-1)}),1e3);return function(){return clearInterval(e)}}M("end")}}),[S,I]),Object(n.useEffect)((function(){!function(e){localStorage.setItem("forceDvorakMode",e.toString())}(B),B?Object.defineProperty(KeyboardEvent.prototype,"key",{configurable:!0,get:function(){if(this.shiftKey)switch(this.code){case"BracketLeft":return"?";case"Digit1":return"!";default:return""}switch(this.code){case"KeyA":return"a";case"KeyS":return"o";case"KeyD":return"e";case"KeyF":return"u";case"KeyG":return"i";case"KeyH":return"d";case"KeyJ":return"h";case"KeyK":return"t";case"KeyL":return"n";case"Semicolon":return"s";case"Quote":return"-";case"KeyQ":return"'";case"KeyW":return",";case"KeyE":return".";case"KeyR":return"p";case"KeyT":return"y";case"KeyY":return"f";case"KeyU":return"g";case"KeyI":return"c";case"KeyO":return"r";case"KeyP":return"l";case"KeyZ":return";";case"KeyX":return"q";case"KeyC":return"j";case"KeyV":return"k";case"KeyB":return"x";case"KeyN":return"b";case"KeyM":return"m";case"Comma":return"w";case"Period":return"v";case"Slash":return"z";default:return""}}}):Object.defineProperty(KeyboardEvent.prototype,"key",{configurable:!0,get:function(){if(this.shiftKey)switch(this.code){case"BracketLeft":return"{";case"Digit1":return"!";default:return""}switch(this.code){case"KeyA":return"a";case"KeyS":return"s";case"KeyD":return"d";case"KeyF":return"f";case"KeyG":return"g";case"KeyH":return"h";case"KeyJ":return"j";case"KeyK":return"k";case"KeyL":return"l";case"Semicolon":return";";case"Quote":return"'";case"KeyQ":return"q";case"KeyW":return"w";case"KeyE":return"e";case"KeyR":return"r";case"KeyT":return"t";case"KeyY":return"y";case"KeyU":return"u";case"KeyI":return"i";case"KeyO":return"o";case"KeyP":return"p";case"KeyZ":return"z";case"KeyX":return"x";case"KeyC":return"c";case"KeyV":return"v";case"KeyB":return"b";case"KeyN":return"n";case"KeyM":return"m";case"Comma":return",";case"Period":return".";case"Slash":return"/";default:return""}}})}),[B]),Object(n.useEffect)((function(){if("end"===I){var e="Your score: "+g.toString()+"  Miss: "+w.toString();o(" Game End! "+e)}}),[I,g,w]);var W=Object(n.useCallback)((function(e){if("paused"!==I&&"end"!==I)if(e.key===s[h]){for(var t=h+1,r="",n=0;n<t;n++)r+="_";if(t===s.length)return K(0),void N();p(g+1),o(r+s.substring(t)),K(t),J(s[t])}else j(w+1),p(g-1);else"Space"===e.code&&Q()}),[I,s,h,g,w,Q,N]);return Object(n.useEffect)((function(){return window.addEventListener("keydown",W),function(){return window.removeEventListener("keydown",W)}}),[W]),a.a.createElement("div",null,a.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",fontFamily:"monospace",letterSpacing:"3px",height:"100vh"}},a.a.createElement("h2",null,"Time: ",S),a.a.createElement("h1",null,s),a.a.createElement(y,{nextKey:z}),a.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",height:"40px",width:"350px",fontSize:"16px",letterSpacing:"1px"}},a.a.createElement(d,{isOn:B,handleToggle:function(){return T(!B)}}),a.a.createElement("div",null,"Switch 'qwerty' to 'dvorak'"))))},b=function(){var e={forceDvorakMode:h()};return a.a.createElement("div",null,a.a.createElement(m,{options:e}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.596176a4.chunk.js.map