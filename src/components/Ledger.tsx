"use client";

import { Button } from "@mui/material";
import React, { useState } from 'react';

interface LedgerProps {
    ledgerArray: Entry[]
}

const formatterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Ledger({ledgerArray}:LedgerProps) {
    const [dataArray, setDataArray] = useState(ledgerArray);
    const [sortOrder, setSortOrder] = useState(false);

    const handleSort = (type:string) => {
        const array = [...dataArray]
        if(type == 'amount') {
            (sortOrder) 
            ? array.sort((x, y) => x.amount - y.amount)
            : array.sort((x, y) => y.amount - x.amount);
            setDataArray(array);
        }
        if(type == 'date') {
            (sortOrder) 
            ? array.sort((x, y) => x.date.localeCompare(y.date))
            : array.sort((x, y) => y.date.localeCompare(x.date));
            setDataArray(array);
        }
        if(type == 'category') {
            (sortOrder) 
            ? array.sort((x, y) => x.category.localeCompare(y.category))
            : array.sort((x, y) => y.category.localeCompare(x.category));
            setDataArray(array);
        }
        setSortOrder(!sortOrder);
    }

  return (
    <table>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    <Button onClick={() => handleSort('date')}>Date</Button>
                </th>
                <th scope="col" className="px-6 py-3">
                    <Button onClick={() => handleSort('amount')}>Amount</Button> 
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    <Button onClick={() => handleSort('category')}>Category</Button>
                </th>
            </tr>
        </thead>
        <tbody>
            {Array.from(dataArray).map((item, index) => (
            <tr key={"item-" + index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{item.date}</td>
                <td className={item.amount > 0 ? 'px-6 py-4 text-green-800' : 'px-6 py-4 text-red-800'}>{formatterUSD.format(item.amount)}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.category}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}