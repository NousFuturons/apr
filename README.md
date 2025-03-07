Une app de cartographie contributive pour l'Atlas Poétique de la Rance

## Configuration MongoDB (pour macOS)

### Installation
1. Installer via Homebrew
```bash
brew tap mongodb/brew
brew install mongodb-community
```
2. Démarrer MongoDB
```bash
brew services start mongodb-community
```
- Utilisation
    - Démarrer : npm run mongo:start
    - Arrêter : npm run mongo:stop
    - Statut : npm run mongo:status
    - Shell : mongosh
- Structure des données
    - URI développement : mongodb://localhost:27017/mon-app-vue
    - Répertoire des données : ~/data/db
    - Logs : ~/data/log/mongodb/mongo.log
### Sécurité et Bonnes Pratiques
1. Ajouter au .gitignore 
```plaintext
# MongoDB
data/
*.log
mongod.conf
```
2. ajouter à .env
```plaintext
MONGODB_URI=mongodb://localhost:27017/mon-app-vue
```
3. Monitoring dans le code
```javascript
// server/config/database.js
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
```
### Résolution des problèmes courants
1. Erreur de permission
```bash
# Si erreur d'accès aux dossiers
sudo chown -R `whoami` ~/data/db ~/data/log/mongodb
```
2. Port déjà utilisé
```bash
# Vérifier les processus sur le port 27017
lsof -i :27017

# Arrêter le processus
kill <PID>

```

