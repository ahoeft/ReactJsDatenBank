"use client";


type Entry = {
    date: string,
    amount: number,
    description: string,
    type: string,
}

interface LedgerProps {
    ledgerArray: Entry[]
}

const formatterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Ledger({ledgerArray}:LedgerProps) {
  return (
    <table>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
            </tr>
        </thead>
        <tbody>
            {Array.from(ledgerArray).map((item, index) => (
            <tr key={"item-" + index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{item.date}</td>
                <td className={item.amount > 0 ? 'px-6 py-4 text-green-800' : 'px-6 py-4 text-red-800'}>{formatterUSD.format(item.amount)}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.type}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}