(function($) {

	$.passPop = {

		show: function(title, message, description, callback) {

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
			$("#popMessage").append(message).after('<div id="popPanel" class="popPanel"><input type="button" value="&nbsp;Submit&nbsp;" id="popOk" /> <input type="button" value="&nbsp;Cancel&nbsp;" id="popCancel" /></div>');
			$("#popPrompt").width( $("#popMessage").width() );

			//Action when Ok button is clicked
			$("#popOk").click( function() {
				var val = $("#popPrompt").val();
				$("#popBlock").remove();
				if( callback ) callback( val );
			});

			//Action when Cancel button is clicked
			$("#popCancel").click( function() {
				var target = document.getElementById("Rerun");
				if ( target != null )
					target.value = description;
				$("#popBlock").remove();
				if( callback ) callback( "Cancel" );
			});


			$("#popPrompt").focus().select();
		}

	}

	showPrompt = function(title, message, description, callback) {
		$.passPop.show(title, message, description, function(result) {
				if( callback ) callback(result);
		});
	};

})(jQuery);