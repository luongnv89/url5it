<?php
include "connectdb.php";
$key = $_GET['k'];
//echo "key: ".$key;
$query = "SELECT longurl FROM urltable where shorturl='".$key."'";
$result = mysql_query($query) or die('Query failed: '.mysql_error());
while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
	foreach ($row as $col_value){
		echo $col_value.";";
	}	
}
mysql_free_result($result);
mysql_close($conn);
?>
