import React from 'react';

const TestTemplate = () => {
  console.log('TestTemplate is rendering');
  
  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-blue-800">Test Template</h1>
      <p className="text-lg text-gray-700 mt-4">
        This is a test template to verify rendering works.
      </p>
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Template Status</h2>
        <p>✅ Component is rendering</p>
        <p>✅ Styles are loading</p>
        <p>✅ No white screen</p>
      </div>
    </div>
  );
};

export default TestTemplate;
