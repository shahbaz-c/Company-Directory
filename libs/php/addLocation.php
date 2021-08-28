<?php

include 'config.php';

$sql = $conn->prepare("INSERT INTO location (name) VALUES(?)"); 

$sql->bind_param("s", $locationName);

$locationName = ucwords(strtolower($_POST['locationName']));
$result = $sql->execute();

if (!$result) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Error: query failed";	
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