<?php 
    
include 'config.php';

$sql = "SELECT COUNT(id) as personnelCount FROM personnel WHERE departmentID =" .$_POST['id'];

$result = $conn->query($sql);

$data =[];

while ($row = mysqli_fetch_assoc($result)) {
    array_push($data, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['data'] = $data;
	
mysqli_close($conn);

echo json_encode($output);

?>