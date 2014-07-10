<?php
$key = $_GET['k'];
$val = $_GET['v'];
//echo "key: ".$key;
$conn = mysql_connect('localhost','root','280189');
if(!$conn){
	die('Could not connect: '.mysql_error());
}
//echo 'Connected sucessfull';
mysql_select_db('ticdb') or die('Could not select database');
$query = "INSERT INTO urltable (shorturl,longurl) values ('".$key."','".$val."')";
$result = mysql_query($query) or die('Query failed: '.mysql_error());
echo "SUCCESS";
mysql_free_result($result);
mysql_close($conn);
?>
