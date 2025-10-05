import React, { useState } from 'react';
import Papa from "papaparse";

interface Entry {
    date: string;
    amount: string;
    description: string;
    type: string;
}

function CsvUploader(props:any) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Process the CSV file here
      console.log('Uploading file!');
      Papa.parse(file, {
            header: true, // Treat the first row as headers
            dynamicTyping: true, // Convert numbers and booleans
            complete: function(results) {
                console.log("Parsed local file:", results.data);
                let entries: Entry[] = results.data.map ((row:any) => ({
                    date: row["Effective Date"], 
                    amount: row["Amount"], 
                    description: row["Description"], 
                    type: row["Transaction Category"]
                }));
                console.log("Entries mapped:", entries);
                props.setData(entries)
            }
        });
      // Example: You would typically send this file to a backend API
      // or parse it in the frontend using a library like Papa Parse.
    } else {
      alert('Please select a CSV file to upload.');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default CsvUploader;