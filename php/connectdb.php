<?php
$conn = mysql_connect('localhost','root','280189');
if(!$conn){
	die('Could not connect: '.mysql_error());
	echo 'Could not connect: '.mysql_error();
}
//echo 'Connected sucessfull';
mysql_select_db('ticdb') or die('Could not select database');
?>
