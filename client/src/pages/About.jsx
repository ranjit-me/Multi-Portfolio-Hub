import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-60 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm">
                ℹ️ About Portfolio Hub
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block text-white leading-tight">Portfolio Hub</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                Professional Showcase Platform
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              A comprehensive portfolio platform built by a talented team of developers. 
              Designed to help professionals showcase their work with modern, responsive portfolios powered by cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Technology, Security Cards */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Our Vision",
                description: "To create a comprehensive platform where professionals can build stunning portfolios that truly represent their skills and achievements in the digital world.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Our Team",
                description: "Built by a dedicated team of skilled developers specializing in frontend, backend, and DevOps technologies to deliver a seamless experience.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure & Reliable",
                description: "Built with enterprise-grade security, robust DevOps practices, and modern architecture to ensure your portfolio is always available and secure.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm mb-6">
              🛠️ Technology Stack
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Built with 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Modern Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We use the latest and most powerful technologies to ensure your portfolio performs flawlessly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                {
                  emoji: "⚛️",
                  name: "React",
                  description: "Frontend Framework",
                  gradient: "from-blue-400 to-cyan-400"
                },
                {
                  emoji: "🍃",
                  name: "Spring Boot",
                  description: "Backend Framework",
                  gradient: "from-green-400 to-emerald-400"
                },
                {
                  emoji: "🍃",
                  name: "MongoDB",
                  description: "Database",
                  gradient: "from-green-500 to-lime-400"
                },
                {
                  emoji: "🎨",
                  name: "Tailwind CSS",
                  description: "Styling Framework",
                  gradient: "from-purple-400 to-pink-400"
                },
                {
                  emoji: "💳",
                  name: "Razorpay",
                  description: "Payment Gateway",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  emoji: "☁️",
                  name: "AWS",
                  description: "Cloud Platform",
                  gradient: "from-orange-400 to-yellow-400"
                }
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className={`group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.emoji}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${tech.gradient} group-hover:bg-clip-text transition-all duration-300 text-white`}>
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Development Team Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm mb-6">
              👥 Meet Our Development Team
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The Minds Behind 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Portfolio Hub
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the talented developers who brought Portfolio Hub to life with their expertise and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ranjit Bichukale",
                role: "Full Stack Developer",
                specialization: "Frontend, Backend & DevOps",
                emoji: "🚀",
                gradient: "from-blue-500 to-cyan-500",
                skills: ["React", "Spring Boot", "DevOps"]
              },
              {
                name: "Prathamesh Kasbekar",
                role: "Full Stack Developer", 
                specialization: "Frontend & Backend",
                emoji: "💻",
                gradient: "from-purple-500 to-pink-500",
                skills: ["Frontend", "Backend", "UI/UX"]
              },
              {
                name: "Nikhil Gaikwad",
                role: "DevOps Engineer",
                specialization: "Infrastructure & Deployment",
                emoji: "⚙️",
                gradient: "from-green-500 to-emerald-500",
                skills: ["CI/CD", "Cloud", "Monitoring"]
              },
              {
                name: "Abhishek Gujar",
                role: "DevOps Engineer",
                specialization: "Infrastructure & Automation",
                emoji: "🔧",
                gradient: "from-orange-500 to-red-500",
                skills: ["Docker", "Kubernetes", "AWS"]
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${1000 + index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className={`text-sm font-semibold mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.specialization}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-lg border border-white/20">
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Portfolio Hub
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  Platform Statistics
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Building a community of professionals showcasing their best work
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "100+", label: "Active Users", gradient: "from-blue-400 to-cyan-400" },
                { number: "250+", label: "Portfolios Created", gradient: "from-purple-400 to-pink-400" },
                { number: "99.8%", label: "Uptime", gradient: "from-green-400 to-emerald-400" },
                { number: "4", label: "Team Members", gradient: "from-orange-400 to-red-400" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to showcase your 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                professional journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our growing community and create a stunning portfolio that represents your skills and achievements with Portfolio Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-gray-100 hover:text-white font-semibold rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative flex items-center justify-center text-white drop-shadow-lg">
                  Get Started Today
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/"
                className="px-8 py-4 text-white font-semibold rounded-xl border border-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-blue-400"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
