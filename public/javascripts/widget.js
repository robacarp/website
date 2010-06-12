/**
 * Twitter - http://www.twitter.com
 * Copyright (C) 2010 Twitter
 * Author: Dustin Diaz (dustin@twitter.com)
 *
 * V 2.2.1 Twitter search/profile/faves/list widget
 * http://twitter.com/widgets
 */
if(!"console" in window){
  window.console={
    log:function(){ }
  }
}

TWTR=window.TWTR||{};

if(!Array.forEach){
  Array.prototype.forEach=function(D,E){
    var C=E||window;
    for(var B=0,A=this.length; B<A; ++B){
      D.call(C,this[B],B,this)
    }
  };

  Array.prototype.filter=function(E,F){
    var D=F||window;
    var A=[];
    for(var C=0,B=this.length; C<B; ++C){
      if(!E.call(D,this[C],C,this)){
        continue
      }
      A.push(this[C])
    }
    return A
  };
  Array.prototype.indexOf=function(B,C){
    var C=C||0;
    for(var A=0; A<this.length; ++A){
      if(this[A]===B){
        return A
      }
    }
    return -1
  }
}/*if !array.forEach */

(function(){
 if(TWTR&&TWTR.Widget){
   return 
 }

 function A(B,D,C){
   this.el=B;
   this.prop=D;
   this.from=C.from;
   this.to=C.to;
   this.time=C.time;
   this.callback=C.callback;
   this.animDiff=this.to-this.from
 }

 A.canTransition=function(){
   var B=document.createElement("twitter");
   B.style.cssText="-webkit-transition: all .5s linear;";
   return !!B.style.webkitTransitionProperty
 } ();

 A.prototype._setStyle=function(B){
   switch(this.prop){
     case"opacity":this.el.style[this.prop]=B;
       this.el.style.filter="alpha(opacity="+B*100+")";
     break;
     default:
       this.el.style[this.prop]=B+"px";
     break
   }
 };

 A.prototype._animate=function(){
   var B=this;
   this.now=new Date();
   this.diff=this.now-this.startTime;
   if(this.diff>this.time){
     this._setStyle(this.to);
     if(this.callback){
       this.callback.call(this)
     }
     clearInterval(this.timer);
     return 
   }
   this.percentage=(Math.floor((this.diff/this.time)*100)/100);
   this.val=(this.animDiff*this.percentage)+this.from;
   this._setStyle(this.val)
 };

 A.prototype.start=function(){
   var B=this;
   this.startTime=new Date();
   this.timer=setInterval(function(){
     B._animate.call(B)
   }
 ,15)};

 TWTR.Widget=function(B){
   this.init(B)
 };

 (
  function(){
    var O={};
    var b={};
    var Z=function(e){
      var d=b[e];
      if(!d){
        d=new RegExp("(?:^|\\s+)"+e+"(?:\\s+|$)");
        b[e]=d
      }
      return d
   };

  var C=function(h,m,j,k){
    var m=m||"*";
    var j=j||document;
    var e=[],d=j.getElementsByTagName(m),l=Z(h);
    for(var f=0,g=d.length; f<g; ++f){
      if(l.test(d[f].className)){
        e[e.length]=d[f];
        if(k){
          k.call(d[f],d[f])
        }
      }
    }
    return e
 };

  var a=function(){
    var c=navigator.userAgent;
    return{ ie:c.match(/MSIE\s([^;]*)/) }
  } ();

        var G=function(c){
          if(typeof c=="string"){
            return document.getElementById(c)}
          return c}
          ;
          var T=function(c){
            return c.replace(/^\s+|\s+$/g,"")}
          ;
          var S=function(){
            var c=self.innerHeight;
            var d=document.compatMode;
            if((d||a.ie)){
              c=(d=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight}
            return c}
            ;
            var Y=function(f,c){
              var d=f.target||f.srcElement;
              return c(d)}
              ;
              var Q=function(d){
                try{
                  if(d&&3==d.nodeType){
                    return d.parentNode}
                  else{
                    return d}
                }
                catch(c){
                }
              }
              ;
              var R=function(d){
                var c=d.relatedTarget;
                if(!c){
                  if(d.type=="mouseout"){
                    c=d.toElement}
                  else{
                    if(d.type=="mouseover"){
                      c=d.fromElement}
                  }
                }
                return Q(c)}
                ;
                var V=function(d,c){
                  c.parentNode.insertBefore(d,c.nextSibling)}
                ;
                var W=function(d){
                  try{
                    d.parentNode.removeChild(d)}
                  catch(c){
                  }
                }
                ;
                var U=function(c){
                  return c.firstChild}
                ;
                var B=function(f){
                  var d=R(f);
                  while(d&&d!=this){
                    try{
                      d=d.parentNode}
                    catch(c){
                      d=this}
                  }
                  if(d!=this){
                    return true}
                  return false}
                  ;
                  var F=function(){
                    if(document.defaultView&&document.defaultView.getComputedStyle){
                      return function(d,g){
                        var f=null;
                        var e=document.defaultView.getComputedStyle(d,"");
                        if(e){
                          f=e[g]}
                        var c=d.style[g]||f;
                        return c}
                    }
                    else{
                      if(document.documentElement.currentStyle&&a.ie){
                        return function(c,e){
                          var d=c.currentStyle?c.currentStyle[e]:null;
                          return(c.style[e]||d)}
                      }
                    }
                  }
                  ();
                  var X={
has:function(d,e){
      return new RegExp("(^|\\s)"+e+"(\\s|$)").test(G(d).className)}
    ,add:function(d,e){
      if(!this.has(d,e)){
        G(d).className=T(G(d).className)+" "+e}
    }
    ,remove:function(d,e){
      if(this.has(d,e)){
        G(d).className=G(d).className.replace(new RegExp("(^|\\s)"+e+"(\\s|$)","g"),"")}
    }
                  }
                  ;
                  var D={
add:function(e,d,c){
      if(e.addEventListener){
        e.addEventListener(d,c,false)}
      else{
        e.attachEvent("on"+d,function(){
            c.call(e,window.event)}
            )}
    }
    ,remove:function(e,d,c){
      if(e.removeEventListener){
        e.removeEventListener(d,c,false)}
      else{
        e.detachEvent("on"+d,c)}
    }
                  }
                  ;
                  var M=function(){
                    function d(f){
                      return parseInt((f).substring(0,2),16)}
                    function c(f){
                      return parseInt((f).substring(2,4),16)}
                    function e(f){
                      return parseInt((f).substring(4,6),16)}
                    return function(f){
                      return[d(f),c(f),e(f)]}
                  }
                  ();
                  var H={
bool:function(c){
       return typeof c==="boolean"}
     ,def:function(c){
       return !(typeof c==="undefined")}
     ,number:function(c){
       return typeof c==="number"&&isFinite(c)}
     ,string:function(c){
       return typeof c==="string"}
     ,fn:function(c){
       return typeof c==="function"}
     ,array:function(c){
       if(c){
         return H.number(c.length)&&H.fn(c.splice)}
       return false}
                  }
                  ;
                  var L=["January","February","March","April","May","June","July","August","September","October","November","December"];
                  var P=function(g){
                    var j=new Date(g);
                    if(a.ie){
                      j=Date.parse(g.replace(/( \+)/," UTC$1"))}
                    var e="";
                    var c=function(){
                      var d=j.getHours();
                      if(d>0&&d<13){
                        e="am";
                        return d}
                      else{
                        if(d<1){
                          e="am";
                          return 12}
                        else{
                          e="pm";
                          return d-12}
                      }
                    }
                    ();
                    var f=j.getMinutes();
                    var i=j.getSeconds();
                    function h(){
                      var d=new Date();
                      if(d.getDate()!=j.getDate()||d.getYear()!=j.getYear()||d.getMonth()!=j.getMonth()){
                        return" - "+L[j.getMonth()]+" "+j.getDate()+", "+j.getFullYear()}
                      else{
                        return""}
                    }
                    return c+":"+f+e+h()}
                    ;
                    var J=function(i){
                      var k=new Date();
                      var g=new Date(i);
                      if(a.ie){
                        g=Date.parse(i.replace(/( \+)/," UTC$1"))}
                      var j=k-g;
                      var d=1000,e=d*60,f=e*60,h=f*24,c=h*7;
                      if(isNaN(j)||j<0){
                        return""}
                      if(j<d*7){
                        return"right now"}
                      if(j<e){
                        return Math.floor(j/d)+" seconds ago"}
                      if(j<e*2){
                        return"about 1 minute ago"}
                      if(j<f){
                        return Math.floor(j/e)+" minutes ago"}
                      if(j<f*2){
                        return"about 1 hour ago"}
                      if(j<h){
                        return Math.floor(j/f)+" hours ago"}
                      if(j>h&&j<h*2){
                        return"yesterday"}
                      if(j<h*365){
                        return Math.floor(j/h)+" days ago"}
                      else{
                        return"over a year ago"}
                    }
                    ;
                    var E={
link:function(c){
       return c.replace(/\b(((https*\:\/\/)|www\.).+?)(([!?,.\)]+)?(\s|$))/g,function(i,h,f,e,d){
           var g=f.match(/w/)?"http://":"";
           return'<a class="twtr-hyperlink" target="_blank" href="'+g+h+'">'+((h.length>25)?h.substr(0,24)+"...":h)+"</a>"+d}
           )}
     ,at:function(c){
       return c.replace(/\B\@([a-zA-Z0-9_]{
             1,20}
             )/g,function(d,e){
           return'@<a target="_blank" class="twtr-atreply" href="http://twitter.com/'+e+'">'+e+"</a>"}
           )}
     ,list:function(c){
       return c.replace(/\B\@([a-zA-Z0-9_]{
             1,20}
             \/\w+)/g,function(d,e){
           return'@<a target="_blank" class="twtr-atreply" href="http://twitter.com/'+e+'">'+e+"</a>"}
           )}
     ,hash:function(c){
       return c.replace(/\B\#(\w+)/gi,function(d,e){
           return'<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23'+e+'">#'+e+"</a>"}
           )}
     ,clean:function(c){
       return this.hash(this.at(this.list(this.link(c))))}
                    }
                    ;
                    function N(d,e,c){
                      this.job=d;
                      this.decayFn=e;
                      this.interval=c;
                      this.decayRate=1;
                      this.decayMultiplier=1.25;
                      this.maxDecayTime=3*60*1000}
                      N.prototype={
start:function(){
        this.stop().run();
        return this}
        ,stop:function(){
          if(this.worker){
            window.clearTimeout(this.worker)}
          return this}
          ,run:function(){
            var c=this;
            this.job(function(){
                c.decayRate=c.decayFn()?Math.max(1,c.decayRate/c.decayMultiplier):c.decayRate*c.decayMultiplier;
                var d=c.interval*c.decayRate;
                d=(d>=c.maxDecayTime)?c.maxDecayTime:d;
                d=Math.floor(d);
                c.worker=window.setTimeout(function(){
                  c.run.call(c)}
                  ,d)}
                )}
            ,destroy:function(){
              this.stop();
              this.decayRate=1;
              return this}
                      }
                      ;
                      function I(d,e,c,f){
                        this.time=e||6000;
                        this.loop=c||false;
                        this.repeated=0;
                        this.total=d.length;
                        this.callback=f;
                        this.haystack=d}
                        I.prototype={
start:function(c){
        var d=this;
        if(c){
          this.repeated=0}
        this.stop()._job();
        this.timer=window.setInterval(function(){
            d._job.call(d)}
            ,this.time);
        return this}
        ,stop:function(){
          if(this.timer){
            window.clearInterval(this.timer)}
          return this}
          ,_job:function(){
            if(this.repeated===this.total){
              if(this.loop){
                this.repeated=0}
              else{
                this.stop();
                return }
            }
            this.callback(this.haystack[this.repeated]);
            this.repeated++;
            return this}
                        }
                        ;
                        function K(e){
                          function c(){
                            if(e.needle.metadata&&e.needle.metadata.result_type&&e.needle.metadata.result_type=="popular"){
                              return'<span class="twtr-popular">'+e.needle.metadata.recent_retweets+"+ recent retweets</span>"}
                            else{
                              return""}
                          }
                          var d='<div class="twtr-tweet-wrap">         <div class="twtr-avatar">           <div class="twtr-img"><a target="_blank" href="http://twitter.com/'+e.user+'"><img alt="'+e.user+' profile" src="'+e.avatar+'"></a></div>         </div>         <div class="twtr-tweet-text">           <p>             <a target="_blank" href="http://twitter.com/'+e.user+'" class="twtr-user">'+e.user+"</a> "+e.tweet+'             <i>            <a target="_blank" class="twtr-timestamp" time="'+e.timestamp+'" href="http://twitter.com/'+e.user+"/status/"+e.id+'">'+e.created_at+'</a>             <a target="_blank" class="twtr-reply" href="http://twitter.com/?status=@'+e.user+"%20&in_reply_to_status_id="+e.id+"&in_reply_to="+e.user+'">reply</a>             </i> '+c()+"           </p>         </div>       </div>";
                          var f=document.createElement("div");
                          f.id="tweet-id-"+ ++K._tweetCount;
                          f.className="twtr-tweet";
                          f.innerHTML=d;
                          this.element=f}
                          K._tweetCount=0;
                          O.loadStyleSheet=function(e,d){
                            if(!TWTR.Widget.loadingStyleSheet){
                              TWTR.Widget.loadingStyleSheet=true;
                              var c=document.createElement("link");
                              c.href=e;
                              c.rel="stylesheet";
                              c.type="text/css";
                              document.getElementsByTagName("head")[0].appendChild(c);
                              var f=setInterval(function(){
                                  var g=F(d,"position");
                                  if(g=="relative"){
                                  clearInterval(f);
                                  TWTR.Widget.hasLoadedStyleSheet=true}
                                  }
                                  ,50)}
                          }
                          ;
                          (function(){
                           var c=false;
                           O.css=function(f){
                           var e=document.createElement("style");
                           e.type="text/css";
                           if(a.ie){
                           e.styleSheet.cssText=f}
                           else{
                           var g=document.createDocumentFragment();
                           g.appendChild(document.createTextNode(f));
                           e.appendChild(g)}
                           function d(){
                           document.getElementsByTagName("head")[0].appendChild(e)}
                           if(!a.ie||c){
                           d()}
                           else{
                           window.attachEvent("onload",function(){
                             c=true;
                             d()}
                             )}
                           }
                          }
                          )();
                          TWTR.Widget.isLoaded=false;
                          TWTR.Widget.loadingStyleSheet=false;
                          TWTR.Widget.hasLoadedStyleSheet=false;
                          TWTR.Widget.WIDGET_NUMBER=0;
                          TWTR.Widget.matches={
mentions:/^@[a-zA-Z0-9_]{
            1,20}
          \b/,any_mentions:/\b@[a-zA-Z0-9_]{
            1,20}
          \b/}
          ;
          TWTR.Widget.jsonP=function(d,e){
            var c=document.createElement("script");
            c.type="text/javascript";
            c.src=d;
            document.getElementsByTagName("head")[0].appendChild(c);
            e(c);
            return c}
            ;
            TWTR.Widget.prototype=function(){
              var g="http://search.twitter.com/search.";
              var h="http://twitter.com/statuses/user_timeline.";
              var e="http://twitter.com/favorites/";
              var f="http://twitter.com/";
              var d=20000;
              var c="http://widgets.twimg.com/j/1/default.gif";
              return{
init:function(j){
       var i=this;
       this._widgetNumber=++TWTR.Widget.WIDGET_NUMBER;
       TWTR.Widget["receiveCallback_"+this._widgetNumber]=function(k){
         i._prePlay.call(i,k)}
       ;
       this._cb="TWTR.Widget.receiveCallback_"+this._widgetNumber;
       this.opts=j;
       this._base=g;
       this._isRunning=false;
       this._hasOfficiallyStarted=false;
       this._rendered=false;
       this._profileImage=false;
       this._isCreator=!!j.creator;
       this._setWidgetType(j.type);
       this.timesRequested=0;
       this.runOnce=false;
       this.newResults=false;
       this.results=[];
       this.jsonMaxRequestTimeOut=19000;
       this.showedResults=[];
       this.sinceId=1;
       this.source="TWITTERINC_WIDGET";
       this.id=j.id||"twtr-widget-"+this._widgetNumber;
       this.tweets=0;
       this.setDimensions(j.width,j.height);
       this.interval=j.interval||6000;
       this.format="json";
       this.rpp=j.rpp||50;
       this.subject=j.subject||"";
       this.title=j.title||"";
       this.setFooterText(j.footer);
       this.setSearch(j.search);
       this._setUrl();
       this.theme=j.theme?j.theme:this._getDefaultTheme();
       if(!j.id){
         document.write('<div class="twtr-widget" id="'+this.id+'"></div>')}
       this.widgetEl=G(this.id);
       if(j.id){
         X.add(this.widgetEl,"twtr-widget")}
       if(j.version>=2&&!TWTR.Widget.hasLoadedStyleSheet){
         O.loadStyleSheet("http://widgets.twimg.com/j/2/widget-2.2.css",this.widgetEl)}
       this.occasionalJob=new N(function(k){
           i.decay=k;
           i._getResults.call(i)}
           ,function(){
           return i._decayDecider.call(i)}
           ,d);
       this._ready=H.fn(j.ready)?j.ready:function(){
       }
       ;
       this._isRelativeTime=true;
       this._tweetFilter=false;
       this._avatars=true;
       this._isFullScreen=false;
       this._isLive=true;
       this._isScroll=false;
       this._loop=true;
       this._showTopTweets=(this._isSearchWidget)?true:false;
       this._behavior="default";
       this.setFeatures(this.opts.features);
       return this}
       ,setDimensions:function(i,j){
         this.wh=(i&&j)?[i,j]:[250,300];
         if(i=="auto"||i=="100%"){
           this.wh[0]="100%"}
         else{
           this.wh[0]=((this.wh[0]<150)?150:this.wh[0])+"px"}
         this.wh[1]=((this.wh[1]<100)?100:this.wh[1])+"px";
         return this}
         ,setRpp:function(i){
           var i=parseInt(i);
           this.rpp=(H.number(i)&&(i>0&&i<=100))?i:30;
           return this}
           ,_setWidgetType:function(i){
             this._isSearchWidget=false,this._isProfileWidget=false,this._isFavsWidget=false,this._isListWidget=false;
             switch(i){
               case"profile":this._isProfileWidget=true;
               break;
               case"search":this._isSearchWidget=true,this.search=this.opts.search;
               break;
               case"faves":case"favs":this._isFavsWidget=true;
               break;
               case"list":case"lists":this._isListWidget=true;
               break}
               return this}
               ,setFeatures:function(j){
                 if(j){
                   if(H.def(j.filters)){
                     this._tweetFilter=j.filters}
                   if(H.def(j.dateformat)){
                     this._isRelativeTime=!!(j.dateformat!=="absolute")}
                   if(H.def(j.fullscreen)&&H.bool(j.fullscreen)){
                     if(j.fullscreen){
                       this._isFullScreen=true;
                       this.wh[0]="100%";
                       this.wh[1]=(S()-90)+"px";
                       var k=this;
                       D.add(window,"resize",function(n){
                           k.wh[1]=S();
                           k._fullScreenResize()}
                           )}
                   }
                   if(H.def(j.loop)&&H.bool(j.loop)){
                     this._loop=j.loop}
                   if(H.def(j.behavior)&&H.string(j.behavior)){
                     switch(j.behavior){
                       case"all":this._behavior="all";
                       break;
                       case"preloaded":this._behavior="preloaded";
                       break;
                       default:this._behavior="default";
                               break}
                   }
                   if(H.def(j.toptweets)&&H.bool(j.toptweets)){
                     this._showTopTweets=j.toptweets;
                     var i=(this._showTopTweets)?"inline-block":"none";
                     O.css("#"+this.id+" .twtr-popular {
display: "+i+";
}
")}
                     if(!H.def(j.toptweets)){
                       this._showTopTweets=true;
                       var i=(this._showTopTweets)?"inline-block":"none";
                       O.css("#"+this.id+" .twtr-popular {
display: "+i+";
}
")}
                       if(H.def(j.avatars)&&H.bool(j.avatars)){
                         if(!j.avatars){
                           O.css("#"+this.id+" .twtr-avatar, #"+this.id+" .twtr-user {
display: none;
}
#"+this.id+" .twtr-tweet-text {
margin-left: 0;
}
");
                           this._avatars=false}
                           else{
                             var l=(this._isFullScreen)?"90px":"40px";
                             O.css("#"+this.id+" .twtr-avatar {
display: block;
}
#"+this.id+" .twtr-user {
display: inline;
}
#"+this.id+" .twtr-tweet-text {
margin-left: "+l+";
}
");
                             this._avatars=true}
                             }
else{
  if(this._isProfileWidget){
    this.setFeatures({
avatars:false}
);
    this._avatars=false}
  else{
    this.setFeatures({
avatars:true}
);
    this._avatars=true}
}
if(H.def(j.hashtags)&&H.bool(j.hashtags)){
  (!j.hashtags)?O.css("#"+this.id+" a.twtr-hashtag {
display: none;
}
"):""}
  if(H.def(j.timestamp)&&H.bool(j.timestamp)){
    var m=j.timestamp?"block":"none";
    O.css("#"+this.id+" i {
display: "+m+";
}
")}
    if(H.def(j.live)&&H.bool(j.live)){
      this._isLive=j.live}
      if(H.def(j.scrollbar)&&H.bool(j.scrollbar)){
        this._isScroll=j.scrollbar}
        }
else{
  if(this._isProfileWidget){
    this.setFeatures({
avatars:false}
);
    this._avatars=false}
    if(this._isProfileWidget||this._isFavsWidget){
      this.setFeatures({
behavior:"all"}
)}
}
return this}
,_fullScreenResize:function(){
  var i=C("twtr-timeline","div",document.body,function(j){
      j.style.height=(S()-90)+"px"}
      )}
  ,setTweetInterval:function(i){
    this.interval=i;
    return this}
    ,setBase:function(i){
      this._base=i;
      return this}
      ,setUser:function(j,i){
        this.username=j;
        this.realname=i||" ";
        if(this._isFavsWidget){
          this.setBase(e+j+".")}
        else{
          if(this._isProfileWidget){
            this.setBase(h+this.format+"?screen_name="+j)}
        }
        this.setSearch(" ");
        return this}
        ,setList:function(j,i){
          this.listslug=i.replace(/ /g,"-").toLowerCase();
          this.username=j;
          this.setBase(f+j+"/lists/"+this.listslug+"/statuses.");
          this.setSearch(" ");
          return this}
          ,setProfileImage:function(i){
            this._profileImage=i;
            this.byClass("twtr-profile-img","img").src=i;
            this.byClass("twtr-profile-img-anchor","a").href="http://twitter.com/"+this.username;
            return this}
            ,setTitle:function(i){
              this.title=i;
              this.widgetEl.getElementsByTagName("h3")[0].innerHTML=this.title;
              return this}
              ,setCaption:function(i){
                this.subject=i;
                this.widgetEl.getElementsByTagName("h4")[0].innerHTML=this.subject;
                return this}
                ,setFooterText:function(i){
                  this.footerText=(H.def(i)&&H.string(i))?i:"Join the conversation";
                  if(this._rendered){
                    this.byClass("twtr-join-conv","a").innerHTML=this.footerText}
                  return this}
                  ,setSearch:function(j){
                    this.searchString=j||"";
                    this.search=encodeURIComponent(this.searchString);
                    this._setUrl();
                    if(this._rendered){
                      var i=this.byClass("twtr-join-conv","a");
                      i.href="http://twitter.com/"+this._getWidgetPath()}
                      return this}
                      ,_getWidgetPath:function(){
                        if(this._isProfileWidget){
                          return this.username}
                        else{
                          if(this._isFavsWidget){
                            return this.username+"/favorites"}
                          else{
                            if(this._isListWidget){
                              return this.username+"/lists/"+this.listslug}
                            else{
                              return"#search?q="+this.search}
                          }
                        }
                      }
,_setUrl:function(){
  var i=this;
  function j(){
    return(i.sinceId==1)?"":"&since_id="+i.sinceId+"&refresh=true"}
  if(this._isProfileWidget){
    this.url=this._base+"&callback="+this._cb+"&count="+this.rpp+j()+"&clientsource="+this.source}
  else{
    if(this._isFavsWidget||this._isListWidget){
      this.url=this._base+this.format+"?callback="+this._cb+j()+"&clientsource="+this.source}
    else{
      this.url=this._base+this.format+"?q="+this.search+"&result_type=mixed&callback="+this._cb+"&rpp="+this.rpp+j()+"&clientsource="+this.source}
  }
  return this}
  ,_getRGB:function(i){
    return M(i.substring(1,7))}
    ,setTheme:function(n,i){
      var l=this;
      var j=" !important";
      var m=((window.location.hostname.match(/twitter\.com/))&&(window.location.pathname.match(/goodies/)));
      if(i||m){
        j=""}
      this.theme={
shell:{
background:function(){
             return n.shell.background||l._getDefaultTheme().shell.background}
           (),color:function(){
             return n.shell.color||l._getDefaultTheme().shell.color}
           ()}
           ,tweets:{
background:function(){
             return n.tweets.background||l._getDefaultTheme().tweets.background}
           (),color:function(){
             return n.tweets.color||l._getDefaultTheme().tweets.color}
           (),links:function(){
             return n.tweets.links||l._getDefaultTheme().tweets.links}
           ()}
      }
      ;
      var k="#"+this.id+" .twtr-doc,                      #"+this.id+" .twtr-hd a,                      #"+this.id+" h3,                      #"+this.id+" h4,                      #"+this.id+" .twtr-popular {
        background-color: "+this.theme.shell.background+j+";
color: "+this.theme.shell.color+j+";
    }
#"+this.id+" .twtr-popular {
color: "+this.theme.tweets.color+j+";
       background-color: rgba("+this._getRGB(this.theme.shell.background)+", .3)"+j+";
}
#"+this.id+" .twtr-tweet a {
color: "+this.theme.tweets.links+j+";
}
#"+this.id+" .twtr-bd, #"+this.id+" .twtr-timeline i a,           #"+this.id+" .twtr-bd p {
color: "+this.theme.tweets.color+j+";
}
#"+this.id+" .twtr-new-results,           #"+this.id+" .twtr-results-inner,           #"+this.id+" .twtr-timeline {
background: "+this.theme.tweets.background+j+";
}
";
if(a.ie){
  k+="#"+this.id+" .twtr-tweet {
background: "+this.theme.tweets.background+j+";
}
"}
O.css(k);
return this}
,byClass:function(l,i,j){
  var k=C(l,i,G(this.id));
  return(j)?k:k[0]}
  ,render:function(){
    var k=this;
    if(!TWTR.Widget.hasLoadedStyleSheet){
      window.setTimeout(function(){
          k.render.call(k)}
          ,50);
      return this}
      this.setTheme(this.theme,this._isCreator);
      if(this._isProfileWidget){
        X.add(this.widgetEl,"twtr-widget-profile")}
      if(this._isScroll){
        X.add(this.widgetEl,"twtr-scroll")}
      if(!this._isLive&&!this._isScroll){
        this.wh[1]="auto"}
      if(this._isSearchWidget&&this._isFullScreen){
        document.title="Twitter search: "+escape(this.searchString)}
      this.widgetEl.innerHTML=this._getWidgetHtml();
      this.spinner=this.byClass("twtr-spinner","div");
      var j=this.byClass("twtr-timeline","div");
      if(this._isLive&&!this._isFullScreen){
        var l=function(m){
          if(B.call(this,m)){
            k.pause.call(k)}
        }
        ;
        var i=function(m){
          if(B.call(this,m)){
            k.resume.call(k)}
        }
        ;
        this.removeEvents=function(){
          D.remove(j,"mouseover",l);
          D.remove(j,"mouseout",i)}
          ;
          D.add(j,"mouseover",l);
          D.add(j,"mouseout",i)}
          this._rendered=true;
          this._ready();
          return this}
          ,removeEvents:function(){
          }
,_getDefaultTheme:function(){
  return{
shell:{
background:"#8ec1da",color:"#ffffff"}
      ,tweets:{
background:"#ffffff",color:"#444444",links:"#1985b5"}
  }
}
,_getWidgetHtml:function(){
  var l=this;
  function m(){
    if(l._isProfileWidget){
      return'<a target="_blank" href="http://twitter.com/" class="twtr-profile-img-anchor"><img alt="profile" class="twtr-profile-img" src="'+c+'"></a>                      <h3></h3>                      <h4></h4>'}
    else{
      return"<h3>"+l.title+"</h3><h4>"+l.subject+"</h4>"}
  }
  function k(){
    if(!l._isFullScreen){
      return' height="15"'}
    return""}
    function j(){
      return l._isFullScreen?" twtr-fullscreen":""}
    var i='<div class="twtr-doc'+j()+'" style="width: '+this.wh[0]+';
    ">            <div class="twtr-hd">'+m()+'               <div class="twtr-spinner twtr-inactive"></div>            </div>            <div class="twtr-bd">              <div class="twtr-timeline" style="height: '+this.wh[1]+';
    ">                <div class="twtr-tweets">                  <div class="twtr-reference-tweet"></div>                  <!-- tweets show here -->                </div>              </div>            </div>            <div class="twtr-ft">              <div><a target="_blank" href="http://twitter.com"><img alt="" src="http://widgets.twimg.com/j/1/twitter_logo_s.'+(a.ie?"gif":"png")+'"'+k()+'></a>                <span><a target="_blank" class="twtr-join-conv" style="color:'+this.theme.shell.color+'" href="http://twitter.com/'+this._getWidgetPath()+'">'+this.footerText+"</a></span>              </div>            </div>          </div>";
    return i}
    ,_appendTweet:function(i){
      V(i,this.byClass("twtr-reference-tweet","div"));
      return this}
      ,_slide:function(j){
        var k=this;
        var i=U(j).offsetHeight;
        if(this.runOnce){
          new A(j,"height",{
from:0,to:i,time:500,callback:function(){
k._fade.call(k,j)}
}
).start()}
          return this}
          ,_fade:function(i){
            var j=this;
            if(A.canTransition){
              i.style.webkitTransition="opacity 0.5s ease-out";
              i.style.opacity=1;
              return this}
              new A(i,"opacity",{
from:0,to:1,time:500}
).start();
              return this}
              ,_chop:function(){
                if(this._isScroll){
                  return this}
                var o=this.byClass("twtr-tweet","div",true);
                var p=this.byClass("twtr-new-results","div",true);
                if(o.length){
                  for(var l=o.length-1;
                      l>=0;
                      l--){
                    var n=o[l];
                    var m=parseInt(n.offsetTop);
                    if(m>parseInt(this.wh[1])){
                      W(n)}
                    else{
                      break}
                  }
                  if(p.length>0){
                    var j=p[p.length-1];
                    var k=parseInt(j.offsetTop);
                    if(k>parseInt(this.wh[1])){
                      W(j)}
                  }
                }
                return this}
                ,_appendSlideFade:function(j){
                  var i=j||this.tweet.element;
                  this._chop()._appendTweet(i)._slide(i);
                  return this}
                  ,_createTweet:function(i){
                    i.timestamp=i.created_at;
                    i.created_at=this._isRelativeTime?J(i.created_at):P(i.created_at);
                    this.tweet=new K(i);
                    if(this._isLive&&this.runOnce){
                      this.tweet.element.style.opacity=0;
                      this.tweet.element.style.filter="alpha(opacity:0)";
                      this.tweet.element.style.height="0"}
                      return this}
                      ,_getResults:function(){
                        var i=this;
                        this.timesRequested++;
                        this.jsonRequestRunning=true;
                        this.jsonRequestTimer=window.setTimeout(function(){
                            if(i.jsonRequestRunning){
                            clearTimeout(i.jsonRequestTimer);
                            X.add(i.spinner,"twtr-inactive")}
                            i.jsonRequestRunning=false;
                            W(i.scriptElement);
                            i.newResults=false;
                            i.decay()}
                            ,this.jsonMaxRequestTimeOut);
                        X.remove(this.spinner,"twtr-inactive");
                        TWTR.Widget.jsonP(i.url,function(j){
                            i.scriptElement=j}
                            )}
                        ,clear:function(){
                          var j=this.byClass("twtr-tweet","div",true);
                          var i=this.byClass("twtr-new-results","div",true);
                          j=j.concat(i);
                          j.forEach(function(k){
                              W(k)}
                              );
                          return this}
                          ,_sortByLatest:function(i){
                            this.results=i;
                            this.results=this.results.slice(0,this.rpp);
                            this.results.reverse();
                            return this}
                            ,_sortByMagic:function(i){
                              var i=i;
                              var j=this;
                              if(this._tweetFilter){
                                if(this._tweetFilter.negatives){
                                  i=i.filter(function(k){
                                      if(!j._tweetFilter.negatives.test(k.text)){
                                      return k}
                                      }
                                      )}
                                if(this._tweetFilter.positives){
                                  i=i.filter(function(k){
                                      if(j._tweetFilter.positives.test(k.text)){
                                      return k}
                                      }
                                      )}
                              }
                              switch(this._behavior){
                                case"all":this._sortByLatest(i);
                                break;
                                case"preloaded":default:this._sortByDefault(i);
                                break}
                                return this}
                                ,_loadTopTweetsAtTop:function(i){
                                  var j=[];
                                  i=i.filter(function(k){
                                      if(k.metadata&&k.metadata.result_type&&k.metadata.result_type=="popular"){
                                      return k}
                                      else{
                                      j.push(k)}
                                      }
                                      ).concat(j);
                                  return i}
                                  ,_sortByDefault:function(j){
                                    var k=this;
                                    var i=function(){
                                      if(a.ie){
                                        return function(l){
                                          return Date.parse(l.replace(/( \+)/," UTC$1"))}
                                      }
                                      else{
                                        return function(l){
                                          return new Date(l)}
                                      }
                                    }
                                    ();
                                    this.results.unshift.apply(this.results,j);
                                    this.results.forEach(function(l){
                                        if(!l.views){
                                        l.views=0}
                                        }
                                        );
                                    this.results.sort(function(m,l){
                                        if(i(m.created_at)<i(l.created_at)){
                                        return 1}
                                        else{
                                        if(i(m.created_at)>i(l.created_at)){
                                        return -1}
                                        else{
                                        return 0}
                                        }
                                        }
                                        );
                                    this.results=this.results.slice(0,this.rpp);
                                    this.results=this._loadTopTweetsAtTop(this.results);
                                    if(!this._isLive){
                                      this.results.reverse()}
                                    this.results.sort(function(m,l){
                                        if(m.views>l.views){
                                        return 1}
                                        else{
                                        if(m.views<l.views){
                                        return -1}
                                        }
                                        return 0}
                                        )}
                                    ,_prePlay:function(j){
                                      if(this.jsonRequestTimer){
                                        clearTimeout(this.jsonRequestTimer)}
                                      if(!a.ie){
                                        W(this.scriptElement)}
                                      if(j.error){
                                        this.newResults=false}
                                      else{
                                        if(j.results&&j.results.length>0){
                                          this.response=j;
                                          if(this.intervalJob){
                                            this.intervalJob.stop()}
                                          this.newResults=true;
                                          this.sinceId=j.max_id;
                                          this._sortByMagic(j.results);
                                          if(this.isRunning()){
                                            this._play()}
                                        }
                                        else{
                                          if((this._isProfileWidget||this._isFavsWidget||this._isListWidget)&&H.array(j)&&j.length>0){
                                            if(this.intervalJob){
                                              this.intervalJob.stop()}
                                            this.newResults=true;
                                            if(!this._profileImage&&this._isProfileWidget){
                                              var i=j[0].user.screen_name;
                                              this.setProfileImage(j[0].user.profile_image_url);
                                              this.setTitle(j[0].user.name);
                                              this.setCaption('<a target="_blank" href="http://twitter.com/'+i+'">'+i+"</a>")}
                                              this.sinceId=j[0].id;
                                              this._sortByMagic(j);
                                              if(this.isRunning()){
                                                this._play()}
                                          }
                                          else{
                                            this.newResults=false}
                                        }
                                      }
                                      this._setUrl();
                                      if(this._isLive){
                                        this.decay()}
                                      X.add(this.spinner,"twtr-inactive")}
                                      ,_play:function(){
                                        var i=this;
                                        if(this._avatars){
                                          this._preloadImages(this.results)}
                                        if(this._isRelativeTime&&(this._behavior=="all"||this._behavior=="preloaded")){
                                          this.byClass("twtr-timestamp","a",true).forEach(function(j){
                                              j.innerHTML=J(j.getAttribute("time"))}
                                              )}
                                        if(!this._isLive||this._behavior=="all"||this._behavior=="preloaded"){
                                          this.results.forEach(function(k){
                                              if(i._isProfileWidget){
                                              k.from_user=i.username;
                                              k.profile_image_url=k.user.profile_image_url}
                                              if(i._isFavsWidget||i._isListWidget){
                                              k.from_user=k.user.screen_name;
                                              k.profile_image_url=k.user.profile_image_url}
                                              i._createTweet({
id:k.id,user:k.from_user,tweet:E.clean(k.text),avatar:k.profile_image_url,created_at:k.created_at,needle:k}
);
                                              var j=i.tweet.element;
                                              (i._behavior=="all")?i._appendSlideFade(j):i._appendTweet(j)}
                                              );
                                          if(this._behavior!="preloaded"){
                                            return this}
                                        }
                                        this._insertNewResultsNumber();
                                        this.intervalJob=new I(this.results,this.interval,this._loop,function(j){
                                            j.views++;
                                            if(i._isProfileWidget){
                                            j.from_user=i.username;
                                            j.profile_image_url=j.user.profile_image_url}
                                            if(i._isFavsWidget||i._isListWidget){
                                            j.from_user=j.user.screen_name;
                                            j.profile_image_url=j.user.profile_image_url}
                                            if(i._isFullScreen){
                                            j.profile_image_url=j.profile_image_url.replace(/_normal\./,"_bigger.")}
                                            i._createTweet({
id:j.id,user:j.from_user,tweet:E.clean(j.text),avatar:j.profile_image_url,created_at:j.created_at,needle:j}
)._appendSlideFade()}
                                            ).start(true);
                                        return this}
                                        ,_insertNewResultsNumber:function(){
                                          if(this.runOnce&&this._isSearchWidget){
                                            var l=this.response.total>this.rpp?this.response.total:this.response.results.length;
                                            var i=l>1?"s":"";
                                            var k=(this.response.warning&&this.response.warning.match(/adjusted since_id/))?"more than":"";
                                            var j=document.createElement("div");
                                            X.add(j,"twtr-new-results");
                                            j.innerHTML='<div class="twtr-results-inner"> &nbsp;
                                            </div><div class="twtr-results-hr"> &nbsp;
                                            </div><span>'+k+" <strong>"+l+"</strong> new tweet"+i+"</span>";
                                            V(j,this.byClass("twtr-reference-tweet","div"))}
                                        }
,_preloadImages:function(i){
  if(this._isProfileWidget||this._isFavsWidget||this._isListWidget){
    i.forEach(function(k){
        var j=new Image();
        j.src=k.user.profile_image_url}
        )}
  else{
    i.forEach(function(j){
        (new Image()).src=j.profile_image_url}
        )}
}
,_decayDecider:function(){
  var i=false;
  if(!this.runOnce){
    this.runOnce=true;
    i=true}
  else{
    if(this.newResults){
      i=true}
  }
  return i}
  ,start:function(){
    var i=this;
    if(!this._rendered){
      setTimeout(function(){
          i.start.call(i)}
          ,50);
      return this}
      if(!this._isLive){
        this._getResults()}
      else{
        this.occasionalJob.start()}
      this._isRunning=true;
      this._hasOfficiallyStarted=true;
      return this}
      ,stop:function(){
        this.occasionalJob.stop();
        if(this.intervalJob){
          this.intervalJob.stop()}
        this._isRunning=false;
        return this}
        ,pause:function(){
          if(this.isRunning()&&this.intervalJob){
            this.intervalJob.stop();
            X.add(this.widgetEl,"twtr-paused");
            this._isRunning=false}
            if(this._resumeTimer){
              clearTimeout(this._resumeTimer)}
            return this}
            ,resume:function(){
              var i=this;
              if(!this.isRunning()&&this._hasOfficiallyStarted&&this.intervalJob){
                this._resumeTimer=window.setTimeout(function(){
                    i.intervalJob.start();
                    i._isRunning=true;
                    X.remove(i.widgetEl,"twtr-paused")}
                    ,2000)}
              return this}
              ,isRunning:function(){
                return this._isRunning}
                ,destroy:function(){
                  this.stop();
                  this.clear();
                  this.runOnce=false;
                  this._hasOfficiallyStarted=false;
                  this.intervalJob=false;
                  this._profileImage=false;
                  this._isLive=true;
                  this._tweetFilter=false;
                  this._isScroll=false;
                  this.newResults=false;
                  this._isRunning=false;
                  this.sinceId=1;
                  this.results=[];
                  this.showedResults=[];
                  this.occasionalJob.destroy();
                  if(this.jsonRequestRunning){
                    clearTimeout(this.jsonRequestTimer);
                    X.add(this.spinner,"twtr-inactive")}
                    X.remove(this.widgetEl,"twtr-scroll");
                    this.removeEvents();
                    return this}
                    }
}
()}
)()}
)();
