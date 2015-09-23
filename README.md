# cache-lib
cache libs like jQuery etc, with localStorage manually 

## what is it?

It helps browser to reduce load resources times from web server side.

## why we need it?

AKA , browser has some cache strategies,like 304 http status code . Even thought,browser needs seed a http request to server in order to make sure the http head ```If-Modified-Since``` is validate. And browser cache is not reliable.

So , I use localStorage to store the lib, and next time , I can make sure to use the cached lib,if it exits in the localStorage .

## advantage

In mobile browser or hybird frontend developing ,  data flow is expensive . we should as more reduce loading resources from serve side as possible.

## disadvantage

Safety!!
if some one change the localStorage's content with some dangerous codes, that will has a big safety problem.(because i use eval method to execute the stored codes).Mybe it has some other methods to avoid this risk.

## API

### $lsLoader
when using the lsLoader.js,we get a global variable ---- $lsLoader.

### load
```javascript
load({
		name : 'jquery', 
		url : 'http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.js', 
		async: true, 
		version : '2.1.1', 
		success: function () {} 
	})
```
load() function is used to load lib url from web server or localStorage! If browser disables localStorage , $lsLoader just loads url from web server.
Otherwise,if the lib exists in localStorage,$lsLoader loads it from localStorage,without http request!if the lib does not exist in localStorage,$lsLoader loads it from web server.

#### parma

##### name
*required 
name of lib 

##### url
*required
url of lib

##### async
default true
if load lib from server asynchronously

##### version
default 'not dedined'
version  of lib

##### success
defaul function(){}
callback after lib loaded

#### method

```javascript
$lsLoader
	.load({
		name : 'jquery', 
		url : 'http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.js', 
		async: false, 
		version : '2.1.1', 
		success: function () {} 
	})
	.load({
		name : 'underscore',
		url : 'http://cdn.staticfile.org/underscore.js/1.7.0/underscore-min.js',
		async: true,
		version : '1.7.0',
		success: function () {}
	});
```

### remove
remove some given lib name

#### parma

##### name
the name of lib which needs to be removed

#### method

```javascript
$lsLoader.remove('some_lib_name');
```


### clear
clear the loaclStorage that $lsLoader store libs

#### parma
none

#### method

```javascript
$lsLoader.clear();
```












