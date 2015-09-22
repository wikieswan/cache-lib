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