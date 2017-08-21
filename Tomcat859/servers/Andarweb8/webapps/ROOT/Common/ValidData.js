// Check browser version
var isNav4 = false, isNav5 = false, isIE4 = false
var strSeperator = "/";
// If you are using any Java validation on the back side you will want to use the / because
// Java date validations do not recognize the dash as a valid date separator.
var vDateType = 3; // Global value for type of date format
//                1 = mm/dd/yyyy
//                2 = yyyy/dd/mm  (Unable to do date check at this time)
//                3 = dd/mm/yyyy
//				  4 = mm/dd
var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
var err = 0; // Set the error code to a default of zero
if(navigator.appName == "Netscape")
{
	if (navigator.appVersion < "5")
   {
		isNav4 = true;
		isNav5 = false;
	}
	else
	if (navigator.appVersion > "4")
   {
		isNav4 = false;
		isNav5 = true;
   }
}
else
{
	isIE4 = true;
}

// Date object
function DateObject(value, dateType)
{
   vDateType = dateType;
	this.value = value;
	this.month = "";
   this.day = "";
   this.year = "";
	for (i = 1; i <= 3 && this.value.length > 0; i++)
	{
      if ((vDateType == 1 && i == 1) || (vDateType == 2 && i == 2) || (vDateType == 3 && i == 2)  ||  (vDateType == 4 && i == 1))
      {
      	var pos = this.value.indexOf("/");
      	if ( pos >= 0 && pos <= 2 )
      		this.month = this.value.substring(0, pos);
      	else
      		this.month = this.value.substring(0, (this.value.length > 1?2:1));
   		this.value = this.value.substring(this.month.length + (pos >= 0?1:0));

   		if ( this.month.length == 1 )
   			this.month = "0" + this.month;
      }
      if ((vDateType == 1 && i == 2) || (vDateType == 2 && i == 3) || (vDateType == 3 && i == 1) || (vDateType == 4 && i == 2))
      {
      	var pos = this.value.indexOf("/");
      	if ( pos >= 0 && pos <= 2 )
      		this.day = this.value.substring(0, pos);
      	else
      		this.day = this.value.substring(0, (this.value.length > 1?2:1));
   		this.value = this.value.substring(this.day.length + (pos >= 0?1:0));

   		if ( this.day.length == 1 )
   			this.day = "0" + this.day;
      }
      if ((vDateType == 1 && i == 3) || (vDateType == 2 && i == 1) || (vDateType == 3 && i == 3))
      {
      	var pos = this.value.indexOf("/");
      	if ( pos >= 0 && pos <= 4 )
      		this.year = this.value.substring(0, pos);
      	else
      		this.year = this.value.substring(0, (this.value.length < 4?this.value.length:4));

			if ( this.value.length == this.year.length )
				this.value = "";
			else
   			this.value = this.value.substring(this.year.length + (pos >= 0?1:0));

			if ( this.year.length == 1 )
				this.year = "0" + this.year;
			if ( this.year.length == 2 )
			{
 				var mToday = new Date();
 				//If the year is greater than 30 years from now use 19, otherwise use 20
 				var checkYear = mToday.getFullYear() + 30;
 				var mCheckYear = '20' + this.year;
 				if (mCheckYear >= checkYear)
 					this.year = '19' + this.year;
 				else
 					this.year = '20' + this.year;
			}
      }
	}
}

function validateString(obj, strCheck)
{
   var value = obj.value;
	var goodValue = "";
	var curValid = true;
	var isValid = true;

	for ( var i=0; i < value.length; i++ )
	{
		curValid = true;
		var ch = value.charAt(i);
		if ( strCheck.indexOf(ch) < 0 )
		{
			curValid = false;
			isValid = false;
		}
		if ( curValid )
			goodValue = goodValue + ch;
	}
	if ( !isValid )
	{
		obj.value = goodValue;
	}
	return isValid;
}

