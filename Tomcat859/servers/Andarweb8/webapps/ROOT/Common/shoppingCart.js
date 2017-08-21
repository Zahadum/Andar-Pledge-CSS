if (typeof sc_rootPath === 'undefined')	
	var sc_rootPath;

if (typeof sc_hidePortletWhenEmpty === 'undefined') 
	var sc_hidePortletWhenEmpty;

if (typeof sc_itemFieldSeparator === 'undefined')
	var sc_itemFieldSeparator;

if (typeof sc_itemSeparator === 'undefined')
	var sc_itemSeparator;

if (typeof sc_idxItemName === 'undefined')
			 var sc_idxItemName;

if (typeof sc_idxItemToltalAmount === 'undefined')
			 var sc_idxItemToltalAmount;

if (typeof sc_confirmDeleteMsg === 'undefined')
			 var sc_confirmDeleteMsg = '';

if (typeof sc_invalidAmountMsg === 'undefined')
	 var sc_invalidAmountMsg = '';

if (typeof sc_amountRequiredMsg === 'undefined')
	 var sc_amountRequiredMsg = '';

if (typeof sc_wiNameRequiredMsg === 'undefined')
	 var sc_wiNameRequiredMsg = '';

if (typeof sc_saveToBrowser === 'undefined')
	 var sc_saveToBrowser = true;


if (typeof sc_mouse_X === 'undefined')
	var sc_mouse_X;
	
if (typeof sc_mouse_Y === 'undefined')
	var sc_mouse_Y;

if (typeof sc_parmNames === 'undefined')
	var sc_parmNames = new Array();

if (typeof sc_parmValues === 'undefined')
	var sc_parmValues = new Array();


$(document).ready(function(){
	$(document).mousemove(function(e){
		sc_mouse_X = e.pageX;
		sc_mouse_Y = e.pageY;
	});
})


	
//------------------------------------------------------------------------------------------------
//  functions related to getting/saving shopping cart from/to the browser storage 
//------------------------------------------------------------------------------------------------
function deleteShopCartFromBrowser()
{
	if(typeof(Storage) !== "undefined")
	{
		localStorage.removeItem("AndarShopCart");
	}
}
function saveShopCartToBrowser(shopCart)
{
	//Hold on
//	if(typeof(Storage) !== "undefined")
//	{
//		if ( shopCart === null  ||  shopCart == '' )
//			localStorage.removeItem("AndarShopCart");
//		else
//			localStorage.setItem("AndarShopCart", shopCart);
//	}
}
function getShopCartFromBrowser()
{
	//Hold on
//	if(typeof(Storage) !== "undefined")
//	{
//		return localStorage.getItem("AndarShopCart");
//	}
	return null;
}


function loadShopCartFromBrowser()
{
//	var saveShopCart = getShopCartFromBrowser(); 
//	if ( saveShopCart != null  &&  saveShopCart != '' )
//	{
//		$.ajax({
//			url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
//			async: false,
//			dataType: "json",
//			type: "post",
//			data: {
//				actionType: 'Load',
//				itemList: saveShopCart,
//			},
//			success: function(data) {
//				if ( window.location.pathname.indexOf('ShoppingCart.jsp') > -1 )
//					location.reload(true);
//				else if ( $('div.Portlet>div.ShoppingCart').length > 0 )
//				{
//					$( document ).ready(function() {
//						refreshSCPortletContent();
//					});
//				}
//			}
//		})
//	}
}


//------------------------------------------------------------------------------------------------
//functions related to portlet 
//------------------------------------------------------------------------------------------------

function hideShowSCPortlet()
{
	if ( $('.Portlet>.ShoppingCart').length  &&  sc_hidePortletWhenEmpty )
	{
		if ( $('span.scpTotalQuantity').length )
		{
			val =  $('span.scpTotalQuantity').html();
			if ( val > '0' )
				$('.Portlet>.ShoppingCart').show();
			else
				$('.Portlet>.ShoppingCart').hide();
		}
	}
	else if ( $('.Portlet>.ShoppingCart').length  &&  !sc_hidePortletWhenEmpty )
	{
		$('.Portlet>.ShoppingCart').show();
	}
}


function setSCPortletTotals(totalQuantity, totalAmount)
{
	if (totalQuantity != null ) 
		$('span.scpTotalQuantity').html(totalQuantity);
	if (totalAmount != null )
		$('span.scpTotalAmount').html(totalAmount); 
}		//function setSCPortletTotal

