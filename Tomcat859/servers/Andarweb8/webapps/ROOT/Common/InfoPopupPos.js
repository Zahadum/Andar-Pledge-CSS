(function($) {
	
	$.infoPopPos = {		
		
		show: function(title, msg, X, Y, callback) {
			
			$("#popBlockPos").remove();
			
			var body = '<div id="infoBlock" class="infoBlock">';
			if ( title != '' )
				body += '<h1 id="infoBlockHeader"></h1>';
			if ( msg != '' )
				body += '<div id="infoBlockDetails" class="infoBlockDetails">' +
			      	'<div id="infoMessage" class="infoMessage"></div>' +
					'</div>';
			body += '</div>';
			$("BODY").append(body);
			
			var posX = X;
			var posY = Y;
			$("#infoBlock").css({
				position: 'absolute',
				zIndex: 99999,
				top: posY,
				left: posX
			});
			
			if ( title != '' )
				$("#infoBlockHeader").text(title);
			if ( msg != '' )
				$("#infoMessage").text(msg);			

			$("#infoPrompt").val('');
			$("#infoPrompt").focus().select();
		},
	   
	   	close: function() {
	   		$("#infoBlock").remove();
	   	} 
				
	}
		
	showPromptPos = function(message, title, X, Y, callback) {
		$.infoPopPos.show(title, message, X, Y, function(result) {
				if( callback ) callback(result);
		});
	};
	
	closePromptPos = function() {
		$.infoPopPos.close();
	};
	
})(jQuery);
