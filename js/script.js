
url5it={
  numbers:['-','1','2','3','4','5','6','7','8','9','0'],
  chars  :['x','l','u','o','n','g','a','b','t','i','c'],
  message:null,
  startingPoint : function () {
    var shortURL = window.location.search.replace('?','');
    console.log('shortURL: ' + shortURL);
    if(shortURL.length!=""){
      console.log('Request server to get real url');
      document.getElementById('redirectContent').removeAttribute('hidden');
      url5it.getRealURL(shortURL);
    }else{
      document.getElementById('main-contain').removeAttribute('hidden');
    }
    var btConvert = document.getElementById('btConvert');
    btConvert.addEventListener('click',url5it.convertURL,false);
    message = document.getElementById('messages');
  },

  convertURL : function () {
    var key='';
    var inputURL = document.getElementById('input-url');
    console.log('Input URL: ' + inputURL);
    if(url5it.validateUrl(inputURL.value)){
      key = url5it.convertHashCode((inputURL.value).hashCode());
      console.log('Key: '+ key);
      url5it.sendToServer(key,inputURL.value);
    }else{
      message.setAttribute('class','alert alert-warning');
      message.innerHTML="Your input-url is not validate";
    }
  },

  validateUrl: function (value){
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
  },

  sendToServer : function (key,inputURL) {
    console.log('Send to server: key: ' + key+"; inputURL: " + inputURL);
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    } else { 
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        response = xmlhttp.responseText;
        console.log('Response: ' + response);
        if(response.indexOf('SUCCESS')<0){
          message.setAttribute('class','alert alert-danger');
          message.innerHTML="Cannot write to db";
        }else{
          var shortURL = window.location+"?"+key;
          document.getElementById("short-url").value=shortURL;
          message.setAttribute('class','alert alert-success');
          message.innerHTML="Long URL: " + inputURL.length+' (cs). Short URL: '+shortURL.length+' (cs). You saved: '+ (inputURL.length-shortURL.length)+' (cs)';
<<<<<<< HEAD
          url5it.copyToClipboard();
=======
          tic.createTweetButton(shortURL);
>>>>>>> 274c095ed580744c923be5407c05714141b8e4af
        }
      }
    }
    xmlhttp.open("GET","php/insertURL.php?k="+key+"&v="+inputURL,true);
    xmlhttp.send();
  },

  createTweetButton:function (shortURL) {
    var btn=document.createElement('a');
    btn.innerHTML="Tweet";
    btn.setAttribute('href',"https://twitter.com/share");
    btn.setAttribute('class',"twitter-share-button");
    btn.setAttribute('data-lang','en');
    btn.setAttribute('data-size','large');
    btn.setAttribute('data-text',"Enter your message to share");
    btn.setAttribute('data-url',shortURL);
    btn.setAttribute('data-count','none');
    var script = document.createElement('script');
    script.innerHTML='!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
    document.getElementById('btnTweet').appendChild(btn);
    document.getElementById('btnTweet').appendChild(script);
  },

  getRealURL : function (shortURL) {
    console.log('Get real url with: key=' + shortURL);
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    } else { 
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        response = xmlhttp.responseText;
        console.log('Response: ' + response);
        var listLongURLs = response.split(';');
        if(listLongURLs.length>2||listLongURLs.length==0){
          message.setAttribute('class','alert alert-danger');
          message.innerHTML="Sorry. I could not get real url of "+shortURL;
        }else{
          window.location.replace(listLongURLs[0]);
        }
      }
    }
    xmlhttp.open("GET","php/getRealURL.php?k="+shortURL,true);
    xmlhttp.send();
  },

  convertHashCode : function (num) {
    var str = String(num),
    ret = '';
    for(var i=0;i<str.length;i++){
      var index = url5it.numbers.indexOf(str[i]);
      ret+=url5it.chars[index];
    }
    return ret; 
  },

  copyToClipboard:function(){
    var text = document.getElementById('short-url').value;    
    if(url5it.validateUrl(text)){
       var client =new ZeroClipboard(document.getElementById('btCopy'));
       client.on('ready',function (readyEvent) {
        ZeroClipboard.setData('text/plain',text);
        client.on('aftercopy',function (event) {
          message.setAttribute('class','alert alert-success');
          message.innerHTML="'"+text+"' is copied to your Clipboard!";
        });
      });
   }
 },

 /** Get client local information*/
  getClientAddress:function () {
    $.ajax({
      url: "http://www.codehelper.io/api/ips/?js",
      data: null,
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp'

    }).done( function( json ) {
      url5it.clientAddress = json;
    });
  }


}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; 
  }
  if(Number(hash)<0) return (-(Number(hash)));
  else return hash;
};



document.addEventListener('DOMContentLoaded',url5it.startingPoint,false);
