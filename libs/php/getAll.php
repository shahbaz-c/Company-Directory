<?php
  
include 'config.php';

$sql = "SELECT p.firstName, p.lastName, p.jobTitle, p.id, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName ASC";

$result = $conn->query($sql);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    array_push($data, $row);
}

echo json_encode($data);

?>