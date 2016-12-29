function ajax() {
	
	var xmlHttp = new XMLHttpRequest();
	
	this.cancel = function() {
		xmlHttp.abort();
		xmlHttp.onreadyStateChange = function() {}		
	}
		
	this.parseJSON = function(text) {
		try {
			var t = text.replace(/^\?\(/, '');
			t = t.replace(/\)$/,'');
			//alert(t);	
		}catch(e) {
			alert(e.message);
		}
		
		var jsonObj = {};
		try {
			jsonObj = JSON.parse(t);
			return jsonObj;
		}catch(e) {
			try {
				jsonObj = eval(jsonObj);
				return jsonObj;
			}catch(e) {
				jsonObj = {'error' : 'error parsing data'};
				return jsonObj;
			}
		}		
	}
	
	this.parseResponse = function(reply, responseType) {
		if(responseType == 'text') {
			return reply.responseText;
		}else if(responseType == 'xml') {
			return reply.responseXML;
		}else {
			return this.parseJSON(reply.responseText);
		}		
	}	
	this.get = function(rURL, callback) {
//		alert(rURL);
		var ajax = this;
//		alert( xmlHttp );
		xmlHttp.onreadystatechange = function() {
			//alert( xmlHttp.readyState );
			if(xmlHttp.readyState == 4) {
				response = ajax.parseJSON(xmlHttp.responseText);
				//alert(response);
				callback(response);			
			}		
		};		
		xmlHttp.open('GET', rURL, true);
		xmlHttp.send(null);		
	}	
}
