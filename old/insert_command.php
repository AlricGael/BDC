<?php
// Connexion à la base de données
$servername = "https://gauargi.eus/2c97f1/";
$username = "inst116774";
$password = "pUyS1D6O89v0wdWs";
$dbname = "inst116774";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Vérification des données du formulaire
$order_id = $_POST['order_id'];
$vendor_name = $_POST['vendor_name'];
$client_name = $_POST['client_name'];
$BCCGL_quantity = $_POST['BCCGL_quantity'] ?? 0;
$EGPN170_quantity = $_POST['EGPN170_quantity'] ?? 0;
$PGNA110_quantity = $_POST['PGNA110_quantity'] ?? 0;
$PGCN110_quantity = $_POST['PGCN110_quantity'] ?? 0;
$BCGG210_quantity = $_POST['BCGG210_quantity'] ?? 0;
$TLC580_quantity = $_POST['TLC580_quantity'] ?? 0;
$TNPN80_quantity = $_POST['TNPN80_quantity'] ?? 0;
$TNBA80_quantity = $_POST['TNBA80_quantity'] ?? 0;
$TBA80_quantity = $_POST['TBA80_quantity'] ?? 0;
$PCL110_quantity = $_POST['PCL110_quantity'] ?? 0;
$PCLT110_quantity = $_POST['PCLT110_quantity'] ?? 0;
$PCN110_quantity = $_POST['PCN110_quantity'] ?? 0;
$PVMN110_quantity = $_POST['PVMN110_quantity'] ?? 0;
$PMLC110_quantity = $_POST['PMLC110_quantity'] ?? 0;
$PNLC110_quantity = $_POST['PNLC110_quantity'] ?? 0;
$PNAIC110_quantity = $_POST['PNAIC110_quantity'] ?? 0;
$EPTOP250_quantity = $_POST['EPTOP250_quantity'] ?? 0;
$PON130_quantity = $_POST['PON130_quantity'] ?? 0;
$BACM230F_quantity = $_POST['BACM230F_quantity'] ?? 0;
$BACM230L_quantity = $_POST['BACM230L_quantity'] ?? 0;
$BACM540_quantity = $_POST['BACM540_quantity'] ?? 0;
$PT110_quantity = $_POST['PT110_quantity'] ?? 0;
$PSANP3_quantity = $_POST['PSANP3_quantity'] ?? 0;
$PSANL_quantity = $_POST['PSANL_quantity'] ?? 0;
$payment_method = $_POST['payment_method'];
$cheque_number = $_POST['cheque_number'] ?? null;
$total_amount = $_POST['total_amount'];

// Préparation de la requête d'insertion
$sql = "INSERT INTO command_detail (order_id, vendor_name, client_name, BCCGL_quantity, EGPN170_quantity, PGNA110_quantity, PGCN110_quantity, BCGG210_quantity, TLC580_quantity, TNPN80_quantity, TNBA80_quantity, TBA80_quantity, PCL110_quantity, PCLT110_quantity, PCN110_quantity, PVMN110_quantity, PMLC110_quantity, PNLC110_quantity, PNAIC110_quantity, EPTOP250_quantity, PON130_quantity, BACM230F_quantity, BACM230L_quantity, BACM540_quantity, PT110_quantity, PSANP3_quantity, PSANL_quantity, payment_method, cheque_number, total_amount) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssiiiiiiiiiiiiiiiiiiiiiiiiiiiiisd", $order_id, $vendor_name, $client_name, $BCCGL_quantity, $EGPN170_quantity, $PGNA110_quantity, $PGCN110_quantity, $BCGG210_quantity, $TLC580_quantity, $TNPN80_quantity, $TNBA80_quantity, $TBA80_quantity, $PCL110_quantity, $PCLT110_quantity, $PCN110_quantity, $PVMN110_quantity, $PMLC110_quantity, $PNLC110_quantity, $PNAIC110_quantity, $EPTOP250_quantity, $PON130_quantity, $BACM230F_quantity, $BACM230L_quantity, $BACM540_quantity, $PT110_quantity, $PSANP3_quantity, $PSANL_quantity, $payment_method, $cheque_number, $total_amount);

if ($stmt->execute()) {
    echo "Commande ajoutée avec succès.";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