function DateFormat(vDateName, vDateValue, e, dateCheck, dateType)
{
	vDateType = dateType;

	// vDateName = object name
	// vDateValue = value in the field being checked
	// e = event
	// dateCheck
	// True  = Verify that the vDateValue is a valid date
	// False = Format values being entered into vDateValue only
	// vDateType
	// 1 = mm/dd/yyyy
	// 2 = yyyy/mm/dd
	// 3 = dd/mm/yyyy
	// 4 = mm/dd
	//Enter a tilde sign for the first number and you can check the variable information.

   if ( vDateValue.length == 0 )
  	{
		return true;
	}

	if (vDateValue == "~")
   {
		alert("AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator);
		vDateName.value = "";
		vDateName.focus();
		return true;
	}

	var value = vDateValue;

	var month = "";
   var day = "";
   var year = "";

	if ( dateCheck )
	{
		var dateObject = new DateObject(value, vDateType);
		month = dateObject.month;
		day = dateObject.day;
		year = dateObject.year;

		value = year + month + day;

		var formatterHelp = "";
      if ( vDateType == 1 )
      {
			formatterHelp = "MM/DD/YYYY";
      }
      else if ( vDateType == 2 )
      {
			formatterHelp = "YYYY/MM/DD";
      }
      else if ( vDateType == 3 )
      {
			formatterHelp = "DD/MM/YYYY";
      }
      else if ( vDateType == 4 )
      {
			formatterHelp = "MM/DD";
      }
 	   if ( vDateType != 4  && (value.length != 8 || dateObject.value.length > 0) )
     	{
			alert("Invalid Date\nPlease Enter in " + formatterHelp + " format.");
			vDateName.focus();
			vDateName.select();
			return false;
      }
 	   else if ( vDateType == 4  && (value.length != 4 || dateObject.value.length > 0) )
     	{
			alert("Invalid Date\nPlease Enter in " + formatterHelp + " format.");
			vDateName.focus();
			vDateName.select();
			return false;
      }

		//if MM/DD format, temporarily set year to 2011 for validating
      if ( vDateType == 4 )
      	year = "2011";

      if ( !validateDate(month, day, year) )
      {
      	alert("Invalid Date\nPlease Enter in " + formatterHelp + " format.");
      	vDateName.focus();
      	vDateName.select();
      	return false;
      }
      else
		{
         if (vDateType == 1)
         {
            vDateName.value = month + "/" + day + "/" + year;
         }
         else if (vDateType == 2)
         {
            vDateName.value = year + "/" + month + "/" + day;
         }
         else if (vDateType == 3)
         {
            vDateName.value = day + "/" + month + "/" + year;
         }
         else if (vDateType == 4)
         {
            vDateName.value = month + "/" + day;
         }
         return ;
		}
      if ( vDateType == 4 )
      	year = "";
	}
	else
	{
	   var strCheck = "1234567890/";
		var validDate = validateString(vDateName, strCheck);
		if ( validDate )
		{
			var dateLength = vDateName.value.length;
			var pos1 = vDateName.value.indexOf("/");
			var pos2 = -1;
			if ( pos1 >= 0 )
				pos2 = vDateName.value.indexOf("/", pos1 + 1);
			var s1 = "", s2 = "", s3 = "";
			if ( vDateType == 1 || vDateType == 3 )
			{
   			if ( dateLength == 3 )
   			{
   				if ( pos1 < 0 )
   					vDateName.value = vDateName.value.substring(0, 2) + "/" + vDateName.value.substring(2);
   				return true;
   			}
   			else if ( pos1 > 0 && pos2 < 0 )
   			{
					if ( (dateLength - pos1 - 1) == 3 )
                  vDateName.value = vDateName.value.substring(0, dateLength - 1) + "/" + vDateName.value.substring(dateLength - 1);
				}
			}
			if ( vDateType == 2 )
			{
   			if ( dateLength == 5 )
   			{
   				if ( pos1 < 0 )
   					vDateName.value = vDateName.value.substring(0, 4) + "/" + vDateName.value.substring(4);
   				return true;
   			}
   			else if ( pos1 > 0 && pos2 < 0 )
   			{
					if ( (dateLength - pos1 - 1) == 3 )
                  vDateName.value = vDateName.value.substring(0, dateLength - 1) + "/" + vDateName.value.substring(dateLength - 1);
				}
			}
			if ( vDateType == 4 )
			{
	   			if ( dateLength == 3 )
   				{
   					if ( pos1 < 0 )
   						vDateName.value = vDateName.value.substring(0, 2) + "/" + vDateName.value.substring(2);
   					return true;
	   			}
			}
		}
	}
	return true;
}

function dateValid(objName) {
var strDate;
var strDateArray;
var strDay;
var strMonth;
var strYear;
var intday;
var intMonth;
var intYear;
var booFound = false;
var datefield = objName;
var strSeparatorArray = new Array("-"," ","/",".");
var intElementNr;
// var err = 0;
var strMonthArray = new Array(12);
strMonthArray[0] = "Jan";
strMonthArray[1] = "Feb";
strMonthArray[2] = "Mar";
strMonthArray[3] = "Apr";
strMonthArray[4] = "May";
strMonthArray[5] = "Jun";
strMonthArray[6] = "Jul";
strMonthArray[7] = "Aug";
strMonthArray[8] = "Sep";
strMonthArray[9] = "Oct";
strMonthArray[10] = "Nov";
strMonthArray[11] = "Dec";
//strDate = datefield.value;
strDate = objName;
if (strDate.length < 1) {
return true;
}
for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
strDateArray = strDate.split(strSeparatorArray[intElementNr]);
if (strDateArray.length != 3) {
err = 1;
return false;
}
else {
strDay = strDateArray[0];
strMonth = strDateArray[1];
strYear = strDateArray[2];
}
booFound = true;
   }
}
if (booFound == false) {
if (strDate.length>5) {
strDay = strDate.substr(0, 2);
strMonth = strDate.substr(2, 2);
strYear = strDate.substr(4);
   }
}
//Adjustment for short years entered
if (strYear.length == 2) {
strYear = '20' + strYear;
}
strTemp = strDay;
strDay = strMonth;
strMonth = strTemp;
intday = parseInt(strDay, 10);
if (isNaN(intday)) {
err = 2;
return false;
}
intMonth = parseInt(strMonth, 10);
if (isNaN(intMonth)) {
for (i = 0;i<12;i++) {
if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
intMonth = i+1;
strMonth = strMonthArray[i];
i = 12;
   }
}
if (isNaN(intMonth)) {
err = 3;
return false;
   }
}
intYear = parseInt(strYear, 10);
if (isNaN(intYear)) {
err = 4;
return false;
}
if (intMonth>12 || intMonth<1) {
err = 5;
return false;
}
if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
err = 6;
return false;
}
if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
err = 7;
return false;
}
if (intMonth == 2) {
if (intday < 1) {
err = 8;
return false;
}
if (LeapYear(intYear) == true) {
if (intday > 29) {
err = 9;
return false;
   }
}
else {
if (intday > 28) {
err = 10;
return false;
      }
   }
}
return true;
}
function LeapYear(intYear) {
if (intYear % 100 == 0) {
if (intYear % 400 == 0) { return true; }
}
else {
if ((intYear % 4) == 0) { return true; }
}
return false;
}


