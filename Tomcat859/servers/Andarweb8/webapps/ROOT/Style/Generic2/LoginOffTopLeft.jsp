<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
/**
 * Style/Generic2/LoginOffTopLeft.jsp  JSP
 * Modification Log (Don't use tabs)
 * Date       By  LogId  Description
 * ____________________________________________________________________________________________________
 * 2012/05/02 JW JW50827 Moved the RequiredLoginOffInHead include page.  Included RequiredLoginOffInHead sets
 *                       the title request attribute.  The code was checking the attribute before it was being set.
 * 2012/06/22 JM JM67214 Corrected to use not logged in notes, and removed setting of master account attribute
 * 2014/09/16 JW JW84416 Free database connection after read().
 * 2014/09/22 SB84377 Corrected Give, Advocate and Voluteer buttons for empty url.
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
<!-- /Style/Generic2/LoginOffTopLeft.jsp -->
<title><%=title%></title>
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/RequiredLoginOffInHead.jsp" flush="true" />
</head>
<body class="BodyClass2">
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
		database.free();      //JW84416
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

		//session.setAttribute("LUMasterAccount", Integer.toString(masterAccount));  Need to properly initialize when login

		giveURL = UserDefinedFields.getUserDefinedField(masterAccount, "LUGiveURL");
		advocateURL = UserDefinedFields.getUserDefinedField(masterAccount, "LUAdvocateURL");
		volunteerURL = UserDefinedFields.getUserDefinedField(masterAccount, "LUVolunteerURL");
		homeURL = UserDefinedFields.getUserDefinedField(masterAccount, "LUHomeURL");

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

	//SB84377
	if ( giveURL != null && giveURL.trim().isEmpty() )
		giveURL = null;
	if ( advocateURL != null && advocateURL.trim().isEmpty() )
		advocateURL = null;
	if ( volunteerURL != null && volunteerURL.trim().isEmpty() )
		volunteerURL = null;

%>

<div class="GenericMainBody2">

<!-- Main Table -->
<table class="LUMainTable2" cellpadding="0" cellspacing="0"> <!-- Table 01 -->
	<tbody><tr>
	<td class="Col-LUMainTable2" rowspan="1" colspan="1">

<!--  Main Table with white border -->
	<table class="LUMainTable02-2" cellpadding="0" cellspacing="0"><!-- Table 02 -->
	<tbody>
		<tr>
			<td>
				<table class="LUTableTopLeftSide2" cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td class="Col-Generic2LArea1"><looknFeelArea:looknFeelArea area="Generic2LArea1" /></td>
							<td class="Col-Generic2LArea2"><looknFeelArea:looknFeelArea area="Generic2LArea2" /></td>
							<td class="Col-Generic2LArea3"><looknFeelArea:looknFeelArea area="Generic2LArea3" /></td>
						</tr>
					</tbody>
				</table>

				<div class="<%=roleDiv%>">

				<table class="LUTableLeftSide2" cellpadding="0" cellspacing="0"> <!-- Table 03 -->
				<tbody>
				<tr>
				  <td class="LeftSide2 Col-Generic2LArea7">
				    <looknFeelArea:looknFeelArea area="Generic2LArea7" />
				  </td>
				  <td class="MainPage2">
				    <table class="LUMainPageTable2" cellpadding="0" cellspacing="0">  <!-- Table 04 -->
				    <tbody>
				    <tr>
				      <td class="Col-Generic2LArea4"> <looknFeelArea:looknFeelArea area="Generic2LArea4" /> </td>
				      <td class="Col-Generic2LArea5"> <looknFeelArea:looknFeelArea area="Generic2LArea5" /> </td>
				      <td class="Col-Generic2LArea6"> <looknFeelArea:looknFeelArea area="Generic2LArea6" /> </td>
				    </tr>
				    <tr>
				    	<td colspan="3">
