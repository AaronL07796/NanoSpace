/*
	Programmer: Lukasz Czerwinski
	CodeCanyon: http://codecanyon.net/user/Lukasz_Czerwinski
	
	If this script you like, please put a comment on codecanyon.
	
*/
(function($){
	$.fn.viewbox = function(settings) {
		//Defaults settings  
		settings = $.extend({
			Speed		: 600,		//Speed animations
			heightWindow: 400,		//Height window
			widthWindow	: 600,		//Width window
			arrayEl		: [],		//Array with elements	
			arrayActEl	: 0,		//Array with active element		
			IMG			: 1,		//(true) Image
			frame		: 0,		//(false) Frame
			inline		: 0,		//(false) Inline
			inlineBg	: "#fff",	//(string) background for inline
			inlinePadding: 0,		//Padding for inline
			inlineScroll: false, 		//(true) Scroll for inline
			ajax		: 0,		//(false) Ajax
			ajaxType	: 0,		//(false) default is "GET" 
			ajaxData	: 0,		//
			ajaxSuccess	: 0,		//(false) You can add new instruction ajaxSuccess
			titleThumb	: 1,		//(true) Titlebar
			navigation	: false,		//(true) Navigation (arrows)
			keyboard	: false,		//(true) Keyboard
			keyClose	: "c",		//(string) Key to close
			keyPrev		: "p",		//(string) Key to previous element
			keyNext		: "n",		//(string) Key to next element
			numberEl	: 1			//(true) Number elements
		}, settings);
		
		var el = $(this);
		
		//Click
		function _clickEl () {
			_viewbox(this, el);
			return false;
		}
				
		//ViewBox Function
		function _viewbox (ElClicked, el) {
			//Resetting
			settings.arrayEl.length = 0;
			settings.arrayActEl = 0;
			//if is only one element
			if ( el.length == 1) { 
				settings.arrayEl.push(new Array (
					ElClicked.getAttribute("href"), 	//[0] location
					ElClicked.getAttribute("title"), 	//[1] title
					$(ElClicked).children("img").attr("alt") //[2] description
				));
			} else {
				//If is more element
				for (var i = 0; i < el.length; i++) {
					settings.arrayEl.push(new Array (
						el[i].getAttribute("href"),  //[i] location
						el[i].getAttribute("title"), //[i] title
						$(el[i]).children("img").attr("alt") //[i] description
					));
				}
			}
//			//Add the elements to the array, but not active
			while (settings.arrayEl[settings.arrayActEl][0] != ElClicked.getAttribute("href")) {
				settings.arrayActEl++;
			}
			createView(); 
		}
		//Create
		function createView () {

      var dark = $(el[0]).is('a.video_link')

      //destory existing structure (if exists)
      $("#viewbox, .vb_wrap .content .image, .content .object").remove();

			//create structure
			$("body").append("<div id='viewbox'></div><div class='vb_wrap'><div class='content'><div class='close'><a href='#'>close</a></div></div>");
      if(dark) $('#viewbox, .vb_wrap').addClass('dark')
			$("#viewbox, .vb_wrap, .vb_wrap .content, .vb_wrap .content, .vb_wrap .content").hide();

      keyboardNav();
				
			$("#viewbox").css("opacity", dark ? 0.6 : 0.2).fadeIn(settings.Speed/1.6, function () {

				//Get browser size
				arraySizeBrowser = sizeBrowser();
				
        var screen = el.parent('.screen')
        
        if(screen[0]) {
          var offset_top = screen.offset().top + (screen.height() / 2)
          var offset_left = screen.offset().left + (screen.width() / 2)
        } else {
          var offset_top = el.offset().top + (el.height() / 2)
          var offset_left = el.offset().left + (el.height() / 2)
        }

				//Window position
				$(".vb_wrap").css({
					top			: offset_top,
					left		: offset_left,
					opacity : 0
				});
				//Window animation
				$(".vb_wrap").show().animate({
          opacity : 1,
          height	: settings.heightWindow,
          width		: settings.widthWindow,
          top			: arraySizeBrowser[0]-settings.heightWindow/2,
          left		: arraySizeBrowser[1]-settings.widthWindow/2
        }, settings.Speed/1.2, function () {
          //Dowload the elemment
          setElement();
          $(".vb_wrap .content").fadeIn(settings.Speed/1.5);
          setTimeout(function() {
            $('#viewbox').trigger('enter_viewbox')
          }, settings.Speed/1.5)
        });	
			});
			//Close the ViewBox
			$("#viewbox, .vb_wrap .content .close a").click(function () {
				closeWindow();
				return false;
			});
		}		
		//Set the elemments
		function setElement () {
      //If image
      if (nImg(settings.arrayEl[settings.arrayActEl][0])) {				
        Img(settings.arrayEl[settings.arrayActEl][0]);						      		  
      } 
      //If youtube
      if(nYT(settings.arrayEl[settings.arrayActEl][0])) {
        Film(settings.arrayEl[settings.arrayActEl][0]);
      } 
      //If Vimeo
      if(nV(settings.arrayEl[settings.arrayActEl][0])){
        Vimeo(settings.arrayEl[settings.arrayActEl][0]);
      }
      //If Player
      if(nPlayer(settings.arrayEl[settings.arrayActEl][0])) {
        Player(settings.arrayEl[settings.arrayActEl][0]);
      }
      //If Frame
      if(nFrame(settings.arrayEl[settings.arrayActEl][0])) {
        FrameObj(settings.arrayEl[settings.arrayActEl][0]);
      }
      //If inline
      if(nInline(settings.arrayEl[settings.arrayActEl][0])) {
        Inline(settings.arrayEl[settings.arrayActEl][0]);
      }
      //If Ajax
      if(nAjax(settings.arrayEl[settings.arrayActEl][0])) {
        Ajax(settings.arrayEl[settings.arrayActEl][0]);
      }
		}
	  //extensions of files
		function nImg(hrefLink) {
			return hrefLink.indexOf("jpg", ".") > 0 || hrefLink.indexOf("png", ".") > 0 || hrefLink.indexOf("gif", ".") > 0;
		}
		function nYT(hrefLink) {
			return hrefLink.indexOf("youtube", ".") > 0 || hrefLink.indexOf("youtu.be", ".") > 0;
		}
		function nV(hrefLink) {
			return hrefLink.indexOf("vimeo", ".") > 0;
		}
		function nPlayer (hrefLink) {
			return hrefLink.indexOf("mp3", ".") > 0 || hrefLink.indexOf("vmw", ".") > 0 || hrefLink.indexOf("avi", ".") > 0;
		}  
		function nFrame (hrefLink) {
			return settings.frame != 0 || hrefLink.indexOf("html", ".") > 0;
		}
		function nInline (hrefLink) {
			return settings.inline != 0 || hrefLink.indexOf("#") >= 0;
		}
		function nAjax (hrefLink) {
			return settings.ajax != 0 || hrefLink.indexOf("txt", ".") > 0 || hrefLink.indexOf("js", ".") > 0;
		}
		   
	  //Show the image
	  function Img (hrefImg) {
      $(".vb_wrap .content").append("<div class='image'><img /></div>");
      $(".vb_wrap .image").hide();
      var ImgLoad = new Image (); 
      ImgLoad.onload = function () {
        $(".vb_wrap .content .image img").attr("src", ImgLoad.src);
        settings.heightWindow = ImgLoad.height;
        settings.widthWindow = ImgLoad.width;
          //Change size
          resizeWindow(ImgLoad.height, ImgLoad.width);
        ImgLoad.onload = function(){}; 
      };
      ImgLoad.src = hrefImg;
 
      //Variables with title and description
      var description = settings.arrayEl[settings.arrayActEl][2]; 
      var title = settings.arrayEl[settings.arrayActEl][1];
 
      //If is title
      if (title) {
       $(".vb_wrap .content .image").append("<div class='text'><h1>"+title+"</h1></div>");
      $(".vb_wrap .content .text").hide();
      //Mouse events
      $(".vb_wrap").hover(
                function () {
                    $(".vb_wrap .content .text").stop(true, true).slideDown(200);
                },
                function () {
                    $(".vb_wrap .content .text").stop(true, true).slideUp(180);
                }
            );
       }
       //If is description
       if (description) {
        $(".vb_wrap .content .text").append("<div class='description'>"+description+"</div>")
       }
   	} 
	 
	  //YouTube
	  function Film (link) {
      $(".vb_wrap .content").append("<div class='object'></div>"); 
      hrefY = $(link.split('/')).last()[0]
      hrefY = $(hrefY.split('=')).last()[0]
      $(".vb_wrap .object").append("<iframe src='http://www.youtube.com/embed/"+hrefY+"?autoplay=1&modestbranding=1&showinfo=0&showsearch=0&rel=0' width='"+settings.widthWindow+"' height='"+settings.heightWindow+"' frameborder='0' allowfullscreen></iframe>")
    } 
	
	  //Vimeo
	  function Vimeo (link) {
      $(".vb_wrap .content").append("<div class='object'></div>"); 
      hrefV = $(link.split('/')).last()[0]
      $(".vb_wrap .object").append("<iframe src='http://player.vimeo.com/video/"+hrefV+"?autoplay=1' width='"+settings.widthWindow+"' height='"+settings.heightWindow+"' frameborder='0'></iframe>")
    }
	
	  //Player
	  function Player (hrefFile) {
      $(".vb_wrap .content").append("<div class='object'></div>");
      $('.vb_wrap .object').append("<object id='player' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' name='player' width='"+settings.widthWindow+"' height='"+settings.heightWindow+"'> <param name='movie' value='player/player.swf' /><param name='allowfullscreen' value='true' /> <param name='flashvars' value='file="+hrefFile+"&amp;skin=player/modieus.zip' /> <object type='application/x-shockwave-flash' data='player/player.swf' width='"+settings.widthWindow+"' height='"+settings.heightWindow+"'> <param name='movie' value='player/player.swf' /> <param name='allowfullscreen' value='true' /> <param name='flashvars' value='file="+hrefFile+"&amp;skin=player/modieus.zip' /></object>");
    }
	
	  //Frame 
	  function FrameObj (src) {
		  $(".vb_wrap .content").append("<iframe hspace='0' src='"+src+"' scrolling='auto' frameborder='0' height='"+settings.heightWindow+"' width='"+settings.widthWindow+"' ></iframe>");
	  }

		
		//Inline
		function Inline (hrefAnhor) {
			ChangeStyle();
			$(".vb_wrap .content .content").append($(hrefAnhor).html());
		}
		
		//Ajax
		function Ajax (hrefAjax) {
 			ChangeStyle();
			 $.ajax({
			 	type: (!settings.ajaxType) ? "GET" : settings.ajaxType,
			 	url: hrefAjax,
				data: settings.ajaxData, 
				success: (!settings.ajaxSuccess) ? (function(data) { $("vb_wrap .content .content").html(data) }) : settings.ajaxSuccess 
			 });
		}
		
		function ChangeStyle () {
			//Background change
			$(".vb_wrap .content .number").hide();
			var scrollbar = (settings.inlineScroll) ? "auto" : "hidden";
			$(".vb_wrap .content").append("<div class='content'></div>");
			$(".vb_wrap .content .content").css({
				background	: settings.inlineBg,
				padding		: settings.inlinePadding,
				overflow	: scrollbar
			});
		}
		
		//Support for keyboard
		function keyboardNav () {
			if(settings.keyboard) {
				$(document.documentElement).unbind().bind("keyup", function (event) {
					//IE
					if ($.browser.msie) {
						codeAscii = event.keyCode;
					} else {
						codeAscii = event.keyCode;
					}
					KeyCode = String.fromCharCode(codeAscii).toLowerCase();
					
					//ESC
					if(event.keyCode == 27 || KeyCode == settings.keyClose) {
						closeWindow();
					}
				});
			}
	}
		//Numbers
		function NumberElement () {
			if(settings.numberEl) {
				$(".vb_wrap .content .number").remove();
				if(settings.arrayEl.length != 0) {
					function Words () {
						//If image
						if (nImg(settings.arrayEl[settings.arrayActEl][0])) {				
							return "Image ";						      		  
						} 
						//If youtube
						if(nYT(settings.arrayEl[settings.arrayActEl][0]) || nV(settings.arrayEl[settings.arrayActEl][0])) {
							return "Film ";
						} 
						//If Player
						if(nPlayer(settings.arrayEl[settings.arrayActEl][0])) {
							return "Item ";
						}
						//If Frame
						if(nFrame(settings.arrayEl[settings.arrayActEl][0])) {
							 return "Page ";
						}
					}
					$(".vb_wrap .content").append("<div class='number'>"+Words()+(settings.arrayActEl+1)+" / "+settings.arrayEl.length+"</div>");
				}
			}
		}
	  //Change size
	  function resizeWindow (Height, Width, Callback) {
		//Get the size
		var contentHeight = $(".vb_wrap").height();
		var contentWidth = $(".vb_wrap").width();
		 		
		$(".vb_wrap").stop(true, true).animate({
			left		: document.documentElement.clientWidth/2-Width/2,
			width		: Width,
			height		: Height
		}, settings.Speed/1.5);
			$(".vb_wrap .image").hide().fadeIn(300);
	} 
		//Close function 
		function closeWindow () {
			var arrPageSize = sizeBrowser();

			$(".vb_wrap .content").fadeOut(settings.Speed/1.6, function () {
				$(".vb_wrap").animate({
					left	: arrPageSize[1],
					top		: arrPageSize[0],
					height	: 20,
					width	: 20,
					opacity: 0
				}, settings.Speed/1.3, function () {
          $(this).remove();
          $("#viewbox").fadeOut(settings.Speed/1.5, function () {
            $('#viewbox').trigger('exit_viewbox')
            $("#viewbox").remove(); 
            settings.arrayEl.length = 0;
            settings.arrayActEl = 0;
          });
				});
			});
			
		}
		//Browser
		function sizeBrowser () {
			var arraySize = new Array;
			//Wysokość
			arraySize[0] = document.documentElement.clientHeight/2;
			//Szerokość 
			arraySize[1] = document.documentElement.clientWidth/2; 
			return arraySize;
		}
		
		//Thumbs
		if(settings.titleThumb) {
			jQuery.each(el, function() {
				var titleThumb = $(this).attr("title");
					if(titleThumb != "") {
						$(this).children("img").parent("a").wrap("<div class='thumbdiv'></div>");
							$(this).parent(".thumbdiv").append("<div class='title'>"+titleThumb+"</div>");
							$(this).parent(".thumbdiv").children(".title").hide();
					}
			});
			$(".thumbdiv").hover(
				function(){
					$(this).children(".title").stop(true, true).delay(150).slideDown(200);
				},
				function(){
					$(this).children(".title").stop(true, true).delay(150).slideUp(200);
				}
			);
		}
		//Click 
		return this.unbind('click').click(_clickEl); 
	};
})(jQuery); //The end 
