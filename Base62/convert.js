/*
	convert.js
	http://rot47.net
	Dr Zhihua Lai
*/

var BASE2  = "01";
var BASE8  = "01234567";
var BASE10 = "0123456789";
var BASE16 = "0123456789abcdef";
var BASE32 = "0123456789abcdefghijklmnopqrstuvwxyz";
var BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function convert(src, srctable, desttable)
{
	var srclen = srctable.length;
	var destlen = desttable.length;

	// first convert to base 10
	var val = 0;
	var numlen = src.length;
	for (var i = 0; i < numlen; i ++)
	{
		val = val * srclen + srctable.indexOf(src.charAt(i));
	}

	// then covert to any base
	var r = val % destlen;
	var res = desttable.charAt(r);
	var q = Math.floor(val / destlen);
	while (q)
	{
		r = q % destlen;
		q = Math.floor(q / destlen);
		res = desttable.charAt(r) + res;
	}
	return res;
}
