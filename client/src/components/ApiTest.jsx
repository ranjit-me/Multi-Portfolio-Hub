import React, { useState } from 'react';
import { profileAPI } from '../services/api';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testPublicProfile = async () => {
    setLoading(true);
    try {
      console.log('Testing public profile API...');
      const response = await profileAPI.getProfileByUsername('nikita');
      console.log('API response:', response);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('API error:', error);
      setResult(`Error: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuthProfile = async () => {
    setLoading(true);
    try {
      console.log('Testing authenticated profile API...');
      const response = await profileAPI.getCurrentProfile();
      console.log('API response:', response);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('API error:', error);
      setResult(`Error: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      
      <div className="space-x-4 mb-4">
        <button 
          onClick={testPublicProfile}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Public Profile (nikita)
        </button>
        
        <button 
          onClick={testAuthProfile}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Auth Profile
        </button>
      </div>
      
      {loading && <p>Loading...</p>}
      
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
        {result || 'Click a button to test the API'}
      </pre>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Current localStorage:</p>
        <pre className="bg-gray-50 p-2 rounded mt-2">
          accessToken: {localStorage.getItem('accessToken') ? 'Present' : 'Not found'}
          {'\n'}username: {localStorage.getItem('username') || 'Not found'}
        </pre>
      </div>
    </div>
  );
};

export default ApiTest;
