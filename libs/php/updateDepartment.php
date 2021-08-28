<?php

include 'config.php';


$sql = $conn->prepare("UPDATE department SET name = ?, locationID = ? WHERE id = ?");

$sql->bind_param("sii", $deptName, $locationID, $id);

$deptName = ucwords(strtolower($_POST['departmentName']));
$locationID = $_POST['locationID'];
$id = $_POST['id'];
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