function getRandom(l,u){
  return Math.floor((Math.random() * (u-l)) + l);
}

function invalidCh(ch){
  if ((ch>90 && ch<97) //between Z and a
    || (ch>57 && ch<65) //between 9 and A
    || (ch==108) //lowercase L
    || (ch==79)  //uppercase o
    || (ch==73) //uppercase i
     )
    return true;
  return false;
}
function getPassChar(){
  var ch;
  do {  ch = getRandom(50,122); } while (invalidCh(ch));
  return String.fromCharCode(ch);
}
function makePass(l){
  l=(l==null)?8:l;
  var str='';
  for (var i=1; i<=l; i++)
    str+=getPassChar();
  return str;
}
function getPassChars(){
  str = "";
  for (var i=50; i<=122; i++)
    if (!invalidCh(i))
      str += i + String.fromCharCode(i) + ',';
  return str;
}
/*
     FILE ARCHIVED ON 16:00:00 Aug 20, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:33:30 Dec 06, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
