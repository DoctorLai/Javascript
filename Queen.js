/*
  Solving n-Queens Bit Logics
  http://www.zhihua-lai.com/acm/n-queen-problem-in-back-tracing-bit-logics/
*/

var Queen = function(n){
  var ans = 0;
  var LIM = (1 << n) - 1;
  
  function solve(row, ld, rd){
    if (row == LIM)
    {
      ans ++;
      return;
    }  
    var pos = LIM & (~(row | ld | rd));
    while (pos) {
      var p = pos & (-pos);
      pos -= p;
      solve(row + p, (ld + p) << 1, (rd + p) >> 1);
    }
  }  
  
  solve(0, 0, 0);
  return ans;
};
