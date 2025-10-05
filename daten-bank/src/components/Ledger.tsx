"use client";

let dataArray = [
    {date: "9/26/2025", amount: "-13.75", description: "Starbucks", type: "Entertainment"},
    {date: "9/27/2025", amount: "-56.97", description: "DEPT EDUCATION - STUDENT LN", type: "Loans"},
    {date: "9/27/2025", amount: "-32.69", description: "Burgerking", type: "Entertainment"}
];

export default function Ledger() {
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
            {Array.from(dataArray).map((item, index) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4 text-red-800">{item.amount}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.type}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}