# 🚀 Guide de Déploiement - reouven-sarah.com

## Configuration du nom de domaine

Le site est configuré pour utiliser automatiquement le nom de domaine `reouven-sarah.com` en production.

### Frontend
- **URL API** : Détection automatique
  - En développement : `http://localhost:3001`
  - En production : `https://reouven-sarah.com`

### Backend
- **CORS** : Configuré pour accepter les requêtes depuis `reouven-sarah.com`
- **Port** : 3001 (ou port configuré par l'hébergeur)

---

## 📋 Étapes de déploiement

### Option 1 : Vercel (Frontend) + Railway (Backend) - Recommandé

#### Frontend (Vercel)
1. Créer un compte sur [Vercel](https://vercel.com)
2. Connecter le repository GitHub
3. Configuration :
   - Framework Preset : Vite
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Variables d'environnement : Aucune nécessaire
5. Domaine : Ajouter `reouven-sarah.com` dans les paramètres

#### Backend (Railway)
1. Créer un compte sur [Railway](https://railway.app)
2. Nouveau projet → Deploy from GitHub
3. Sélectionner le repository
4. Configuration :
   - Root Directory : `/` (racine)
   - Start Command : `node server.js`
   - Port : Railway assigne automatiquement (variable `PORT`)
5. Variables d'environnement :
   ```
   NODE_ENV=production
   PORT=3001
   ```
6. Domaine personnalisé : Ajouter `api.reouven-sarah.com` (optionnel)

**Mise à jour du frontend** : Si tu utilises un sous-domaine pour l'API, mettre à jour `API_URL` dans `App.jsx` :
```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://api.reouven-sarah.com'; // ou l'URL fournie par Railway
```

---

### Option 2 : Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify)
1. Créer un compte sur [Netlify](https://netlify.com)
2. New site from Git → GitHub
3. Configuration :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Domaine : Ajouter `reouven-sarah.com`

#### Backend (Render)
1. Créer un compte sur [Render](https://render.com)
2. New → Web Service
3. Connecter GitHub repository
4. Configuration :
   - Build Command : `npm install`
   - Start Command : `node server.js`
   - Environment : Node
5. Variables d'environnement :
   ```
   NODE_ENV=production
   ```

---

## 🔧 Configuration DNS

Pour `reouven-sarah.com`, configurer les DNS :

### Si Frontend et Backend sur le même domaine :
```
A     @      [IP du serveur]
CNAME www    reouven-sarah.com
```

### Si Backend sur sous-domaine :
```
A     @      [IP Frontend]
CNAME api    [URL Backend Railway/Render]
```

---

## 📊 Fichier Excel en production

Le fichier Excel sera créé sur le serveur backend :
- **Localisation** : Sur le serveur où tourne le backend
- **Accès** : `https://reouven-sarah.com/api/rsvp/download` (ou l'URL de ton backend)
- **Sauvegarde** : Pense à télécharger régulièrement le fichier

### Protection recommandée
Ajouter une authentification simple pour protéger l'accès au téléchargement (optionnel).

---

## ✅ Checklist avant déploiement

- [ ] Tester le formulaire RSVP en local
- [ ] Vérifier que le fichier Excel se crée correctement
- [ ] Configurer les DNS du domaine
- [ ] Déployer le backend
- [ ] Déployer le frontend
- [ ] Tester le formulaire RSVP en production
- [ ] Vérifier l'accès au téléchargement Excel
- [ ] Tester sur mobile

---

## 🆘 En cas de problème

1. **Le formulaire ne fonctionne pas** :
   - Vérifier que le backend est démarré
   - Vérifier les CORS dans `server.js`
   - Vérifier la console du navigateur pour les erreurs

2. **Le fichier Excel ne se télécharge pas** :
   - Vérifier que le backend a les permissions d'écriture
   - Vérifier l'URL de téléchargement

3. **Erreurs CORS** :
   - Vérifier que l'origine est bien dans la liste CORS
   - Vérifier que les credentials sont correctement configurés
