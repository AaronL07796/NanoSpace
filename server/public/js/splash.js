var Splash = {}

Splash.show = function() {
	$('#splash').fadeIn(500)
}

Splash.hide = function() {
	$('#splash').fadeOut(500)
}

Splash.load_high_scores = function() {
	// Todo: tie into user.js
	// window._attraction is the name of the game
}


$(function() {
	
	var toggle_screen = function(e) {
		var a = $(e.currentTarget)
		var screen = a.attr('data-screen')
		
		if(screen) {
			var previous_screen = $('#splash .screens .screen.active')
			var next_screen = $('#splash .screens .screen.'+screen)
			
			previous_screen.removeClass('active')
			$('#splash .buttons a').removeClass('active')
			next_screen.addClass('active')
			a.addClass('active')
			
			
			previous_screen.trigger('unload')
			next_screen.trigger('load')
		}
	}
	
	$('#splash .buttons a').click(toggle_screen)
	
	// Load high scores
	$('#splash .screens .screen.high_scores').bind('load', Splash.load_high_scores)
	
})