var _createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var GameStack=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t),this.options=e,this.createHMTLCallback=e.createHMTLCallback,this.interval=null,this.enableTimer=e.enableTimer,this.init()}return _createClass(t,[{key:"retrieveData",value:function(){var e=this.options;return Object.assign({},t.getLastGame(e.games.getGames()))}},{key:"getListGames",value:function(){var e=this.options;return Object.assign({},e.games.getGames())}},{key:"init",value:function(){var e=this.options,t=e.selector,a=e.limit,n=$(t);n.empty();for(var i=this.getListGames(),r=0;r<a;r++)this.createHMTL(i[r]).appendTo(n);this.enableTimer&&this.timer()}},{key:"createHMTL",value:function(e){return this.createHMTLCallback(e)}},{key:"removeHTML",value:function(e){var t=this.options.selector;this.clearTooltips();var a=$(t).children()[0];$(a).addClass("animation-hide"),$(a).fadeOut(800,function(){$(this).remove(),e()})}},{key:"clearTooltips",value:function(){var e=4<=parseFloat($.fn.tooltip.Constructor.VERSION)?"dispose":"destroy";$(this.options.selector+' [data-toggle="tooltip"]').tooltip(e)}},{key:"timer",value:function(){var e=this,t=this.options,a=t.delay,n=t.powerOff,i=new Date,r=new Date(i.getTime()+60*n*1e3);this.interval=setInterval(function(){if((new Date).getTime()>=r.getTime())return e.clearInterval(),!1;e.updateStack()},a)}},{key:"clearInterval",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){clearInterval(this.interval)})},{key:"size",get:function(){return this.data.length}},{key:"updateStack",value:function(){var a=this;this.removeHTML(function(){var e=a.retrieveData(),t=a.createHMTL(e).addClass("animation-show").css("display","inline-block").fadeIn(800);$(a.options.selector).append(t)})}}],[{key:"random",value:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}},{key:"getLastGame",value:function(e){return e[e.length-1]}}]),t}();