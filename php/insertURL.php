<?php
include "connectdb.php";
$key = $_GET['k'];
$val = $_GET['v'];
$query = "INSERT INTO urltable (shorturl,longurl) values ('".$key."','".$val."')";
$result = mysql_query($query) or die('Query failed: '.mysql_error());
echo "SUCCESS";
mysql_free_result($result);
mysql_close($conn);
?>
