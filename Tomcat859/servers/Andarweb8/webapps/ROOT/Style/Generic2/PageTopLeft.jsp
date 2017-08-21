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
<!-- /Style/Generic2/PageTopLeft.jsp -->
<title><%=title%></title>
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/Common/RequiredInHead.jsp" flush="true" />
</head>
<body class="BodyClass2">

<div class="GenericMainBody2">

<!-- Main Table -->
<table class="LUMainTable2" cellpadding="0" cellspacing="0"> <!-- GP Table 01 start -->
   <tbody><tr>
   <td class="Col-LUMainTable2" rowspan="1" colspan="1">

<!--  Main Table with white border -->
<table class="LUMainTable02-2" cellpadding="0" cellspacing="0"> <!-- GP Table 02 start -->
<tbody><tr>
<td>

<table class="LUTableTopLeftSide2" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td class="Col-Generic2PArea1"><looknFeelArea:looknFeelArea area="Generic2PArea1" /></td>
			<td class="Col-Generic2PArea2"><looknFeelArea:looknFeelArea area="Generic2PArea2" /></td>
			<td class="Col-Generic2PArea3"><looknFeelArea:looknFeelArea area="Generic2PArea3" /></td>
		</tr>
	</tbody>
</table>

<div class="<%=roleDiv%>">

<table class="LUTableLeftSide2" cellpadding="0" cellspacing="0"> <!-- GP Table 03 BEGIN -->
<tbody>
<tr>

	<td class="LeftSide2 Col-Generic2PArea7">
		<looknFeelArea:looknFeelArea area="Generic2PArea7" />
	</td>

	<td class="MainPage2">
		<table class="LUMainPageTable2" cellpadding="0" cellspacing="0"> <!-- GP Table 04 BEGIN -->
		<tbody>
		<tr>
			<td class="Col-Generic2PArea4"><looknFeelArea:looknFeelArea area="Generic2PArea4" /></td>
			<td class="Col-Generic2PArea5"><looknFeelArea:looknFeelArea area="Generic2PArea5" /></td>
			<td class="Col-Generic2PArea6"><looknFeelArea:looknFeelArea area="Generic2PArea6" /></td>
		</tr>
		<tr>
			<td colspan="3">