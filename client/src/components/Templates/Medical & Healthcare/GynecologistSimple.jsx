import React from 'react';

const GynecologistSimple = () => {
  console.log('GynecologistSimple is rendering');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-rose-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">👩‍⚕️</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Dr. [Your Name]</h1>
              <p className="text-xl text-pink-100 mb-4">Gynecologist & Women's Health Specialist</p>
              <p className="text-lg text-pink-200 max-w-2xl">
                Dedicated to providing comprehensive women's healthcare with compassion, expertise, 
                and personalized attention throughout all stages of a woman's life.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Women's Health Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold mb-3">Women's Health Exam</h3>
              <p className="text-gray-600">Comprehensive gynecological examinations and preventive care.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">🤱</div>
              <h3 className="text-xl font-semibold mb-3">Prenatal Care</h3>
              <p className="text-gray-600">Complete pregnancy care from conception through delivery.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div className="text-3xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-semibold mb-3">Family Planning</h3>
              <p className="text-gray-600">Contraception counseling and fertility management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Women's Health Consultation</h2>
          <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Empowering women through comprehensive healthcare</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Women's Clinic: [Phone Number]
              </div>
              <div className="text-lg">
                📧 Email: [Email Address]
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GynecologistSimple;
