import React from 'react';

const Dermatologist = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Dr. [Your Name]</h1>
              <p className="text-xl text-yellow-100 mb-4">Dermatologist & Skin Specialist</p>
              <p className="text-lg text-yellow-200 max-w-2xl">
                Expert in comprehensive skin care, from medical dermatology to cosmetic procedures, 
                helping patients achieve healthy, beautiful skin at every stage of life.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Dermatology Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Skin Cancer Screening</h3>
              <p className="text-gray-600">Comprehensive mole checks and early detection of skin cancers using advanced techniques.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
              <div className="text-3xl mb-4">💉</div>
              <h3 className="text-xl font-semibold mb-3">Cosmetic Procedures</h3>
              <p className="text-gray-600">Botox, fillers, chemical peels, and anti-aging treatments for youthful skin.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Acne Treatment</h3>
              <p className="text-gray-600">Advanced acne therapies for teens and adults, including hormonal acne management.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
              <div className="text-3xl mb-4">🩹</div>
              <h3 className="text-xl font-semibold mb-3">Eczema & Psoriasis</h3>
              <p className="text-gray-600">Specialized treatment for chronic skin conditions and inflammatory disorders.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Laser Treatments</h3>
              <p className="text-gray-600">Laser therapy for hair removal, scar reduction, and skin resurfacing.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-3">Skin Biopsies</h3>
              <p className="text-gray-600">Expert diagnosis through minimally invasive biopsy procedures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skin Conditions */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Conditions We Treat</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-yellow-800">Acne & Rosacea</h3>
              <p className="text-sm text-gray-600">Clear skin solutions</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-orange-800">Skin Cancer</h3>
              <p className="text-sm text-gray-600">Early detection & treatment</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-pink-800">Eczema</h3>
              <p className="text-sm text-gray-600">Chronic condition management</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-red-800">Psoriasis</h3>
              <p className="text-sm text-gray-600">Advanced treatment options</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-purple-800">Hair Loss</h3>
              <p className="text-sm text-gray-600">Restoration therapies</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-blue-800">Warts & Moles</h3>
              <p className="text-sm text-gray-600">Safe removal procedures</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-green-800">Sun Damage</h3>
              <p className="text-sm text-gray-600">Repair & prevention</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-indigo-800">Aging Skin</h3>
              <p className="text-sm text-gray-600">Anti-aging treatments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Dermatology Expertise</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-2">[Dermatology Practice Name]</h3>
              <p className="text-yellow-600 font-medium mb-2">Board-Certified Dermatologist | [Years]</p>
              <p className="text-gray-700">
                Providing comprehensive dermatological care with expertise in both medical and cosmetic 
                dermatology, helping patients achieve optimal skin health and confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Specializations</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Mohs Micrographic Surgery</li>
                  <li>• Cosmetic Dermatology</li>
                  <li>• Pediatric Dermatology</li>
                  <li>• Dermatopathology</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Patient Care</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• 5000+ Patients Treated</li>
                  <li>• 98% Patient Satisfaction</li>
                  <li>• Same-Day Consultations</li>
                  <li>• Advanced Treatment Options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Skin Health Consultation</h2>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Your skin health is our priority</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Dermatology Clinic: [Phone Number]
              </div>
              <div className="text-lg">
                🏥 Medical Spa: [Spa Number]
              </div>
            </div>
            <p className="mt-4 text-yellow-100">
              Book your skin consultation today
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dermatologist;
