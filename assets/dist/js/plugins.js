/* =============================================================================
   ADD FIRST LAST LI
   ========================================================================== */
$(document).ready( function($) {
	"use strict";
	$('ul > li:first-child').addClass('first');
	$('ul > li:last-child').addClass('last'); 
} );

/* =============================================================================
   SEARCH DROP
   ========================================================================== */

$(document).ready( function($) {
	"use strict";
var searchvisible = 0; 
var $searchlink = $('#search-menu i');
var $searchselect = $('#search-menu');         
    $("#search-menu").click(function(e){ 
        //This stops the page scrolling to the top on a # link.
        e.preventDefault();
        if (searchvisible ===0) {
            //Search is currently hidden. Slide down and show it.
            $("#search-form").slideDown(200);
            $("#s").focus(); //Set focus on the search input field.
            searchvisible = 1; //Set search visible flag to visible.
			$searchlink.removeClass('fa-search').addClass('fa-search-minus');
			$searchselect.addClass('search-menu-select');
        } else {
            //Search is currently showing. Slide it back up and hide it.
            $("#search-form").slideUp(200);
            searchvisible = 0;
			$searchlink.removeClass('fa-search-minus').addClass('fa-search');
			$searchselect.removeClass('search-menu-select');
        }
    });
});

/* =============================================================================
   MOBILE MENU
   ========================================================================== */
$(document).ready(function(){
    "use strict";
	var nisb = '.burger';
	$(nisb).click(function(){
		$('#sidenav').toggleClass('nav-open');
        $('#content-wrap').toggleClass('content-open');
		$('.top-menu').slideToggle();
	});
});


/* =============================================================================
   SIDEBAR SCROLL
   ========================================================================== */
$(function () {
    var sidebar = $('.sidebar');
  
    $(window).scroll(function (event) {
      var y = $(this).scrollTop();
      if (y >= top) {
        sidebar.addClass('fixed');
      } else {
        sidebar.removeClass('fixed');
      }
    });
});

/* =============================================================================
   POP UP OVERLAY
   ========================================================================== */
$(document).ready(function() {
    $("#loginLink").click(function( event ){
        event.preventDefault();
        $(".overlay").fadeToggle("fast");
      });
 
    $(".close").click(function(){
        $(".overlay").fadeToggle("fast");
    });
 
    $(document).keyup(function(e) {
        if(e.keyCode == 27 && $(".overlay").css("display") != "none" ) {
            event.preventDefault();
            $(".overlay").fadeToggle("fast");
        }
    });
});