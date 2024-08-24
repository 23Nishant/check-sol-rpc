'use client';

import React, { useState } from 'react';

export default function RpcChecker() {
  const [rpcUrl, setRpcUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/checkRpc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rpcUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error checking RPC:', error);
      setResult(JSON.stringify({ error: 'Failed to check RPC: ' + (error as Error).message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="rpcUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Solana RPC URL
        </label>
        <input
          id="rpcUrl"
          type="text"
          value={rpcUrl}
          onChange={(e) => setRpcUrl(e.target.value)}
          placeholder="Enter Solana RPC URL"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
        />
      </div>
      <button
        onClick={handleCheck}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {loading ? 'Checking...' : 'Check RPC'}
      </button>
      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Result:</h2>
          <pre className="p-4 bg-gray-100 rounded-md overflow-auto text-black whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}