function addSCPortletItem(item)
{
	if ( item != null && item != ''  &&  typeof scpItemContainer != 'undefined'  && typeof scpItemLayout != 'undefined')
	{
		var n = item.split(sc_itemFieldSeparator);	 //ShoppingCartItem.separator
		var itemName = n[sc_idxItemName];	
		//var quantity = n[" + ShoppingCartItem.idxQuantity + "];	
		var amount = n[sc_idxItemToltalAmount];	
		$.each( scpItemContainer, function(idx, value ) {		       
			newLine = scpItemLayout[idx];
			if ( newLine != '' ) {
				newLine = newLine.replace('<ItemName>',itemName);
				//newLine = newLine.replace('<Quantity>',quantity);
				newLine = newLine.replace('<Amount>',amount);
				this.append(newLine);
			}
		})
	}
}		//function setSCPortletContent


function resetSCPortletContent()
{
	if ( $('span.scpTotalQuantity').length > 0 )
		$('span.scpTotalQuantity').html('0');
	if ( $('span.scpTotalAmount').length > 0 )
		$('span.scpTotalAmount').html('$0.00'); 
	$('.scpItemRow').remove();
}


function getShopCartContent()
{
	var cartContent = null;
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'ReadAll',
		},
		success: function(data) {
			cartContent = data;
		}
	})
	return cartContent;
}

function refreshSCPortletContent()
{
	var data = getShopCartContent();
	if ( data != null && data != '' )
	{
		if ( $('div.Portlet>div.ShoppingCart').length > 0 )
		{
			resetSCPortletContent();
			var items = data.itemList.split(sc_itemSeparator);
			setSCPortletTotals(data.totalQuantity, data.totalAmount);
			$.each( items, function( index, value ){ 
				addSCPortletItem(value);
			});
			cartContent = data;
		}
	}
	hideShowSCPortlet();
	return cartContent;
}

function getShopCartContent()
{
	var cartContent = null;
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'ReadAll',
		},
		success: function(data) {
			cartContent = data;
		}
	})
	return cartContent;
}

function getNumberCartItems()
{
	var result = 0;
	var data = getShopCartContent();
	if ( data != null && data != '' )
	{
		var nbrItems = parseInt(data.totalQuantity);
		if ( !isNaN(nbrItems) )
			result = nbrItems; 
	}
	return result;
}

//  basic operations for portlet

function addToCart(desAccount, desAmount)
{
	wrkAmount = desAmount.toString().replace(/[^0-9\.-]+/g,"");
	var amount = parseFloat(wrkAmount);
	if (isNaN(amount)  ||  amount == 0)
	{
		errorDialog("Error", sc_invalidAmountMsg.replace('\n','<br>'));
		return
	}
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'Add',
			desAcct:desAccount,
			desAmount:wrkAmount
		},
		success: function(data) {
			if ( data != null && data != '' )
			{
				if ( data.status == 'Ok' )
				{
					returnValue = true;
					if ( data.message != '' )
						informDialog("", data.message.replace('\\n','<br>'));
					cartContent = refreshSCPortletContent();
					if ( sc_saveToBrowser && cartContent != null )
						saveShopCartToBrowser(cartContent.itemList);	//save the cart to the Browse storage		
				}
				else    // Show Error message
				{
					returnValue = false;
					if ( data.message != '' )
						errorDialog("Error", data.message.replace('\n','<br>'));
				}
			}
		}
	})
}

function addToCartWI(wiItem)
{
	if ( typeof wiItem === 'undefined')	//no arguments passed in
	{
		return addToCartWI("_wi");   //default field suffix
	}
	
	if ( typeof wiItem === 'string' )	//a string is passed in as the field suffix 
	{
		//input is the common suffix of the field id's that contain the write in information (name1, name2, amount, address etc.) 
		//construct an associate array of wi item
		suffix = wiItem;
		var wiItemArray = {};
		$( "input[id$=" + suffix + "]" ).each(function() {
			var fieldId = $(this).attr('id');
			var key = fieldId.substring(0, fieldId.length - suffix.length);		//strip the suffix
			wiItemArray[key] =  $(this).val();
			});
		return addToCartWI(wiItemArray);
		
	}
	
	if ( !isValidWI(wiItem) )
		return false;

	var returnValue = false;
	saveParametersForItem(wiItem);
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'AddWI',
			wiFieldNames: sc_ParmNames,
			wiFieldValues: sc_ParmValues,
			//wiItem:JSON.stringify(wiItem),
		},
		success: function(data) {
			if ( data != null && data != '' )
			{
				if ( data.status == 'Ok' )
				{
					returnValue = true;
					if ( data.message != '' )
						informDialog("", data.message.replace('\\n','<br>'));
					cartContent = refreshSCPortletContent();
					if ( sc_saveToBrowser && cartContent != null )
						saveShopCartToBrowser(cartContent.itemList);	//save the cart to the Browse storage		
				}
				else    // Show Error message
				{
					returnValue = false;
					if ( data.message != '' )
						errorDialog("Error", data.message.replace('\n','<br>'));
				}
			}
		}
	})
	return returnValue;
	
}

