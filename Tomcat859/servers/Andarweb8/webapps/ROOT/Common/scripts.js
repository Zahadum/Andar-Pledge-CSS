var dontVerify = false;
var updWriteInClicked = false;
var inBlur = false;
var inFocus = false;
var saveNew = null;
var saveOld = null;
var WIUpdated ='';
var oldValue = 0.0;
var WasItClicked = false;
var bName = navigator.appName;
var bVer = parseInt(navigator.appVersion);
var NS6 = (bName == "Netscape" && bVer >= 5);
var NS4 = (bName == "Netscape" && bVer >= 4);
var focusTotal = true;

function verifyWI()
{
	var obj = document.Designation;
	var count = 0;
   var removedWI = 0;
	for (var i = 0; i < obj.length; i++)
   {
   	var e = obj.elements[i];
     	if (e.type == "text" && e.name.indexOf("WI_") != -1 )
   	{
			count++;
   		var current = e.value;
         current = current.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
			if (current == '' || parseFloat(current) == 0.00)
			{
            removedWI++;
			}
   	}
   }
	if ( count >0 && count == removedWI )
	{
		if ( count > 1 )
	      alert (obj.MDesWIRemove.value);
		else
	      alert (obj.SDesWIRemove.value);
		return false;
	}
	if ( count > 0 && removedWI < count )
	{
		var currentWIUpdated = WIUpdated;
      var currentValue = eval ("document.Designation." + currentWIUpdated + ".value");
      currentValue = currentValue.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
		if (currentValue == '' || parseFloat(currentValue) == 0.00)
		{
			alert (obj.DesWIRemoved.value);
			return false;
		}
		else
			return true;
	}

	return true;
}

function setInitial()
{
	var obj = document.Designation;
   var newTotal = 0;
	for (var i = 0; i < obj.length; i++)
   {
   	var e = obj.elements[i];
     	if (e.type == "text" && e.name.indexOf("_") != -1 )
   	{
   		var current = e.value;
         current = current.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
   		if (!isNaN(current) )
   		{
            if (current != '')
   			{
              	newTotal += parseFloat(current);
   			}
   		}
   	}
   }
	obj.InitialDesignated.value = parseFloat(backFromCurrency(obj.Designated.value)) - parseFloat( newTotal);
}


function verifyDesignations(obj, acceptIncrease)
{
	var totalPledge = obj.TotalPledge;
	var minDes = parseFloat(obj.MinAmount.value);
   var newTotal = 0;
   var existDesignations = false;

	if (!dontVerify)
	{
		if (!isPercent == true)
		{
    		for (var i = 0; i < obj.length; i++)
   		{
   			var e = obj.elements[i];

	   		if (e.type == "text" && e.name.indexOf("_") != -1 )
   			{
      	   	existDesignations = true;
   				var current = e.value;
            	current = current.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
	   			if (!isNaN(current) )
   				{
   					if (current != '' && parseFloat(current) != 0.00  && parseFloat(current) < minDes)
   					{
   						return false;
   						break;
   					}

	               if (current != '')
   					{
      	         	newTotal += parseFloat(current);
   					}
   				}
     			}
   		}
   	}
   	var pledge = parseFloat(backFromCurrency(totalPledge.value));
   	designations = parseFloat(newTotal);
		initial      = parseFloat(obj.InitialDesignated.value);
   	if ( existDesignations &&  pledge < initial+designations )
		{
				return false;
		}
		else
      	return true;
	}
	else
		return true;
}

function verifyForm (obj, acceptIncrease)
{
	if (!WasItClicked)
		return false;
	else
	{
   	if (!dontVerify)
   	{
   		if ( !updWriteInClicked )
            return (verifyDesignations(obj, acceptIncrease));
   		else
   		{
   			updWriteInClicked = false;
            return (verifyDesignations(obj, acceptIncrease) && verifyWI() );
   		}
   	}
		else
			return true;
	}
}

function changeKeyDisplay(spanID, fieldName, newType)
{
	var curValue = "";
	if (newType == 'PDD' || newType == 'PN')
		curValue = document.Designation.PAgencyKeyword.value;
	else
		curValue = document.Designation.AgencyKeyword.value;

	if (NS6)
	{
		if (newType == 'PDD')
			document.getElementById(spanID).innerHTML = '<%=webProfile.getAddressStateComponent("PAgencyKeyword", "' + curValue + '")%>';
		else if (newType == 'DD')
			document.getElementById(spanID).innerHTML = '<%=webProfile.getAddressStateComponent("AgencyKeyword", "' + curValue + '")%>';
		else
			document.getElementByID(spanID).innerHTML = '<INPUT TYPE=TEXT NAME="' + fieldName + '" Value="' + curValue + '" SIZE=20>';
	}
	else if (!NS4)
	{
		if (newType == 'PDD')
			document.all[spanID].innerHTML = '<%=webProfile.getAddressStateComponent("PAgencyKeyword", "' + curValue + '")%>';
		else if (newType == 'DD')
			document.all[spanID].innerHTML = '<%=webProfile.getAddressStateComponent("AgencyKeyword", "' + curValue + '")%>';
		else
			document.all[spanID].innerHTML = '<INPUT TYPE=TEXT NAME="' + fieldName + '" Value="' + curValue + '" SIZE=20>';
	}
}

