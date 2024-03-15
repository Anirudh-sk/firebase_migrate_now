# firebase_migrate_now

``` 
const admin = require('firebase-admin');
const migrateData = require('firebase_migrate_now');

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require('./path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-url.firebaseio.com',
});

const outputPath = './output/data.csv'; // Specify the path where you want to save the CSV file
const databaseType = 'firestore'; // Change to 'realtime' if you want to read from Realtime Database

migrateData(admin, databaseType, outputPath)
  .then(() => console.log('Data migration to CSV completed successfully.'))
  .catch(error => console.error('Error:', error));


```
