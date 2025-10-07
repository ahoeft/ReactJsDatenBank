"use client";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Ledger from "@/components/Ledger";
import CsvUploader from '@/components/CsvUploader';
import Visualize from '@/components/Charts/Visualize';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  let dataArray = [
    {date: "9/26/2025", amount: "-13.75", description: "Starbucks", type: "Entertainment"},
    {date: "9/27/2025", amount: "-56.97", description: "DEPT EDUCATION - STUDENT LN", type: "Loans"},
    {date: "9/27/2025", amount: "-32.69", description: "Burgerking", type: "Entertainment"}
];
  const [ledgerData, setLedgerData] = React.useState(dataArray);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Import or Create Data" {...a11yProps(0)} />
          <Tab label="Visualize" {...a11yProps(1)} />
          <Tab label="Ledger" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CsvUploader setData={setLedgerData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Visualize visualizeArray={ledgerData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Ledger ledgerArray={ledgerData}/>
      </CustomTabPanel>
    </Box>
  );
}