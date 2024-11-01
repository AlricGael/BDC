<?php
require_once 'config.php';

function getDBConnection() {
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("La connexion a échoué : " . $conn->connect_error);
    }

    return $conn;
}

function testDBConnection() {
    try {
        $conn = getDBConnection();
        $result = "Connexion réussie à la base de données yes.";
        $conn->close();
    } catch (Exception $e) {
        $result = "Erreur de connexion : " . $e->getMessage();
    }
    return $result;
}
