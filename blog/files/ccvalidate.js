//Implementation (c) 2006 Robert Carpenter http://www.robertcarpenter.net
//Comes with no warranty


var creditCards = Array(); 
var creditCardLengths = '';
function fillCards(){
  //name, prefix, length 
  creditCards[creditCards.length] = Array('Amex',34,15);
  creditCards[creditCards.length] = Array('Amex',37,15);
  creditCards[creditCards.length] = Array('Visa',4,13);
  creditCards[creditCards.length] = Array('Visa',4,16);
  creditCards[creditCards.length] = Array('Mastercard',51,16);
  creditCards[creditCards.length] = Array('Mastercard',52,16);
  creditCards[creditCards.length] = Array('Mastercard',53,16);
  creditCards[creditCards.length] = Array('Mastercard',54,16);
  creditCards[creditCards.length] = Array('Mastercard',55,16);
  creditCards[creditCards.length] = Array('Diners',300,14);
  creditCards[creditCards.length] = Array('Diners',301,14);
  creditCards[creditCards.length] = Array('Diners',302,14);
  creditCards[creditCards.length] = Array('Diners',303,14);
  creditCards[creditCards.length] = Array('Diners',304,14);
  creditCards[creditCards.length] = Array('Diners',305,14);
  creditCards[creditCards.length] = Array('Diners',36,14);
  creditCards[creditCards.length] = Array('Diners',38,14);
  creditCards[creditCards.length] = Array('Discover',6011,16);
  for(i in creditCards) {
    if (creditCardLengths.indexOf(creditCards[i][2])<0) {
      creditCardLengths+=' '+creditCards[i][2]+' ';
    }
  }
} fillCards();

function isNumeric(ch){
  var code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57)
}

function ccValidate(ccnumIn){
  //strip out all non numeric characters
  //we must do this before checking the length
  var ccnum = stripNonNumeric(ccnumIn);
  
  //if the length of the card is not acceptable, then jump out now
  if (creditCardLengths.indexOf(' '+ccnum.length+' ')<0) return false;
  
  //look for valid prefix corresponding card length
  var i=-1;
  var cardMapFound = false;
  while (!cardMapFound && i<creditCards.length-1) {
    ++i;
    cardMapFound = ccnum.indexOf(creditCards[i][1])==0 && creditCards[i][2]==ccnum.length;
  }
  
  //if a card map was found and perform validation
  return cardMapFound && luhnValidate(ccnum);
}

function ccBankId(ccnumIn){
  var i=0;
  var ccArr = null;
  ccnumIn = stripNonNumeric(ccnumIn);
  if (creditCardLengths.indexOf(ccnumIn.length)<0) return '';
  for (i=0; i<creditCards.length; i++){
     ccArr = creditCards[i];
     if (ccnumIn.indexOf(ccArr[1])==0 && ccnumIn.length==ccArr[2])
      return ccArr[0];
  }
  return '';
}

function luhnValidate(luhnIn){
  var luhn = '';
  var anum = 0;
  var sum = 0;
  var digits = '';
  var j = 0;
  var k = 0;
  
  //reverse string and strip out all non numeric characters
  for (j=luhnIn.length; j>=0; j--)
    if (isNumeric(luhnIn.charAt(j)))
      luhn += luhnIn.charAt(j);

  for (j=0; j<luhn.length; j++){
    anum = luhn.charCodeAt(j) - 48;
    if (j%2!=0)
      anum*=2;
    digits = ''+anum;
    for(k=0; k<digits.length; k++)
      sum+=digits.charCodeAt(k) - 48;
  }
  return (sum%10==0);
}

function stripNonNumeric(str){
  var j;
  var numerics = '';
  for (j=0; j<str.length; j++)
  if (isNumeric(str.charAt(j)))
    numerics += str.charAt(j);
  return numerics;
}
/*
     FILE ARCHIVED ON 12:33:04 Aug 20, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:29:27 Dec 06, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
