const admin = require('firebase-admin');
const path = require('path');
/ Ruta al archivo JSON de la cuenta de servicio
const serviceAccount = require(path.join(__dirname, 'config/firebaseServiceAccount.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Opcional: Si necesitas especificar la URL de tu base de datos, agrega la siguiente línea:
  // databaseURL: 'https://<your-project-id>.firebaseio.com'
});

// Exporta la instancia de Firestore
const db = admin.firestore();

module.exports = { admin, db };