function changePledge(acceptIncrease, navValue)
{
	if ( acceptIncrease == 'true' )
	   document.Designation.increasePledge.value = '1';
   dontVerify = true;
	document.Designation.NavigationButton.value = navValue;
	document.Designation.submit();
}


function newWindow(newContent)
{
	if(document.all)
	{
      var width = parent.document.body.offsetWidth*2/3;
      var height = parent.document.body.offsetHeight*2/3;
   }
   else if (document.layers || document.getElementById)
   {
      var width = parent.window.innerWidth*2/3;
      var height = parent.window.innerHeight*2/3;
   }
   else
   {
       var width=640*2/3;
       var height=480*2/3;
   }
	winContent = window.open(newContent, 'nextWin', 'width=' + width + ',height=' + height +', scrollbars=yes, resizable=yes');
}

function validateAmount(obj)
{
	if(obj=='undefined')
		return;

	var amount = obj.value;
	var goodAmount = "";
	var curValid = true;
	var isValid = true;
	var hasDecimal = false;
	var decimalDigits = 0;

	if ( amount == "nothing")
		return;

	if ( amount.length == 1 )
	{
		if ( amount == "." )
		{
			obj.value = "0.";
			return;
		}
	}

	for ( var i=0; i<amount.length; i++ )
	{
		curValid = true;
		var ch = amount.substring(i, i+1);
		if ( ch == "." )
		{
			if ( hasDecimal )
			{
				curValid = false;
				isValid = false;
			}
			else
				hasDecimal = true;
		}
		else if ( ch < "0" || ch > "9" )
		{
			curValid = false;
			isValid = false;
		}
		else if ( hasDecimal )
			decimalDigits++;

		if ( curValid )
			goodAmount = goodAmount + ch;
	}

	if ( !isValid )
	{
		obj.value = goodAmount;
	}
	else if ( decimalDigits > 2 && isPercent==false )
		obj.value = eval(Math.floor(Math.round(100*amount))/100);
}

function ensureTwoDecimalPlaces(obj)
{
	var amount = new String(obj.value);

	if ( amount == "undefined" )
		return "0";

	var decimalDigits = 0;
	var hasDecimal = false;

	if ( amount.length == 1 )
	{
		if ( amount == "." )
		{
			return "0.00";
		}
	}

	for ( var i=0; i<amount.length; i++ )
	{
		var ch = amount.substring(i, i+1);
		if ( ch == "." )
			hasDecimal = true;
		else if ( hasDecimal )
			decimalDigits++;
	}

	if ( !hasDecimal )
		obj.value = amount + ".00";
	else if ( decimalDigits == 0 )
		obj.value = amount + "00";
	else if ( decimalDigits == 1)
		obj.value = amount + "0";
	else
		obj.value = amount;
}

function ensureDecimalValue(value)
{
	var amount = new String(value);
	var decimalDigits = 0;
	var hasDecimal = false;
	if ( amount == "" )
		return "";
	if ( amount.length == 1 )
	{
		if ( amount == "." )
		{
			return "0.00";
		}
	}

	for ( var i=0; i<amount.length; i++ )
	{
		var ch = amount.substring(i, i+1);
		if ( ch == "." )
			hasDecimal = true;
		else if ( hasDecimal )
			decimalDigits++;
	}

	if ( !hasDecimal )
		return amount + ".00";
	else if ( decimalDigits == 0 )
		return amount + "00";
	else if ( decimalDigits == 1)
		return amount + "0";
	else if ( decimalDigits > 2 )
	{
		var dPlace = amount.indexOf(".");
		return amount.substring(0,dPlace + 3);
	}
	else
		return amount;
}

function formatPercent(num)
{
	if (isNaN(num))
		return '0.00%';
	else
		return num+'%';
}

function formatPercentValue(num)   //DY102982  cloned from formatPercent() above
{								   //use this to avoid conflict with that from SurveyScripts.getSurveyScript(obj)
	if (isNaN(num))
		return '0.00%';
	else
		return num+'%';
}

