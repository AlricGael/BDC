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

    document.getElementById('test-connection-button').addEventListener('click', function() {
        // Informations de connexion
        const user = 'postgres.pjbhjhjmcxyiapzlqdpo';
        const password = '3c9bQQsEK5?4';
        const dbname = 'postgres';
        const host = 'aws-0-us-east-1.pooler.supabase.com';
        const port = '5432';

        // Créer une requête pour tester la connexion
        fetch('http://localhost:3000/test-connection', { // Remplacez par l'URL de votre API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                password: password,
                dbname: dbname,
                host: host,
                port: port
            })
        })
        .then(response => response.json())
        .then(data => {
            // Afficher le résultat de la connexion
            const resultDiv = document.getElementById('connection-result');
            if (data.success) {
                resultDiv.innerHTML = '<p style="color: green;">Connexion réussie à la base de données.</p>';
            } else {
                resultDiv.innerHTML = '<p style="color: red;">Erreur de connexion : ' + data.error + '</p>';
            }
        })
        .catch(error => {
            const resultDiv = document.getElementById('connection-result');
            resultDiv.innerHTML = '<p style="color: red;">Erreur : ' + error.message + '</p>';
        });
    });
});