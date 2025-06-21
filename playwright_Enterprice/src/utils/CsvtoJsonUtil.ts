
import * as fs from 'fs';
import path from 'path';
/*
const CSVToJSON = (data: string, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
      .slice(data.indexOf('\n') + 1)
      .split('\n')
      .map((v: string) => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj: { [x: string]: never; }, title: string, index: string | number) => ((obj[title.trim()] = values[index].trim()), obj),
          {}
        );
      });
  };
*/
  const CSVToJSON = (data: string, delimiter = ',') => {
    const lines = data.trim().split('\n');
    if (lines.length < 2) return []; // Return an empty array if no data

    const titles = lines[0].split(delimiter).map(title => title.trim());

    return lines.slice(1).map((line) => {
        const values = line.split(delimiter).map(value => value.trim());
        return titles.reduce((obj: Record<string, string>, title, index) => {
            obj[title] = values[index] || ''; // Handle missing values
            return obj;
        }, {});
    });
};


//   console.log(CSVToJSON('col1,col2\na,b\nc,d'));
// Example usage
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'config' folder
const testdataDir = path.resolve(srcDir, "testdata");
/*
 export  const convertCsvFileToJsonFile = (csvFileName: string, jsonFileName: string, delimiter = ',') => {
    try {
      // Read the CSV file
      const csvData = fs.readFileSync(`${testdataDir}\\${csvFileName}`, 'utf8');
  
      // Convert CSV to JSON
      const jsonData = CSVToJSON(csvData, delimiter);
  
      // Write JSON data to a new file
      fs.writeFileSync(`${testdataDir}\\${jsonFileName}`, JSON.stringify(jsonData, null, 2));
  
      console.log(`Conversion completed. JSON data written to: ${testdataDir}\\${jsonFileName}`);
    } catch (error) {
      console.error('Error converting CSV to JSON:', error.message);
    }
  };
*/
  export const convertCsvFileToJsonFile = (csvFileName: string, jsonFileName: string, delimiter = ',') => {
    try {
        // Resolve file paths properly
        const csvFilePath = path.join(testdataDir, csvFileName);
        const jsonFilePath = path.join(testdataDir, jsonFileName);

        // Read the CSV file
        const csvData = fs.readFileSync(csvFilePath, 'utf8');

        // Convert CSV to JSON
        const jsonData = CSVToJSON(csvData, delimiter);

        // Write JSON data to a new file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

        console.log(`Conversion completed. JSON data written to: ${jsonFilePath}`);
    } catch (error) {
        console.error(`Error converting CSV to JSON: ${(error as Error).message}`);
    }
};