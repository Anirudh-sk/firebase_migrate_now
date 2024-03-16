const fs = require('fs');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');

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

async function readData(app, databaseType, outputPath) {
  try {
    let data;
    const db = getFirestore(app);

    if (databaseType === 'realtime') {
      // Implement Realtime Database reading logic here if needed
      throw new Error('Realtime Database reading is not supported in this package.');
    } else if (databaseType === 'firestore') {
      const collections = await getDocs(collection(db, 'your-collection-name')); // Replace with your actual collection name
      const allData = [];

      collections.forEach(doc => {
        allData.push({ collection: doc.id, data: doc.data() });
      });

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
