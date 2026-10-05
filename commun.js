// Outils partagés par toutes les pages (à charger après supabase-js et produits.js).

// Connexion Supabase — table des commandes : BDCElhuyar
const db = supabase.createClient(
    'https://pjbhjhjmcxyiapzlqdpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqYmhqaGptY3h5aWFwemxxZHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NjY3MzUsImV4cCI6MjA0NjA0MjczNX0.p1nDmQ2mIpJRVZAaZIOT0db4MQZJV6V0TRILpoJ3UOs'
);
const TABLE = 'BDCElhuyar';

// Charge toutes les commandes (null en cas d'erreur, avec un message à l'écran)
async function chargerCommandes(order = 'order_id') {
    const { data, error } = await db.from(TABLE).select('*').order(order, { ascending: true });
    if (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast('Impossible de charger les commandes : ' + error.message, 'error');
        return null;
    }
    return data;
}

// Formats
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const formatEuros = n => euros.format(Number(n) || 0);
const formatDate = value => value ? new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
const formatClasse = orderId => {
    const s = String(orderId ?? '');
    return s.length >= 2 ? `${s[0]}e${s.slice(1)}` : s;
};
const formatPaiement = item => item.payment_method === 'cheque' ? `Chèque${item.cheque_number ? ' n° ' + item.cheque_number : ''}` : 'Espèces';
const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Quantité d'un produit dans une commande
const quantite = (item, produit) => Number(item[produit.code + '_quantity']) || 0;
const nbArticles = item => PRODUITS.reduce((sum, p) => sum + quantite(item, p), 0);

// Notification discrète en bas de l'écran
function toast(message, type = 'success') {
    let zone = document.getElementById('toasts');
    if (!zone) {
        zone = document.createElement('div');
        zone.id = 'toasts';
        document.body.appendChild(zone);
    }
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.textContent = message;
    zone.appendChild(el);
    setTimeout(() => el.classList.add('toast-out'), type === 'error' ? 6000 : 2800);
    setTimeout(() => el.remove(), type === 'error' ? 6400 : 3200);
}

// Export CSV lisible directement par Excel (séparateur ; et accents conservés)
function telechargerCsv(nomFichier, lignes) {
    const cellule = v => {
        const s = typeof v === 'number' ? String(v).replace('.', ',') : String(v ?? '');
        return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const contenu = '﻿' + lignes.map(l => l.map(cellule).join(';')).join('\r\n');
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(new Blob([contenu], { type: 'text/csv;charset=utf-8' }));
    lien.download = nomFichier;
    lien.click();
    URL.revokeObjectURL(lien.href);
}

// Toutes les commandes au format tableau (en-tête + une ligne par commande)
function lignesCommandes(data) {
    return [
        ['N°', 'Date', 'Classe', 'Vendeur', 'Client', ...PRODUITS.map(p => `${p.code} - ${p.nom}`), 'Articles', 'Paiement', 'N° chèque', 'Montant'],
        ...data.map(item => [
            item.id, formatDate(item.creation_date), formatClasse(item.order_id), item.vendor_name, item.client_name,
            ...PRODUITS.map(p => quantite(item, p)),
            nbArticles(item), item.payment_method === 'cheque' ? 'Chèque' : 'Espèces', item.cheque_number || '', Number(item.total_amount) || 0,
        ]),
    ];
}
