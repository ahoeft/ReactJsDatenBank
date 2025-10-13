import React, { useState } from 'react';
import Papa from "papaparse";

interface Entry {
    date: string;
    amount: number;
    description: string;
    type: string;
}

function CsvUploader(props:any) {
  const [loaded, setLoaded] = useState(false);

  const handleFileChange = (e:any) => {
    let file = e.target.files[0];
    if (file) {
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
    } else {
      alert('Please select a CSV file to upload.');
    }
  };


  return (
    <div>
      <input className="border-2 border-gray-400" type="file" accept=".csv" onChange={handleFileChange} />
      <p hidden={!loaded}>Your data has loaded, go check out Visualize or Ledger!</p>
    </div>
  );
}

export default CsvUploader;