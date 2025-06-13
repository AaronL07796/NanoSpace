$.browser['real_safari'] = $.browser.safari && !/chrome/.test(navigator.userAgent.toLowerCase())


// jQuery plugin for putting commas every 3 digits of a number
// by Paul Creasey via http://stackoverflow.com/questions/1990512/add-comma-to-numbers-every-three-digits-using-jquery/1990590#1990590
$.fn.digits = function() {
  return this.each( function() {
    $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") )
  } )
}



// Shuffles an array or the children of a element container.
// by Ca-Phun Ung via http://github.com/caphun/jquery.shuffle
$.fn.shuffle = function() {
	return this.each(function(){
		var items = $(this).children().clone(true)
		return (items.length) ? $(this).html($.shuffle(items)) : this
	})
}
$.shuffle = function(arr) {
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	return arr
}



// Get the center of any element
;(function($) {
  $.fn.center = function() {
    return {
      y: parseInt(this.css('top'), 10) + ( 0.5 * this.height() ),
      x: parseInt(this.css('left'), 10) + ( 0.5 * this.width() )
    }
  }
})(jQuery);



jQuery.fn.equals = function(other_el) {
  if(!other_el || !other_el.length || this.length != other_el.length) return false
  for(var i = 0; i < this.length; i++) {
    if(this[i] !== other_el[i]) return false
  }
  return true
}



$.extend({
  distinct: function(anArray) {
    var result = []
    $.each(anArray, function(i,v) {
      if($.inArray(v, result) == -1) result.push(v)
    })
    return result
  }
})



// A pausable setTimeout
var Timer = function() {
  var THIS = {}
  
  var ACTIVE_TIMERS = {}
  var I = 0
  
  var remove_from_active = function(timer_i) {
    delete ACTIVE_TIMERS[timer_i]
  }
  
  THIS.pause = function(timer_i) {
    var timer = ACTIVE_TIMERS[timer_i]
    if(!timer) return
    clearTimeout(timer.timer_id)
    timer.remaining -= Date.now() - timer.start
  }
  
  THIS.resume = function(timer_i) {
    var timer = ACTIVE_TIMERS[timer_i]
    if(!timer) return
    timer.start = Date.now()
    timer.timer_id = setTimeout(function() {
      remove_from_active(timer_i)
      timer.callback()
    }, timer.remaining)
  }
  
  THIS.clear = function(timer_i) {
    var timer = ACTIVE_TIMERS[timer_i]
    if(!timer) return
    remove_from_active(timer_i)
    clearTimeout(timer.timer_id)
  }
  
  THIS.set = function(callback, delay) {
    var timer_i = 'timer'+I
    I++
    ACTIVE_TIMERS[timer_i] = {timer_id: null, start: Date.now(), remaining: delay, callback: callback}
    THIS.resume(timer_i)
    return timer_i
  }
  
  THIS.pause_all = function() {
    for(var timer_i in ACTIVE_TIMERS) THIS.pause(timer_i)
  }
  
  THIS.resume_all = function() {
    for(var timer_i in ACTIVE_TIMERS) THIS.resume(timer_i)
  }
  
  return THIS
}()



// Set up some useful classes, primarily for CSS animations and transitions
$(document).ready(  function() {$('html').addClass('ready')}  )
$(document).ready(  function() {$('html').addClass( $.browser.real_safari ? 'safari' : 'not-safari' )}  )
$(window).load(     function() {$('html').addClass('loaded')} )


// requestAnimationFrame shim
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie=function(e,b,a){if(arguments.length>1&&String(b)!=="[object Object]"){a=jQuery.extend({},a);if(b===null||b===void 0)a.expires=-1;if(typeof a.expires==="number"){var d=a.expires,c=a.expires=new Date;c.setDate(c.getDate()+d)}b=String(b);return document.cookie=[encodeURIComponent(e),"=",a.raw?b:encodeURIComponent(b),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b||{};c=a.raw?function(a){return a}:
decodeURIComponent;return(d=RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?c(d[1]):null};
