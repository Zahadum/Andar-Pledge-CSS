<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, java.util.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/webNote.tld" prefix="note" %>
<%@ taglib uri="/WEB-INF/tld/menu.tld" prefix="menu" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<jsp:include page="/Common/RequiredTopLeft.jsp" flush="true" />
<%
	//String frameWidth = (String)session.getAttribute("FrameWidth");
	String mainPageWidth = (String)request.getAttribute("MainPageWidth");
	int leftMenuWidth = ((Integer)request.getAttribute("LeftMenuWidth")).intValue();
	int rightMenuWidth = ((Integer)request.getAttribute("RightMenuWidth")).intValue();
	int menuWidth = Math.max(leftMenuWidth, rightMenuWidth);
	menuWidth = Math.max(menuWidth, 200);
	int accNum = ((Integer)request.getAttribute("AccNum")).intValue();
	String roleDiv = "Role-" + WebCommon.getCSSClassName(webSession.getRole()) + " Roll-" + WebCommon.getCSSClassName(webSession.getRole());
	WebTailoring webTailoring = new WebTailoring(request);
	String title = (String) request.getAttribute("Title");
	if ( title == null )
		title = "";
	String helixTitle = (String) request.getAttribute("HelixTitle");
	if ( helixTitle != null )
		title = helixTitle;
	String metaTitle = (String) request.getAttribute("MetaTitle");
	String metaDesc = (String) request.getAttribute("MetaDesc");
	String metaKey = (String) request.getAttribute("MetaKey");
	String metaRobot = (String) request.getAttribute("MetaRobot");
%>
<%@ include file="/Common/DOCTYPE.jsp" %>
<html>
<head>
<!-- /Style/GenericRes/PageTopLeft.jsp -->
<title><%=title%></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=0.5, user-scalable=yes" />
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/Common/RequiredInHead.jsp" flush="true" />
<script type="text/javascript">
$(document).ready(function(){
  $(".GenericResponsiveTop2 .PortletMenu .PortletHeader").click(function(){
    $(".GenericResponsiveTop2 .PortletMenu ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Right .MenuHeader").click(function(){
    $(".Menu-Right ul.pureCssMenu").slideToggle("slow");
  });
});
$(document).ready(function(){
  $(".Menu-Left .MenuHeader").click(function(){
    $(".Menu-Left ul.pureCssMenu").slideToggle("slow");
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
</head>
<body class="BodyClass">
<div class="GenericMainBody">
<div class="GenericResponsiveTop1">
<div class="container">
<div class="GenericResponsive1PArea1"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea1" /></div>
</div>
</div>
<div class="GenericResponsiveTop2">
<div class="container">
<div class="GenericResponsive1PArea2"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea2" /></div>
</div>
</div>
<div class="GenericResponsiveTop3">
<div class="GenericResponsive1PArea3"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea3" /></div>
</div>

<div class="<%=roleDiv%>">
<div class="GRMainPage">
<div class="container">
<div class="GRMainTop row">
<div class="GenericResponsive1PArea4 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea4" /></div><!--
--><div class="GenericResponsive1PArea5 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea5" /></div><!--
--><div class="GenericResponsive1PArea6 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1PArea6" /></div>
</div>
<div class="GRMainContent">
	
	