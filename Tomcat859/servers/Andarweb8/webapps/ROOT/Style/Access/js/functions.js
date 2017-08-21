$(document).ready(function() {
var project1 = $('header').offset();
$(window).scroll(function() {
	if ( $(this).scrollTop() >= project1.top) {
		$("header").addClass("fixed");
	}
	if ( $(this).scrollTop() <= project1.top) {
		$("header").removeClass("fixed");
	}
	if ($(this).scrollTop() > 100) {
		$('.backtotop').fadeIn();
	}
	else {
		$('.backtotop').fadeOut();
	}
});
$('.backtotop').click(function () {
	$("html, body").animate({
		scrollTop: 0
	}, 600);
return false;
});
$("ul.pureCssMenu ul .CSSCloseButton").click(function(){
    $("ul.pureCssMenu ul").hide();
});
$("ul.pureCssMenu span").click(function(){
    $("ul.pureCssMenu li:hover > ul").show();
});
});