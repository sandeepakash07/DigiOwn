import React, { useState } from 'react';

const TransactionPage = () => {
  // Sample transaction data - replace with your actual data source
  const [transactions, setTransactions] = useState([
    {
      id: 'txn-001',
      timestamp: '2025-02-24T10:30:45Z',
      senderPublicKey: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      recipientPublicKey: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      amount: 1.25,
      status: 'confirmed',
      type: 'transfer'
    },
    {
      id: 'txn-002',
      timestamp: '2025-02-24T09:15:22Z',
      senderPublicKey: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      recipientPublicKey: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
      amount: 0.5,
      status: 'pending',
      type: 'purchase'
    },
    {
      id: 'txn-003',
      timestamp: '2025-02-23T18:45:11Z',
      senderPublicKey: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      recipientPublicKey: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
      amount: 3.75,
      status: 'confirmed',
      type: 'transfer'
    },
  ]);

  // Format timestamp to a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Truncate long public keys for display
  const truncatePublicKey = (key) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 6)}`;
  };

  // Status badge color based on transaction status
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      
      {/* Search and filter options */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by transaction ID or public key"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-2">
          <select className="p-2 border border-gray-300 rounded">
            <option value="all">All Types</option>
            <option value="transfer">Transfer</option>
            <option value="purchase">Purchase</option>
          </select>
          <select className="p-2 border border-gray-300 rounded">
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      
      {/* Transactions table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="tooltip" title={transaction.senderPublicKey}>
                    {truncatePublicKey(transaction.senderPublicKey)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="tooltip" title={transaction.recipientPublicKey}>
                    {truncatePublicKey(transaction.recipientPublicKey)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.amount.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> results
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;