function validateDate(month, day, year)
{
   if ( isNaN(year) || isNaN(month) || isNaN (day) )
   {
      return false;
   }
   if (month.length != 2 || day.length !=2 || year.length != 4)
   {
      return false;
   }

   isValid = validDMY(day, month, year);
   if ( !isValid )
   {
      return false;
   }
   return true;
}
function validDMY(day, month, year) {
   if ( day < 1 || day > 31 )
   {
      return false;
   }
	if ( month <= 12)
	{
      if ( month == 4 || month == 6 || month == 9 || month == 11 )
      {
         if ( day > 30 )
            return false;
      }
      else if ( month == 2 )
      {
		if (LeapYear(year) == true)
		{
			if (day > 29)
			{
				return false;
			}
		}
		else  if ( day > 28 )
			return false;
	  }
	}
	else
		return false;
   return true;
}

function parseDate(date, dateType)
{
	// dateType
	// 1 = mm/dd/yyyy
	// 2 = yyyy/mm/dd
	// 3 = dd/mm/yyyy
	// 4 = mm/dd
	var value = date;
	var dateObject = new DateObject(value, dateType);
	var month = dateObject.month;
	var day = dateObject.day;
	var year = dateObject.year;
	value = year + month + day;

	return value;
}

function getCurrentDate()
{
	return getCurrentDate(0);
}
function getCurrentDate(dateType)
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	
	// dateType
	// 1 = mm/dd/yyyy
	// 2 = yyyy/mm/dd
	// 3 = dd/mm/yyyy
	// 4 = mm/dd
	if ( dateType == 1 )
		return mm+'/'+dd+'/'+yyyy;
	else if ( dateType == 2 )
		return yyyy+'/'+mm+'/'+dd;
	else if ( dateType == 3 )
		return dd+'/'+mm+'/'+yyyy;
	else if ( dateType == 4 )
		return mm+'/'+dd;
	else
		return yyyy+''+mm+''+dd;

}

