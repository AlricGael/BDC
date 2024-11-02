<!DOCTYPE html>
<html>
    <head>
        <title>Résultat du Test de Connexion</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Résultat du Test de Connexion</h1>  
        <?php
            // Inclure le fichier de configuration
            require_once 'config.php';

            // On établit la connexion
            $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);

            // On vérifie la connexion
            if ($conn->connect_error) {
                echo '<p style="color: red;">Erreur de connexion : ' . $conn->connect_error . '</p>'; // Affiche l'erreur
            } else {
                echo '<p style="color: green;">Connexion réussie à la base de données.</p>'; // Affiche un message de succès
            }

            // Fermer la connexion
            $conn->close();
        ?>
    </body>
</html>