function formatCurrency(num)
{
	if(isPercent==true)
	{
		return formatPercent(num);
	}
	else
	{
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))num = "0";
			sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
			cents = "0" + cents;

		for (var i=0; i<Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));

		return (((sign)?'':'-') + '$' + num + '.' + cents);
	}
}

function backFromPercent(num)
{
	num = num.replace(/\%/g,'');
	//num = num.substring(0,num.length-1);
	var i = num.indexOf(",");

	while (i > 0)
	{
		num = num.substring(0, i) + num.substring(i + 1);
		i = num.indexOf(",");
	}

	return num;
}

function backFromCurrency_sub(num, ignoreIsPercent)
{
	//if(isPercent==true)
	//BT77945
	if(isPercent && !ignoreIsPercent)
	{
		return backFromPercent(num);
	}
	else
	{
		num = num.replace(/\$/g,'');
		//num = num.substring(1);
		var i = num.indexOf(",");

		while (i > 0)
		{
			num = num.substring(0, i) + num.substring(i + 1);
			i = num.indexOf(",");
		}

		return num;
	}
}


function backFromCurrency(num)
{
	return backFromCurrency_sub(num, false);
}

function saveOriginalValue(objNew, objOld)
{
	if ( inBlur )
	{
		inFocus = true;
		saveNew = objNew;
		saveOld = objOld;
	}
	else
	{
		inFocus = false;
		objOld.OriginalValue.value = objNew.value;

		if (objOld.IsOver)
		{
			var minDes = parseFloat(objOld.MinAmount.value);
			var newValue =  parseFloat(objNew.value);

			if (isNaN(newValue))
				newValue = 0.0;
			if ( newValue >= minDes || newValue == 0.0 )
				oldValue = newValue;
			else
			{
				objNew.value = oldValue;
				if (oldValue == 0.0)
					objNew.value = '';
			}
		}
	}
}

function changeDisplay(id, str)
{
	if (NS6)
	{
		if ( document.getElementById(id) )
			document.getElementById(id).innerHTML = str;
	}
	else if (!NS4)
	{
		if ( document.all[id] )
			document.all[id].innerHTML = str;
	}
}

function setInitialWI()
{
  	var obj = document.Designation;
	var newTotal = 0;
   var current = obj.WIAmount.value;
   if (!isNaN(current) )
  	{
       if (current != '')
       	newTotal += parseFloat(current);
	}

	obj.InitialDesignated.value = parseFloat(backFromCurrency(obj.Designated.value)) - newTotal;
}

function verifyWIAmount(acceptIncrease)
{
	if (!dontVerify)
	{
		if (!usePercent)
		{
	     	var obj = document.Designation;
			var agName =  obj.WIName1.value;
			if (obj.increasePledge)
				obj.increasePledge.value = '0';
	      agName = agName.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
			if (agName == '')
			{
				alert (obj.WINameWarn.value);
				return false;
			}

	   	var totalPledge = obj.TotalPledge;
   	   var newTotal = 0;
	   	var minDes =  parseFloat(obj.MinAmount.value);
	   	var current = obj.WIAmount.value;
   		current = current.replace(/(\s+$)/,"").replace(/(^\s+)/,"");
			if (!isNaN(current) )
			{
				if (current != '' && parseFloat(current) < minDes)
				{
					if (obj.MinDesWarn.value == "Default")
					{
						alert("Each designation must be at least " + formatCurrency(minDes));
					}
					else
					{
						alert(obj.MinDesWarn.value);
					}
					return false;
				}
	         if (current != '')
				{
      	     	newTotal += parseFloat(current);
				}
			}

			var pledge = parseFloat(backFromCurrency(totalPledge.value));
			designations = parseFloat(newTotal);
      	initial      = parseFloat(obj.InitialDesignated.value);
		  	if (pledge < initial+designations )
			{
				if ( acceptIncrease == 'true' )
				{
					if ( !confirm(obj.AskOver.value) )
					{
						alert(obj.Over.value);
						return false;
					}
					else
					{
						obj.increasePledge.value = '1';
						return true;
					}
				}
				else
				{
					alert(obj.Over.value);
					return false;
				}
			}
			else
   			return true;
   	}
	}
	else
		return true;
}

function AndarButton(mainImageSource, mouseImageSource)
{
	this.mainImage = new Image();
	this.mainImage.src = mainImageSource;
	this.mouseImage = new Image();
	this.mouseImage.src = mouseImageSource;
}

var AndarButtonArray = new Array();
var AndarButtonProcessing = false;

function AndarButtonMouseOver(buttonName, mouseImageSource)
{
	AndarButtonMouseOver(buttonName, mouseImageSource, false);
}

