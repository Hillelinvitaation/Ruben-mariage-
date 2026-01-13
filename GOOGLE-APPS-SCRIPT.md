# 📊 Configuration Google Apps Script + Google Sheets

## ✅ Avantages

- ✅ **Gratuit et illimité**
- ✅ **Pas de backend à déployer**
- ✅ **Interface Google Sheets pour voir les réponses**
- ✅ **Automatique et simple**
- ✅ **Partageable facilement**

---

## 📋 Étapes de configuration

### 1. Créer un Google Sheet

1. Va sur [Google Sheets](https://sheets.google.com)
2. Crée un nouveau document
3. Nomme-le : "Réponses RSVP - Reouven & Sarah"
4. **IMPORTANT** : Note l'ID de la feuille dans l'URL
   - L'URL ressemble à : `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - L'ID est la partie entre `/d/` et `/edit` : `1ABC123...`

### 2. Préparer la structure du Sheet

**Onglet 1 : "Réponses"**
- Créer les colonnes suivantes (ligne 1 = en-têtes) :
  ```
  Date | Heure | Prénom | Nom | Présence | Houppa | Soirée | Adultes | Enfants | Total Invités | Message
  ```

**Onglet 2 : "Résumé"**
- Laisser vide, sera rempli automatiquement

### 3. Créer le Google Apps Script

1. Dans le Google Sheet, clique sur **Extensions** → **Apps Script**
2. Remplace tout le code par le script ci-dessous
3. Remplace `YOUR_SHEET_ID` par l'ID de ta feuille (de l'étape 1)

### 4. Déployer le Script

