<?php
$host = 'w01ac1ce.kasserver.com';
$username = 'd03e03d3';
$password = 'AaJP7pcCdGxzhH7Sm2Bd';
$database = 'd03e03d3';
$table = 'material';

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT * FROM $table";
$result = $connection->query($sql);

if ($result === false) {
    die("Query failed: " . $connection->error);
}


$materials = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $materials[] = $row;
    }
}

$connection->close();
