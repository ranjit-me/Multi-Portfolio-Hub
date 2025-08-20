import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden relative">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl animate-pulse delay-500" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-32 left-1/3 w-4 h-4 bg-cyan-400/60 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-blue-400/50 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-indigo-400/70 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/4 right-1/2 w-5 h-5 bg-teal-400/40 rounded-full animate-pulse delay-1500"></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            {/* Enhanced Left Content */}
            <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm shadow-lg">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                  ✨ Professional Portfolio Builder
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="block text-white mb-2 drop-shadow-lg">Build Your</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-shift">
                  Dream Portfolio
                </span>
                <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl font-light mt-4">
                  in Minutes
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                Create stunning, professional portfolios that showcase your unique skills and achievements. 
                Stand out from the crowd with beautiful designs and seamless user experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16">
                <Link
                  to="/login?type=doctor"
                  className="group relative px-10 py-5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center text-white drop-shadow-lg font-bold">
                    <svg className="mr-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    I'm a Doctor
                  </span>
                </Link>
                
                <Link
                  to="/login?type=engineer"
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center text-white drop-shadow-lg font-bold">
                    <svg className="mr-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    I'm an Engineer
                  </span>
                </Link>
                
                <Link
                  to="/about"
                  className="group px-10 py-5 text-white font-bold rounded-2xl border-2 border-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center text-white drop-shadow-lg font-bold">
                    Explore Features
                    <svg className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Role Selection Description */}
              <div className="mb-16 p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Choose Your Professional Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Medical Professional</h4>
                    <p className="text-gray-300 text-sm">Showcase medical experience, certifications, publications, clinical expertise, and medical training</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Engineering Professional</h4>
                    <p className="text-gray-300 text-sm">Highlight engineering projects, technical skills, professional development, and technical expertise</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Features Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Lightning Fast</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Mobile Ready</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Secure</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Beautiful</div>
                </div>
              </div>
            </div>

            {/* Enhanced Right Visual */}
            <div className={`lg:w-1/2 mt-16 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* Enhanced Main Card */}
                <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <div className="font-bold text-xl text-white">Professional Profile</div>
                      <div className="text-purple-300">Ready to showcase</div>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Portfolio Completion</span>
                        <span>85%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[85%] animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Skills Showcase</span>
                        <span>92%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[92%] animate-pulse delay-300"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Project Gallery</span>
                        <span>78%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[78%] animate-pulse delay-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="text-3xl font-bold text-white">12</div>
                      </div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="text-3xl font-bold text-white">24</div>
                      </div>
                      <div className="text-sm text-gray-400">Skills</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Cards */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl opacity-80 animate-bounce delay-1000 shadow-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-80 animate-bounce delay-2000 shadow-xl"></div>
                <div className="absolute top-1/2 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl opacity-70 animate-pulse delay-500 shadow-lg"></div>
                
                {/* Additional decorative elements */}
                <div className="absolute top-8 right-8 w-6 h-6 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-20 right-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-700 opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative z-10 py-32 bg-gradient-to-b from-transparent via-blue-800/30 to-indigo-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm mb-8 shadow-lg">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
              🚀 Powerful Features
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
              Everything you need to 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text mt-2">
                shine professionally
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover powerful tools and professional features designed to showcase your unique talents 
              and help you stand out in today's competitive landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: "Dynamic Profiles",
                description: "Create rich, interactive profiles that tell your story with style and sophistication.",
                gradient: "from-blue-500 to-cyan-500",
                delay: "0ms"
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Bank-Level Security",
                description: "Advanced JWT authentication and encryption keep your personal data completely secure.",
                gradient: "from-cyan-500 to-teal-500",
                delay: "100ms"
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Optimized performance ensures your portfolio loads instantly on any device worldwide.",
                gradient: "from-teal-500 to-emerald-500",
                delay: "200ms"
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Performance",
                description: "Optimized for speed and SEO to ensure your portfolio loads instantly everywhere.",
                gradient: "from-indigo-500 to-blue-500",
                delay: "300ms"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: feature.delay }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Enhanced hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full transform translate-x-20 -translate-y-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full transform -translate-x-16 translate-y-16 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-500/40 backdrop-blur-sm mb-8 shadow-lg">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                ✨ Join the Community
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to create your 
                <span className="block text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text mt-2">
                  masterpiece?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join creative professionals worldwide who trust our platform to showcase their best work. 
                Start building your stunning portfolio today and make your mark in the digital world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Link
                  to="/login"
                  className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center text-lg text-white drop-shadow-lg font-bold">
                    Start Your Journey
                    <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link
                  to="/about"
                  className="group px-12 py-5 text-white font-bold rounded-2xl border-2 border-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-purple-400 hover:shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center text-lg text-white drop-shadow-lg font-bold">
                    See Examples
                    <svg className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">100% Free to Start</h4>
                  <p className="text-gray-400">No credit card required</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">5 Minute Setup</h4>
                  <p className="text-gray-400">Get online instantly</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Professional Results</h4>
                  <p className="text-gray-400">Stand out from the crowd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
