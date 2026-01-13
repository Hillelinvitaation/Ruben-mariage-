# Backend RSVP - Instructions

## 🚀 Démarrage

### Option 1 : Démarrage séparé
```bash
# Terminal 1 : Backend
npm run server

# Terminal 2 : Frontend  
npm run dev
```

### Option 2 : Démarrage simultané (recommandé)
```bash
npm run dev:full
```

## 📊 Fichier Excel

Le fichier Excel `rsvp-reponses.xlsx` sera créé automatiquement à la racine du projet.

### Structure du fichier :

**Feuille "Réponses"** :
- Date et heure de chaque réponse
- Prénom et nom
- Nombre d'adultes
- Nombre d'enfants
- Total invités
- Message optionnel

**Feuille "Résumé"** :
- Nombre de familles
- Total adultes
- Total enfants
- **TOTAL INVITÉS** (mise en évidence)

### Télécharger le fichier Excel :
```
http://localhost:3001/api/rsvp/download
```

## ✨ Fonctionnalités

- ✅ Réception automatique des réponses RSVP
- ✅ Fichier Excel avec formatage élégant (couleurs or, bordures)
- ✅ Résumé automatique mis à jour à chaque nouvelle réponse
- ✅ Totaux calculés automatiquement
- ✅ Date et heure de chaque réponse enregistrées
