(function(window){
	var util;
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


	function LsLoader () {

	}
	LsLoader.prototype.load = function  (libName,libUrl) {
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
			/**
			Firefox： 地址栏输入 about:config, 将 dom.storage.enabled 的值设置为 false；
			Chrome: 设置 → 隐私设置 → 内容设置 → 阻止网站设置任何数据
			**/
			console.log('your browser disabled localstorage ',e.message)
			util.jsLoader(libUrl);
		}
	} 
	LsLoader.prototype.remove = function  (libName) {
		try{
			localStorage.removeItem('lsLoader_'+libName);
		}
		catch(e){ // disabled localstorage 
			console.log('your browser disabled localstorage ',e.message)
		}
		
	}
	LsLoader.prototype.clear = function  () {
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
		
	}
	window.lsLoader = new LsLoader();
	
})(this); 