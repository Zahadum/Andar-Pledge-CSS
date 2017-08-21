(function($) {
	
	$.passPop = {		
		
		show: function(title, msg, callback) {
			
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
			$("#popMessage").append('<br /><input type="password" size="30" id="popPrompt" class="popPrompt" />').after('<div id="popPanel" class="popPanel"><input type="button" value="&nbsp;OK&nbsp;" id="popOk" /> <input type="button" value="&nbsp;Cancel&nbsp;" id="popCancel" /></div>');
			$("#popPrompt").width( $("#popMessage").width() );
			
			//Action when Ok button is clicked
			$("#popOk").click( function() {
				var val = $("#popPrompt").val();
				$("#popBlock").remove();
				if( callback ) callback( val );
			});

			//Action when Cancel button is clicked
			$("#popCancel").click( function() {
				$("#popBlock").remove();
				if( callback ) callback( null );
			});

			$("#popPrompt").val('');
			$("#popPrompt").focus().select();
		}
				
	}
		
	showPrompt = function(message, title, callback) {
		$.passPop.show(title, message, function(result) {
				if( callback ) callback(result);
		});
	};
	
})(jQuery);