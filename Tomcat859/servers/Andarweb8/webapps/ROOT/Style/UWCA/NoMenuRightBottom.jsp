<%@ page language="java" errorPage="/error.jsp" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<!-- /Style/UWCA/NoMenuRightBottom.jsp -->
		</main><!-- MAIN CONTENT end -->
		</div>
	</div>
</section><!-- LUMainPageTable end -->

		</div>
	</div>
</div><!-- LUTableLeftSide end -->


</div><!-- ROLE DIV END -->

		</div>
	</div>
</div> 
</section><!-- Table 01 end -->

<footer class="UWCABottom">
<div class="container">
	<div class="row">
		<div class="col-lg-12">
		<div class="UWCABottomContent">
			<div class="row">
				<div class="col-sm-12 Col-UWCA1NArea6">
					<looknFeelArea:looknFeelArea area="UWCA1NArea6" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-8 Col-UWCA1NArea7">
					<looknFeelArea:looknFeelArea area="UWCA1NArea7" />
				</div>
				<div class="col-sm-4 Col-UWCA1NArea8">
					<looknFeelArea:looknFeelArea area="UWCA1NArea8" />
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
</footer>
<footer class="UWCAFooterArea">
<div class="container">
	<div class="row">
		<div class="col-lg-12 UWCAFooter">
			<div class="copyright">
			<jsp:include page="/Common/footer.jsp" flush="true" />
			</div>
		</div>
	</div>
</div>
</footer>
</div><!-- div GenericMainBody -->
<script type="text/javascript">
$(document).ready(function(){
  $(".Col-UWCA1PArea3 .PortletMenu .PortletHeader").click(function(){
    $(".Col-UWCA1PArea3 .PortletMenu ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Col-UWCA1LArea3 .PortletMenu .PortletHeader").click(function(){
    $(".Col-UWCA1LArea3 .PortletMenu ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Col-UWCA1NArea3 .PortletMenu .PortletHeader").click(function(){
    $(".Col-UWCA1NArea3 .PortletMenu ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Left .MenuHeader").click(function(){
    $(".Menu-Left table").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Right .MenuHeader").click(function(){
    $(".Menu-Right table").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Left .MenuHeader").click(function(){
    $(".Menu-Left ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Right .MenuHeader").click(function(){
    $(".Menu-Right ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $("ul.pureCssMenu ul .CSSCloseButton").click(function(){
    $("ul.pureCssMenu ul").hide();
  });
});
$(document).ready(function(){
  $("ul.pureCssMenu span").click(function(){
    $("ul.pureCssMenu li:hover > ul").show();
  });
});
</script>
<script type="text/javascript">
$(function(){
	$(window).load(function(){
		var setElm = $('.viewer'),
		setMaxWidth = 600,
		setMinWidth = 260,
		fadeSpeed = 2000,
		switchDelay = 7000,
		sideNavi = 'off', // 'on' or 'off'
		sideHide = 'hide', // 'hide' or 'show'
		naviOpc = 0.5;

		setElm.each(function(){
			var targetObj = $(this),
			findUl = targetObj.find('ul'),
			findLi = targetObj.find('li'),
			findLiFirst = targetObj.find('li:first');

			findLi.css({display:'block',opacity:'0',zIndex:'99'});
			findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);

			function timer(){
				setTimer = setInterval(function(){
					slideNext();
				},switchDelay);
			}
			timer();

			function slideNext(){
				findUl.find('li:first-child').not(':animated').animate({opacity:'0'},fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).end().appendTo(findUl).css({zIndex:'99'});
			}
			function slidePrev(){
				findUl.find('li:first-child').not(':animated').css({zIndex:'99'}).animate({opacity:'0'},fadeSpeed).siblings('li:last-child').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).prependTo(findUl);
			}
			targetObj.css({width:setMaxWidth,display:'block'});


			var setLiImg = findLi.find('img'),
			baseWidth = setLiImg.width(),
			baseHeight = setLiImg.height();


			function imgSize(){
				var windowWidth = parseInt($(window).width());
				if(windowWidth >= setMaxWidth) {
					targetObj.css({width:setMaxWidth,height:baseHeight});
					findUl.css({width:baseWidth,height:baseHeight});
					findLi.css({width:baseWidth,height:baseHeight});
				} else if(windowWidth < setMaxWidth) {
					if(windowWidth >= setMinWidth) {
						targetObj.css({width:'100%'});
						findUl.css({width:'100%'});
						findLi.css({width:'100%'});
					} else if(windowWidth < setMinWidth) {
						targetObj.css({width:setMinWidth});
						findUl.css({width:setMinWidth});
						findLi.css({width:setMinWidth});
					}
					var reHeight = setLiImg.height();
					targetObj.css({height:reHeight});
					findUl.css({height:reHeight});
					findLi.css({height:reHeight});
				}
			}
			$(window).resize(function(){imgSize();}).resize();


			var agent = navigator.userAgent;
			if(sideNavi == 'on'){
				targetObj.append('<a href="javascript:void(0);" class="btnPrev"></a><a href="javascript:void(0);" class="btnNext"></a>');
				var btnPrev = targetObj.find('.btnPrev'),btnNext = targetObj.find('.btnNext'),btnPrevNext = targetObj.find('.btnPrev,.btnNext');

				if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){
					btnPrevNext.css({opacity:naviOpc});
				} else {
					btnPrevNext.css({opacity:naviOpc}).hover(function(){
						$(this).stop().animate({opacity:naviOpc+0.2},200);
					},function(){
						$(this).stop().animate({opacity:naviOpc},200);
					});
				}

				if(sideHide == 'hide'){
					if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){
						btnPrevNext.css({visibility:'visible'});
					} else {
						btnPrevNext.css({visibility:'hidden'});
						targetObj.hover(function(){
							btnPrevNext.css({visibility:'visible'});
						},function(){
							btnPrevNext.css({visibility:'hidden'});
						});
					}
				}

				btnPrev.click(function(){switchPrev();});
				btnNext.click(function(){switchNext();});
			}

			function switchNext(){
				findLi.not(':animated').parents('ul').each(function(){
					clearInterval(setTimer);
					slideNext();
					timer();
				});
			}
			function switchPrev(){
				findLi.not(':animated').parents('ul').each(function(){
					clearInterval(setTimer);
					slidePrev();
					timer();
				});
			}

		});
	});
});
</script>
<jsp:include page="/Common/RequiredRightBottom.jsp" flush="true" />
</body>
</html>
