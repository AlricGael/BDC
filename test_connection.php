<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

// Vérification de la chaîne de connexion
if (!defined('DB_CONNECTION_STRING')) {
    echo json_encode(['error' => 'La chaîne de connexion n\'est pas définie.']);
    exit;
}

// Utilisation de la chaîne de connexion mise à jour
try {
    $result = testDBConnection(DB_CONNECTION_STRING);
    echo json_encode(['message' => $result]);
} catch (PDOException $e) {
    // Affichage de l'erreur précise pour les exceptions PDO
    echo json_encode(['error' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
} catch (Exception $e) {
    // Affichage de l'erreur générale
    echo json_encode(['error' => 'Erreur : ' . $e->getMessage()]);
}
