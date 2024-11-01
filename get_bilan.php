<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "https://aws-0-us-east-1.pooler.supabase.com:5432";
$username = "postgres.pjbhjhjmcxyiapzlqdpo";
$password = "3c9bQQsEK5?4";
$dbname = "postgres";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "La connexion a échoué : " . $conn->connect_error]));
}

// Récupération des données
$sql = "SELECT 
    SUM(BCCGL_quantity) as BCCGL,
    SUM(EGPN170_quantity) as EGPN170,
    SUM(PGNA110_quantity) as PGNA110,
    SUM(PGCN110_quantity) as PGCN110,
    SUM(BCGG210_quantity) as BCGG210,
    SUM(TLC580_quantity) as TLC580,
    SUM(TNPN80_quantity) as TNPN80,
    SUM(TNBA80_quantity) as TNBA80,
    SUM(TBA80_quantity) as TBA80,
    SUM(PCL110_quantity) as PCL110,
    SUM(PCLT110_quantity) as PCLT110,
    SUM(PCN110_quantity) as PCN110,
    SUM(PVMN110_quantity) as PVMN110,
    SUM(PMLC110_quantity) as PMLC110,
    SUM(PNLC110_quantity) as PNLC110,
    SUM(PNAIC110_quantity) as PNAIC110,
    SUM(EPTOP250_quantity) as EPTOP250,
    SUM(PON130_quantity) as PON130,
    SUM(BACM230F_quantity) as BACM230F,
    SUM(BACM230L_quantity) as BACM230L,
    SUM(BACM540_quantity) as BACM540,
    SUM(PT110_quantity) as PT110,
    SUM(PSANP3_quantity) as PSANP3,
    SUM(PSANL_quantity) as PSANL,
    SUM(total_amount) as total_amount
FROM BDC_Elhuyar";

$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Erreur lors de la récupération des données : " . $conn->error]);
}

$conn->close();
?>
