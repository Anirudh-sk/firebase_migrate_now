const fs = require('fs');

async function writeDataToCSV(data, outputPath) {
  try {
    const csvRows = [];
    const allFields = new Set();
    data.forEach(item => {
      Object.keys(item.data).forEach(field => {
        allFields.add(field);
      });
    });
    // console.log('All fields:', allFields);
    const csvHeader = ['collection_name', ...allFields];
    data.forEach(item => {
      const rowData = [item.collection];
      allFields.forEach(field => {
        const value = item.data[field] || '';
        rowData.push(value);
      });
      csvRows.push(rowData.join(','));
    });
    // console.log('CSV rows:', csvRows);

    const csvContent = [csvHeader.join(','), ...csvRows].join('\n');
    // console.log('CSV content:', csvContent);
    fs.writeFileSync(outputPath, csvContent);
    console.log('Data written to CSV file:', outputPath);
    return true;
  } catch (error) {
    console.error('Error writing data to CSV:', error);
    return false;
  }
}

async function migrateFirestore(collections, outputPath) {
  try {
    const allData = [];

    collections.forEach(doc => {
      allData.push({ collection: doc.id, data: doc.data() });
    });

    await writeDataToCSV(allData, outputPath);
    return true;
  } catch (error) {
    console.error('Error migrating Firestore data:', error);
    return false;
  }
}

async function migrateRTD(db, outputPath) {
  console.log('Realtime Database migration is coming soon.');
}

module.exports = { migrateFirestore, migrateRTD };
