<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
	String sAccNum = (String)request.getAttribute("TheAccNum");
	String areaType = (String)request.getAttribute("BannerBottom");
	if (areaType == null)
		areaType = "None";
%>

<!-- /Style/GenericRes/LoginOffRightBottom.jsp -->
</div>

<div class="GRMainBottom row">
<div class="GenericResponsive1LArea7 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea7" /></div><!--
--><div class="GenericResponsive1LArea8 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea8" /></div><!--
--><div class="GenericResponsive1LArea9 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea9" /></div>
</div>
</div>
</div></div>
<div class="GenericResponsiveBottom">
	<div class="container">
<div class="GenericResponsive1LArea10"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea10" /></div>
</div>
</div>

<!-- /Style/GenericRes/LoginOffRightBottom.jsp footer -->
<div class="GRFooter">
	<div class="container">
	<div class="GRFooter1">
			<jsp:include page="/Common/footer.jsp" flush="true" />
</div>
</div></div></div> <!-- div GenericMainBody -->

<jsp:include page="/RequiredLoginOffRightBottom.jsp" flush="true" />

</body>
</html>
