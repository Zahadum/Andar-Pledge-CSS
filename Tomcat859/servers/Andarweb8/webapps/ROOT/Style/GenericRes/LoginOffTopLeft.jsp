<%@ page language="java" errorPage="/error.jsp" import="Andar.*, Reach.*, Reach.Table.*, java.math.*, WebAndar.*" %>
<jsp:useBean id="webSession" scope="session" class="WebAndar.WebSession" />
<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
/**
 *		Style/GenericRes/LoginOffTopLeft.jsp  JSP
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
<!-- /Style/GenericRes/LoginOffTopLeft.jsp -->
<title><%=title%></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=0.5, user-scalable=yes" />
<%	if ( metaTitle != null ) { %><meta name="title" content="<%=metaTitle%>"/><%	} %>
<%	if ( metaDesc != null ) { %><meta name="description" content="<%=metaDesc%>"/><%	} %>
<%	if ( metaKey != null ) { %><meta name="keywords" content="<%=metaKey%>"/><%	} %>
<%	if ( metaRobot != null ) { %><meta name="Robots" content="<%=metaRobot%>"/><%	} %>
<jsp:include page="/RequiredLoginOffInHead.jsp" flush="true" />
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

<div class="GenericMainBody">
<div class="GenericResponsiveTop1">
<div class="container">
<div class="GenericResponsive1LArea1"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea1" /></div>
</div>
</div>
<div class="GenericResponsiveTop2">
<div class="container">
<div class="GenericResponsive1LArea2"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea2" /></div>
</div>
</div>
<div class="GenericResponsiveTop3">
<div class="GenericResponsive1LArea3"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea3" />
</div>
</div>

<div class="<%=roleDiv%>">
<div class="GRMainPage">
<div class="container">
<div class="GRMainTop row">
<div class="GenericResponsive1LArea4 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea4" /></div><!--
--><div class="GenericResponsive1LArea5 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea5" /></div><!--
--><div class="GenericResponsive1LArea6 col-md-4"><looknFeelArea:looknFeelArea area="GenericResponsive1LArea6" /></div>
</div>
<div class="GRMainContent">