function TimeObject(value, valueM)
{
	this.value = value;
	this.hour = "";
	this.min = "";
	var testValue = value.replace(':', '');
	if ( !isNaN(testValue) )
	{
		var pos1 = value.indexOf(":");
		if ( pos1 > 0 )
		{
			this.hour = value.substring(0, pos1);
			if ( value.length > (pos1+1) )
				this.min = value.substring(pos1+1);
		}
		else if ( pos1 == 0 )
		{
			if ( value.length > 1 )
				this.min = value.substring(1);
		}
		else
		{
			if ( value.length == 3 )
			{
				this.hour = value.substr(0, 1);
				this.min = value.substr(1);
			}
			else if ( value.length == 4 )
			{
				this.hour = value.substr(0, 2);
				this.min = value.substr(2);
			}
		}
		var nHour = 0;
		var nMin = 0;
		if ( this.hour > '' ) nHour = parseInt(this.hour, 10);
		if ( this.min > '' ) nMin = parseInt(this.min, 10);
		if ( valueM == 'PM' ) nHour = nHour + 12;

		this.hour = nHour.toString();
		if ( this.hour.length == 1 ) this.hour = '0' + this.hour;
		this.min = nMin.toString();
		if ( this.min.length == 1 ) this.min = '0' + this.min;
	}
}

function parseTime(value, valueM)
{
	var timeObject = new TimeObject(value, valueM);
	var hour = timeObject.hour;
	var min = timeObject.min;
	value = hour + min;

	return value;
}

function timeFormat(obj, nameTime, e)
{
   var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;

   var goodEntry = "";
   var curValid = false;
   var isValid = true;

   var strCheck = "1234567890:";
	var validTime = validateString(obj, strCheck);
	if ( validTime )
	{
      var entry = obj.value;
		var timeLength = entry.length;
		var pos1 = entry.indexOf(":");
      if ( timeLength == 3 && pos1 < 0 )
      {
         obj.value = obj.value.substring(0, 2) + ":" + obj.value.substring(2);
         return true;
      }
   }

   return validTime;
}

function validateTime(obj, nameTime)
{
   var validTime = true;
   var time = obj.value;
   var ampm = document.all[nameTime].value;
   var hour = 0;
   var minutes = 0;
   if ( time.length > 0 )
   {
      var pos1 = time.indexOf(":");
      if ( pos1 == 0 )
      {
         // do nothing, hour = 0
      }
      else if ( pos1 > 0 )
      {
         hour = parseInt(time.substring(0, pos1), 10);
      }
      if ( pos1 > 0 && time.length > pos1 )
      {
         minutes = parseInt(time.substring(pos1 + 1), 10);
      }
      if ( pos1 < 0 )
      {
         if ( time.length != 4 )
         {
            alert("Invalid time format. Please enter time in hh:mm format.");
            obj.focus();
            return;
         }
         hour = parseInt(time.substring(0, 2), 10);
         minutes = parseInt(time.substring(2), 10);
      }

      if ( hour > 24 || minutes > 59 )
      {
         alert("Invalid time format. Please enter time in hh:mm format.");
         obj.focus();
         return;
      }

      if ( hour > 12 )
      {
         hour = hour - 12;
         document.all[nameTime].value = "PM";
      }

//SB53337       obj.value = (hour<10?"0":"") + hour.toString() + ":" + (minutes<10?"0":"") + minutes.toString();
      obj.value = hour.toString() + ":" + (minutes<10?"0":"") + minutes.toString();
      if ( document.all[nameTime].value.length == 0 )
	   {
         if ( hour < 8 )
            document.all[nameTime].value = "PM";
         else
            document.all[nameTime].value = "AM";
      }
   }
}

function timeFormatHMS(obj, nameTime, e)
{
   var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;

   var goodEntry = "";
   var curValid = false;
   var isValid = true;

   var strCheck = "1234567890:";
	var validTime = validateString(obj, strCheck);
	if ( validTime )
	{
      var entry = obj.value;
		var timeLength = entry.length;
		var pos1 = entry.indexOf(":");
      if ( timeLength == 3 && pos1 < 0 )
      {
         obj.value = obj.value.substring(0, 2) + ":" + obj.value.substring(2);
         return true;
      }
		if ( pos1 >=0 )
		{
			var pos2 = entry.indexOf(":", pos1+1);
      		if ( timeLength == 6 && pos2 < 0 )
	      	{
    	    	 obj.value = obj.value.substring(0, 5) + ":" + obj.value.substring(5);
        	 	return true;
      		}
      	}
   }

   return validTime;
}

