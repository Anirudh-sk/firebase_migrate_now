async function readData(adminSdk, databaseType) {
    try {
      let data;
      if (databaseType === 'realtime') {
        const snapshot = await adminSdk.database().ref().once('value');
        data = snapshot.val();
      } else if (databaseType === 'firestore') {
        const collections = await adminSdk.firestore().listCollections();
        const allData = [];
  
        for (const collectionRef of collections) {
          const querySnapshot = await collectionRef.get();
          const collectionData = querySnapshot.docs.map(doc => doc.data());
          allData.push({ collection: collectionRef.id, data: collectionData });
        }
  
        data = allData;
      } else {
        throw new Error('Invalid database type. Please specify "realtime" or "firestore".');
      }
  
      console.log('Data:', data);
      return data;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }
  
  module.exports = readData;
  