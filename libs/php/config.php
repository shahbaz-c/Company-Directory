<?php

$server = "127.0.0.1";
$user = "companydirectory";
$password = "companydirectory";
$dbname = "companydirectory";

$conn = new mysqli($server, $user, $password, $dbname);

if (!$conn) {
	echo 'Connection failed!';
} 

?>


