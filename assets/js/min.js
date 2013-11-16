window.Game={},Game.Settings={},Game.App={},Game.Modules={},Game.Helpers={},$(function(){var a=new Game.App,b=function(){a.onFrame(),requestAnimationFrame(b)},c=$("#game > canvas");a.setCanvas(c[0]),a.init(),window.gameGlobal=a,b()}),Game.App=function(){var a,b,c,d=!1,e=["assets/img/splash.png","assets/img/player_sprite.png","assets/img/enemy_sprite.png","assets/img/heart.png"],f=(Game.Settings.pixel_size,!0),g=5e3,h=[];this.init=function(){console.log("Game starting...");var a=0,b=e.length;for(var c in e){var d=e[c],f=new Image;f.src=d,f.onload=function(){a++,console.log("Loaded image "+a+" of "+b),a===b&&i()}}p()},this.setCanvas=function(c){a=c,b=a.getContext("2d")},this.onFrame=function(){if(d){l(),c.onFrame();for(var a in h)h[a].onFrame();if(c.getHealth()<1)return s(),!1;if(r(),window.game_running=d,f){var b=m();n(b)}}};var i=function(){b.drawImage(o("splash"),0,0,a.width,a.height,0,0,a.width,a.height),Mousetrap.bind("space",function(){Mousetrap.unbind("space"),d=!0,c=new Game.Modules.Player(a,o("player_sprite")),c.init(),c.setOnPunchCallback(j),c.setOnKickCallback(k)})},j=function(){},k=function(){var a=10,b=c.getX(),d=c.getY(),e=c.getOrientationX();for(var f in h){var g=h[f].getX(),i=h[f].getY(),j=h[f].getWidth(),k=h[f].getHeight();switch(e){case"left":b-a>=g&&g+j>=b&&i+k>=d&&d>=i&&console.log("BOOM");break;case"right":}}},l=function(){b.clearRect(0,0,a.width,a.height)},m=function(){var a=(new Date).getMilliseconds(),b=1,c=0;return function(){var d=(new Date).getMilliseconds();return a>d?(c=b,b=1):b+=1,a=d,c}}(),n=function(a){$("#fps").html(a+" FPS")},o=function(a){var b=new Image;return b.src="assets/img/"+a+".png",b},p=function(){setInterval(q,g)},q=function(){if(d!==!1){console.log("Spawning enemy");var b=new Game.Modules.Enemy(a,o("enemy_sprite"));b.init(),b.spawnRandomOutside(),b.setTarget(c),b.followTarget(),h.push(b)}},r=function(){for(var a=10,d=10,e=c.getHealth();e--;)b.drawImage(o("heart"),0,0,28,28,a,d,28,28),a+=35},s=function(){d=!1,alert("GAME OVER LOL")}},Game.Modules.Character=function(){},Game.Modules.Character.prototype.blink=function(){},Game.Modules.Enemy=function(a,b){var c,d=this,e=a,f=b,g=e.getContext("2d"),h=1,i=1,j=24,k=36,l={x:0,y:0},m=0,n=0,o=1e3;this.init=function(){},this.spawnRandomOutside=function(){var a=Math.round(30*Math.random()*-1),b=Math.round(30*Math.random()*-1);l.x=a,l.y=b},this.setTarget=function(a){c=a},this.followTarget=function(){var a=c.getX(),b=c.getY();m=a,n=b,window.game_running!==!1&&setTimeout(function(){d.followTarget()},o)},this.onFrame=function(){if(window.game_running!==!1){var a=m,b=n;a<l.x?l.x-=h:a>l.x&&(l.x+=h),b<l.y?l.y-=i:b>l.y&&(l.y+=i),g.drawImage(f,0,0,j,k,l.x,l.y,j,k),p()}},this.getX=function(){return l.x},this.getY=function(){return l.y},this.getWidth=function(){return j},this.getHeight=function(){return k};var p=function(){var a=c.getX(),b=c.getY(),d=l.x,e=l.y;d>=a&&d<=a+c.getWidth()&&e>=b&&e<=b+c.getHeight()&&(console.log("HIT"),c.getHit())}},Game.Modules.Enemy.prototype=Game.Modules.Character.prototype,Game.Modules.Player=function(a,b){var c,d,e=a,f=b,g=e.getContext("2d"),h=!0,i=30,j=30,k=Game.Settings.pixel_size,l={idle:{x:0,y:0},punch:{x:76,y:0},kick:{x:121,y:0}},m=5,n=100,o=80,p={up:2,down:2,left:3,right:3};player_orientation_x="right",player_orientation_y="down";var q={};q.left=!1,q.right=!1,q.up=!1,q.down=!1;var r={};r.attack=!1;var s,t=!1;this.init=function(){this.blink(),v()},this.onFrame=function(){u()},this.getX=function(){return n},this.getY=function(){return o},this.getWidth=function(){return i},this.getHeight=function(){return j},this.getHit=function(){h!==!1&&(m--,h=!1,setTimeout(function(){h=!0},500))},this.getHealth=function(){return m},this.getOrientationX=function(){return player_orientation_x},this.setOnPunchCallback=function(a){c=a},this.setOnKickCallback=function(a){d=a};var u=function(){var a=0;if(a>n)return n=a,void 0;var b=e.width-i;if(n>b)return n=b,void 0;var c=0;if(c>o)return o=c,void 0;var d=e.height-j;if(o>d)return o=d,void 0;var h="idle",k=!0;q.left&&(n-=p.left,k=!1),q.right&&(n+=p.right,k=!1),q.up&&(o-=p.up,k=!1),q.down&&(o+=p.down,k=!1),r.punch&&(h="punch",k=!1),r.kick&&(h="kick",k=!1);var m=l[h].x,s=l[h].y;"right"===player_orientation_x&&(s+=66),t?m=39:"idle"===h&&k&&1===Math.round(100*Math.random())&&(m=39,t=!0,setTimeout(function(){t=!1},200)),g.drawImage(f,m,s,i,j,n,o,i,j)},v=function(){Mousetrap.bind("a",w,"keydown"),Mousetrap.bind("a",x,"keyup"),Mousetrap.bind("d",y,"keydown"),Mousetrap.bind("d",z,"keyup"),Mousetrap.bind("w",A,"keydown"),Mousetrap.bind("w",B,"keyup"),Mousetrap.bind("s",C,"keydown"),Mousetrap.bind("s",D,"keyup"),Mousetrap.bind("space",E)},w=function(){q.left=!0,"right"===player_orientation_x&&(player_orientation_x="left")},x=function(){q.left=!1},y=function(){n>e.width||(q.right=!0,"left"===player_orientation_x&&(player_orientation_x="right"))},z=function(){q.right=!1},A=function(){q.up=!0},B=function(){q.up=!1},C=function(){q.down=!0},D=function(){q.down=!1},E=function(){return r.attack===!0?!1:q.right||q.left||q.up||q.down?(F(),void 0):(G(),void 0)},F=function(){clearTimeout(s),r.punch=!0,n+="left"===player_orientation_x?1*k:-3*k,s=setTimeout(function(){r.punch=!1},200),c()},G=function(){clearTimeout(s),r.kick=!0,n+="left"===player_orientation_x?-1*k:k,s=setTimeout(function(){r.kick=!1},350),d()}},Game.Modules.Player.prototype=Game.Modules.Character.prototype,Game.Settings={pixel_size:3},function(a,b,c){function d(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function e(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);return a.shiftKey||(b=b.toLowerCase()),b}return q[a.which]?q[a.which]:r[a.which]?r[a.which]:String.fromCharCode(a.which).toLowerCase()}function f(a){a=a||{};var b,c=!1;for(b in w)a[b]?c=!0:w[b]=0;c||(z=!1)}function g(a,b,c,d,e,f){var g,h,i=[],j=c.type;if(!u[a])return[];for("keyup"==j&&k(a)&&(b=[a]),g=0;g<u[a].length;++g)if(h=u[a][g],!(!d&&h.seq&&w[h.seq]!=h.level||j!=h.action||("keypress"!=j||c.metaKey||c.ctrlKey)&&b.sort().join(",")!==h.modifiers.sort().join(","))){var l=d&&h.seq==d&&h.level==f;(!d&&h.combo==e||l)&&u[a].splice(g,1),i.push(h)}return i}function h(a){var b=[];return a.shiftKey&&b.push("shift"),a.altKey&&b.push("alt"),a.ctrlKey&&b.push("ctrl"),a.metaKey&&b.push("meta"),b}function i(a,b,c,d){A.stopCallback(b,b.target||b.srcElement,c,d)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function j(a){"number"!=typeof a.which&&(a.which=a.keyCode);var b=e(a);b&&("keyup"==a.type&&x===b?x=!1:A.handleKey(b,h(a),a))}function k(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function l(a,b,c,d){function g(b){return function(){z=b,++w[a],clearTimeout(p),p=setTimeout(f,1e3)}}function h(b){i(c,b,a),"keyup"!==d&&(x=e(b)),setTimeout(f,10)}for(var j=w[a]=0;j<b.length;++j){var k=j+1===b.length?h:g(d||m(b[j+1]).action);n(b[j],k,d,a,j)}}function m(a,b){var c,d,e,f=[];for(c="+"===a?["+"]:a.split("+"),e=0;e<c.length;++e)d=c[e],t[d]&&(d=t[d]),b&&"keypress"!=b&&s[d]&&(d=s[d],f.push("shift")),k(d)&&f.push(d);if(c=d,e=b,!e){if(!o){o={};for(var g in q)g>95&&112>g||q.hasOwnProperty(g)&&(o[q[g]]=g)}e=o[c]?"keydown":"keypress"}return"keypress"==e&&f.length&&(e="keydown"),{key:d,modifiers:f,action:e}}function n(a,b,c,d,e){v[a+":"+c]=b,a=a.replace(/\s+/g," ");var f=a.split(" ");1<f.length?l(a,f,b,c):(c=m(a,c),u[c.key]=u[c.key]||[],g(c.key,c.modifiers,{type:c.action},d,a,e),u[c.key][d?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:d,level:e,combo:a}))}var o,p,q={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},s={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},t={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},u={},v={},w={},x=!1,y=!1,z=!1;for(c=1;20>c;++c)q[111+c]="f"+c;for(c=0;9>=c;++c)q[c+96]=c;d(b,"keypress",j),d(b,"keydown",j),d(b,"keyup",j);var A={bind:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;++d)n(a[d],b,c);return this},unbind:function(a,b){return A.bind(a,function(){},b)},trigger:function(a,b){return v[a+":"+b]&&v[a+":"+b]({},a),this},reset:function(){return u={},v={},this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},handleKey:function(a,b,c){var d,e=g(a,b,c);b={};var h=0,j=!1;for(d=0;d<e.length;++d)e[d].seq&&(h=Math.max(h,e[d].level));for(d=0;d<e.length;++d)e[d].seq?e[d].level==h&&(j=!0,b[e[d].seq]=1,i(e[d].callback,c,e[d].combo,e[d].seq)):j||i(e[d].callback,c,e[d].combo);e="keypress"==c.type&&y,c.type!=z||k(a)||e||f(b),y=j&&"keydown"==c.type}};a.Mousetrap=A,"function"==typeof define&&define.amd&&define(A)}(window,document);