function AndarButtonMouseOver(buttonName, mouseImageSource, forceRefresh)
{
	if (!AndarButtonProcessing)
	{
		if (AndarButtonArray[buttonName] == null || forceRefresh)
		{
			AndarButtonArray[buttonName] = new AndarButton(document[buttonName].src, mouseImageSource);
		}
		document[buttonName].src = AndarButtonArray[buttonName].mouseImage.src;
	}
}

function AndarButtonMouseOut(buttonName)
{
	if (!AndarButtonProcessing)
		document[buttonName].src = AndarButtonArray[buttonName].mainImage.src;
}

function AndarButtonClicked(buttonName, clickedImage)
{
	AndarButtonProcessing = true;
	document[buttonName].src = clickedImage;
	document[buttonName].style.cursor = 'wait';
}

// used in registration
function ensureNumbers(obj)
{
	var name = trimString(obj.name);
   var number = obj.value;
   var goodNumber = "";
   var curValid = true;
   var isValid = true;

   for ( var i=0; i<number.length; i++ )
   {
      curValid = true;
      var ch = number.substring(i, i+1);
		if ( name == "phone" && ch == "-" )
			curValid = true;
      else if ( ch < "0" || ch > "9" )
      {
			curValid = false;
         isValid = false;
      }

		if ( curValid )
			goodNumber = goodNumber + ch;
   }

   if (!isValid)
   	obj.value = goodNumber;
}

function trimString(value)
{
	var goodValue = "";
   for ( var i=0; i<value.length; i++ )
   {
      var ch = value.substring(i, i+1);
      if ( ch != " " )
         goodValue = goodValue + ch;
   }
	return goodValue;
}


function formatPhoneField(phoneField)
{
	NS4 = (document.layers) ? 1 : 0;
	IE4 = (document.all) ? 1 : 0;
	if (document.getElementById)
   	DHTML = true;
	//this script is supposed to work for IE and all browsers with DHTML capabilities
	executeScript = false;
	if ( IE4 || DHTML )
		executeScript = true;
	//don't execute script for arrows keys
	if ( executeScript )
	{
		if ( IE4 && (event.keyCode == 37 || event.keyCode == 39) )
				executeScript = false;
	}

   if ( executeScript )
   {
      var firstThree = "";
      var lastNumbers = "";
      var errors = "";
      var phone=phoneField.value;


      var goodValue = "";
      var curValid = true;
      var isValid = true;

      for ( var i=0; i<phone.length; i++ )
      {
    	  curValid = true;
    	  var ch = phone.substring(i, i+1);
    	  if ( ch < "0" || ch > "9" && ch !='-')
    	  {
    		  curValid = false;
    		  isValid = false;
    	  }
    	  if ( curValid )
    		  goodValue = goodValue + ch;
      }

      phoneField.value = goodValue;
      phone = phoneField.value

      // CLEAR ALL NON NUMBER CHARACTERS

      phone = phone.replace(/[\(\)\- ,\.]/g,"");
      phoneField.value = phone;


      // CLEAR LEADING 1
      if (phone.length > 10)
      {
         phone = (phone.charAt(0)=="1"?phone.substr(1,phone.length):phone);
      }
      // CHECK LENGTH OF PHONE NUMBER
      if (phone.length < 8 && phone.length > 0)
      {
   		  errors += "Invalid phone number format: Not enough numbers\n"
      }
      // CHECK IF INPUT IS A NUMBER
      if (isNaN(phone))
      {
         errors += "Invalid phone number format: Invalid characters\n"
      }
      // SHOW ERRORS
      if (errors.length > 0)
      {
         errors += "\nMust use the following format: ###-###-####";
      }
      // GET FIRST THREE
      if (phone.length > 3)
      {
         firstThree = "" + phone.substr(0,3) + "-";
         lastNumbers = phone.substr(3,phone.length);
      }
      else
      {
         lastNumbers = phone;
      }
      // PUT NUMBERS TOGETHER
      newPhone = firstThree +  lastNumbers;
      // RETURN VALUE
      phoneField.value = newPhone;
   }

}

function changePhoneField(phoneField)
{
   var bName = navigator.appName;
   var bVer = parseInt(navigator.appVersion);
   var NS4 = (bName == "Netscape" && bVer >= 4 );
   if (document.getElementById)
   	NS4 = false;

   if (NS4)
   {
      var phone=phoneField.value;
      var goodValue = "";
      var curValid = true;
      var isValid = true;

      for ( var i=0; i<phone.length; i++ )
      {
        curValid = true;
   	var ch = phone.substring(i, i+1);
   	if ( (ch < "0" || ch > "9") )
   	{
   	   curValid = false;
   	   isValid = false;
   	}
   	if ( curValid )
           goodValue = goodValue + ch;
      }

      phoneField.value = goodValue;
      phone = phoneField.value
      if (phone.length > 2)
      {
         firstThree = "" + phone.substr(0,3) + "-";
         lastNumbers = phone.substr(3,phone.length);
      }
      else
      {
         lastNumbers = phone;
      }

      newPhone = firstThree +  lastNumbers;
		newPhone = newPhone.substr(0,8);
      phoneField.value = newPhone;
	}

}

