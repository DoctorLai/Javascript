// http://www.zhihua-lai.com/acm
// http://rot47.net
// base62.js
// provides conversion between base10 and base62

var Base62 = (function(){                
  var table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  function _to10(num)
  {
    var limit = num.length;
    if (!limit)
    {
      return 0;
    }
    var res = table.indexOf(num.charAt(0));
    for (var i = 1; i < limit; i ++)
    {
      res = 62 * res + table.indexOf(num.charAt(i));
    }
    return res;  
  }
  
  function _toBase(num)
  {
    var r = num % 62;
    var res = table.charAt(r);
    var q = Math.floor(num / 62);
    while (q)
    {
      r = q % 62;
      q = Math.floor(q / 62);
      res = table.charAt(r) + res;
    }
    return res;
  }
  
  return {
    FromBase10: function()
    {
      var r = [];
      for (var i = 0; i < arguments.length; i ++)
      {
        var num = parseInt(arguments[i]);
        r.push(_toBase(num));
      }
      return r;
    },
    
    FromBase62: function()
    {
      var r = [];
      for (var i = 0; i < arguments.length; i ++)
      {
        var num = arguments[i].toString();
        if (num.length)
        {
          r.push(_to10(num));
        }
      }
      return r;    
    }
  } 
})();
