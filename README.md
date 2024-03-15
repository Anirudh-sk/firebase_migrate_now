# firebase_migrate_now

``` const admin = require('firebase-admin'); // Import Firebase Admin SDK

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require('./path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-url.firebaseio.com',
});

const readData = require('your-package-name'); // Replace 'your-package-name' with the actual name of your npm package

// Example usage
const databaseType = 'realtime'; // Change this to 'firestore' if you want to read from Firestore

readData(admin, databaseType); // Pass admin SDK instance to your function

```