function checkPhoneField(phoneField)
{
   //INITIALIZE VARS
   var firstThree = "";
   var lastNumbers = "";
   var errors = "";
   var phone=phoneField.value;

   // CLEAR ALL NON NUMBER CHARACTERS

   phone = phone.replace(/[\(\)\- ,\.]/g,"");
   // CLEAR LEADING 1
   if (phone.length > 10)
   {
      phone = (phone.charAt(0)=="1"?phone.substr(1,phone.length):phone);
   }
   // CHECK LENGTH OF PHONE NUMBER
   if (phone.length < 7 && phone.length > 0)
   {
	   if (typeof msgPhoneInvalidShort != 'undefined' &&  msgPhoneInvalidShort !=null  && msgPhoneInvalidShort !="")
		   errors += msgPhoneInvalidShort + '\n';
	   else
		   errors += "Invalid phone number format: Not enough numbers\n"
   }
   // CHECK IF INPUT IS A NUMBER
   if (isNaN(phone))
   {
      errors += "Invalid phone number format: Invalid characters\n"
   }
   // SHOW ERRORS
   if (errors.length > 0)
   {
	   if ( phone == "0" )
		   return true;

	   if (typeof msgPhoneFormat != 'undefined' &&  msgPhoneFormat !=null  && msgPhoneFormat !="")
		   errors += '\n' + msgPhoneFormat;
	   else
		   errors += "\nMust use the following format: ###-####";

	   alert (errors);
		phoneField.focus();
		phoneField.select();
		return false;
   }
   return true;
}

function testDisplay(id, obj)
{
   var checkbox = obj.TestC;
   if ( checkbox != null && checkbox.value == "on")
      str = "checked";
   else
      str = "chocked";

   if (NS4)
   {
      with ( document[id].document)
      {
         open();
         write(str);
         close();
      }
   }
   else
   {
   	document.all[id].innerHTML = str;
   }
}

var prevIntValue = "";
function validateNumberOnFocus(obj)
{
	prevIntValue = obj.value;
}

function validateNumber(obj)
{
	var amount = obj.value;
	var goodAmount = "";
	var curValid = true;
	var isValid = true;

	for ( var i=0; i<amount.length; i++ )
	{
		curValid = true;
		var ch = amount.substring(i, i+1);
		if ( ch < "0" || ch > "9" )
		{
			curValid = false;
			isValid = false;
		}
		if ( curValid )
			goodAmount = goodAmount + ch;
	}
	if ( !isValid )
	{
		obj.value = goodAmount;
	}

	if ( parseInt(goodAmount) > 2147483647)
	{
		obj.value = prevIntValue;
	}
	prevIntValue = obj.value;
}

//Previous value of integer, backup of the last valid number.
var prevIntegerValue = "";
function validateIntegerOnFocus(obj)
{
	prevIntegerValue = obj.value;
}

function validateInteger(obj)
{
    var numValue = obj.value;
    var numLength = obj.length;

	var regex = /^(-)?(\d){0,10}$/i;     //regular expression for an integer with positive or negative numeric value and length no more than 10

	//if format is completely valid and value is in range of minimum and maximum value of an integer, we exit the function.
	if ( regex.test(numValue) && ( parseInt(numValue) >= -2147483648 && parseInt(numValue) <= 2147483647 ) )
	{
		prevIntegerValue = numValue;
		obj.value = numValue;
		return true;
	}
	else if ( numValue == "" || numValue == "-" )
	{
		prevIntegerValue = numValue;
		obj.value = numValue;
		return true;
	}
	else
	{
		var validNumber = "";
		var digitRegex = /^\d$/;			//regular expression for digits 0-9

		var valid = true;

		if ( numLength > 0 )
		{
			var pos = 0;
			for ( pos = 0; pos < numLength && valid; pos++ )
			{
				var curChar = numValue.charAt(pos);

				if ( digitRegex.test(curChar) || ( pos == 0 && curChar == "-" ) )
				{
					validNumber += curChar;
				}
				else
				{
					valid = false;
				}
			}
		}
		if ( validNumber.length > 0 && ( validNumber == "-" || ( parseInt(validNumber) >= -2147483648 && parseInt(validNumber) <= 2147483647 )))
		{
			numValue = validNumber.substring(0);
			prevIntegerValue = numValue;
			obj.value = numValue;
		}
		else
		{
			obj.value = prevIntegerValue;
		}
		return valid;
 	}
 }

