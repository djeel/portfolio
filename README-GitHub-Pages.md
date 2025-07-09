# Jules Beaugrand - Portfolio

Un site portfolio minimaliste et moderne avec des animations fluides, parfaitement optimisé pour GitHub Pages.

## 🚀 Déploiement sur GitHub Pages

### Étapes pour déployer :

1. **Créer un nouveau repository sur GitHub**
   - Allez sur [GitHub](https://github.com)
   - Cliquez sur "New repository"
   - Nommez-le `portfolio` ou `jules-beaugrand-portfolio`
   - Rendez-le public
   - Ne pas initialiser avec README (nous avons déjà les fichiers)

2. **Préparer les fichiers pour GitHub Pages**
   - Renommez `index-static.html` en `index.html`
   - Les fichiers nécessaires sont : `index.html`, `styles.css`, `script-static.js`

3. **Uploader les fichiers**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/votre-username/portfolio.git
   git push -u origin main
   ```

4. **Activer GitHub Pages**
   - Allez dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Cliquez Save

5. **Votre site sera disponible à :**
   `https://votre-username.github.io/portfolio`

### Version statique pour GitHub Pages

La version statique inclut :
- ✅ Animation de chargement identique
- ✅ Effets de texte et animations
- ✅ Design responsive
- ✅ Effets de survol 3D
- ✅ Toutes les fonctionnalités visuelles
- ✅ Pas besoin de serveur Node.js

### Fichiers nécessaires pour GitHub Pages :

- `index.html` (renommer index-static.html)
- `styles.css` (inchangé)
- `script-static.js` (version sans HTMX)

### Alternative : Utiliser directement les fichiers statiques

Si vous voulez éviter le serveur, vous pouvez simplement :
1. Renommer `index-static.html` en `index.html`
2. Supprimer les fichiers serveur (`server.js`, `package.json`)
3. Ouvrir directement `index.html` dans votre navigateur

## 🎨 Personnalisation

Pour modifier le contenu, éditez la fonction `loadPortfolioContent()` dans `script-static.js`.

## 📱 Fonctionnalités

- **Design minimaliste** avec palette de couleurs moderne
- **Animations fluides** et effets de transition
- **Responsive design** pour tous les appareils
- **Performance optimisée** pour le web
- **Compatible GitHub Pages** sans serveur requis

Votre portfolio sera en ligne en quelques minutes ! 🎉
