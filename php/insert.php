<?php 
$con = mysqli_connect('localhost','root','280189','ticdb');
if(mysqli_connect_error()){
echo "Fail to connect to MySQL: ".mysqli_connect_error();
}
$longURL = mysqli_real_escape_string($con,$_POST['inputURL']);
$shortURL = url()."?".crc32($longURL);
$sq1=mysqli_query($con,"INSERT INTO `urltable` (`shorturl`, `longurl`) VALUES ('$shortURL', '$longURL');");

if(!mysqli_query($con,$sq1)){
die('Error':.mysqli_error($con));
}
mysqli_close($con);
  function url(){
    return sprintf(
      "%s://%s%s",
      isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
      $_SERVER['SERVER_NAME'],
      $_SERVER['REQUEST_URI']
    );
  }
?>
