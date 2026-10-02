// Catalogue Antton — Partenariat Noël 2026 (bon de commande édition du 01/08/2026).
// Source unique : le bon de commande et les récapitulatifs sont générés à partir de cette liste.
// "code" = code article Antton ; la quantité est enregistrée dans la colonne "<code>_quantity" de BDCElhuyar.
const CATALOGUE = [
    {
        categorie: 'Spécialités',
        produits: [
            { code: 'BCCOL',    nom: 'Praliné Cœur Croquant – Lait',                         boitage: 'Boîte carton', poids: '210 g', prix: 16.70 },
            { code: 'EGPN170',  nom: "Ganache au Piment d'Espelette – Noir",                  boitage: 'Étui',         poids: '170 g', prix: 14.70 },
            { code: 'PGNA110',  nom: 'Ganache Nature – Chocolat Noir',                        boitage: 'Poche',        poids: '110 g', prix: 8.60 },
            { code: 'PPMAIS',   nom: 'Praliné Amande et Maïs – Noir',                         boitage: 'Poche',        poids: '110 g', prix: 8.60 },
            { code: 'BCGCS',    nom: 'Ganache Caramel au Sel de Salies de Béarn – Lait',      boitage: 'Boîte carton', poids: '210 g', prix: 16.70 },
        ],
    },
    {
        categorie: 'Tablettes',
        produits: [
            { code: 'TLCS80A',   nom: 'Tablette Lait Caramel Sel de Salies de Béarn',         boitage: 'Étui', poids: '80 g', prix: 5.80 },
            { code: 'TNP80',     nom: 'Tablette Noir Piment',                                 boitage: 'Étui', poids: '80 g', prix: 5.80 },
            { code: 'TNCER80A',  nom: 'Tablette Noir Cerise',                                 boitage: 'Étui', poids: '80 g', prix: 5.80 },
            { code: 'TNCAM80',   nom: 'Tablette Origine Cameroun – Noir 80 %',                boitage: 'Étui', poids: '80 g', prix: 6.00, nouveau: true },
            { code: 'TLVENEZ80', nom: 'Tablette Origine Venezuela – Lait 43 %',               boitage: 'Étui', poids: '80 g', prix: 6.00, nouveau: true },
        ],
    },
    {
        categorie: 'Gourmandises à Grignoter',
        produits: [
            { code: 'PCL110',  nom: 'Céréale Croustillante Chocolat Lait',                    boitage: 'Poche', poids: '110 g', prix: 7.85 },
            { code: 'PCLC110', nom: 'Céréale Croustillante Chocolat Lait Caramel',            boitage: 'Poche', poids: '110 g', prix: 7.85 },
            { code: 'PCN110',  nom: 'Céréale Croustillante Chocolat Noir',                    boitage: 'Poche', poids: '110 g', prix: 7.85 },
            { code: 'PVMN110', nom: 'Mendiant Noir Fruits Secs',                              boitage: 'Poche', poids: '110 g', prix: 8.90 },
            { code: 'PVML110', nom: 'Mendiant Lait Fruits Secs',                              boitage: 'Poche', poids: '110 g', prix: 8.90 },
            { code: 'PNLC110', nom: 'Noisettes Lait Poudre de Cacao',                         boitage: 'Poche', poids: '110 g', prix: 8.20 },
            { code: 'PANC110', nom: 'Amandes Noir Poudre de Cacao',                           boitage: 'Poche', poids: '110 g', prix: 8.20 },
            { code: 'ETPOF',   nom: 'Pâtes de Fruits – Pomme Framboise',                      boitage: 'Étui',  poids: '250 g', prix: 9.95 },
            { code: 'OPN240',  nom: 'Pâte à Tartiner Chocolat Noir Noisettes',                boitage: 'Pot',   poids: '240 g', prix: 8.95 },
            { code: 'OPLC240', nom: 'Pâte à Tartiner Chocolat Lait Caramel Amandes',          boitage: 'Pot',   poids: '240 g', prix: 8.95, nouveau: true },
        ],
    },
    {
        categorie: 'Assortiments de Bonbons de Chocolat',
        produits: [
            { code: 'BACM230A', nom: "24 Ganaches, Pralinés, Pâtes d'Amandes – Noir et Lait", boitage: 'Ballotin',     poids: '230 g', prix: 17.60 },
            { code: 'BACN230',  nom: "24 Ganaches, Pralinés, Pâtes d'Amandes – Noir",         boitage: 'Ballotin',     poids: '230 g', prix: 17.60 },
            { code: 'BCACM540', nom: "54 Ganaches, Pralinés, Pâtes d'Amandes – Noir et Lait", boitage: 'Boîte cadeau', poids: '530 g', prix: 41.90 },
            { code: 'BCNN',     nom: '18 Ganaches « Origine » Sao Tomé 72 % Noir, Madagascar 62 % Noir, Venezuela 43 % Lait', boitage: 'Coffret', poids: '180 g', prix: 21.00, nouveau: true },
        ],
    },
    {
        categorie: 'Chocolats de Noël',
        produits: [
            { code: 'BDFC',  nom: 'Assortiment Douceurs Fruitées et Chocolatées',             boitage: 'Boîte festive', poids: '400 g', prix: 28.00, nouveau: true },
            { code: 'PT110', nom: 'Truffe au Rhum Chocolat Noir',                             boitage: 'Poche',         poids: '110 g', prix: 8.60 },
        ],
    },
    {
        categorie: 'Le Coin des Enfants',
        produits: [
            { code: 'PSANP3', nom: 'Moulage Sapin et sa Garniture',                           boitage: 'Poche', poids: '180 g', prix: 11.50, nouveau: true },
            { code: 'PSANL',  nom: 'Mini Tablette Noël et sa Garniture',                      boitage: 'Poche', poids: '110 g', prix: 6.95 },
        ],
    },
];

// Liste à plat de tous les produits, dans l'ordre du bon de commande
const PRODUITS = CATALOGUE.flatMap(c => c.produits);