function validateIntegerOnBlur(obj, showDialog)
{
    var numValue = obj.value;

	var regex = /^(-)?(\d)+$/i;     //regular expression for an integer with positive or negative value and at least one digit

	if ( regex.test(numValue) && ( parseInt(numValue) >= -2147483648 && parseInt(numValue) <= 2147483647 ) )
	{
		return true;
	}
	else if ( numValue == "" )
	{
		return true;
	}
	else
	{
		if (showDialog)
		{
			alert("Invalid Integer Value Entered!");
			obj.focus();
			obj.select();
		}
		return false;
 	}
 }

function changeAddressStar(newStar)
{
	var obj = document.ProfileForm;
	var oldStar = obj.LastAddStar.value;
	var oldHead = "Head_" + oldStar;
	var oldSA = "SA1_" + oldStar;
	var oldCity = "C_" + oldStar;
	var oldState = "ST_" + oldStar;
	var oldZip = "ZP_" + oldStar;
	var oldCountry = "Count_" + oldStar;

	var newHead = "Head_" + newStar;
	var newSA = "SA1_" + newStar;
	var newCity = "C_" + newStar;
	var newState = "ST_" + newStar;
	var newZip = "ZP_" + newStar;
	var newCountry = "Count_" + newStar;

	if (NS4)
	{
   	with (document[oldHead].document)
		{
	      open();
   	   write("");
      	close();
   	}
   	with (document[oldSA].document)
		{
	      open();
   	   write("");
      	close();
   	}
   	with (document[oldCity].document)
		{
	      open();
   	   write("");
      	close();
   	}
   	with (document[oldState].document)
		{
	      open();
   	   write("");
      	close();
   	}
   	with (document[oldZip].document)
		{
	      open();
   	   write("");
      	close();
   	}
   	with (document[oldCountry].document)
		{
	      open();
   	   write("");
      	close();
   	}

   	with (document[newHead].document)
		{
	      open();
   	   write("*");
      	close();
   	}
   	with (document[newSA].document)
		{
	      open();
   	   write("*");
      	close();
   	}
   	with (document[newCity].document)
		{
	      open();
   	   write("*");
      	close();
   	}
   	with (document[newState].document)
		{
	      open();
   	   write("*");
      	close();
   	}
   	with (document[newZip].document)
		{
	      open();
   	   write("*");
      	close();
   	}
   	with (document[newCountry].document)
		{
	      open();
   	   write("*");
      	close();
   	}
  	}
	else
	{
    	document.all[oldHead].innerHTML = "";
    	document.all[oldSA].innerHTML = "";
    	document.all[oldCity].innerHTML = "";
    	document.all[oldState].innerHTML = "";
    	document.all[oldZip].innerHTML = "";
    	document.all[oldCountry].innerHTML = "";

    	document.all[newHead].innerHTML = "*";
    	document.all[newSA].innerHTML = "*";
    	document.all[newCity].innerHTML = "*";
    	document.all[newState].innerHTML = "*";
    	document.all[newZip].innerHTML = "*";
    	document.all[newCountry].innerHTML = "*";
  	}
  	obj.LastAddStar.value = newStar;
}
// End those used for Registration

// For formatting/unformatting dollar/percentage amount //DY34514
function formatAmount(obj, formatForPercent)
{
	savIsPercent = isPercent;

	if(formatForPercent!=null)
		isPercent = formatForPercent;

	var value=obj.value.toString();
   var amount = parseFloat(backFromCurrency(value));

	if ( isPercent )							//DY102982 fixed calling the formatCurrency() from SurveyScripts.getSurveyScript()	
		obj.value=formatPercentValue(amount);        //         which return $ format 
	else
		obj.value=formatCurrency(amount);

	isPercent = savIsPercent;
}
function removeFormatter(obj, formatForPercent)
{
	savIsPercent = isPercent;
	if(formatForPercent!=null)
		isPercent = formatForPercent;

	var value = obj.value.toString();
	var value1 = backFromCurrency(value);
   var amount = parseFloat(backFromCurrency(value));
	if (!isNaN(amount))
	   obj.value=amount;

	isPercent = savIsPercent;

}

//Moved from IPledgePayroll & IPledgeIC  //DY46144

