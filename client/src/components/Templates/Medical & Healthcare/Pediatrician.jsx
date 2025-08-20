import React from 'react';

const Pediatrician = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">👶</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Dr. [Your Name]</h1>
              <p className="text-xl text-pink-100 mb-4">Pediatrician & Child Health Specialist</p>
              <p className="text-lg text-pink-200 max-w-2xl">
                Dedicated to providing comprehensive healthcare for infants, children, and adolescents, 
                focusing on healthy development, preventive care, and family-centered medicine.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Pediatric Care Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Child Development</h3>
              <p className="text-gray-600">Monitoring growth milestones, developmental assessments, and early intervention services.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold mb-3">Pediatric Care</h3>
              <p className="text-gray-600">Comprehensive medical care for acute and chronic conditions in children of all ages.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">💉</div>
              <h3 className="text-xl font-semibold mb-3">Vaccinations</h3>
              <p className="text-gray-600">Complete immunization schedules and travel vaccines to protect your child's health.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">📏</div>
              <h3 className="text-xl font-semibold mb-3">Growth Monitoring</h3>
              <p className="text-gray-600">Regular weight, height, and development tracking with personalized growth charts.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">👪</div>
              <h3 className="text-xl font-semibold mb-3">Family Counseling</h3>
              <p className="text-gray-600">Parenting guidance, behavioral support, and family health education.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-3">Urgent Care</h3>
              <p className="text-gray-600">Same-day appointments for acute illnesses, injuries, and pediatric emergencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Care for Every Stage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🍼</div>
              <h3 className="text-xl font-semibold mb-3">Infants (0-2 years)</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Well-baby visits</li>
                <li>• Feeding support</li>
                <li>• Sleep guidance</li>
                <li>• Developmental screenings</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🧒</div>
              <h3 className="text-xl font-semibold mb-3">Children (3-12 years)</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• School physicals</li>
                <li>• Learning assessments</li>
                <li>• Behavioral support</li>
                <li>• Chronic condition management</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">👦</div>
              <h3 className="text-xl font-semibold mb-3">Adolescents (13-18 years)</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Teen health screenings</li>
                <li>• Mental health support</li>
                <li>• Sports physicals</li>
                <li>• Confidential consultations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">My Approach to Pediatric Care</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              Every child is unique, and I believe in providing personalized healthcare that supports each child's 
              individual needs and development. My practice focuses on building trusting relationships with both 
              children and their families.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="font-semibold text-pink-800 mb-2">Child-Friendly Environment</h3>
                <p className="text-gray-700">Creating a welcoming, comfortable space where children feel safe and at ease.</p>
              </div>
              <div className="bg-rose-50 p-6 rounded-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Parent Partnership</h3>
                <p className="text-gray-700">Working closely with parents to ensure the best possible outcomes for their children.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Schedule Your Child's Visit</h2>
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Your child's health and happiness are my priority</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Pediatric Office: [Phone Number]
              </div>
              <div className="text-lg">
                🚨 After-hours Line: [Emergency Number]
              </div>
            </div>
            <p className="mt-4 text-pink-100">
              Same-day sick visits available | Weekend hours offered
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pediatrician;
