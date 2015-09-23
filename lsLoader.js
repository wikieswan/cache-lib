(function(window){
	var util,
		VERSION = '0.1.0';
	function Util () {
		
	}
	Util.prototype.ajax = function(url,callback) {
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function(){
		    if(xmlhttp.readyState===4 && xmlhttp.status===200){
			    callback && callback(xmlhttp.responseText);
		    }
		}
	}
	Util.prototype.jsLoader = function(src, callback) {
	    var script = document.createElement('script'),
	        loaded;
	    script.setAttribute('src', src);
	    if (callback) {
	      script.onreadystatechange = script.onload = function() {
	        if (!loaded) {
	          callback();
	        }
	        loaded = true;
	      };
	    }
	    var head = document.getElementsByTagName("head")[0];
	    (head || document.body).appendChild(script);
	}
	util = new Util();


	var lsLoader = {
		load : function (libName,libUrl) {
			var _lib = null;
			try{
				_lib = localStorage.getItem('lsLoader_'+libName);
				if(_lib===null){
					console.log('localStorage does not cache '+libName+' lib,so we need to load '+libName+' manually!');
					util.ajax(libUrl,function(data){
						eval(data);
						localStorage.setItem('lsLoader_'+libName,data);
					});
				}
				else{
					console.log('localStorage caches '+libName+',we use it!');
					eval(_lib);
				}
			}
			catch(e){ // disabled localstorage 
				console.log('your browser disabled localstorage ',e.message)
				util.jsLoader(libUrl);
			}
			return this;
		},
		remove : function  (libName) {
			try{
				localStorage.removeItem('lsLoader_'+libName);
			}
			catch(e){ // disabled localstorage 
				console.log('your browser disabled localstorage ',e.message)
			}
			return this;
		},
		clear : function  () {
			try{
				for(var i in localStorage){
					if(i.indexOf('lsLoader_')>-1){
						localStorage.removeItem(i);
					}
				}
			}
			catch(e){ // disabled localstorage 
				console.log('your browser disabled localstorage ',e.message)
			}
			return this;
		},
		version : VERSION

	}
	
	window.lsLoader = lsLoader;
	
})(this); 