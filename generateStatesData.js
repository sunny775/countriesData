const fs = require('fs');
const path = require('path');

// Function to create individual country files
function createCountryFiles(data) {
  const outputDir = path.join(__dirname, 'countries_states');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  data.data.forEach(country => {
    const filename = `${country.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    const filePath = path.join(outputDir, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(country, null, 2));
    console.log(`Created file: ${filename}`);
  });

  console.log(`\nProcess complete. ${data.data.length} country files created in '${outputDir}' directory.`);
}


fs.readFile('statesData.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    createCountryFiles(data);
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }
});
