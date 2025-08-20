import React from 'react';

const Oncologist = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">🎗️</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Dr. [Your Name]</h1>
              <p className="text-xl text-purple-100 mb-4">Oncologist & Cancer Specialist</p>
              <p className="text-lg text-purple-200 max-w-2xl">
                Dedicated to providing comprehensive cancer care, utilizing the latest treatments and 
                personalized approaches to fight cancer and support patients through their journey.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Cancer Treatment Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
              <div className="text-3xl mb-4">💊</div>
              <h3 className="text-xl font-semibold mb-3">Chemotherapy</h3>
              <p className="text-gray-600">Advanced chemotherapy protocols tailored to specific cancer types and patient needs.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-indigo-500">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Radiation Therapy</h3>
              <p className="text-gray-600">Precision radiation treatments with state-of-the-art technology and techniques.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Patient Support</h3>
              <p className="text-gray-600">Comprehensive support services including counseling, nutrition, and pain management.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-3">Clinical Trials</h3>
              <p className="text-gray-600">Access to cutting-edge clinical trials and experimental treatments.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
              <div className="text-3xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold mb-3">Cancer Screening</h3>
              <p className="text-gray-600">Comprehensive cancer screening and early detection programs.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
              <div className="text-3xl mb-4">💙</div>
              <h3 className="text-xl font-semibold mb-3">Survivorship Care</h3>
              <p className="text-gray-600">Long-term care and monitoring for cancer survivors and their ongoing health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cancer Types */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Cancer Types We Treat</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-purple-800">Breast Cancer</h3>
              <p className="text-sm text-gray-600">Comprehensive breast cancer treatment</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-indigo-800">Lung Cancer</h3>
              <p className="text-sm text-gray-600">Advanced lung cancer therapies</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-pink-800">Colorectal Cancer</h3>
              <p className="text-sm text-gray-600">Specialized colorectal treatments</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-blue-800">Prostate Cancer</h3>
              <p className="text-sm text-gray-600">Men's cancer care specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Oncology Excellence</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-2">[Cancer Center Name]</h3>
              <p className="text-purple-600 font-medium mb-2">Medical Oncologist | [Years]</p>
              <p className="text-gray-700">
                Leading comprehensive cancer care programs, participating in groundbreaking research, 
                and providing compassionate treatment to cancer patients.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Certifications</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Board Certified in Medical Oncology</li>
                  <li>• Board Certified in Internal Medicine</li>
                  <li>• Hematology-Oncology Fellowship</li>
                  <li>• Clinical Research Certification</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-2">Treatment Stats</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• 1000+ Cancer Patients Treated</li>
                  <li>• 50+ Clinical Trials Conducted</li>
                  <li>• 95% Patient Satisfaction Rate</li>
                  <li>• Published Cancer Research</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Cancer Care Consultation</h2>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Hope, healing, and comprehensive cancer care</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Oncology Clinic: [Phone Number]
              </div>
              <div className="text-lg">
                🏥 Cancer Center: [Center Number]
              </div>
            </div>
            <p className="mt-4 text-purple-100">
              Second opinion consultations available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oncologist;
