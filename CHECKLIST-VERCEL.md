# ✅ Checklist après déploiement sur Vercel

## ⚠️ Important : Vercel = Frontend uniquement

Vercel héberge seulement le **frontend** (site React). Le **backend** (serveur Node.js avec Express pour l'Excel) doit être déployé séparément.

---

## 🔴 À FAIRE : Déployer le Backend

### Option 1 : Railway (Recommandé - Gratuit au début)

1. **Créer un compte** : [railway.app](https://railway.app)
2. **Nouveau projet** → "Deploy from GitHub repo"
3. **Sélectionner** ton repository
4. **Configuration** :
   - Root Directory : `/` (racine)
   - Start Command : `node server.js`
   - Build Command : `npm install`
5. **Variables d'environnement** :
   ```
   NODE_ENV=production
   PORT=3001
   ```
6. **Domain personnalisé** (optionnel mais recommandé) :
   - Railway fournira une URL comme : `votre-app.railway.app`
   - Ou configurer un sous-domaine : `api.reouven-sarah.com`

### Option 2 : Render (Alternative gratuite)

1. **Créer un compte** : [render.com](https://render.com)
2. **New** → "Web Service"
3. **Connecter** ton repository GitHub
4. **Configuration** :
   - Build Command : `npm install`
   - Start Command : `node server.js`
   - Environment : Node
5. **Variables d'environnement** :
   ```
   NODE_ENV=production
   ```
6. **Domain personnalisé** (optionnel) : `api.reouven-sarah.com`

---

## 🔧 Mise à jour du Frontend (si backend sur sous-domaine)

Si tu utilises un sous-domaine pour le backend (ex: `api.reouven-sarah.com`), il faut mettre à jour `App.jsx` :

**Avant** (ligne 6-8) :
```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://reouven-sarah.com';
```

**Après** (si backend sur Railway/Render) :
```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://votre-backend.railway.app'; // ou l'URL fournie par Railway/Render
```

**OU si tu utilises un sous-domaine** :
```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://api.reouven-sarah.com';
```

---

## ✅ Checklist complète

### Frontend (Vercel) ✅
- [x] Déployé sur Vercel
- [ ] Vérifier que le site fonctionne : https://reouven-sarah.com
- [ ] Tester le formulaire RSVP (ne fonctionnera pas tant que le backend n'est pas déployé)

### Backend (Railway/Render) ⚠️
- [ ] Créer un compte Railway ou Render
- [ ] Déployer le backend (`server.js`)
- [ ] Configurer les variables d'environnement
- [ ] Obtenir l'URL du backend (ex: `votre-app.railway.app`)
- [ ] Mettre à jour `API_URL` dans `App.jsx` si nécessaire
- [ ] Re-déployer le frontend sur Vercel après modification
- [ ] Tester le formulaire RSVP en production

### Configuration DNS (si sous-domaine)
- [ ] Si tu utilises `api.reouven-sarah.com` :
  - Configurer un CNAME dans les DNS
  - Pointant vers l'URL Railway/Render

---

## 🧪 Tests à faire

1. **Tester le site** : https://reouven-sarah.com
2. **Tester le formulaire RSVP** :
   - Remplir le formulaire
   - Vérifier qu'il envoie les données
   - Vérifier qu'il affiche le message de confirmation
3. **Télécharger le fichier Excel** :
   - Aller sur : `https://votre-backend-url.com/api/rsvp/download`
   - Vérifier que le fichier Excel se télécharge
   - Vérifier qu'il contient les réponses

---

## 🆘 Problèmes courants

### Le formulaire RSVP ne fonctionne pas
- **Cause** : Le backend n'est pas déployé ou l'URL est incorrecte
- **Solution** : Vérifier que le backend est déployé et que `API_URL` est correct

### Erreur CORS
- **Cause** : Le backend n'accepte pas les requêtes depuis le domaine
- **Solution** : Vérifier la configuration CORS dans `server.js`

### Le fichier Excel ne se télécharge pas
- **Cause** : URL incorrecte ou backend non démarré
- **Solution** : Vérifier l'URL du backend et que le serveur tourne

---

## 📞 Besoin d'aide ?

Une fois le backend déployé, je peux t'aider à :
- Mettre à jour l'URL dans le code
- Configurer les DNS pour un sous-domaine
- Tester que tout fonctionne
