<%@ page language="java" errorPage="/error.jsp" %>
<%@ taglib uri="/WEB-INF/tld/looknFeelArea.tld" prefix="looknFeelArea" %>
<!-- /Style/Access_International/LoginOffRightBottom.jsp -->
            </div>
        </div>
    </div>
    </main>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<nav>
                        <looknFeelArea:looknFeelArea area="Access_International-N-footer-menu" />
                    </nav>
				</div>
			</div>
		</div>
		<div id="footer-logo" class="container-fluid">
			<div class="row">
				<div class="col-sm-12 text-center">
                    <looknFeelArea:looknFeelArea area="Access_International-N-footer-logo" />
                </div>
			</div>
		</div>
		<div id="legal">
			<jsp:include page="/Common/footer.jsp" flush="true" />
            <a class="backtotop" title="Back to top" style="display: none;"><i class="fa fa-angle-up fa-2x" alt="Back to top"></i></a>
        </div>
	</footer>
    <jsp:include page="/Common/RequiredRightBottom.jsp" flush="true" />
	<script src="Style/Access/js/functions.js"></script>
</body>
</html>