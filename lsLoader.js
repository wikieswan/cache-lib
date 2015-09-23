(function(window){
	var util,
		VERSION = '0.1.0';
	function Util () {
		
	}
	Util.prototype.ajax = function(url,callback,async) {
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",url,async);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function(){
		    if(xmlhttp.readyState===4 && xmlhttp.status===200){
			    callback && callback(xmlhttp.responseText);
		    }
		}
		if(!async){
			callback && callback(xmlhttp.responseText);
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
	Util.prototype.extend = function() {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};
	util = new Util();


	var lsLoader = {
		load : function (option) {
			var opts = util.extend({}, this.defaults, option),
				_lib,
				_version, 
				_libName = 'lsLoader_'+opts.name,
				_libVersion = 'lsLoader_'+opts.name+'_version';
				
			
			if(opts.name===''||opts.url===''){
				console.error('params error:name and url must be required!');
				return this;
			}
			try{
				_lib = localStorage.getItem(_libName);
				_version = localStorage.getItem(_libVersion);

				if((opts.version!==this.defaults.version&&opts.version!==_version)|| _lib===null){
					//console.log('localStorage does not cache '+opts.name+' lib,so we need to load '+opts.name+' manually!');
					util.ajax(opts.url,function(data){
						console.log(1)
						eval(data);
						console.log(2)
						opts.success();
						console.log(3)
						try{
							localStorage.setItem(_libName,data);
							localStorage.setItem(_libVersion,opts.version);
							console.log(_libVersion,opts.version)
							console.log(localStorage.getItem(_libVersion));
						}
						catch(e){
							console.log(e.message)
						}
					},opts.async);
				}
				else{
					//console.log('localStorage caches '+opts.name+',we use it!');
					eval(_lib);
					opts.success();
				}
			}
			catch(e){ // disabled localstorage 
				console.log('your browser disabled localstorage ',e.message)
				util.jsLoader(opts.url);
				opts.success();
			}
			return this;
		},
		remove : function(name) {
			try{
				localStorage.removeItem('lsLoader_'+name);
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
		version : VERSION ,
		defaults : {
			name : '',
			url : '',
			async: true,
			version : 'not defined',
			success: function () {}
		}
	}
	
	window.$lsLoader = lsLoader;
	
})(this); 