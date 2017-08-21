<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
	String sAccNum = (String)request.getAttribute("TheAccNum");
	String areaType = (String)request.getAttribute("BannerBottom");
	if (areaType == null)
		areaType = "None";
%>

<!-- /Style/Generic2/LoginOffRightBottom.jsp -->
	</td>
	</tr>
	<tr>
		<td class="Col-Generic2LArea9"><looknFeelArea:looknFeelArea area="Generic2LArea9" /></td>
		<td class="Col-Generic2LArea10"><looknFeelArea:looknFeelArea area="Generic2LArea10" /></td>
		<td class="Col-Generic2LArea11"><looknFeelArea:looknFeelArea area="Generic2LArea11" /></td>
	</tr>
	</tbody>
	</table>  <!-- Table 04 end -->
	</td>
	<td class="RightSide2 Col-Generic2LArea8">
		<looknFeelArea:looknFeelArea area="Generic2LArea8" />
	</td>
</tr>
</tbody>
</table> <!-- Table 03 end -->

<table class="GenericFooterAreas2" cellpadding="0" cellspacing="0">
<tbody>
<tr>
  <td class="Col-Generic2LArea12"><looknFeelArea:looknFeelArea area="Generic2LArea12" /></td>
  <td class="Col-Generic2LArea13"><looknFeelArea:looknFeelArea area="Generic2LArea13" /></td>
  <td class="Col-Generic2LArea14"><looknFeelArea:looknFeelArea area="Generic2LArea14" /></td>
</tr>
</tbody>
</table>

<!-- /Style/Generic2/LoginOffRightBottom.jsp footer -->
<table class="LUBottom2" cellpadding="0" cellspacing="0">
<tbody>
	<tr>
		<td class="LUFooter2">
			<jsp:include page="/Common/footer.jsp" flush="true" />
		</td>
	</tr>
</tbody>
</table>
</td>
</tr>
    </tbody>
    </table>  <!-- Table 02 end -->
    </td>
  </tr>
</tbody>
</table>  <!-- Table 01 end -->
</div> <!-- div GenericMainBody -->
<jsp:include page="/RequiredLoginOffRightBottom.jsp" flush="true" />
</body>
</html>
