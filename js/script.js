
tic={
  numbers:['-','1','2','3','4','5','6','7','8','9','0'],
  chars  :['x','l','u','o','n','g','a','b','t','i','c'],
  message:null,
  startingPoint : function () {
    var shortURL = window.location.search.replace('?','');
    console.log('shortURL: ' + shortURL);
    if(shortURL.length!=""){
      tic.getRealURL(shortURL);
    }
    var btConvert = document.getElementById('btConvert');
    btConvert.addEventListener('click',tic.convertURL,false);
    message = document.getElementById('messages');
  },

  convertURL : function () {
    var shortURL='';
    var inputURL = document.getElementById('input-url');
    if(tic.validateUrl(inputURL.value)){
      shortURL = tic.convertHashCode((inputURL.value).hashCode());
      tic.sendToServer(shortURL,inputURL.value);
    }else{
      message.setAttribute('class','alert alert-warning');
      message.innerHTML="Your input-url is not validate";
    }
  },

  validateUrl: function (value){
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
  },

  sendToServer : function (shortURL,inputURL) {
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
          document.getElementById("short-url").value=window.location+"?"+shortURL;
          message.setAttribute('class','alert alert-success');
          message.innerHTML="Copy and tweet";
          tic.copyToClipboard();
        }
      }
    }
    xmlhttp.open("GET","php/insertURL.php?k="+shortURL+"&v="+inputURL,true);
    xmlhttp.send();
  },

  getRealURL : function (shortURL) {
    console.log('Get real url for: ' + shortURL);
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
      var index = tic.numbers.indexOf(str[i]);
      ret+=tic.chars[index];
    }
    return ret; 
  },

  copyToClipboard:function(){
    var text = document.getElementById('short-url').value;    
    if(tic.validateUrl(text)){
       var client =new ZeroClipboard(document.getElementById('btCopy'));
       client.on('ready',function (readyEvent) {
        ZeroClipboard.setData('text/plain',text);
        client.on('aftercopy',function (event) {
          message.setAttribute('class','alert alert-success');
          message.innerHTML="'"+text+"' is copied to your Clipboard!";
        });
      });
   }
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



document.addEventListener('DOMContentLoaded',tic.startingPoint,false);