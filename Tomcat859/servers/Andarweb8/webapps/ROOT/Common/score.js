var postPathScore = "../servlet/eAndar.ArticleScore";

function updateScore(articleID, ratingValue)
{
	$.post(postPathScore,{articleID : articleID, ratingValue : ratingValue},
			function(data)
			{
				if ( data.substr(0, 2) == "OK" )
				{
					var script = data.substring(2);
					changeDisplay("RatingWrap" + articleID, script);

//					var pos = data.indexOf('~')
//					if ( pos > 0 )
//					{
//						var likeCount = data.substring(2, pos);
//						var dislikeCount = data.substring(pos+1);


//						changeDisplay("ArticleScore" + articleID + "Y", likeCount);
//						changeDisplay("ArticleScore" + articleID + "N", dislikeCount);

//						changeDisplay("ScorePositive" + articleID,
//								"<span class='score likedisabled'>" +
//								"<div class='ScorePositiveDisabled'>" +
//								"<span class='ArticleLike' id='ArticleScore" + articleID + "Y'>" + likeCount + "</span>" +
//								"</div>" +
//								"</span>");
//						changeDisplay("ScoreNegative" + articleID,
//								"<span class='score dislikedisabled'>" +
//								"<div class='ScoreNegativeDisabled'>" +
//								"<span class='ArticleDislike' id='ArticleScore" + articleID + "N'>" + dislikeCount + "</span>" +
//								"</div" +
//								"</span>");
//					}

				}
				else if ( data.substr(0, 5) == "Error" )
				{
					showInfo(data.substring(5), "Rating update error");
				}
				else
				{
					showInfo("Rating update error", "Rating update error");
				}
			});

}