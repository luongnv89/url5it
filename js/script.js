function startingPoint () {
  var shortURL = window.location.search;
  console.log('shortURL: ' + shortURL);
  if(shortURL.length!=""){
    redirectURL = getRealURL(shortURL);
    console.log('redirectURL: ' + redirectURL);
    if(validateUrl(redirectURL)){
      window.location.replace(redirectURL);
    }else{
      console.log('The redirect url is not validate');
    }
  }
  var btConvert = document.getElementById('btConvert');
  btConvert.addEventListener('click',convertURL,false);
}

convertURL = function () {
  var shortURL='';
  var inputURL = document.getElementById('input-url');
  if(validateUrl(inputURL.value)){
    shortURL = window.location+"?"+hashCode(inputURL.value);
    sendToServer(shortURL,inputURL);
    document.getElementById('short-url').innerHTML = shortURL;
  }else{
    document.getElementById('short-url').innerHTML = "Your input-url is not validate";
  }
}

function validateUrl(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

/**
* Send the new (shortURL,longURL) to server
*/
sendToServer = function (shortURL,inputURL) {
  console.log('Save url to server');
}

getRealURL = function (shortURL) {
  console.log('Query to get URL from server');
  return window.location.origin + window.location.pathname;
}

getRealURL = function (shortURL) {
  if (shortURL=="") {
    document.getElementById("short-url").innerHTML="";
    return;
  } 
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var response = xmlhttp.responseText;
      if(response.indexOf('Success')>-1){
        window.location.replace(response.replace('Success',''));  
      }else{
        document.getElementById("short-url").innerHTML=response;
      }
      
    }
  }
  xmlhttp.open("GET","php/connectdb.php?k="+shortURL,true);
  xmlhttp.send();
}

document.addEventListener('DOMContentLoaded',startingPoint,false);