<?php

include 'config.php';

$sql = $conn->prepare("INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES(?,?,?,?,?)"); 

$sql->bind_param("ssssi", $fname, $lname, $jobTitle, $email, $departmentID);

$fname = ucwords(strtolower($_POST['fname']));
$lname = ucwords($_POST['lname']);
$jobTitle = ucwords(strtolower($_POST['jobTitle']));
$email = strtolower($_POST['email']);
$departmentID = $_POST['departmentID'];
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



