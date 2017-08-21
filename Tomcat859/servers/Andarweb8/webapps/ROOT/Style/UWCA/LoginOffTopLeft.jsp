<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
/**
 * Style/UWCA/LoginOffTopLeft.jsp  JSP
 * Modification Log< (Don't use tabs)
 * Date       By  LogId  Description
 * ____________________________________________________________________________________________________
 * 2012/05/02 JW JW50827 Moved the RequiredLoginOffInHead include page.  Included RequiredLoginOffInHead sets
 *                       the title request attribute.  The code was checking the attribute before it was being set. 
 * 2012/06/22 JM JM67214 Removed setting of master account attribute and corrected to get not logged in note
 * 2012/07/24 JM JM67869 Updated to send accountNumber, in case specified in URL
 * 2015/11/18 BT BT94167 Changed to HTML5 DOCTYPE
 *
 */ 
%>
<%
	String areaType = (String)request.getAttribute("BannerTop");
	if (areaType == null)
		areaType = "None";
	int accNum = ((Integer)request.getAttribute("AccNum")).intValue();	
	String sAccNum = String.valueOf(accNum);
	String roleDiv = (new WebCommon()).getCSSClassName("Role-" + webSession.getRole());
	WebTailoring webTailoring = new WebTailoring(request);
	String metaTitle = (String) request.getAttribute("MetaTitle");
	String metaDesc = (String) request.getAttribute("MetaDesc");
	String metaKey = (String) request.getAttribute("MetaKey");
	String metaRobot = (String) request.getAttribute("MetaRobot");
%>
<%@ include file="/Common/DOCTYPE.jsp" %>
<html>
<head>
<%
//JW50827
String title = (String) request.getAttribute("Title");
if ( title == null )
	title = "";
String helixTitle = (String) request.getAttribute("HelixTitle");
if ( helixTitle != null )
	title = helixTitle;
