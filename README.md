
<p align="center">
  <img src="https://github.com/Anirudh-sk/aet-npm-package/blob/master/assets/aet.png" alt="Firebase Migrate Now Logo"/>
</p>

<p align="center">Migrate From Firebase</p>

<p align="center">No more vendor lock-in for Firebase. Use our package to convert your Firestore data into a CSV file.</p>

## Installation

Install via NPM:

```bash
npm install firebase_migrate_now
```

## Usage

```javascript
const { initializeApp } = require('firebase/app');
const { migrateFirestore } = require('firebase_migrate_now');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, 'user_data'); // Replace 'user_data' with your actual collection name
const outputPath = './data.csv';

async function fetchAndMigrateData() {
  try {
    const collections = await getDocs(userCollection);

    await migrateFirestore(collections.docs, outputPath);

    console.log('Firestore data migration completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndMigrateData();
```

## migrateFirestore()

| Parameter    | Type                  | Description           |
| :----------- | :-------------------- | :-------------------- |
| `collections`| `firestore Collection`| Firestore collection  |
| `outputPath` | `string`              | Path of the CSV file  |

## Contributing

We welcome pull requests. For major changes, please open an issue first to discuss what you would like to change.

Please ensure to update tests as appropriate.

## Authors

- K Sai Anirudh - Designated Partner at Aivirex Innovations LLP
  - Company Website: [Aivirex Innovations LLP](https://aivirex.in)
  - LinkedIn: [K Sai Anirudh](https://www.linkedin.com/in/sai-anirudh-415001168/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---