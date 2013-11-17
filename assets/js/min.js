function randomFromInterval(a,b){return Math.floor(Math.random()*(b-a+1)+a)}window.Game={},Game.Settings={},Game.App={},Game.Modules={},Game.Helpers={},Game.Globals={},$(function(){var a=new Game.App,b=function(){a.onFrame(),requestAnimationFrame(b)},c=$("#game > canvas");a.setCanvas(c[0]),a.init(),window.gameGlobal=a,b()}),Game.App=function(){var a,b,c,d=!1,e=!1,f=["assets/img/splash.png","assets/img/game_over.png","assets/img/player_sprite.png","assets/img/enemy_sprite.png","assets/img/heart.png"],g=(Game.Settings.pixel_size,!0),h=5e3,i=[],j=0,k=1;this.init=function(){console.log("Game starting...");var a=0,b=f.length;for(var c in f){var d=f[c],e=new Image;e.src=d,e.onload=function(){a++,console.log("Loaded image "+a+" of "+b),a===b&&l()}}t()},this.setCanvas=function(c){a=c,b=a.getContext("2d")},this.onFrame=function(){if(e===!0)return y(),void 0;if(d){p(),c.onFrame();for(var f in i)i[f].onFrame();if(c.getHealth()<1)return x(),!1;if(v(),w(),window.game_running=d,window.Game.Globals.canvas=a,window.Game.Globals.context=b,g){var h=q();r(h)}}};var l=function(){b.drawImage(s("splash"),0,0,a.width,a.height,0,0,a.width,a.height),Mousetrap.bind("space",function(){Mousetrap.unbind("space"),d=!0,c=new Game.Modules.Player(a,s("player_sprite")),c.init(),c.setOnPunchCallback(m),c.setOnKickCallback(n)})},m=function(){n()},n=function(){var a=c.getX(),b=c.getY(),d=c.getOrientationX(),e=5,f=0,g=0,h=0,j=0;h=b,j=b+c.getHeight();for(var k in i){{var l=i[k].getX(),m=i[k].getY();i[k].getWidth(),i[k].getHeight()}f=a-e,g=a+c.getWidth()+e,attack_point_x="left"===d?f+e:g+e;var n=h+5,p=12;l>attack_point_x-p&&attack_point_x+p>l&&m>n-2*p&&n+2*p>m&&o(i[k],k,d)}},o=function(a,b,c){a.getHit(c),console.log("☻ RIGHT IN THE KISSER"),j+=10,a.getHealth()<1&&(j+=100,console.log("LOL DEAD"),a.die(),i.splice(b,1))},p=function(){b.clearRect(0,0,a.width,a.height)},q=function(){var a=(new Date).getMilliseconds(),b=1,c=0;return function(){var d=(new Date).getMilliseconds();return a>d?(c=b,b=1):b+=1,a=d,c}}(),r=function(a){$("#fps").html(a+" FPS")},s=function(a){var b=new Image;return b.src="assets/img/"+a+".png",b},t=function(){setInterval(u,h)},u=function(){if(d!==!1){console.log("Spawning enemy");var b=new Game.Modules.Enemy(a,s("enemy_sprite"),k);b.init(),b.spawnRandomOutside(),b.setTarget(c),b.followTarget(),i.push(b),h>300&&(h-=200,console.log(h)),4>k&&(k+=.1)}},v=function(){for(var a=10,d=10,e=c.getHealth();e--;)b.drawImage(s("heart"),0,0,28,28,a,d,28,28),a+=35},w=function(){var a=600,c=33;b.font='30pt "silkscreennormal"',b.fillStyle="white",b.fillText(j+" pts",a,c)},x=function(){d=!1,e=!0,console.log("GAME OVER LOL")},y=function(){b.drawImage(s("game_over"),0,0,a.width,a.height,0,0,a.width,a.height)}},Game.Helpers.Debug=function(a,b,c,d){{var e=window.Game.Globals.context;window.Game.Globals.canvas}e.rect(a,b,c,d),e.fill()},Game.Modules.Character=function(){},Game.Modules.Character.prototype.blink=function(){},Game.Modules.Enemy=function(a,b,c){var d,e=this,f=!0,g=a,h=b,i=g.getContext("2d"),j=3,k=c,l=k,m=l,n=k,o=n,p="right",q=24,r=36,s={x:0,y:0},t=0,u=0,v=1e3;this.init=function(){},this.spawnRandomOutside=function(){var a=0===Math.round(Math.random())?"above":"under",b=Math.round(Math.random()*g.width),c=0;c="above"===a?Math.round(30*Math.random()*-1):Math.round(30*Math.random())+g.height,s.x=b,s.y=c},this.setTarget=function(a){d=a},this.followTarget=function(){var a=d.getX(),b=d.getY();t=a,u=b,window.game_running!==!1&&setTimeout(function(){e.followTarget()},v)},this.onFrame=function(){if(window.game_running&&f){var a=t,b=u;a<s.x?(s.x-=m,p="left"):a>s.x&&(s.x+=m,p="right"),b<s.y?s.y-=o:b>s.y&&(s.y+=o),s.x+=randomFromInterval(-1,1),s.y+=randomFromInterval(-1,1)}var c=0,d=0;"left"===p&&(d=48),i.drawImage(h,c,d,q,r,s.x,s.y,q,r),w()},this.getX=function(){return s.x},this.getY=function(){return s.y},this.getWidth=function(){return q},this.getHeight=function(){return r},this.getHealth=function(){return j},this.getHit=function(a){if(f){j--;var b="left"===a?-20:20;s.x+=b,setTimeout(function(){m=l,console.log("Speed X returned to original")},800),f=!1,setTimeout(function(){f=!0},300)}},this.die=function(){sprite_x=61,f=!1};var w=function(){var a=d.getX(),b=d.getY(),c=s.x,e=s.y;c>=a&&c<=a+d.getWidth()&&e>=b&&e<=b+d.getHeight()&&(console.log("Player gets hit"),d.getHit(p))}},Game.Modules.Enemy.prototype=Game.Modules.Character.prototype,Game.Modules.Player=function(a,b){var c,d,e=a,f=b,g=e.getContext("2d"),h=!0,i=!0,j=!1,k=30,l=30,m=(Game.Settings.pixel_size,{idle:{x:0,y:0},punch:{x:76,y:0},kick:{x:121,y:0},hurting:{x:235,y:0}}),n=4,o=100,p=80,q={up:2,down:2,left:3,right:3};player_orientation_x="right",player_orientation_y="down";var r={};r.left=!1,r.right=!1,r.up=!1,r.down=!1;var s={};s.attack=!1;var t,u=!1;this.init=function(){this.blink(),w()},this.onFrame=function(){v()},this.getX=function(){return o},this.getY=function(){return p},this.getWidth=function(){return k},this.getHeight=function(){return l},this.getHit=function(a){h!==!1&&j!==!0&&(n--,h=!1,s.hurting=!0,o+="left"===a?-20:20,setTimeout(function(){h=!0,s.hurting=!1},500))},this.getHealth=function(){return n},this.getOrientationX=function(){return player_orientation_x},this.setOnPunchCallback=function(a){c=a},this.setOnKickCallback=function(a){d=a};var v=function(){var a=0;if(a>o)return o=a,void 0;var b=e.width-k;if(o>b)return o=b,void 0;var c=0;if(c>p)return p=c,void 0;var d=e.height-l;if(p>d)return p=d,void 0;var h="idle",i=!0;r.left&&(o-=q.left,i=!1),r.right&&(o+=q.right,i=!1),r.up&&(p-=q.up,i=!1),r.down&&(p+=q.down,i=!1),s.punch&&(h="punch",i=!1),s.kick&&(h="kick",i=!1),s.hurting&&(h="hurting",i=!1);var j=m[h].x,n=m[h].y;"right"===player_orientation_x&&(n+=66),u?j=39:"idle"===h&&i&&1===Math.round(100*Math.random())&&(j=39,u=!0,setTimeout(function(){u=!1},200)),g.drawImage(f,j,n,k,l,o,p,k,l)},w=function(){Mousetrap.bind("a",x,"keydown"),Mousetrap.bind("a",y,"keyup"),Mousetrap.bind("d",z,"keydown"),Mousetrap.bind("d",A,"keyup"),Mousetrap.bind("w",B,"keydown"),Mousetrap.bind("w",C,"keyup"),Mousetrap.bind("s",D,"keydown"),Mousetrap.bind("s",E,"keyup"),Mousetrap.bind("space",F,"keydown"),Mousetrap.bind("space",function(){i=!0},"keyup")},x=function(){r.left=!0,"right"===player_orientation_x&&(player_orientation_x="left")},y=function(){r.left=!1},z=function(){o>e.width||(r.right=!0,"left"===player_orientation_x&&(player_orientation_x="right"))},A=function(){r.right=!1},B=function(){r.up=!0},C=function(){r.up=!1},D=function(){r.down=!0},E=function(){r.down=!1},F=function(){return i!==!1?(i=!1,r.right||r.left||r.up||r.down?(G(),void 0):(H(),void 0)):void 0},G=function(){s.punch=!1,clearTimeout(t),s.kick=!1,s.punch=!0,t=setTimeout(function(){s.punch=!1},100),c()},H=function(){s.kick=!1,clearTimeout(t),s.punch=!1,s.kick=!0,t=setTimeout(function(){s.kick=!1},100),d()}},Game.Modules.Player.prototype=Game.Modules.Character.prototype,Game.Settings={pixel_size:3},function(a,b,c){function d(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function e(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);return a.shiftKey||(b=b.toLowerCase()),b}return q[a.which]?q[a.which]:r[a.which]?r[a.which]:String.fromCharCode(a.which).toLowerCase()}function f(a){a=a||{};var b,c=!1;for(b in w)a[b]?c=!0:w[b]=0;c||(z=!1)}function g(a,b,c,d,e,f){var g,h,i=[],j=c.type;if(!u[a])return[];for("keyup"==j&&k(a)&&(b=[a]),g=0;g<u[a].length;++g)if(h=u[a][g],!(!d&&h.seq&&w[h.seq]!=h.level||j!=h.action||("keypress"!=j||c.metaKey||c.ctrlKey)&&b.sort().join(",")!==h.modifiers.sort().join(","))){var l=d&&h.seq==d&&h.level==f;(!d&&h.combo==e||l)&&u[a].splice(g,1),i.push(h)}return i}function h(a){var b=[];return a.shiftKey&&b.push("shift"),a.altKey&&b.push("alt"),a.ctrlKey&&b.push("ctrl"),a.metaKey&&b.push("meta"),b}function i(a,b,c,d){A.stopCallback(b,b.target||b.srcElement,c,d)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function j(a){"number"!=typeof a.which&&(a.which=a.keyCode);var b=e(a);b&&("keyup"==a.type&&x===b?x=!1:A.handleKey(b,h(a),a))}function k(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function l(a,b,c,d){function g(b){return function(){z=b,++w[a],clearTimeout(p),p=setTimeout(f,1e3)}}function h(b){i(c,b,a),"keyup"!==d&&(x=e(b)),setTimeout(f,10)}for(var j=w[a]=0;j<b.length;++j){var k=j+1===b.length?h:g(d||m(b[j+1]).action);n(b[j],k,d,a,j)}}function m(a,b){var c,d,e,f=[];for(c="+"===a?["+"]:a.split("+"),e=0;e<c.length;++e)d=c[e],t[d]&&(d=t[d]),b&&"keypress"!=b&&s[d]&&(d=s[d],f.push("shift")),k(d)&&f.push(d);if(c=d,e=b,!e){if(!o){o={};for(var g in q)g>95&&112>g||q.hasOwnProperty(g)&&(o[q[g]]=g)}e=o[c]?"keydown":"keypress"}return"keypress"==e&&f.length&&(e="keydown"),{key:d,modifiers:f,action:e}}function n(a,b,c,d,e){v[a+":"+c]=b,a=a.replace(/\s+/g," ");var f=a.split(" ");1<f.length?l(a,f,b,c):(c=m(a,c),u[c.key]=u[c.key]||[],g(c.key,c.modifiers,{type:c.action},d,a,e),u[c.key][d?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:d,level:e,combo:a}))}var o,p,q={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},s={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},t={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},u={},v={},w={},x=!1,y=!1,z=!1;for(c=1;20>c;++c)q[111+c]="f"+c;for(c=0;9>=c;++c)q[c+96]=c;d(b,"keypress",j),d(b,"keydown",j),d(b,"keyup",j);var A={bind:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;++d)n(a[d],b,c);return this},unbind:function(a,b){return A.bind(a,function(){},b)},trigger:function(a,b){return v[a+":"+b]&&v[a+":"+b]({},a),this},reset:function(){return u={},v={},this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},handleKey:function(a,b,c){var d,e=g(a,b,c);b={};var h=0,j=!1;for(d=0;d<e.length;++d)e[d].seq&&(h=Math.max(h,e[d].level));for(d=0;d<e.length;++d)e[d].seq?e[d].level==h&&(j=!0,b[e[d].seq]=1,i(e[d].callback,c,e[d].combo,e[d].seq)):j||i(e[d].callback,c,e[d].combo);e="keypress"==c.type&&y,c.type!=z||k(a)||e||f(b),y=j&&"keydown"==c.type}};a.Mousetrap=A,"function"==typeof define&&define.amd&&define(A)}(window,document);