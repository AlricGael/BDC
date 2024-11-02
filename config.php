<?php
// Définition des variables de connexion
$user = 'postgres.pjbhjhjmcxyiapzlqdpo'; // Remplacez par votre nom d'utilisateur
$password = '3c9bQQsEK5?4'; // Remplacez par votre mot de passe
$dbname = 'postgres'; // Remplacez par le nom de votre base de données
$host = 'aws-0-us-east-1.pooler.supabase.com'; // Retirez le 'https://'
$port = '5432';

// Création de la chaîne de connexion
define('DB_CONNECTION_STRING', "user={$user} password={$password} host={$host} port={$port} dbname={$dbname}");

// Optionnel : Vous pouvez également définir une constante pour la connexion mysqli
define('DB_HOST', $host);
define('DB_PORT', $port);
define('DB_USER', $user);
define('DB_PASSWORD', $password);
define('DB_NAME', $dbname);
?>