function validateTimeHMS(obj, nameTime, formObj)
{
   var validTime = true;
   var time = obj.value;
   //var ampm = document.all[nameTime].value;
   var hour = 0;
   var minutes = 0;
   var seconds = 0;
   if ( time.length > 0 )
   {
      var pos1 = time.indexOf(":");
      var pos2 = -1;
      if ( pos1 == 0 )
      {
         // do nothing, hour = 0
      }
      else if ( pos1 > 0 )
      {
         hour = parseInt(time.substring(0, pos1), 10);
      }
      if ( pos1 > 0 && time.length > pos1 )
      {
		 pos2 = time.indexOf(":", pos1+1);

		 if ( pos2 > pos1 )
		 {
			minutes = parseInt(time.substring(pos1 + 1, pos2), 10);
			seconds = parseInt(time.substring(pos2 + 1), 10);
		 }
		 else
         	minutes = parseInt(time.substring(pos1 + 1), 10);
      }
      if ( pos1 < 0 )
      {
         if ( time.length != 6 )
         {
            alert("Invalid time format. Please enter time in hh:mm:ss format.");
            //BT86197_1B
            //obj.focus(); //Not Working for firefox

            //$(this).focus();//don't use jquery $this
            //var thisId = $(this).attr('id');//get the id
            //use the setTimeout workaround for firefox
            //setTimeout(function() {
            //  document.getElementById(thisId).focus();//use javascript to set focus
            //},0);

            //use the setTimeout workaround for firefox
            setTimeout(function() {
            	obj.focus();
            },0);
            return;
         }
         hour = parseInt(time.substring(0, 2), 10);
         minutes = parseInt(time.substring(2, 4), 10);
         seconds = parseInt(time.substring(4), 10);
      }

      if ( hour > 24 || minutes > 59 || seconds > 59) //BT86197_1B
      {
         alert("Invalid time format. Please enter time in hh:mm:ss format.");
         //BT86197_1B
         //obj.focus(); //Not Working for firefox
         //use the setTimeout workaround for firefox
         setTimeout(function() {
         	obj.focus();
         },0);
         return;
      }

      if ( hour > 12 )
      {
         hour = hour - 12;
         formObj.elements[nameTime].value = "PM";
         //document.all[nameTime].value = "PM";
      }

      obj.value = hour.toString() + ":" + (minutes<10?"0":"") + minutes.toString()+ ":" + (seconds<10?"0":"") + seconds.toString();
      if ( formObj.elements[nameTime].value.length == 0 )
	   {
         if ( hour < 8 )
	         formObj.elements[nameTime].value = "PM";
         else
	         formObj.elements[nameTime].value = "AM";
      }
   }
}

function zipPostalFormat(codeObj, countryObj)
{
   country = countryObj.value;

   if ( country == "USA" )
   		return USZipCodeFormat(codeObj);

   else if ( country == "CAN" )
   		return CanadaPostalCodeFormat(codeObj);

   else
   		return true;
}


function CanadaPostalCodeFormat(codeObj)
{
   codeValue = codeObj.value;
   valueLength = codeValue.length;

   digitRegex = /^\d$/						//regular expression for digits 0-9
   alphaRegex = /^[a-ceghj-npr-tv-z]$/i		//regular expression for alpha excluding d,f,i,o,q,u

	hasSpace = (valueLength>3  &&  codeValue.charAt(3)==" ");

	valid = true;

	if ( valueLength > 0 )
	{
		for ( pos=0; pos<valueLength && valid; pos++ )
		{
			char = codeValue.charAt(pos);

			if ( ( pos == 0  ||  pos == 2 ) 	&&   !alphaRegex.test(char) )
				valid = false;

			else if (  pos == 1  &&   !digitRegex.test(char) )
				valid = false;

			else if ( pos == 3  && !hasSpace  &&  !digitRegex.test(char) )
				valid = false;

			else if ( pos == 3  && hasSpace  &&  char != " " )
				valid = false;

			else if ( pos == 4  && !hasSpace  &&  !alphaRegex.test(char) )
				valid = false;

			else if ( pos == 4  && hasSpace  &&  !digitRegex.test(char) )
				valid = false;

			else if ( pos == 5  && !hasSpace  &&  !digitRegex.test(char) )
				valid = false;

			else if ( pos == 5  && hasSpace  &&  !alphaRegex.test(char) )
				valid = false;

			else if ( pos == 6  && !hasSpace )
				valid = false;

			else if ( pos == 6  && hasSpace  &&  !digitRegex.test(char) )
				valid = false;

			else if ( pos > 6 )
				valid = false;


		}
		if ( !valid )   //trim the input after the last valid position
		{
			codeValue = codeValue.substring(0,pos-1);
			if (codeValue.length > 7)
				codeValue = codeValue.substring(0,7);
		}
		else if ( !hasSpace  &&  valueLength >3 )
		{
				codeValue = codeValue.substring(0,3) + " " + codeValue.substring(3);
		}
		//BT86197_1B In i-Access, we use .change is jQuery to implement the if the HTMLGrid.PANEL_LISTENER_ONCHANGE
		//           In ANDARZipPostalCodeFormatter we use onkeyup to call zipPostalFormat(codeObj, countryObj)
		//           They works on all browers (FireFox, Windows Edge, Phone Browser, Opera, Chrome) except IE 11.
		//           In IE 11, only the onkey event is called and the jQuery .change is not running
		//           Added the codeObj.value != codeValue condition to bypass that problem
		if (codeObj.value != codeValue.toUpperCase())
		{
			codeObj.value = codeValue.toUpperCase();
		}
	}
	return valid;
 }

