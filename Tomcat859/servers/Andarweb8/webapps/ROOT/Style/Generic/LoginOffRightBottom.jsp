<%@ taglib uri="/WEB-INF/tld/bannerGroup.tld" prefix="banner" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<%
	String sAccNum = (String)request.getAttribute("TheAccNum");
	String areaType = (String)request.getAttribute("BannerBottom");
	if (areaType == null)
		areaType = "None";
%>

<!-- /Style/Generic/LoginOffRightBottom.jsp -->
	</td>
	</tr>
	<tr>
		<td class="Col-Generic1LArea9"><looknFeelArea:looknFeelArea area="Generic1LArea9" /></td>
		<td class="Col-Generic1LArea10"><looknFeelArea:looknFeelArea area="Generic1LArea10" /></td>
		<td  class="Col-Generic1LArea11"><looknFeelArea:looknFeelArea area="Generic1LArea11" /></td>
	</tr>
	</tbody>
	</table>  <!-- Table 04 END -->
	</td>
	<td class="RightSide Col-Generic1LArea8" >
		<looknFeelArea:looknFeelArea area="Generic1LArea8" />
	</td>
</tr>
</tbody>
</table> <!-- Table 03 END -->

<table class="GenericFooterAreas" cellpadding="0" cellspacing="0">
<tbody>
<tr>
  <td class="Col-Generic1LArea12"><looknFeelArea:looknFeelArea area="Generic1LArea12" /></td>
  <td class="Col-Generic1LArea13"><looknFeelArea:looknFeelArea area="Generic1LArea13" /></td>
  <td class="Col-Generic1LArea14"><looknFeelArea:looknFeelArea area="Generic1LArea14" /></td>
</tr>
</tbody>
</table>


<!-- /Style/Generic/LoginOffRightBottom.jsp footer -->
<table class="LUBottom" cellpadding="0" cellspacing="0">
<tbody>
	<tr>
		<td class="LUFooter">
			<jsp:include page="/Common/footer.jsp" flush="true" />
		</td>
	</tr>
</tbody>
</table>
</td>
</tr>
    </tbody></table>  <!-- Table 02 END -->

    </td>
  </tr>
</tbody></table>  <!-- Table 01 END -->

</div> <!-- div GenericMainBody -->

<jsp:include page="/RequiredLoginOffRightBottom.jsp" flush="true" />

</body>
</html>
