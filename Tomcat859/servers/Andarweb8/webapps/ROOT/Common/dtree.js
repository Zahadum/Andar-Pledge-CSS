// www.destroydrop.com for reference
// Node object
function Node(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
};
// Adds a new node to the node array
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open)
{

	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
};

// Open/close all nodes
dTree.prototype.openAll = function()
{
	this.oAll(true);
};
dTree.prototype.closeAll = function()
{
	this.oAll(false);
};
// Outputs the tree to the page
dTree.prototype.toString = function() {

	var str = '<div class="dtree">\n';
	if (document.getElementById)
        {
		if (this.config.useCookies)
                	this.selectedNode = this.getSelected();
		str += this.addNode(this.root);
	}
        else
        	str += 'Browser not supported (use IE 5+/ Netscape 6).';
	str += '</div>';
	if (!this.selectedFound)
        	this.selectedNode = null;
	this.completed = true;
	return str;
};

// Creates the tree structurE
dTree.prototype.addNode = function(pNode)
{
	var str = '';
	var n=0;
	if (this.config.inOrder)
        	n = pNode._ai;
	for (n; n<this.aNodes.length; n++)
        {

        	if (this.aNodes[n].pid == pNode.id)
                {
                        var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target)
                        	cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies)
                        	cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc)
                        	cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound)
                        {
                                cn._is = true;
				this.selectedNode = n;
				this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls)
                        	break;
		}
	}
	return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId)
{
	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons)
        {
                if (!node.icon)
                	node.icon = ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen)
                	node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._hc)? ((node._io) ? this.icon.folderOpen : this.icon.folder): this.icon.node) + '" width = "18" height = "18" alt="" />';
	}
	if (node.url)
        {
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node')
		       +    ' " href="javascript: ' + this.obj + '.select(' + nodeId + ');" ';
		if (node.title)
                	str += ' title="' + node.title + '"';
		if (node.target)
                	str += ' target="' + node.target + '"';
		if (this.config.useStatusText)
                	str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';

		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc )
        str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';

        str += node.name;

	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc))
        str += '</a>';

	str += '</div>';
	if (node._hc)
        {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId)
{
	var str = '';
		for (var n=0; n<this.aIndent.length; n++)
                	str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" width = "18" height = "18" alt="" />';

		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
                if ( this.root.id == node.pid )
                {
                        if (node._hc)
                        {
	                 	 str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
        	                 str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
                	         str += '" width = "18" height = "18" alt="" /></a>';
                        }

                }
                else
                {

    			if (node._hc)
                    	{
    				str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
	    			if (!this.config.useLines)
        	                    	str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
    				else
                        	    	 str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
	    			str += '"  width = "18" height = "18" alt="" /></a>';
    			}
                	else
                    		str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" width = "18" height = "18" alt="" />';
                }
	return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function(node)
{
	var lastId;
	for (var n=0; n<this.aNodes.length; n++)
        {
		if (this.aNodes[n].pid == node.id)
                	node._hc = true;
		if (this.aNodes[n].pid == node.pid)
                	lastId = this.aNodes[n].id;
	}
	if (lastId==node.id)
        	node._ls = true;
};

// Returns the selected node
dTree.prototype.getSelected = function()
{
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
};

// Highlights the selected node
dTree.prototype.s = function(id)
{
	if (!this.config.useSelection)
        	return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks)
        	return;
	if (this.selectedNode != id)
        {
		if (this.selectedNode || this.selectedNode==0)
                {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			eOld.className = "node";
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies)
                	this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
dTree.prototype.o = function(id)
{
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel)
        	this.closeLevel(cn);
	if (this.config.useCookies)
        	this.updateCookie();
};

// Open or close all nodes
dTree.prototype.oAll = function(status)
{
	for (var n=0; n<this.aNodes.length; n++)
        {
		if (this.aNodes[n]._hc )
                {
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies)
        	this.updateCookie();
};

// Opens the tree to a specific node
dTree.prototype.openTo = function(nId, bSelect, bFirst)
{
	if (!bFirst)
        {
		for (var n=0; n<this.aNodes.length; n++)
                {
			if (this.aNodes[n].id == nId)
                        {
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	if (!cn._p)
        	return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc)
	        this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect)
        {
	        this.s(cn._ai);
	        this.select(cn._ai);
        }
	else if (bSelect)
        	 this._sn=cn._ai;
	if (nId != 0)
		this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node)
{
	for (var n=0; n<this.aNodes.length; n++)
        {
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc)
                {
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node)
{
	for (var n=0; n<this.aNodes.length; n++)
        {
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc)
                {
			if (this.aNodes[n]._io)
                        	this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}
// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom)
{
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons)
        {
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.icon.folderOpen : this.icon.folder;
	}
        if (id == 0)  //is root
        {
        	eJoin.src = (status)?this.icon.nlMinus:this.icon.nlPlus;
        }

        else
        {

		eJoin.src = (this.config.useLines)?
		((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
		((status)?this.icon.nlMinus:this.icon.nlPlus);
       }
	eDiv.style.display = (status) ? 'block': 'none';
};
// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function()
{
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure)
{
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName)
{
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1)
        {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1)
                	cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else
                	cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function()
{
	var str = '';
	for (var n=0; n<this.aNodes.length; n++)
        {
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id)
                {
			if (str)
                        	str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id)
{
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
        	if (aOpen[n] == id)
	                return true;
	return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push)
{
	Array.prototype.push = function array_push()
        {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};
if (!Array.prototype.pop)
{
	Array.prototype.pop = function array_pop()
        {
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};
dTree.prototype.select = function(id) {

	var cn = this.aNodes[id];

	w	= document.getElementById('waccount');
   if ( w != null )
		w.value = cn.id+','+cn.url+','+cn.pid+','+!cn._hc;

	w	= document.getElementById('wname');
   if ( w != null )
		w.value = cn.name;

   // this is to set account for navigation
	w	= document.getElementById('navCompany');
   if ( w != null )
		w.value = cn.id;

   //SB15118 this is to set node number for navigation. If account number not unique can be used to find correct entry in the Tree Vector.
	w	= document.getElementById('treeNodeID');
   if ( w != null )
		w.value = id;

   // this is to set account for cb
	w	= document.getElementById('company');
   if ( w != null )
		w.value = cn.id;


	w	= document.getElementById('NameLabel');
   if ( w != null)
	   w.innerHTML = cn.name;


	//this are to set name/address for a company
   // avoid to do this in EmployeesList page
   // where name of the tree is dc
	w	= document.getElementById('NameLabelCompany');
   if ( w != null && this.obj != 'dc')
	   w.innerHTML = cn.name;

	w	= document.getElementById('AddressLabelCompany');
   if ( w != null && this.obj != 'dc')
	   w.innerHTML = cn.url;


  	w	= document.getElementById('Assign');
   if (w != null)
		w.disabled = false;


// Very important bit here.
   //this submits form if the id is navigateTree
	w	= document.getElementById('submitForm');
   if ( w != null )
   {
		w.submit();
      return;
   }

   //this submits form if the id is navigateTree
   // and is not the second tree for coordinator
   // this happens in the EmployeesList page
   w	= document.getElementById('navigateTree');
	if ( w != null && this.obj != 'dc' )
		w.submit();

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
         errors += "Invalid phone format: Not enough numbers\n"
      }
      // CHECK IF INPUT IS A NUMBER
      if (isNaN(phone))
      {
         errors += "Invalid phone format: Invalid characters\n"
      }
      // SHOW ERRORS
      if (errors.length > 0)
      {
         errors += "\nMust use following format: ###-###-####";
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
      errors += "Invalid phone format: Not enough numbers\n"
   }
   // CHECK IF INPUT IS A NUMBER
   if (isNaN(phone))
   {
      errors += "Invalid phone format: Invalid characters\n"
   }
   // SHOW ERRORS
   if (errors.length > 0)
   {
	   if ( phone == "0" )
		   return true;

      errors += "\nMust use following format: ###-####";
		alert (errors);
		phoneField.focus();
		phoneField.select();
		return false;
   }
   return true;
}

function checkSSNField(obj)
{

   errors = "";
   // CLEAR ALL NON NUMBER CHARACTERS
   ssn = obj.value.replace(/[\(\)\- ,\.]/g,"");
   // CHECK LENGTH OF PHONE NUMBER
   if (ssn.length < 9 && ssn.length > 0)
   {
      errors += "Invalid SSN format: Not enough numbers\n"
   }
   else
   {
     obj.value =ssn.substring(0, 3) + '-' +
		ssn.substring(3, 5) + '-' +
		ssn.substring(5, 9);
   }
   // CHECK IF INPUT IS A NUMBER
   if (isNaN(ssn))
   {
      errors += "Invalid SSN format: Invalid characters\n"
   }
   // SHOW ERRORS
   if (errors.length > 0)
   {
      errors += "\n SSN Must use following format: ###-##-####";
		alert (errors);
      obj.focus();
	   obj.select();
		return false;
   }
   return true;

}


function changeSSN(obj)
{
	// this only gets executed for NS4
	var bName = navigator.appName;
   var bVer = parseInt(navigator.appVersion);
   var NS4 = (bName == "Netscape" && bVer >= 4 );
   if (document.getElementById)
   	NS4 = false;

   if (NS4)
   {
		var SSN = obj;
		var nums = SSN.value.replace(/[^0-9]/ig, '');
    	if (!nums)
      {
    		return;
    	}
    	if (nums.length >= 9)
      {
    		SSN.value = nums.substring(0, 3) + '-' +
    		nums.substring(3, 5) + '-' +
    		nums.substring(5, 9);
    	}
      else
         SSN.value = "";
   }
}

function formatSSN(obj)
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
   if ( executeScript)
	{
		var SSN = obj;
		var nums = SSN.value.replace(/[^0-9]/ig, '');
		first3 = ""
		s2 = ""
		last4 = "";

		if (nums.length >3)
		{
			if ( nums.length < 6 )
			{
			   first3 = nums.substring(0,3) + '-';
	  			s2 = nums.substring(3,5);
			}
			else
			{
            first3 = nums.substring(0,3) + '-';
			   s2 = nums.substring(3,5) + '-';
			   last4 = nums.substring(5, nums.length);
			}
		}
		else
		{
		  first3 = nums.substring(0,3);
		}
		SSN.value = first3 + s2 + last4;
	}
}







