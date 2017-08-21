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
<!-- /Style/Access_International/LoginOffTopLeft.jsp -->
<html lang="en">
<head>
    <meta charset="utf-8">
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
<body class="<%=roleDiv%>" <%=webSession.getRequiredBodyOnLoad(request)%> <%=webSession.getRequiredBodyOnUnload(request)%>>
	<header>
		<div id="head">
			<nav id="top-nav" class="container">
				<div class="row">
					<div class="col-md-4">
                        <looknFeelArea:looknFeelArea area="Access_International-N-header-logo" />
                    </div>
					<div class="col-md-8">
                        <nav>
                            <looknFeelArea:looknFeelArea area="Access_International-N-header-topnav" />
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