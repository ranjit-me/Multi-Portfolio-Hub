import React from 'react';

const EmergencyMedicine = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">🚨</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Dr. [Your Name]</h1>
              <p className="text-xl text-red-100 mb-4">Emergency Medicine Physician</p>
              <p className="text-lg text-red-200 max-w-2xl">
                Specialized in providing immediate medical care for urgent and life-threatening conditions, 
                with expertise in trauma treatment, critical care, and emergency procedures.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Expertise */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Emergency Medicine Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-3">Emergency Care</h3>
              <p className="text-gray-600">Rapid assessment and treatment of acute medical emergencies and trauma cases.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
              <div className="text-3xl mb-4">🩸</div>
              <h3 className="text-xl font-semibold mb-3">Trauma Treatment</h3>
              <p className="text-gray-600">Advanced trauma life support and management of severe injuries and accidents.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-600">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Critical Decisions</h3>
              <p className="text-gray-600">Quick decision-making in high-pressure situations to save lives and prevent complications.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">💓</div>
              <h3 className="text-xl font-semibold mb-3">Life Support</h3>
              <p className="text-gray-600">Advanced cardiac life support, respiratory support, and intensive care management.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-3">Emergency Procedures</h3>
              <p className="text-gray-600">Immediate surgical interventions, intubations, and life-saving procedures.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
              <div className="text-3xl mb-4">🚑</div>
              <h3 className="text-xl font-semibold mb-3">Disaster Response</h3>
              <p className="text-gray-600">Mass casualty management and disaster preparedness coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Emergency Conditions We Treat</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-red-50 p-4 rounded-lg shadow text-center border-l-4 border-red-500">
              <h3 className="font-semibold mb-2 text-red-800">Cardiac Events</h3>
              <p className="text-sm text-gray-600">Heart attacks, arrhythmias, cardiac arrest</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow text-center border-l-4 border-orange-500">
              <h3 className="font-semibold mb-2 text-orange-800">Trauma</h3>
              <p className="text-sm text-gray-600">Motor vehicle accidents, falls, injuries</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow text-center border-l-4 border-yellow-500">
              <h3 className="font-semibold mb-2 text-yellow-800">Respiratory</h3>
              <p className="text-sm text-gray-600">Asthma attacks, pneumonia, breathing difficulties</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow text-center border-l-4 border-blue-500">
              <h3 className="font-semibold mb-2 text-blue-800">Neurological</h3>
              <p className="text-sm text-gray-600">Strokes, seizures, head injuries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Emergency Medicine Experience</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-2">[Hospital Emergency Department]</h3>
              <p className="text-red-600 font-medium mb-2">Emergency Medicine Attending | [Years]</p>
              <p className="text-gray-700">
                Leading emergency department operations, managing high-volume patient care, and providing 
                critical care in fast-paced emergency settings.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Certifications</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Board Certified in Emergency Medicine</li>
                  <li>• Advanced Trauma Life Support (ATLS)</li>
                  <li>• Pediatric Advanced Life Support (PALS)</li>
                  <li>• Advanced Cardiac Life Support (ACLS)</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Emergency Stats</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• 10,000+ Emergency Cases Treated</li>
                  <li>• 24/7 Emergency Department Coverage</li>
                  <li>• Critical Care Transport Experience</li>
                  <li>• Disaster Response Team Member</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Emergency Care Available 24/7</h2>
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">When every second counts, we're here to help</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                🚨 Emergency Line: 911
              </div>
              <div className="text-lg">
                🏥 Direct ED Line: [Emergency Dept Number]
              </div>
            </div>
            <p className="mt-4 text-red-100">
              For life-threatening emergencies, call 911 immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyMedicine;