function validatePercent(obj)
{
	var amount = obj.value;
	var goodAmount = "";
	var curValid = true;
	var isValid = true;
	var hasDecimal = false;
	var decimalDigits = 0;

	if ( amount == "nothing")
		return;

	if ( amount.length == 1 )
	{
		if ( amount == "." )
		{
			obj.value = "0.";
			return;
		}
	}

	for ( var i=0; i<amount.length; i++ )
	{
		curValid = true;
		var ch = amount.substring(i, i+1);

		if ( ch == "." )
		{
			if ( hasDecimal )
			{
				curValid = false;
				isValid = false;
			}
			else
				hasDecimal = true;
		}
		else if ( ch < "0" || ch > "9" )
		{
			curValid = false;
			isValid = false;
		}
		else if ( hasDecimal )
			decimalDigits++;

		if ( curValid )
			goodAmount = goodAmount + ch;
	}
	if ( !isValid )
	{
		obj.value = goodAmount;
	}
}

function setRadioChecked(radioObj, newValue, unspecifiedOptionValue)
{
	sthChecked = false;
	if(!radioObj)
		return;

	//DY80407 Myteriously browser does not like the line below. Firefox console show 'syntax error: ; missing before statement'
	//This happened only when calling from the SRP page and was calling from shopping cart checkout
	//var newVal = eval(newValue);
	var radioLength = radioObj.length;
	if(radioLength == undefined)
	{
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}

	for(var i = 0; i < radioLength; i++)
	{
		radioObj[i].checked = false;

		//if(radioObj[i].value == newVal)	//DY80407
		if(radioObj[i].value == eval(newValue))
		{
			radioObj[i].checked = true;
			sthChecked = true;
			break;
		}
	}

	//if no options are checked and there exist an option for unspecifed item (example, 'Other', 'Any'), check it
	if ( unspecifiedOptionValue && !sthChecked)
	{

		for(var i = 0; i < radioLength; i++)
		{
			if(radioObj[i].value == unspecifiedOptionValue.toString())
			{
				radioObj[i].checked = true;
				return;
			}
		}
	}

}


function updateDayDropdown(fieldName, hasBlank)
{
	var yearElement=document.getElementsByName(fieldName + '_YEAR');
	var monthElement=document.getElementsByName(fieldName + '_MONTH');
	var x=document.getElementsByName(fieldName + '_DAY');
	var dayElement=x[0];
	var yearValue = 0;
	var monthValue = 0;
	var dayValue = 0;
	if ( yearElement != null && yearElement.length > 0 ) yearValue = yearElement[0].value;
	if ( monthElement != null && monthElement.length > 0 ) monthValue = monthElement[0].value;
	if ( dayElement != null && dayElement.length > 0 ) dayValue = dayElement.value;
	var dayComponent = document.getElementById(fieldName + '_Day');
	var maxDay = 31;
	if (monthValue == 0) return;
	if (monthValue==4 || monthValue==6 || monthValue==9 || monthValue==11) maxDay = 30;
	if (monthValue=='Apr' || monthValue=='Jun' || monthValue=='Sep' || monthValue=='Nov') maxDay = 30;
	if (monthValue==2 ||  monthValue=='Feb')
	{
	   if (yearValue==0) maxDay = 29;
	   else
	   {
	      if (LeapYear(yearValue)) maxDay = 29;
	      else maxDay = 28;
	   }
	}
	if (dayValue>maxDay) dayValue = maxDay;


	if ( hasBlank )  //has a N/A value in day selection
	{
		if ((dayElement.length-1) > maxDay )
		{
		   while ((dayElement.length-1) > maxDay)
		   {
		      dayElement.remove(dayElement.length-1);
		   }
		}
		if ((dayElement.length-1) < maxDay )
		{
		   while ((dayElement.length-1) < maxDay)
		   {
		      var option=document.createElement("option");
		      option.text=(dayElement.length);
		      option.value=(dayElement.length);
		      try
		      {
		// for IE earlier than version 8
		         dayElement.add(option,x.options[null]);
		      }
		      catch (e)
		      {
		         dayElement.add(option,null);
		      }
		   }
		}

	}
	else
	{
		if ((dayElement.length) > maxDay )
		{
		   while ((dayElement.length) > maxDay)
		   {
		      dayElement.remove(dayElement.length-1);
		   }
		}
		if ((dayElement.length) < maxDay )
		{
		   while ((dayElement.length) < maxDay)
		   {
		      var option=document.createElement("option");
		      option.text=(dayElement.length + 1);
		      option.value=(dayElement.length + 1);
		      try
		      {
		// for IE earlier than version 8
		         dayElement.add(option,x.options[null]);
		      }
		      catch (e)
		      {
		         dayElement.add(option,null);
		      }
		   }
		}
	}

}

function LeapYear(intYear)
{
	if (intYear % 100 == 0)
	{
		if (intYear % 400 == 0) { return true; }
	}
	else
	{
		if ((intYear % 4) == 0) { return true; }
	}
	return false;
}



