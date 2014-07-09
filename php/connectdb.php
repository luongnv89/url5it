<?php
$key = intval($_GET['k']);
//echo "key: ".$key;
$conn = mysql_connect('localhost','root','280189');
if(!$conn){
	die('Could not connect: '.mysql_error());
}
//echo 'Connected sucessfull';
mysql_select_db('ticdb') or die('Could not select database');
$query = "SELECT longurl FROM urltable WHERE shorturl='".$key."'";
$result = mysql_query($query) or die('Query failed: '.mysql_error());
while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
	foreach ($row as $col_value){
		echo "<div class='long-url'>$col_value</div>";
	}	
}
mysql_free_result($result);
mysql_close($conn);
?>