function USZipCodeFormat(codeObj)
{
   codeValue = codeObj.value;
   valueLength = codeValue.length;

   digitRegex = /^\d$/			//regular expression for digits 0-9

	hasDash = (valueLength>5  &&  codeValue.charAt(5)=="-");

	valid = true;

	if ( valueLength > 0 )
	{
		for ( pos=0; pos<valueLength && valid; pos++ )
		{
			char = codeValue.charAt(pos);

			if ( !hasDash 	&&   !digitRegex.test(char) )
				valid = false;

			else if ( hasDash  &&  ( pos <= 4  ||  ( pos >=6 && pos<=9 ))	&&   !digitRegex.test(char) )
				valid = false;

			else if ( !hasDash &&  pos == 9 )
				valid = false;

			else if ( pos > 9 )
				valid = false;
		}
		if ( !valid )   //trim the input after the last valid position
		{
			codeValue = codeValue.substring(0,pos-1);
			if (codeValue.length > 10)
				codeValue = codeValue.substring(0,10);
		}
		else if ( !hasDash  &&  valueLength >5 )
		{
				codeValue = codeValue.substring(0,5) + "-" + codeValue.substring(5);
		}
		//BT86197_1B In i-Access, we use .change is jQuery to implement the if the HTMLGrid.PANEL_LISTENER_ONCHANGE
		//           In ANDARZipPostalCodeFormatter we use onkeyup to call zipPostalFormat(codeObj, countryObj)
		//           They works on all browers (FireFox, Windows Edge, Phone Browser, Opera, Chrome) except IE 11.
		//           In IE 11, only the onkey event is called and the jQuery .change is not running
		//           Added the codeObj.value != codeValue condition to bypass that problem
		if (codeObj.value != codeValue)
		{
			codeObj.value = codeValue;
		}
	}
	return valid;
 }

function validateZipPostalCode(codeObj, countryObj, showDialog)
{
	var invalidZipMag;
	var invalidPostalMsg;
	return validateZipPostalCode(codeObj, countryObj, showDialog, invalidZipMag, invalidPostalMsg);
}
function validateZipPostalCode(codeObj, countryObj, showDialog, invalidZipMsg, invalidPostalMsg)
{
   country = countryObj.value;

   if ( country == "USA" )
   		return validateUSZipCode(codeObj, showDialog, invalidZipMsg);

   else if ( country == "CAN" )
   		return validateCanadaPostalCode(codeObj, showDialog, invalidPostalMsg);

   else
   		return true;
}

function validateCanadaPostalCode(codeObj, showDialog, invalidPostalCodeMsg)
{
   codeValue = codeObj.value;
   valueLength = codeValue.length;

	msg = "Invalid Postal Code.";
	if ( invalidPostalCodeMsg != undefined && invalidPostalCodeMsg != "" )
		msg = invalidPostalCodeMsg;

	if ( valueLength == 0 )
	{
		return true;
	}
	else if ( valueLength != 6  &&  valueLength != 7 )
	{
		if (showDialog)
		{
			//alert("Invalid Postal Code.");
			alert(msg);
			codeObj.focus();
			codeObj.select();
		}
		return false;
	}
   else
   {
		var regex = /^([a-ceghj-npr-tv-z]\d[a-ceghj-npr-tv-z])(\s)?(\d[a-ceghj-npr-tv-z]\d)$/i
		if ( regex.test(codeValue) )
		{
			var parts = codeValue.match(regex);
        	codeObj.value = (parts[1] + " " + parts[3]).toUpperCase();
			return true;
		}
		else
		{
			if (showDialog)
			{
				//alert("Invalid Postal Code.");
				alert(msg);
				codeObj.focus();
				codeObj.select();
			}
			return false;
		}
	}
 }

