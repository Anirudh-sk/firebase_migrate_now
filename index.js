const fs = require('fs');

async function writeDataToCSV(data, outputPath) {
  try {
    const csvHeader = ['Collection', 'Data'];

    // Convert data to CSV format
    const csvRows = [];
    for (const item of data) {
      const rowData = [item.collection, JSON.stringify(item.data)];
      csvRows.push(rowData.join(','));
    }
    const csvContent = [csvHeader.join(','), ...csvRows].join('\n');

    // Write CSV content to file
    fs.writeFileSync(outputPath, csvContent);
    console.log('Data written to CSV file:', outputPath);
    return true;
  } catch (error) {
    console.error('Error writing data to CSV:', error);
    return false;
  }
}

async function readData(adminSdk, databaseType, outputPath) {
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

    // Write data to CSV file
    await writeDataToCSV(data, outputPath);
    
    return data;
  } catch (error) {
    console.error('Error reading data or writing to CSV:', error);
    return null;
  }
}

module.exports = readData;