function isValidWI(wiItem)
{
	var valid = true;
	if ( typeof wiItem.amount == 'undefined')
	{
		errorDialog("Error", sc_amountRequiredMsg.replace('\n','<br>'));
		valid = false;
	}
	
	wrkAmount = wiItem.amount.toString().replace(/[^0-9\.-]+/g,"");
	var amount = parseFloat(wrkAmount);
	if (isNaN(amount)  ||  amount == 0)
	{
		errorDialog("Error", sc_invalidAmountMsg.replace('\n','<br>'));
		valid = false;
	}
	else
	{
		wiItem.amount = wrkAmount;
	}
	
	var name1 = ''; 
	var name2 = '';
	
	if ( typeof wiItem.name1 != 'undefined' )
		name1 = wiItem.name1.toString().trim();
	if ( typeof wiItem.name2 != 'undefined' )
		name2 = wiItem.name2.toString().trim();

	if (name1 ==''  &&  name2 == '' )
	{
		errorDialog("Error", sc_wiNameRequiredMsg.replace('\n','<br>'));
		valid = false;
	}
	
	return valid;
}

function saveParametersForItem(item)
{
	sc_ParmNames = new Array();
	sc_ParmValues = new Array();

	$.each(item, function(key, value) {
		sc_ParmNames.push(key);
		sc_ParmValues.push(value)
		});
}



function removeAllCartItems(skipConfirm)
{
	if ( skipConfirm == true  ||  confirm(sc_confirmDeleteMsg) )
	{
		$.ajax({
			url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
			async: false, 			// Need to wait for the result.
			dataType: "json",
			type: "post",
			data: {
				actionType: 'RemoveAll',
			},
			success: function(data) {
				if ( data != null && data != '' )
				{
					if ( data.status == 'Ok' )
					{
						if ( $('div.Portlet>div.ShoppingCart').length > 0 )
							resetSCPortletContent();
						deleteShopCartFromBrowser();	//delete the cart saved in the Browse storage		
					}
					else    // Show Error message
					{
						cartContent = refreshSCPortletContent();
						if ( sc_saveToBrowser && cartContent != null )
							saveShopCartToBrowser(cartContent.itemList);	//save the cart to the Browse storage		
						if ( data.message != '' )
							errorDialog("Error", data.message.replace('\n','<br>'));
					}
				}
			}
		})
		hideShowSCPortlet();
	}
}

//------------------------------------------------------------------------------------------------
//functions related to the View Cart page - ShoppingCart.jsp   
//------------------------------------------------------------------------------------------------

function setSCTotals(totalQuantity, totalAmount)
{
	if (totalQuantity != null ) 
		$('span.scTotalQuantity').html(totalQuantity);
	if (totalAmount != null )
		$('span.scTotalAmount').html(totalAmount); 
}



//basic operations for ShoppingCart.jsp

function deleteItems(objName)
{
	selectedItems = '';
	selected = $("td.Col-DesignationsSelect input:checkbox[name^='SelectDes_']:checked");
	//if ( !objName.startsWith('DeleteDes_')  && selected.length == 0 ) {		//IE does not support startsWith()
	if ( objName.indexOf('DeleteDes_') != 0  && selected.length == 0 ) {
		alert('No items are selected for deletion');
		return;
	}
	//if ( objName.startsWith('DeleteDes_') ) {
	if ( objName.indexOf('DeleteDes_') == 0 ) {		//delete one item
		selectedItems = objName.substr(10);
	}
	else
	{
		selected.each(function(idx) {selectedItems += $(this).attr('name').substr(10) + sc_itemSeparator;});
		selectedItems = selectedItems.substr(0, selectedItems.length - sc_itemSeparator.length);
	}
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'RemoveSelected',
			selectedItems: selectedItems,
		},
		success: function(data) {
			if ( data != null && data != '' )
			{
				var deletedItems = data.deletedItems.split(sc_itemSeparator);
				setSCTotals(data.totalQuantity, data.totalAmount);
				$.each( deletedItems, function( index, itemId ){
					$("tr.Row-" + itemId).remove();
				});
				setDeleteSelectedAvailable();
				//if ( $('div.Portlet>div.ShoppingCart').length > 0 )	//update portlet if any
				cartContent = refreshSCPortletContent();
				if ( sc_saveToBrowser && cartContent != null )
					saveShopCartToBrowser(cartContent.itemList);	//save the cart to the Browse storage		
				if ( data.status == 'Ok' )
				{
					if ( data.totalQuantity ==  '0' ){ 	 //all items removed			
						location.reload(); 				//reload the page to see the empty cart message			
						return;
					}
				}
				else    // Show Error message
				{
					if ( data.message != '' )
						errorDialog("Error", data.message.replace('\n','<br>'));
				}
			}
		}
	})
}


