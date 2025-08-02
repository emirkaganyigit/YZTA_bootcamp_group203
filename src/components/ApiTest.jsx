import React, { useState } from 'react';

export default function ApiTest() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/');
      const data = await response.json();
      setTestResult({ success: true, data });
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">API Bağlantı Testi</h3>
      <button
        onClick={testApiConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Test ediliyor...' : 'API Bağlantısını Test Et'}
      </button>
      
      {testResult && (
        <div className={`mt-4 p-3 rounded ${
          testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {testResult.success ? (
            <div>
              <strong>✅ Başarılı!</strong>
              <pre className="mt-2 text-sm">{JSON.stringify(testResult.data, null, 2)}</pre>
            </div>
          ) : (
            <div>
              <strong>❌ Hata:</strong> {testResult.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 