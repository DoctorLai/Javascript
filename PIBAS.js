// PIBAS Interpreter
// http://acm.timus.ru/problem.aspx?space=1&num=1230
// http://www.zhihua-lai.com/acm

if (!String.prototype.chatAt) {
	String.prototype.chatAt = function(idx) {
		return this.substr(idx, 1);
	}
}

var PIBAS = function(src) {
	var __vars__ = new Array(26);
	
	function __err__(src, msg, pos) {		
		throw src + ":" + pos + ":" + msg;
	}
  
	function __gets__(src) {
		var tmp = '';
		var k = src.length;
		var i = 0;
		var s = 0;
		var d = 0;
		var last = 0;
		var sgn = 1;
		while (i < k) {
			var c = src.charAt(i);
			if ((c == '"') && (s == 0)) {
				if (d == 0) {
					d = 1;
					last = i + 1;
				}
				else if (sgn == 1) {
					tmp += src.substring(last, i);
					sgn = 0;
					d = 0;
				}
				else if (sgn == 0) {
					__err__(src, "Missing + ", i);
				}
				else {
					__err__(src, "Extra + ", i);
				}
			}
			else if ((c == "'") && (d == 0)) {
				if (s == 0) {
					s = 1;
					last = i + 1;
				}
				else if (sgn == 1) {
					tmp += src.substring(last, i);
					sgn = 0;
					s = 0;
				 }
				else if (sgn == 0) {
					__err__(src, "Missing +", i);
				}
				else {
					__err__(src, "Extra +", i);
				}
			}
			else if ((c == '$') && (s == 0) && (d == 0)) {
				if (sgn == 1) {
					if (i + 7 >= k) {
						__err__(src, "Invalid $ pattern", i);
					}
					else if (src.chatAt(i + 1) != '(') {
						__err__(src, "Missing (", i);
					}
					else {
						i += 2;
						var j = i;
						var tt = -1;
						while (j < k) {
							if (src.chatAt(j) == ')') {
								tt = j;
								break;
							}
							j ++;
						} 
						if (tt == -1) {
							__err__(src, "Missing )", i);
						}
						else {
							var xx = src.substring(i, tt);
							var yy = xx.split(",");
							if (yy.length == 3) {
								var zz = yy[0].charAt(0);
								if ((yy[0].length == 1) && (zz >= 'A') && (zz <= 'Z')) {
									sgn = 0;
									var idx = parseInt(yy[1]) - 1;
									var lll = parseInt(yy[2]);
									tmp += __vars__[yy[0].charCodeAt(0) - 65].substring(idx, idx + lll);
									i = tt;
								}
								else {
									__err__(src, "Invalid string var " + yy[0], i);
								}
							}
							else {
								__err__(src, "Invalid $, require 3 parts: ", i);
							}
						}
					}
				}
				else if (sgn == 0) {
					__err__(src, "Missing +", i);
				}
				else {
					__err__(src, "Extra +", i);
				}
			}
			else if ((c == '+') && (s == 0) && (d == 0)) {
				if (sgn > 0) {
					__err__(src, "Too many string +", i);
				}
				else {
					sgn = 1;
				}
			}
			else if ((c >= 'A') && (c <= 'Z') && (s == 0) && (d == 0)) {
				if (sgn == 1) {
					tmp += __vars__[c.charCodeAt(0) - 65];
					sgn = 0;
				}
				else if (sgn == 0) {
					__err__(src, "Missing +", i);
				}
				else {
					__err__(src, "Extra +", i);
				}
			}
			else if ((s == 0) && (d == 0)) {
				__err__(src, "Invalid Char: " + c, i);
			} 
			i ++;
		}  
		return tmp;  
	}
  
	function __parse__(src) {
		var k = src.length;
		var i = 0;
		var s = "";
		while (i < k) {
			var c = src.chatAt(i);
			if ((c >= 'A') && (c <= 'Z')) {
				if ((i + 1 < k) && (src.charAt(i + 1) == '=')) {
					 __vars__[c.charCodeAt(0) - 65] = __gets__(src.substr(i + 2));
					break;
				}
				else {
					__err__(src, "Missing assignment", i);
				}
			}
			else if (c == '?') {
				s += __gets__(src.substr(i + 1));
				break;
			}
			else {
				__err__(src, "Invalid Char " + c, i);
			}
			i ++;
		}
		return s;
	}

	function parse(src) {
		var k = src.length;
		var i = 0;
		var s = 0;
		var d = 0;
		var last = 0;
		var out = "";
		while (i < k) {
			var c = src.chatAt(i);
			if (c == ';') {
				if ((s == 0) && (d == 0)) {
					out += __parse__(src.substring(last, i));
					last = i + 1;
				}
			}
			else if ((c == '"') && (s == 0)) {
				if (d == 1) {
					d = 0;
				}
				else {
					d = 1;
				}
			}
			else if ((c == "'") && (d == 0)) {
				if (s == 1) {
					s = 0;
				}
				else {
					s = 1;
				}
			}
			i ++;
		}
		if (last != k) {
			if ((s == 0) && (d == 0)) {
				out += __parse__(src.substr(last));
			}
			else {
				__err__(src, "Unclosed string constant", k - 1);
			}
		}
		return out;
	}
	return parse(src);
};

var obj = new ActiveXObject("WScript.Shell");

try {
	src = "A=\'World, Hello!';?$(A,8,5);?\", \";B=$(A,1,5)+'!';?B";
	obj.popup(PIBAS(src));
}
catch (err) {
	obj.popup(err);
}
