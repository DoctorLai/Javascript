/**
 * @author Dr Zhihua Lai
 * http://www.zhihua-lai.com/acm 
 */
 
 var Console = (function () 
 {
     var DOM = null;

     function _initDOM(_DOM) 
     {
         DOM = document.getElementById(_DOM);
     }
     
     function _init() 
     {
         _initDOM('console');
     }    

     function _clear() 
     {
         DOM.innerHTML = '';
     }

     function _print(output) 
     {
         DOM.innerHTML += output;
     }
     
     function _println(output)
     {
         DOM.innerHTML += output + '<BR />';
     }

     return { // { must be on this line  
         Initialize: function() 
         { 
             if (arguments.length > 0)
             {
                 _initDOM(arguments[0].toString());
             } 
             else
             {
                 _init();
             }             
         },

         Clear: function()
         {
             _clear();            
         },

         Print: function() 
         {
             for (var i = 0; i < arguments.length; i++) 
             {
                 _print(arguments[i].toString() + ' ');
             }
         },
         
         PrintLn: function() 
         {
             for (var i = 0; i < arguments.length; i++) 
             {
                 _println(arguments[i].toString() + ' ');
             }
         }
     }
 })();
