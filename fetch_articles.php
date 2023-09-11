<?php

include('connection.php');

$materialId = $_GET['material_id'];
$response = array();

try {
    
    $connection = new mysqli($host, $username, $password, $database);

    if ($connection->connect_error) {
        throw new Exception("Connection failed: " . $connection->connect_error);
    }
    $sql = "SELECT * FROM articles WHERE material_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("s", $materialId);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

      
        if ($result->num_rows > 0) {
           
            $articles = array();
            while ($row = $result->fetch_assoc()) {
                $articles[] = $row;
            }

            $response['articles'] = $articles;
        } else {
         
            $response['articles'] = array();
        }
    } else {

        $response['error'] = 'Error executing the query';
    }

    $stmt->close();
    $connection->close();
} catch (Exception $e) {
  
    $response['error'] = 'An error occurred: ' . $e->getMessage();
}

header('Content-Type: application/json');

echo json_encode($response);
?>
