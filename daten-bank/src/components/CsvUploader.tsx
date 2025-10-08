import React, { useState } from 'react';
import Papa from "papaparse";

interface Entry {
    date: string;
    amount: number;
    description: string;
    type: string;
}

function CsvUploader(props:any) {
  const [file, setFile] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
                let filtered = results.data.filter((row:any) => row["Amount"] != undefined);
                let entries: Entry[] = filtered.map ((row:any) => ({
                    date: row["Effective Date"], 
                    amount: parseFloat(row["Amount"]), 
                    description: row["Description"], 
                    type: row["Transaction Category"]
                }));
                props.setData(entries)
                setLoaded(true);
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
      <input className="border-2 border-gray-400" type="file" accept=".csv" onChange={handleFileChange} />
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleUpload}>Upload CSV</button>
      <p hidden={!loaded}>Your data has loaded, go check out Visualize or Ledger!</p>
    </div>
  );
}

export default CsvUploader;