function validateUSZipCode(codeObj, showDialog, invalidZipCodeMsg)
{
   codeValue = codeObj.value;
   valueLength = codeValue.length;

	msg = "Invalid Zip Code.";
	if ( invalidZipCodeMsg != undefined && invalidZipCodeMsg != "" )
		msg = invalidZipCodeMsg;

	if ( valueLength == 0 )
	{
		return true;
	}
	else if ( valueLength != 5  &&  valueLength != 9 &&  valueLength != 10 )
	{
		if (showDialog)
		{
			//alert("Invalid Zip Code.");
			alert(msg);
			codeObj.focus();
			codeObj.select();
		}
		return false;
	}
   else
   {
		var regex = /^(\d{5})(([\s-])?(\d{4}))?$/i
		if ( regex.test(codeValue) )
		{
			var parts = codeValue.match(regex);
			if ( valueLength > 5 )
			{
        		codeObj.value = parts[1] + "-" + parts[4];
        	}
			return true;
		}
		else
		{
			if (showDialog)
			{
				//alert("Invalid Zip Code.");
				alert(msg);
				codeObj.focus();
				codeObj.select();
			}
			return false;
		}
	}
 }

function removeWrongFormattedZip(zipCodeObj, countryObj)
{
	//blank the current zip code if it is not in the format of the specified country
	if (!validateZipPostalCode(zipCodeObj, countryObj, false) )
	{
		zipCodeObj.value = "";
	}
}


