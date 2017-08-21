/**
 * jQuery.termifier - Flyover text for jQuery
 * Example from "Manning jQuery In Action" book.
 * Use: 
 * $(function() {  
 *	$("acronym").termifier({lookupResource: 'EventToolTip.jsp'});  
 * });  
 * Date: 2011/02/09
 *
 *
 **/

(function($) {  
	$.fn.termifier = function(options) {  
		options = $.extend({  
			lookupResource: 'getTerm',  
			flyoutClass: 'lookerUpperFlyout'  
		},options||{});  
		this.attr('title','Click here for more information');  
		return this.click(function(event){  
			$.ajax({
				url: options.lookupResource,
				type: 'GET',
//				data: {term: this.innerHTML},
				data: {term: this.className},
				dataType: 'html',
				success: function(data) {		
					$('<div></div>')  
						.css({  
							position: 'absolute',  
							backgroundColor: '#ffc',  
							padding: '10px',  
							left: event.pageX,  
							top: event.pageY,  
							cursor: 'pointer',  
							display: 'none'  
						})  
					.html(data)  
					.addClass(options.flyoutClass)  
					.click(function(){  
						$(this).fadeOut(800,function(){$(this).remove();});  
					})  
					.appendTo('body')  
					.fadeIn();  
				}
			});
			return false;  
		});  
	}  
})(jQuery); 
