<?php

include('connection.php');
$response = array();

try {
    $connection = new mysqli($host, $username, $password, $database);

    if ($connection->connect_error) {
        throw new Exception("Connection failed: " . $connection->connect_error);
    }
    
    $sql = "SELECT * FROM material"; 
    $result = $connection->query($sql);

    if ($result === false) {
        throw new Exception("Error executing the query: " . $connection->error);
    }

    if ($result->num_rows > 0) {
        $materials = array();
        while ($row = $result->fetch_assoc()) {
            $materials[] = $row;
        }

        $response['material'] = $materials;
    } else {
        $response['material'] = array();
    }

    $connection->close();
} catch (Exception $e) {
    $response['error'] = 'An error occurred: ' . $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
