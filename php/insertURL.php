<?php
include "connectdb.php";
$key = $_GET['k'];
$val = $_GET['v'];
//Try to select existing id:
$query = "SELECT longurl FROM urltable where shorturl='".$key."'";
$result = mysql_query($query) or die('Query failed: '.mysql_error());
if(mysql_fetch_array($result)){
	echo "SUCCESS";
	mysql_free_result($result);
}else{
	$query2 = "INSERT INTO urltable (shorturl,longurl) values ('".$key."','".$val."')";
	$result2 = mysql_query($query2) or die('Query failed: '.mysql_error());
	echo "SUCCESS";
	mysql_free_result($result2);
}
mysql_close($conn);
?>