%>
<!-- /Style/UWCA/LoginOffTopLeft.jsp -->
<title><%=title%></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=0.5, user-scalable=yes" />
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/RequiredLoginOffInHead.jsp" flush="true" />
</head>
<body class="BodyClass">
<%
	String masterAccountName = "";
	String name1 = "";
	String name2 = "";
	String giveURL = null;
	String advocateURL = null;
	String volunteerURL = null;
	String homeURL = null;

	int masterAccount = webSession.getMasterAccount();
	if ( masterAccount == 0 )
	{
		masterAccount = ANDARSettings.getSystemPreferenceInt("MasterAccount", 0);
		masterAccountName = Organizations.getName(masterAccount);
	}
	else
		masterAccountName = webSession.getMasterAccountName();

	String sessionMaster = (String) session.getAttribute("LUMasterAccount");
	if ( sessionMaster == null || !sessionMaster.equals(Integer.toString(masterAccount)) )
	{
		ANDARDB database = new ANDARDB();
		String query = null;
		ANDARDBRecord record = null;
		
		query = "SELECT TOP 1 name1, name2 "
			+ "FROM " + ANDARSettings.getSchema() + "Names "
			+ " WHERE accountNumber = '" + masterAccount + "' "
			+ " AND NameType = 'WebName' "
			;
		
		database.executeSQLQuery(query);
		record = database.read();
		if ( record != null )
		{
			name1 = record.getFieldString(1).trim();
			name2 = record.getFieldString(2).trim();
		}
		else 
		{
			name1 = masterAccountName.trim();
			name2 = "";
		}
	
		webSession.addToMessages("<FRWName1>", name1, request);
		webSession.addToMessages("<FRWName2>", name2, request);
		WebAndar.WebLoginData webLoginData = new WebAndar.WebLoginData(sAccNum, request);
		webLoginData.addToMessages("<FRWName1>", name1);
		webLoginData.addToMessages("<FRWName2>", name2);
		String headerNote1 = webLoginData.getNote(request, "LiveUntdHNotLI1", "SPAN", name1);
		String headerNote2 = webLoginData.getNote(request, "LiveUntdHNotLI2", "SPAN", name2);
	
		if ( headerNote1 == null )
		{
			session.setAttribute("LUMasterName1", name1);
			session.setAttribute("LUMasterName2", name2);
		}
		else
		{
			session.setAttribute("LUMasterName1", headerNote1);
			session.setAttribute("LUMasterName2", headerNote2);
			name1 = headerNote1;
			name2 = headerNote2;
		}
		
		//session.setAttribute("LUMasterAccount", Integer.toString(masterAccount));  JM67214 need to reinitialize everything when login

		String currentDate = AndarUtilities.getCurrentDate();
		query = "SELECT TOP 1 fieldvalue "
			+ "FROM " + ANDARSettings.getSchema() + "UserDefinedFields "
			+ " WHERE accountNumber = '" + masterAccount + "' "
			+ " AND UserDefinedField = 'LUGiveURL' "
			+ " AND (effectiveDate = ' ' or effectiveDate >= '" + currentDate + "') "
			+ " AND (expiryDate = ' ' or expirydate <= '" + currentDate + "') "
			;
		database.executeSQLQuery(query);
		record = database.read();
		if ( record != null )
			giveURL = record.getFieldString(1).trim();

		query = "SELECT TOP 1 fieldvalue "
			+ "FROM " + ANDARSettings.getSchema() + "UserDefinedFields "
			+ " WHERE accountNumber = '" + masterAccount + "' "
			+ " AND UserDefinedField = 'LUAdvocateURL' "
			+ " AND (effectiveDate = ' ' or effectiveDate >= '" + currentDate + "') "
			+ " AND (expiryDate = ' ' or expirydate <= '" + currentDate + "') "
			;
		database.executeSQLQuery(query);
		record = database.read();
		if ( record != null )
			advocateURL = record.getFieldString(1).trim();

		query = "SELECT TOP 1 fieldvalue "
			+ "FROM " + ANDARSettings.getSchema() + "UserDefinedFields "
			+ " WHERE accountNumber = '" + masterAccount + "' "
			+ " AND UserDefinedField = 'LUVolunteerURL' "
			+ " AND (effectiveDate = ' ' or effectiveDate >= '" + currentDate + "') "
			+ " AND (expiryDate = ' ' or expirydate <= '" + currentDate + "') "
			;
		database.executeSQLQuery(query);
		record = database.read();
		if ( record != null )
			volunteerURL = record.getFieldString(1).trim();

		query = "SELECT TOP 1 fieldvalue "
			+ "FROM " + ANDARSettings.getSchema() + "UserDefinedFields "
			+ " WHERE accountNumber = '" + masterAccount + "' "
			+ " AND UserDefinedField = 'LUHomeURL' "
			+ " AND (effectiveDate = ' ' or effectiveDate >= '" + currentDate + "') "
			+ " AND (expiryDate = ' ' or expirydate <= '" + currentDate + "') "
			;
		database.executeSQLQuery(query);
		record = database.read();
		if ( record != null )
			homeURL = record.getFieldString(1).trim();

		database.free();

		session.setAttribute("LUGiveURL", giveURL);
		session.setAttribute("LUAdvocateURL", advocateURL);
		session.setAttribute("LUVolunteerURL", volunteerURL);
		session.setAttribute("LUHomeURL", homeURL);

	}
	else
	{
		String headerNote1 = webTailoring.getNote(request, "LiveUntdHNotLI1", null, "SPAN", null);
		String headerNote2 = webTailoring.getNote(request, "LiveUntdHNotLI2", null, "SPAN", null);

		if ( headerNote1 == null )
		{
			name1 = (String) session.getAttribute("LUMasterName1");
			name2 = (String) session.getAttribute("LUMasterName2");
		}
		else
		{
			name1 = headerNote1;
			name2 = headerNote2;
		}
		
		giveURL = (String) session.getAttribute("LUGiveURL");
		advocateURL = (String) session.getAttribute("LUAdvocateURL");
		volunteerURL = (String) session.getAttribute("LUVolunteerURL");
		homeURL = (String) session.getAttribute("LUHomeURL");
	}
%>
<div class="GenericMainBody">
<header class="UWCAHeader">
<div class="container">
	<div class="row">
		<div class="col-lg-12">
		<header class="UWCAHeaderContent">
		<div class="row">
			<div class="col-sm-6 Col-UWCA1LArea1">
				<looknFeelArea:looknFeelArea area="UWCA1LArea1" />
			</div>
			<div class="col-sm-6 Col-UWCA1LArea2">
				<looknFeelArea:looknFeelArea area="UWCA1LArea2" />
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
		<div class="col-md-12 Col-UWCA1LArea3">
			<looknFeelArea:looknFeelArea area="UWCA1LArea3" />
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
		<div class="col-md-12 Col-UWCA1LArea4">
			<looknFeelArea:looknFeelArea area="UWCA1LArea4" />
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
		<main class="content">