function formatPhone(phnObj)
{
   phnValue = phnObj.value;
   valueLength = phnValue.length;

   digitRegex = /^\d$/			//regular expression for digits 0-9

	hasDash = (valueLength>3  &&  phnValue.charAt(3)=="-");

	valid = true;

	if ( valueLength > 0 )
	{
		for ( pos=0; pos<valueLength && valid; pos++ )
		{
			char = phnValue.charAt(pos);

			if ( !hasDash 	&&   !digitRegex.test(char) )
				valid = false;

			else if ( hasDash  &&   pos != 3 	&&   !digitRegex.test(char) )
				valid = false;

			else if ( !hasDash &&  pos == 7 )
				valid = false;

			else if ( pos > 7 )
				valid = false;
		}
		if ( !valid )   //trim the input after the last valid position
		{
			phnValue = phnValue.substring(0,pos-1);
			if (phnValue.length > 8)
				phnValue = phnValue.substring(0,8);
		}
		else if ( !hasDash  &&  valueLength >3 )
		{
				phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3);
		}
		phnObj.value = phnValue;
	}
	return valid;
 }

 function validatePhone(phnObj, showDialog)
{
   phnValue = phnObj.value;
   valueLength = phnValue.length;

	if ( valueLength == 0 )
	{
		return true;
	}
	else if ( valueLength != 7 &&  valueLength != 8 )
	{
		if (showDialog)
		{
			alert("Invalid phone number");
			phnObj.focus();
			phnObj.select();
		}
		return false;
	}
   else
   {
		var regex = /^(\d{3})((-)?(\d{4}))$/i
		if ( regex.test(phnValue) )
		{
			if ( valueLength == 7 )
			{
        		phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3);
        	}
			return true;
		}
		else
		{
			if (showDialog)
			{
				alert("Invalid Zip Code.");
				phnObj.focus();
				phnObj.select();
			}
			return false;
		}
	}
 }

 function formatPhone11(phnObj)
 {
    var phnValue = phnObj.value;
    var valueLength = phnValue.length;

    var digitRegex = /^\d$/;			//regular expression for digits 0-9

    var hasOne = ( phnValue.charAt(0) == 1); //Check if the leading digit is 1. This is only the case in numbers in the following format: 1-234-567-8910

 	var maxLen = 10;
 	if ( hasOne ) {
 		maxLen = 11;
 	}

 	var valid = true;
 	var numberOnlyPhone = "";

 	if ( valueLength > 0 )
 	{
 		var pos = 0;
 		for ( pos = 0; pos < valueLength && valid; pos++ )
 		{
 			var char = phnValue.charAt(pos);

 			if ( digitRegex.test(char) )
 			{
 				numberOnlyPhone += char;
 			}

 			if ( numberOnlyPhone.length > maxLen )
 			{
 				valid = false;
 			}
 		}

 		phnValue = numberOnlyPhone.substring(0);

 		if ( !valid )   //trim the input if it's too long
 		{
 			phnValue = phnValue.substring(0, maxLen);
 		}

 		valueLength = phnValue.length;

 		if ( hasOne )
 		{
 			maxLen = 14;

			if ( valueLength > 1 && valueLength <= 4 ) //add first dash only (short) e.g 1-123
 	 		{
 	 			phnValue = phnValue.substring(0,1) + "-" + phnValue.substring(1);
 	 		}
 			else if ( valueLength > 4 && valueLength <= 7 ) //add first two dashes
 	 		{
 				phnValue = phnValue.substring(0,1) + "-" + phnValue.substring(1,4) + "-" + phnValue.substring(4);
 	 		}
 			else if ( valueLength > 7 ) //add three dashes e.g 12345678910 to 1-234-567-8910
 	 		{
 				phnValue = phnValue.substring(0,1) + "-" + phnValue.substring(1,4) + "-" + phnValue.substring(4,7) + "-" + phnValue.substring(7);
 	 		}
 		}
 		else //phone number doesn't start with a 1
 		{
 			maxLen = 12;
 			//accomodate short (234-5678) and long (234-567-8910) numbers

 			if ( valueLength > 7 ) //add both dashes e.g 223-456-7890
 	 		{
 				phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3,6) + "-" + phnValue.substring(6);
 	 		}
 	 		else if ( valueLength > 3 && valueLength <= 7) //add first dash only e.g 223-4 or 234-5678
 	 		{
 	 			phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3);
 	 		}
 		}

 		if ( phnValue.length > maxLen )
 		{
			phnValue = phnValue.substring(0, maxLen);
		}
 		phnObj.value = phnValue;
 	}
 	return valid;
  }

 function validatePhone11(phnObj, showDialog)
 {
    var phnValue = phnObj.value;
    var valueLength = phnValue.length;

 	if ( valueLength == 0 )
 	{
 		return true;
 	}
 	else if ( valueLength == 7 || valueLength == 8 || valueLength == 10 || valueLength == 12 )
 	{
    	var regex = /^(\d{3})(-)?((\d{4})|((\d{3})(-)?(\d{4})))$/i; //phone number formats: 321-4567; 3214567; 321-456-7890; 321-456-7890 (assuming length is 7, 8, 10, or 12 characters)

 		if ( regex.test(phnValue) )
 		{
 			if ( valueLength == 7 )
 			{
         		phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3);
         	}
 			else if ( valueLength == 10 )
 			{
 				phnValue = phnValue.substring(0,3) + "-" + phnValue.substring(3,6) + "-" + phnValue.substring(6);
 			}
 			return true;
 		}
 		else
 		{
 			if (showDialog)
 			{
 				alert("Invalid Phone Number.");
 				phnObj.focus();
 				phnObj.select();
 			}
 			return false;
 		}
 	}
 	else if ( phnValue.charAt(0) == 1 && ( valueLength == 11 || valueLength == 14 ) )
 	{
 		var regex = /^1(-)?(\d{3})(-)?(\d{3})(-)?(\d{4})$/i; //phone number formats: 1-234-567-8910 or 12345678910

 		if ( regex.test(phnValue) )
 		{
 			if ( valueLength == 11 )
 			{
 				phnValue = phnValue.substring(0,1) + "-" + phnValue.substring(1,4) + "-" + phnValue.substring(4,7) + "-" + phnValue.substring(7);
 			}
 			return true;
 		}
 		else
 		{
 			if (showDialog)
 			{
 				alert("Invalid Phone Number.");
 				phnObj.focus();
 				phnObj.select();
 			}
 			return false;
 		}
 	}
    else
    {
    	if (showDialog)
 		{
 			alert("Invalid Phone Number");
 			phnObj.focus();
 			phnObj.select();
 		}
 		return false;
 	}
  }

 function empSortFieldSelChanged (fieldName, newValue)
 {
	if ( fieldName != null  &&  fieldName != '' )
	{
		var newValueToSend = newValue;
		$.ajax({
			url: '../servlet/eAndar.EmpSortFieldHandler',
			async: false,
			dataType: "json",
			type: "post",
			data: {
				actionType: 'changed',
				fieldName: fieldName,
				newValue: newValueToSend
			},
			success: function(data) {
				if ( data != null && data != '' )
				{
					if ( data.status == 'Ok' )
					{
						$.each(data.options, function() {
						    fieldName = this.fieldName;
						    codes = this.htmlCodes;
							isInvalid = this.isInvalid;
							$("select[name='" + fieldName +"']").empty().append(codes);
						    if ( isInvalid=='Y')
						    	$("select[name='" + fieldName +"']").addClass('InvalidComboBoxValue');
						    else
						    	$("select[name='" + fieldName +"']").removeClass('InvalidComboBoxValue');
						});
					}
				}
			},
			//error: function(){alert('error code=' + statusCode)}
			error: function(jqXHR, textStatus, errorThrown) {
			    alert(jqXHR.status);
			    alert(textStatus);
			    alert(errorThrown);
			}
		})
	}
 }
 

function removingSpaces(obj)
{
	obj.value = obj.value.replace(/\s/g, '');
	return true;
}


