<?php

include 'config.php';

$sql = "SELECT * FROM location ORDER BY name ASC";

$result = $conn->query($sql);

$data = [];

while ($row = mysqli_fetch_object($result)) {
    array_push($data, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

mysqli_close($conn);

echo json_encode($data);
 

?>