1. Clique sur **Déployer** → **Nouveau déploiement**
2. Clique sur l'icône ⚙️ (Types de déploiement)
3. Sélectionne **Application Web**
4. Configuration :
   - **Exécuter en tant que** : Moi
   - **Qui peut accéder** : Tous (n'importe qui)
5. Clique sur **Déployer**
6. **IMPORTANT** : Copie l'URL de déploiement (ressemble à : `https://script.google.com/macros/s/ABC123.../exec`)
   - C'est cette URL que tu utiliseras dans le code frontend

### 5. Autoriser le Script

- Lors de la première exécution, Google demandera des autorisations
- Clique sur **Autoriser** et accepte les permissions

### 6. Mettre à jour le Frontend

- Mettre à jour l'URL dans `App.jsx` avec l'URL du script Google

---

## 🔧 Script Google Apps Script

```javascript
// ID de ta feuille Google Sheets (à remplacer)
const SHEET_ID = 'YOUR_SHEET_ID';

// Fonction principale pour recevoir les données POST
function doPost(e) {
  try {
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir le Google Sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Réponses');
    
    // Si la feuille n'existe pas, la créer
    if (!sheet) {
      const newSheet = ss.insertSheet('Réponses');
      // Créer les en-têtes
      newSheet.getRange(1, 1, 1, 11).setValues([[
        'Date', 'Heure', 'Prénom', 'Nom', 'Présence', 'Houppa', 'Soirée', 
        'Adultes', 'Enfants', 'Total Invités', 'Message'
      ]]);
      // Style des en-têtes
      const headerRange = newSheet.getRange(1, 1, 1, 11);
      headerRange.setBackground('#B8860B');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      
      // Retourner à la nouvelle feuille
      newSheet = ss.getSheetByName('Réponses');
    }
    
    // Date et heure actuelles
    const now = new Date();
    const date = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    const time = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');
    
    // Calculer le total
    const total = (data.presence === 'oui' ? (parseInt(data.adultes) + parseInt(data.enfants)) : 0);
    
    // Préparer la nouvelle ligne
    const newRow = [
      date,
      time,
      data.prenom || '',
      data.nom || '',
      data.presence === 'oui' ? 'Oui' : 'Non',
      data.houppa ? 'Oui' : 'Non',
      data.soiree ? 'Oui' : 'Non',
      data.presence === 'oui' ? parseInt(data.adultes) : 0,
      data.presence === 'oui' ? parseInt(data.enfants) : 0,
      total,
      data.message || ''
    ];
    
    // Ajouter la ligne
    sheet.appendRow(newRow);
    
    // Mettre à jour le résumé
    updateSummary(ss);
    
    // Retourner une réponse de succès
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Réponse enregistrée avec succès'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retourner une erreur
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour mettre à jour le résumé
function updateSummary(ss) {
  let summarySheet = ss.getSheetByName('Résumé');
  if (!summarySheet) {
    summarySheet = ss.insertSheet('Résumé');
  } else {
    summarySheet.clear();
  }
  
  const dataSheet = ss.getSheetByName('Réponses');
  const data = dataSheet.getDataRange().getValues();
  
  // Sauter l'en-tête
  let totalAdultes = 0;
  let totalEnfants = 0;
  let totalPersonnes = 0;
  let nombreFamilles = 0;
  let nombrePresents = 0;
  let nombreAbsents = 0;
  let totalHouppa = 0;
  let totalSoiree = 0;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const presence = row[4]; // Présence
    const houppa = row[5]; // Houppa
    const soiree = row[6]; // Soirée
    const adultes = row[7] || 0; // Adultes
    const enfants = row[8] || 0; // Enfants
    
    nombreFamilles++;
    
    if (presence === 'Oui') {
      nombrePresents++;
      totalAdultes += adultes;
      totalEnfants += enfants;
      totalPersonnes += (adultes + enfants);
      
      if (houppa === 'Oui') totalHouppa++;
      if (soiree === 'Oui') totalSoiree++;
    } else {
      nombreAbsents++;
    }
  }
  
  // Créer le résumé
  summarySheet.getRange(1, 1, 1, 2).setValues([['RÉSUMÉ DES INVITATIONS', '']]);
  summarySheet.getRange(2, 1, 1, 2).setValues([['', '']]);
  summarySheet.getRange(3, 1, 1, 2).setValues([['GÉNÉRAL', '']]);
  summarySheet.getRange(4, 1).setValue('Nombre de familles');
  summarySheet.getRange(4, 2).setValue(nombreFamilles);
  summarySheet.getRange(5, 1).setValue('Familles présentes');
  summarySheet.getRange(5, 2).setValue(nombrePresents);
  summarySheet.getRange(6, 1).setValue('Familles absentes');
  summarySheet.getRange(6, 2).setValue(nombreAbsents);
  summarySheet.getRange(7, 1, 1, 2).setValues([['', '']]);
  summarySheet.getRange(8, 1, 1, 2).setValues([['TOTAUX GÉNÉRAUX', '']]);
  summarySheet.getRange(9, 1).setValue('Total adultes');
  summarySheet.getRange(9, 2).setValue(totalAdultes);
  summarySheet.getRange(10, 1).setValue('Total enfants');
  summarySheet.getRange(10, 2).setValue(totalEnfants);
  summarySheet.getRange(11, 1).setValue('TOTAL INVITÉS');
  summarySheet.getRange(11, 2).setValue(totalPersonnes);
  summarySheet.getRange(12, 1, 1, 2).setValues([['', '']]);
  summarySheet.getRange(13, 1, 1, 2).setValues([['HOUPPA', '']]);
  summarySheet.getRange(14, 1).setValue('Familles présentes à la Houppa');
  summarySheet.getRange(14, 2).setValue(totalHouppa);
  summarySheet.getRange(15, 1, 1, 2).setValues([['', '']]);
  summarySheet.getRange(16, 1, 1, 2).setValues([['SOIRÉE', '']]);
  summarySheet.getRange(17, 1).setValue('Familles présentes à la soirée');
  summarySheet.getRange(17, 2).setValue(totalSoiree);
  
  // Style
  summarySheet.getRange(1, 1, 1, 2).merge().setBackground('#FFF7CE').setFontWeight('bold').setFontSize(16);
  summarySheet.getRange(3, 1, 1, 2).merge().setBackground('#FFF7CE').setFontWeight('bold');
  summarySheet.getRange(8, 1, 1, 2).merge().setBackground('#FFF7CE').setFontWeight('bold');
  summarySheet.getRange(11, 1, 1, 2).merge().setBackground('#B8860B').setFontColor('#FFFFFF').setFontWeight('bold').setFontSize(14);
  summarySheet.getRange(13, 1, 1, 2).merge().setBackground('#FFF7CE').setFontWeight('bold');
  summarySheet.getRange(16, 1, 1, 2).merge().setBackground('#FFF7CE').setFontWeight('bold');
  
  // Largeur des colonnes
  summarySheet.setColumnWidth(1, 250);
  summarySheet.setColumnWidth(2, 150);
}

// Fonction pour tester (optionnel)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Google Apps Script fonctionne !'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 🔗 Mettre à jour le Frontend

Une fois le script déployé, mettre à jour `App.jsx` :

1. Remplacer l'URL de l'API par l'URL du script Google
2. Le code reste identique, seule l'URL change

---

## ✅ Avantages de cette solution

- ✅ **100% gratuit**
- ✅ **Pas de déploiement backend**
- ✅ **Interface Google Sheets intégrée**
- ✅ **Partageable facilement** (tu peux partager le Sheet)
- ✅ **Automatique** (le résumé se met à jour automatiquement)
- ✅ **Pas de maintenance serveur**