function amountChanged(obj)
{
	//if ( obj.name.startsWith('Amount_') ) {	//DY101010
	if ( obj.name.indexOf('Amount_') == 0 ) {
		itemId = obj.name.substr('Amount_'.length);	//fieldName is 'Amount_999'  where 999 is the id 																			
		$.ajax({
			url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
			async: false, 			// Need to wait for the result.
			dataType: "json",
			type: "post",
			data: {
				actionType: 'ChangeAmount',
				item: itemId,
				amount: obj.value,
			},
			success: function(data) {
				if ( data != null && data != '' )
				{
					setSCTotals(data.totalQuantity, data.totalAmount);
//					if ( $('div.Portlet>div.ShoppingCart').length > 0 )	//update portlet if any
					cartContent = refreshSCPortletContent();
					if ( sc_saveToBrowser && cartContent != null )
						saveShopCartToBrowser(cartContent.itemList);	//save the cart to the Browse storage		
					if ( data.status == 'Ok' )
					{
						changedItem = data.changedItem.split(sc_itemFieldSeparator);
//						$(\".Quantity_\" + itemId).val(changedItem[" + ShoppingCartItem.idxQuantity + "]);
						$("span.Amount_" + itemId).html(changedItem[sc_idxItemToltalAmount]);
					}
					else    // Show Error message
					{
						if ( data.message != '' )
							errorDialog("Error", data.message.replace('\\n','<br>'));
						if ( data.saveItem != 'null' )		//restore original quantity
						{
							saveItem = data.saveItem.split(sc_itemFieldSeparator);
//							$(\".Quantity_\" + itemId).val(saveItem[" + ShoppingCartItem.idxQuantity + "]);
							$("span.Amount_" + itemId).html(saveItem[sc_idxItemToltalAmount]);
						}
						else    					
						{
							location.reload();				//reload the page to see updated cart			
							return;
						}
					}
				}
			}
		})
	}
}

function getItemFromCart(itemId)
{
	var item = "";
	$.ajax({
		url: sc_rootPath + 'servlet/eAndar.ShoppingCart', 
		async: false, 			// Need to wait for the result.
		dataType: "json",
		type: "post",
		data: {
			actionType: 'GetItem',
			itemId: itemId,
		},
		success: function(data) {
			if ( data != null && data != '' )
			{
				if ( data.status == 'Ok' )
					item = data.item;
			}
		}
	})
	return item;
}
//---------------------------------------------------------------------------------------------------
// Dialog
//---------------------------------------------------------------------------------------------------

function errorDialog(title, message, userObject)
{
	//	title = title || "Confirm...";
	showDialog(title, message, userObject, 'ErrorMessage');
}

function informDialog(title, message, userObject)
{
	//	title = title || "Confirm...";
	//	dd = showDialog(title, message, userObject, 'InformMessage');
	//setTimeout(function(){dd.dialog('close')},3000);
	
	pos_X = sc_mouse_X - 50;
	pos_Y = sc_mouse_Y - 50;
	if (pos_X < 0){pos_X = 0;}
	if (pos_Y < 0){pos_Y = 0;}
	showPromptPos(message, '', pos_X, pos_Y);
	window.setTimeout(closePromptPos, 3000);
}

function showDialog(title, message, userObject, messageType)
{
//	title = title || "Confirm...";

	content = 	'<div title="' + title + '"><div class="Header"></div><div class="' + messageType + '">' + message + '</div><div class="Footer"></div>';
	
	var dd = $(content).dialog({
		resizable: false,
	 	modal: true,
	 	autoOpen: true,
	 	buttons: [
	 		{
	 			text: "Ok",
	 			click: function() {
	 				$( this ).dialog( "close" );
	 				if ( typeof userObject != "undefined" && typeof userObject.okAction == "function" )
	 					userObject.okAction();
	 			}
	 		}
	 	],
	 	close: function (event, ui) {
            // Destroy the jQuery UI dialog and remove it from the DOM
            $(this).dialog("destroy").remove();
           }
	 });

	return dd;
	
}

