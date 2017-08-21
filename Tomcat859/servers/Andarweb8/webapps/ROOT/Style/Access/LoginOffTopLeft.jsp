<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
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
<!-- /Style/Access_International/LoginOffTopLeft.jsp -->
<html lang="en">
<head>
    <%
    //JW50827
    String title = (String) request.getAttribute("Title");
    if ( title == null )
        title = "";
    String helixTitle = (String) request.getAttribute("HelixTitle");
    if ( helixTitle != null )
        title = helixTitle;
    %><meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="format-detection" content="telephone=no" />
    <title><%=title%></title>
    <%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/>
    <%	} %><%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/>
    <%	} %><%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/>
    <%	} %><%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/>
    <%	} %>
    <base href="<%=WebSession.getWebApplicationAddress(request)%>" />
    <link href="Style/Access/css/CustomStyle.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet" />
    <jsp:include page="/RequiredLoginOffInHead.jsp" flush="true" />
    <%@ include file="/Common/DOCTYPForIE8.jsp" %>
</head>
<body class="<%=roleDiv%>">
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
		database.free();              //JW84416
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
	<header>
		<div id="head">
			<nav id="top-nav" class="container">
				<div class="row">
					<div class="col-md-4">
                        <looknFeelArea:looknFeelArea area="Access_International-L-header-logo" />
                    </div>
					<div class="col-md-8">
                        <nav>
                            <looknFeelArea:looknFeelArea area="Access_International-L-header-topnav" />
                        </nav>
					</div>
				</div>
			</nav>
		</div>
	</header>
    <main>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">