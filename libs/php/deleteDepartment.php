<?php

include 'config.php';

$sql = $conn->prepare('DELETE FROM department WHERE id = ?');
	
$sql->bind_param("i", $id);

$id = $_POST['id'];

$result = $sql->execute();
	
if (!$result) {

	$output['status']['code'] = "400";
	$output['status']['name'] = "executed";
	$output['status']['description'] = "query failed";	
	$output['data'] = [];

	mysqli_close($conn);

	echo json_encode($output); 

	exit;

}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['data'] = [];
	
mysqli_close($conn);

echo json_encode($output); 

?>