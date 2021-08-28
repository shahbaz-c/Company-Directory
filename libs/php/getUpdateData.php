<?php

include 'config.php';

$sql = $conn->prepare ('SELECT * from personnel WHERE id = ?');

$sql->bind_param("i", $_POST['id']);

$sql->execute();

if (false === $sql) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];

    echo json_encode($output); 

    mysqli_close($conn);

    exit;
}

$result = $sql->get_result();

$personnel = [];

while ($row = mysqli_fetch_assoc($result)) {
    array_push($personnel, $row);
}

// ********************************************************************


$sql = $conn->prepare('SELECT * from department WHERE id = ?');

$sql->bind_param("i", $_POST['id']);

$sql->execute();	
	
if (false === $sql) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];
    
    echo json_encode($output); 
    
    mysqli_close($conn);
    
    exit;
}

$result = $sql->get_result();

   
$department = [];

while ($row = mysqli_fetch_assoc($result)) {
	array_push($department, $row);
}

// ********************************************************************


$sql = $conn->prepare('SELECT * from location WHERE id = ?');

$sql->bind_param("i", $_POST['id']);

$sql->execute();	
	
if (false === $sql) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];
    
    echo json_encode($output); 
    
    mysqli_close($conn);
    
    exit;
}

$result = $sql->get_result();

   
$location = [];

while ($row = mysqli_fetch_assoc($result)) {
	array_push($location, $row);
}


$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['data']['personnel'] = $personnel;
$output['data']['department'] = $department;
$output['data']['location'] = $location;


header('Content-Type: application/json; charset=UTF-8');
	
echo json_encode($output); 

mysqli_close($conn);
                  
?>