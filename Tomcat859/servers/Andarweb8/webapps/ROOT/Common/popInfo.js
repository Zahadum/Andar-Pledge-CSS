(function($) {
	
	$.infoPop = {		
		
		show: function(title, msg) {
			
			$("#popBlock").remove();
						
			$("BODY").append(
			  '<div id="popBlock" class="popBlock">' +
			    '<h1 id="popBlockHeader"></h1>' +
			    '<div id="popBlockDetails" class="popBlockDetails">' +
			      '<div id="popMessage" class="popMessage"></div>' +
				'</div>' +
			  '</div>');		

			$("#popBlock").css({
				position: 'absolute',
				zIndex: 99999,
				top: ($(window).height() / 2) - 110,
				left: ($(window).width() / 2) - 180
			});
			
			$("#popBlockHeader").text(title);
			$("#popMessage").text(msg);
			$("#popMessage").append('<div id="popPanel" class="popPanel"><input type="button" value="&nbsp;OK&nbsp;" id="popOk" /></div>');
			$("#popPrompt").width( $("#popMessage").width() );
			
			//Action when Ok button is clicked
			$("#popOk").click( function() {
				$("#popBlock").remove();
			});
		}
				
	}
		
	showInfo = function(message, title) {
		$.infoPop.show(title, message);
	};
	
})(jQuery);