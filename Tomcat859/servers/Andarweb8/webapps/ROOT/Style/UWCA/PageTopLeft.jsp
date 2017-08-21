<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, java.util.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/webNote.tld" prefix="note" %>
<%@ taglib uri="/WEB-INF/tld/menu.tld" prefix="menu" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<jsp:include page="/Common/RequiredTopLeft.jsp" flush="true" />
<%
	//System.out.println("New PageTopLeft jsp");
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
<!-- /Style/UWCA/PageTopLeft.jsp -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=0.5, user-scalable=yes" />
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<title><%=title%></title>
<jsp:include page="/Common/RequiredInHead.jsp" flush="true" />
</head>
<body <%=webSession.getRequiredBodyOnLoad(request)%> <%=webSession.getRequiredBodyOnUnload(request)%>  class="BodyClass">
<div class="GenericMainBody">
<header class="UWCAHeader">
<div class="container">
	<div class="row">
		<div class="col-lg-12">
		<header class="UWCAHeaderContent">
		<div class="row">
			<div class="col-sm-6 Col-UWCA1PArea1">
				<looknFeelArea:looknFeelArea area="UWCA1PArea1" />
			</div>
			<div class="col-sm-6 Col-UWCA1PArea2">
				<looknFeelArea:looknFeelArea area="UWCA1PArea2" />
			</div>
		</div>
		</header>
		</div>
	</div>
</div>
</header>
<nav>
<div class="container" style="background: #fff;">
	<div class="row">
		<div class="col-md-12 Col-UWCA1PArea3">
			<looknFeelArea:looknFeelArea area="UWCA1PArea3" />
		</div>
	</div>
</div>
</nav>
<section class="LUMainTable"><!-- Table 01 start -->

<div class="container">
	<div class="row">
		<div class="col-lg-12 Col-LUMainTable">

<div class="<%=roleDiv%>">

<div class="LUTableLeftSide">
	<div class="row">
		<div class="col-md-9 MainPage">

<section class="LUMainPageTable">
	<div class="row">
		<div class="col-md-12 Col-UWCA1PArea4">
			<looknFeelArea:looknFeelArea area="UWCA1PArea4" />
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		<main class="content">