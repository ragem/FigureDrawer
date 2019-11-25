(window.webpackJsonpmd2=window.webpackJsonpmd2||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),l=n.n(o);n(13),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(3),s=n(4),c=n(6),u=n(5),h=n(7),v=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).controlpoints=r.a.createRef(),e.canvas=r.a.createRef(),e.selectedElement=r.a.createRef(),e.angle=r.a.createRef(),e.state={hasRendered:!1,poly:[]},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"onDrawClick",value:function(){var e=this.controlpoints.current.value;this.drawPolygon(parseInt(e,10))}},{key:"drawPolygon",value:function(e){var t=this.canvas.current.getBoundingClientRect();this.drawShape(t.width/2,t.height/2,e,50,50,0)}},{key:"drawShape",value:function(e,t,n,a,r,o){var l=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],i=this.canvas.current.getContext("2d");n=r!==a?2*n:n;for(var s=[],c=0;c<=n;c++){var u=2*c*Math.PI/n-Math.PI/2+o,h=c%2===0?a:r,v=e+h*Math.cos(u),m=e+h*Math.sin(u);l||i.moveTo(v,m),i.lineTo(v,m),l&&0!==c&&i.fillText(c,v-5,m-5),s.push({number:c,x:v,y:m})}i.strokeStyle="#bada55",i.fillStyle="#bada55",i.lineWidth=2,i.stroke(),console.log(s),this.setState({hasRendered:!0,poly:s})}},{key:"pointSelect",value:function(){var e=this,t=this.state.poly;return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{htmlFor:"availablePoints"},"Select point",r.a.createElement("select",{id:"availablePoints",name:"lol",ref:this.selectedElement},t.map((function(e){var t=e.number;return r.a.createElement("option",{key:t,value:t},t)})))),r.a.createElement("label",{htmlFor:"angle"},"Select Angle to rotate",r.a.createElement("input",{type:"number",id:"angle",min:"-360",max:"360",ref:this.angle})),r.a.createElement("button",{onClick:function(){return e.rotate()}},"Rotate"))}},{key:"rotate",value:function(){var e=this.state.poly,t=parseInt(this.selectedElement.current.value,10),n=parseInt(this.angle.current.value,10),a=parseInt(this.controlpoints.current.value,10),r=e.find((function(e){return e.number===t})),o=r.x,l=r.y;this.rotateThing(o,l,-n*(Math.PI/180),a)}},{key:"rotateThing",value:function(e,t,n,a){var r=this.canvas.current.getContext("2d");r.save(),r.translate(e,t),r.rotate(n),r.translate(-50,0),r.beginPath();for(var o=0;o<=a;o++){var l=50*Math.cos(2*o*Math.PI/a),i=50*Math.sin(2*o*Math.PI/a);r.lineTo(l,i)}r.stroke(),r.restore()}},{key:"renderCanvas",value:function(){return r.a.createElement("canvas",{ref:this.canvas,className:"Canvas",width:500,height:500})}},{key:"renderControls",value:function(){var e=this;return r.a.createElement("div",{className:"controls"},r.a.createElement("label",{htmlFor:"controlpoints"},"Number of points",r.a.createElement("input",{type:"number",ref:this.controlpoints,id:"controlpoints",min:"3",max:"11"})),r.a.createElement("button",{onClick:function(){return e.onDrawClick()}},"Draw"))}},{key:"render",value:function(){var e=this.state.hasRendered;return r.a.createElement("div",null,this.renderCanvas(),this.renderControls(),e?this.pointSelect():null)}}]),t}(a.PureComponent);l.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.273ee6d6.chunk.js.map