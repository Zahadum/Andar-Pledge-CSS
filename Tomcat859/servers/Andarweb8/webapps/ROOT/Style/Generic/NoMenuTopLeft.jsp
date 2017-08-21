<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/webNote.tld" prefix="note" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<jsp:include page="/Common/RequiredTopLeft.jsp" flush="true" />
<%
	//String frameWidth = (String)session.getAttribute("FrameWidth");
	String mainPageWidth = (String)request.getAttribute("MainPageWidth");
	int leftMenuWidth = ((Integer)request.getAttribute("LeftMenuWidth")).intValue();
	int rightMenuWidth = ((Integer)request.getAttribute("RightMenuWidth")).intValue();
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
<!-- /Style/Generic/NoMenuTopLeft.jsp -->
<title><%=title%></title>
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/Common/RequiredInHead.jsp" flush="true" />
</head>
<body <%=webSession.getRequiredBodyOnLoad(request)%>
		<%=webSession.getRequiredBodyOnUnload(request)%>
class="BodyClass">

<div class="GenericMainBody">

<!-- Main Table -->
<table class="LUMainTable" cellpadding="0" cellspacing="0"> <!-- Table 01 -->
   <tbody><tr>
   <td class="Col-LUMainTable" rowspan="1" colspan="1">

<!--  Main Table with white border -->
<table class="LUMainTable02" cellpadding="0" cellspacing="0"> <!-- Table 02 -->
<tbody><tr>
<td>

<table class="LUTableTopLeftSide" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td class="Col-Generic1NArea1"><looknFeelArea:looknFeelArea area="Generic1NArea1" /></td>
			<td class="Col-Generic1NArea2"><looknFeelArea:looknFeelArea area="Generic1NArea2" /></td>
			<td class="Col-Generic1NArea3"><looknFeelArea:looknFeelArea area="Generic1NArea3" /></td>
		</tr>
	</tbody>
</table>

<div class="<%=roleDiv%>"> <!-- role div -->

<table class="LUTableLeftSide" cellpadding="0" cellspacing="0"> <!-- Table 03 -->
<tbody>
<tr>
  <td class="LeftSide Col-Generic1NArea7">
    <looknFeelArea:looknFeelArea area="Generic1NArea7" />
  </td>
  <td class="MainPage">
    <table class="LUMainPageTable" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
      <td class="Col-Generic1NArea4"><looknFeelArea:looknFeelArea area="Generic1NArea4" /></td>
      <td class="Col-Generic1NArea5"><looknFeelArea:looknFeelArea area="Generic1NArea5" /></td>
      <td class="Col-Generic1NArea6"><looknFeelArea:looknFeelArea area="Generic1NArea6" /></td>
    </tr>
    <tr><td colspan="3">
