<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

$result = testDBConnection();

echo json_encode(['message' => $result]);
