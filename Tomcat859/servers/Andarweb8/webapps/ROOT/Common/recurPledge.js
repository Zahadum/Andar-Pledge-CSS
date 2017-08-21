/**
 * Functions related to Recurring Pledges
 *
 *<PRE>
 *<H2>Modification Log</H2>
 * (Don't use tabs)
 * Date       By  LogId  Description
 * ____________________________________________________________________________________________________
 * 2016/10/13 SP84734 Initial version
 * 2017/06/21 DY106321 Fixed Update Recurring Rule page - Update button not working
 * 2017/06/26 DY106373 Moved asking of recurring pledge to front end of the pledge process
 * </PRE>
 */

//DY106373 Obsoleted
//function createRecurRule() {
//	if (!checkValidStartDate()) {
//		return false;
//	}
//
//	var result = true;
//	$.ajax({
//		url: web_rootPath + 'servlet/eAndar.RecurRuleWeb',
//		async: false,
//		dataType: "json",
//		type: "post",
//		data: {
//			actionType: "CreateRRFromTxn",
//			frequency: $('#rrFrequencySelect').val(),
//			startDate: $('#rrDate').val(),
//			transNum: $('#rrTransNum').val()
//		},
//		success: function(data) {
//			if ( data != null && data != '' ) {
//				if ( data.status != 'Ok' && data.message != '' ) {
//					//errorDialog("Error", data.message.replace('\\n','<br>'));
//					$('.rrWhenEntry .BlockError').html(data.message.replace('\\n','<br>'));
//					result = false;
//				}
//			}
//		}
//
//	})
//	return result;
//}


function checkValidStartDate() {
	var startDate = new Date($('#rrDate').val()).setHours(0,0,0,0);
	var today = new Date().setHours(0,0,0,0);
	if ( startDate > today ) {
		return true;
	}
	errMessage = '<span  errorMessage>' + recurCrBadDate +'</span><br/>';
	$('.rrWhenEntry .BlockError').html(errMessage);
	return false;
}


function validateRuleUpdOrCopy() {
	if (!isStartDatePresent()) {
		return false;
	}
	if (isStartDateChangedAndEarlierThanLastPledgeDate()) {
		return false;
	}
	//if (isEffectiveDateChangedAndLaterThanLastPledgeDate()) {
	//	return false;
	//}
	return true;
}

function isStartDatePresent() {
	var startDateVal = $('#rrDate').val()
	if (startDateVal == '') {
		errMessage = '<span  errorMessage>' + recurNoStartDate +'</span><br/>';
		$('.rrWhenEntry .BlockError').html(errMessage);
	}
	return (startDateVal > '')
}

function isStartDateChangedAndEarlierThanLastPledgeDate() {
	if ($('#rrDate')[0].value != $('#rrDate')[0].defaultValue) {
		if (new Date($('#rrDate').val()) < new Date($('#rrLastDate').val())) {
			errMessage = '<span  errorMessage>' + recurStartDateBeforeLastDate +'</span><br/>';
			$('.rrWhenEntry .BlockError').html(errMessage);
			return true;
		}
	}
	return false;
}

//function isEffectiveDateChangedAndLaterThanLastPledgeDate() {
//	if ($('#rrEffDate')[0].value != $('#rrEffDate')[0].defaultValue) {
//		if (new Date($('#rrEffDate').val()) > new Date($('#rrLastDate').val())) {
//			errMessage = '<span  errorMessage>' + recurEffDateAfterLastDate +'</span><br/>';
//			$('.rrWhenEntry .BlockError').html(errMessage);
//			return true;
//		}
//	}
//	return false;
//}

function confirmUpdByExpire(){
	if ( typeof recurUpdAskExpire === 'undefined' )
		return true;
	
	if ( savFrequency != $('#rrFrequencySelect').val() ||
		 savStartDate !=  $('#rrDate').val() )
		 //savEffDate !=  $('#rrEffDate').val() )
	{
		return confirm(recurUpdAskExpire);	
	}
	return true;
}