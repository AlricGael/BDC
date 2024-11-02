document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('order-form');
    const quantities = form.querySelectorAll('.quantity');
    const totalProduitsElement = document.getElementById('total-produits');
    const totalCommandeElement = document.getElementById('total-commande');
    const paymentMethod = document.getElementById('payment-method');
    const chequeNumberContainer = document.getElementById('cheque-number-container');
    const chequeNumber = document.getElementById('cheque-number');
    const clientName = document.getElementById('client_name');
    const resellerName = document.getElementById('vendor_name');
    const resellerClass = document.getElementById('reseller-class');
    const classNumberContainer = document.getElementById('class-number-container');
    const classNumber = document.getElementById('class-number');
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';

    // Initialiser Supabase
    const supabaseUrl = 'https://pjbhjhjmcxyiapzlqdpo.supabase.co'; // Remplacez par votre URL Supabase
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqYmhqaGptY3h5aWFwemxxZHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NjY3MzUsImV4cCI6MjA0NjA0MjczNX0.p1nDmQ2mIpJRVZAaZIOT0db4MQZJV6V0TRILpoJ3UOs'; // Remplacez par votre clé publique
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    function updateTotals() {
        let totalProduits = 0;
        let totalCommande = 0;

        quantities.forEach(quantity => {
            const price = parseFloat(quantity.dataset.price);
            const qty = parseInt(quantity.value) || 0;

            totalProduits += qty;
            totalCommande += qty * price;

            const row = quantity.closest('tr');
            const productTotalElement = row.querySelector('.product-total');
            productTotalElement.textContent = (qty * price).toFixed(2) + '€';
        });

        totalProduitsElement.textContent = totalProduits + ' produits';
        totalCommandeElement.textContent = totalCommande.toFixed(2) + '€';

        return { totalProduits, totalCommande };
    }

    quantities.forEach(quantity => {
        quantity.addEventListener('input', updateTotals);
    });

    updateTotals();

    paymentMethod.addEventListener('change', function() {
        if (this.value === 'cheque') {
            chequeNumberContainer.style.display = 'block';
            chequeNumber.required = true;
        } else {
            chequeNumberContainer.style.display = 'none';
            chequeNumber.required = false;
            chequeNumber.value = '';
        }
    });

    resellerClass.addEventListener('change', function() {
        classNumberContainer.style.display = this.value ? 'block' : 'none';
        classNumber.innerHTML = '<option value="">Sélectionner le numéro de la classe</option>';
        if (this.value) {
            for (let i = 1; i <= 10; i++) {
                classNumber.innerHTML += `<option value="${i}">${i}</option>`;
            }
        }
    });

    function resetForm(keepResellerInfo) {
        quantities.forEach(quantity => {
            quantity.value = '0';
        });

        paymentMethod.value = 'cash';
        chequeNumberContainer.style.display = 'none';
        chequeNumber.value = '';

        clientName.value = '';

        if (!keepResellerInfo) {
            resellerName.value = '';
            resellerClass.value = '';
            classNumberContainer.style.display = 'none';
            classNumber.innerHTML = '<option value="">Sélectionner le numéro de la classe</option>';
        }

        updateTotals();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        errorMessage.textContent = '';

        if (!clientName.value.trim()) {
            errorMessage.textContent = 'Veuillez entrer le nom du client.';
            clientName.parentNode.insertBefore(errorMessage, clientName.nextSibling);
            clientName.focus();
            return;
        }

        if (!resellerName.value.trim()) {
            errorMessage.textContent = 'Veuillez entrer le nom du vendeur.';
            resellerName.parentNode.insertBefore(errorMessage, resellerName.nextSibling);
            resellerName.focus();
            return;
        }

        if (paymentMethod.value === 'cheque' && !chequeNumber.value.trim()) {
            errorMessage.textContent = 'Veuillez entrer le numéro de chèque.';
            chequeNumber.parentNode.insertBefore(errorMessage, chequeNumber.nextSibling);
            chequeNumber.focus();
            return;
        }

        const { totalProduits, totalCommande } = updateTotals();

        const resumeMessage = `Résumé de la commande :
            Nombre total d'articles : ${totalProduits}
            Montant total : ${totalCommande.toFixed(2)}€

            Êtes-vous sûr de vouloir soumettre cette commande ?`;

        if (confirm(resumeMessage)) {
            if (confirm('Confirmez-vous la soumission de la commande ?')) {
                const keepResellerInfo = confirm('Voulez-vous garder les informations du vendeur pour la prochaine commande ?');
                resetForm(keepResellerInfo);
            }
        }
    });

    // Ajout de l'événement pour le bouton de test de connexion
    document.getElementById('test-connection-button').addEventListener('click', async function() {
        // Informations de connexion
        const user = 'postgres.pjbhjhjmcxyiapzlqdpo';
        const password = '3c9bQQsEK5?4';
        const dbname = 'postgres';
        const host = 'aws-0-us-east-1.pooler.supabase.com';
        const port = '5432';

        // Tester la connexion à la base de données
        const { data, error } = await supabase
            .from('BDC_Elhuyar') // Remplacez par le nom de votre table
            .select('*')
            .limit(1);

        const resultDiv = document.getElementById('connection-result');
        if (error) {
            resultDiv.innerHTML = '<p style="color: red;">Erreur de connexion : ' + error.message + '</p>';
        } else {
            resultDiv.innerHTML = '<p style="color: green;">Connexion réussie à la base de données.</p>';
        }
    });
});