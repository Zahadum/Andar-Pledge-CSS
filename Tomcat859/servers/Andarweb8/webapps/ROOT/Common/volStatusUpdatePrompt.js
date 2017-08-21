(function($) {
	
	$.passPop = {		
		
		show: function(title, message, fieldName, originalValue, keyNumber, opName, opNumber, teamID, callback) {
			
			$("#popBlock").remove();
						
			$("BODY").append(
			  '<div id="popBlock" class="volPopBlock">' +
			    '<h1 id="popBlockHeader"></h1>' +
			    '<div id="popBlockDetails" class="popBlockDetails">' +
			      '<div id="popMessage" class="popMessage"></div>' +
				'</div>' +
			  '</div>');		

			$("#popBlock").css({
				position: 'absolute',
				zIndex: 99999,
				top: ($(window).height() / 2) - 150 + $(window).scrollTop(),
				left: ($(window).width() / 2) - 250
			});
			
			$("#popBlockHeader").text(title);
			$("#popMessage").append(message).after('<div id="popPanel" class="popPanel"><input type="button" value="&nbsp;OK&nbsp;" id="popOk" /> <input type="button" value="&nbsp;Cancel&nbsp;" id="popCancel" /></div>');
			$("#popPrompt").width( $("#popMessage").width() );
			
			//Action when Ok button is clicked
			$("#popOk").click( function() {
				var val = $("#popPrompt").val();
				$("#popBlock").remove();
				if( callback ) callback( val );
			});

			//Action when Cancel button is clicked
			$("#popCancel").click( function() {
				var target = document.getElementById(fieldName);
				if ( target != null )
					target.value = originalValue;
				$("#popBlock").remove();
				if( callback ) callback( null );
			});

			$("#popPrompt").val('');
			$("#popPrompt").focus().select();
		}
				
	}
		
	showPrompt = function(title, message, fieldName, originalValue, keyNumber, opName, opNumber, teamID, callback) {
		$.passPop.show(title, message, fieldName, originalValue, keyNumber, opName, opNumber, teamID, function(result) {
				if( callback ) callback(result);
		});
	};
	
})(jQuery);