//DY89069..
//clone from validateAmount(obj) without considering isPercent variable
function validateDollarAmount(obj)
{
	if(obj=='undefined')
		return;

	var amount = obj.value;
	var goodAmount = "";
	var curValid = true;
	var isValid = true;
	var hasDecimal = false;
	var decimalDigits = 0;

	//if ( amount == "nothing")		//DY89069 ignore designation specified thing
	//	return;

	if ( amount.length == 1 )
	{
		if ( amount == "." )
		{
			obj.value = "0.";
			return;
		}
	}

	for ( var i=0; i<amount.length; i++ )
	{
		curValid = true;
		var ch = amount.substring(i, i+1);
		if ( ch == "." )
		{
			if ( hasDecimal )
			{
				curValid = false;
				isValid = false;
			}
			else
				hasDecimal = true;
		}
		else if ( ch < "0" || ch > "9" )
		{
			curValid = false;
			isValid = false;
		}
		else if ( hasDecimal )
			decimalDigits++;

		if ( curValid )
			goodAmount = goodAmount + ch;
	}

	if ( !isValid )
	{
		obj.value = goodAmount;
	}
	else if ( decimalDigits > 2 )
		obj.value = eval(Math.floor(Math.round(100*amount))/100);
}

//cloned from formatAmount(obj, boolean) without considering isPercent variable
function formatDollarAmount(obj)
{
	var value=obj.value.toString();
	value = value.replace(/[^0-9\.]+/g,"");

	if( isNaN(value) )
		value = "0";
	sign = (value == (value = Math.abs(value)));
	value = Math.floor(value*100+0.50000000001);
	cents = value%100;
	value = Math.floor(value/100).toString();
	if(cents<10)
		cents = "0" + cents;

	for (var i=0; i<Math.floor((value.length-(1+i))/3); i++)
		value = value.substring(0,value.length-(4*i+3))+','+value.substring(value.length-(4*i+3));

	obj.value = (((sign)?'':'-') + '$' + value + '.' + cents);
}

//cloned from removeFormatter(obj, boolean) without considering isPercent variable
function removeDollarFormatter(obj)
{
	value = obj.value.toString();
	value = value.replace(/[^0-9\.]+/g,"");
	var amount = parseFloat(value);
	if (!isNaN(amount))
	   obj.value=amount;

}
function blankField(objSet)		//expect a wrapped set from jquery selector
{
	if ( objSet.length)
		objSet.val('');
}
//..DY89069

//convert a numeric value to dollar format for display ($99,999.99)
function toDollarFormat(numValue)
{
	var value = numValue.toFixed(2);
	return "$" + value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	
}
function fromDollarFormat(dollarValue)
{
	return dollarValue.replace(/[^0-9\.]+/g,"");
}


function loadJS(text)
{
	var start = text.toUpperCase().indexOf("<SCRIPT");
//	console.log("Reload JS: start:" + start);						//Debug
	while ( start >= 0 )
	{
		var endOfStart = text.indexOf(">", start);
		var end = start+1;							// Have exit point in case sript brocken.
		if ( endOfStart > 0 )
		{
			end = text.toUpperCase().indexOf("<\/SCRIPT>", endOfStart);
			if ( end > 0 )
			{
				var js = text.substring(endOfStart+1, end);
//				console.log("Reload JS:" + js);						//Debug
				jQuery.globalEval(js);
			}
		}
		start = text.toUpperCase().indexOf("<SCRIPT", end);
	}
}


function hideShowToggle(linkObj, toggleSelectors, hideProp, showProp)	//DY97532
{
	var selectors;
	if (toggleSelectors instanceof Array) 	//multiple values in an array	
		selectors = toggleSelectors;
	else							//single value - a string
		selectors = [toggleSelectors]; 

	selectors.forEach( function(s) { 
		$(s).toggle();
	})
	setToggleLinkProp(linkObj, toggleSelectors, hideProp, showProp)
	return false;
}

function setToggleLinkProp(linkObj, toggleSelectors, hideProp, showProp)
{
	var selector;
	if (toggleSelectors instanceof Array) 	//multiple values in an array	
		selector = toggleSelectors[0];
	else									//single value - a string
		selector = toggleSelectors; 

	if (  $(selector).is(':hidden') )	//currently hidden. display the 'show' label
	{
		$('#' + linkObj.id).html(showProp.label);
		$('#' + linkObj.id).attr('title',showProp.tooltip);
	}
	else
	{
		$('#' + linkObj.id).html(hideProp.label);
		$('#' + linkObj.id).attr('title',hideProp.tooltip);
	}
}
