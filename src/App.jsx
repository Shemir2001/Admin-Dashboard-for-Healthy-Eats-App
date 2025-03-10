// // import React, { useState, useEffect } from 'react';

// // const Portfolio = () => {
// //   const [isVisible, setIsVisible] = useState(false);
  
// //   useEffect(() => {
// //     setIsVisible(true);
// //   }, []);
  
// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white font-sans">
// //       {/* Navigation Bar */}
// //       <nav className="flex justify-between items-center px-8 py-4 border border-gray-800 rounded-full mx-auto my-6 max-w-6xl bg-opacity-80 bg-gray-900">
// //         <div className="text-xl font-bold">
// //           <a href="#" className="hover:text-pink-500 transition-colors">TETIANA ZAPOROZHETS</a>
// //         </div>
// //         <div className="flex space-x-8">
// //           <a href="#services" className="hover:text-pink-500 transition-colors">SERVICES</a>
// //           <a href="#technologies" className="hover:text-pink-500 transition-colors">TECHNOLOGIES</a>
// //           <a href="#portfolio" className="hover:text-pink-500 transition-colors">PORTFOLIO</a>
// //           <a href="#contact" className="hover:text-pink-500 transition-colors">CONTACT</a>
// //         </div>
// //         <div className="flex items-center">
// //           <button className="flex items-center justify-center rounded-full border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
// //             ENG <span className="ml-1 text-lg">🌐</span>
// //           </button>
// //         </div>
// //       </nav>
      
// //       {/* Hero Section */}
// //       <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
// //         <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
// //           <h1 className="text-6xl font-bold mb-6">
// //             <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">FRONTEND</span>
// //             <br />
// //             <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">DEVELOPER</span>
// //           </h1>
// //           <p className="text-xl mb-8">
// //             I am Tatiana - <span className="text-blue-400">web-developer</span> with a passion for 
// //             creating beautiful and responsive websites.
// //           </p>
// //           <a 
// //             href="#portfolio" 
// //             className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-400 to-pink-500 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-white font-medium"
// //           >
// //             VIEW MY WORK
// //           </a>
// //         </div>
        
// //         <div className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
// //           <div className="absolute inset-0 z-0 opacity-50">
// //             <div className="absolute top-10 right-20 text-gray-700 opacity-30 text-sm font-mono">
// //               &lt;html&gt;
// //               <br />&nbsp;&nbsp;&lt;head&gt;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Portfolio&lt;/title&gt;
// //               <br />&nbsp;&nbsp;&lt;/head&gt;
// //               <br />&nbsp;&nbsp;&lt;body&gt;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;.container &#123;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display: flex;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;&#125;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;$ npm install
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;const App = () =&gt; &#123;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return &lt;div&gt;Frontend&lt;/div&gt;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;&#125;
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;Grid
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;Flexbox
// //               <br />&nbsp;&nbsp;&nbsp;&nbsp;React
// //               <br />&nbsp;&nbsp;&lt;/body&gt;
// //               <br />&lt;/html&gt;
// //             </div>
// //           </div>
// //           <img 
// //             src="/api/placeholder/500/650" 
// //             alt="Frontend Developer" 
// //             className="relative z-10 rounded-lg ml-auto object-cover" 
// //           />
// //         </div>
// //       </div>
      
// //       {/* Services Section */}
// //       <section id="services" className="max-w-6xl mx-auto mt-32 px-4">
// //         <h2 className="text-4xl font-bold mb-12 text-center">
// //           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">SERVICES</span>
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //           {[
// //             { title: 'Web Development', description: 'Creating responsive websites with modern technologies' },
// //             { title: 'UI/UX Design', description: 'Designing beautiful and intuitive user interfaces' },
// //             { title: 'Frontend Solutions', description: 'Building interactive and dynamic web applications' }
// //           ].map((service, index) => (
// //             <div 
// //               key={index} 
// //               className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
// //             >
// //               <h3 className="text-xl font-bold mb-4 text-pink-500">{service.title}</h3>
// //               <p className="text-gray-300">{service.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
      
// //       {/* Technologies Section */}
// //       <section id="technologies" className="max-w-6xl mx-auto mt-32 px-4">
// //         <h2 className="text-4xl font-bold mb-12 text-center">
// //           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">TECHNOLOGIES</span>
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //           {[
// //             'JavaScript', 'React', 'HTML5', 'CSS3', 
// //             'Tailwind CSS', 'TypeScript', 'Git', 'Responsive Design'
// //           ].map((tech, index) => (
// //             <div 
// //               key={index} 
// //               className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
// //             >
// //               <p className="text-lg font-medium">{tech}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
      
// //       {/* Portfolio Section */}
// //       <section id="portfolio" className="max-w-6xl mx-auto mt-32 px-4">
// //         <h2 className="text-4xl font-bold mb-12 text-center">
// //           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">PORTFOLIO</span>
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {[1, 2, 3, 4, 5, 6].map((item) => (
// //             <div 
// //               key={item} 
// //               className="relative group overflow-hidden rounded-lg"
// //             >
// //               <img 
// //                 src={`/api/placeholder/400/${300 + item * 10}`} 
// //                 alt={`Portfolio item ${item}`} 
// //                 className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
// //                 <h3 className="text-xl font-bold">Project {item}</h3>
// //                 <p className="text-gray-300 mt-2">Web Development</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
      
// //       {/* Contact Section */}
// //       <section id="contact" className="max-w-6xl mx-auto mt-32 mb-16 px-4">
// //         <h2 className="text-4xl font-bold mb-12 text-center">
// //           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">CONTACT</span>
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
// //           <div>
// //             <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
// //             <p className="text-gray-300 mb-6">I'm always open for new opportunities and interesting projects. Feel free to contact me!</p>
// //             <div className="space-y-4">
// //               <div className="flex items-center">
// //                 <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-4">
// //                   <span>📧</span>
// //                 </div>
// //                 <span>email@example.com</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-4">
// //                   <span>📱</span>
// //                 </div>
// //                 <span>+1 (234) 567-8901</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-4">
// //                   <span>📍</span>
// //                 </div>
// //                 <span>Your Location</span>
// //               </div>
// //             </div>
// //           </div>
// //           <form className="space-y-6">
// //             <div>
// //               <input 
// //                 type="text" 
// //                 placeholder="Your Name" 
// //                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none"
// //               />
// //             </div>
// //             <div>
// //               <input 
// //                 type="email" 
// //                 placeholder="Your Email" 
// //                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none"
// //               />
// //             </div>
// //             <div>
// //               <textarea 
// //                 placeholder="Your Message" 
// //                 rows={5}
// //                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none"
// //               ></textarea>
// //             </div>
// //             <button 
// //               type="submit" 
// //               className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 text-white font-medium"
// //             >
// //               SEND MESSAGE
// //             </button>
// //           </form>
// //         </div>
// //       </section>
      
// //       {/* Footer */}
// //       <footer className="bg-gray-950 py-8 mt-16">
// //         <div className="max-w-6xl mx-auto px-4 text-center">
// //           <div className="flex justify-center space-x-6 mb-6">
// //             {['Github', 'LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
// //               <a 
// //                 key={index} 
// //                 href="#" 
// //                 className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
// //               >
// //                 {social[0]}
// //               </a>
// //             ))}
// //           </div>
// //           <p className="text-gray-400">© 2025 Tetiana Zaporozhets. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Portfolio;
// import React, { useState, useEffect, useRef } from 'react';

// const Portfolio = () => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     setIsVisible(true);
    
//     // Initialize intersection observer for scroll animations
//     const observerOptions = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1
//     };
    
//     const handleIntersect = (entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate-in');
//           observer.unobserve(entry.target);
//         }
//       });
//     };
    
//     const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
//     // Select all elements with animation classes
//     document.querySelectorAll('.animate-on-scroll').forEach(element => {
//       observer.observe(element);
//     });
    
//     return () => {
//       observer.disconnect();
//     };
//   }, []);
  
//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 z-0 opacity-30">
//         <div className="absolute h-40 w-40 rounded-full bg-pink-500 blur-3xl top-20 left-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
//         <div className="absolute h-60 w-60 rounded-full bg-purple-500 blur-3xl bottom-40 right-20 animate-pulse" style={{ animationDuration: '12s' }}></div>
//         <div className="absolute h-40 w-40 rounded-full bg-blue-500 blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDuration: '10s' }}></div>
//       </div>
    
//       {/* Navigation Bar with Reveal Animation */}
//       <nav className={`flex justify-between items-center px-8 py-4 border border-gray-800 rounded-full mx-auto my-6 max-w-6xl bg-opacity-80 bg-gray-900 backdrop-blur-sm z-50 sticky top-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
//         <div className="text-xl font-bold">
//           <a href="#" className="hover:text-pink-500 transition-colors">bVoir Technologies</a>
//         </div>
//         <div className="flex space-x-8">
//           <a href="#services" className="hover:text-pink-500 transition-colors">SERVICES</a>
//           <a href="#technologies" className="hover:text-pink-500 transition-colors">TECHNOLOGIES</a>
//           <a href="#portfolio" className="hover:text-pink-500 transition-colors">PORTFOLIO</a>
//           <a href="#contact" className="hover:text-pink-500 transition-colors">CONTACT</a>
//         </div>
//         <div className="flex items-center">
//           <button className="flex items-center justify-center rounded-full border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
//             ENG <span className="ml-1 text-lg">🌐</span>
//           </button>
//         </div>
//       </nav>
      
//       {/* Hero Section with Staggered Animation */}
//       <div className="relative max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 z-10">
//         <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//           <h1 className="text-6xl font-bold mb-6 relative">
//             <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text inline-block relative after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-pink-500 after:w-0 after:transition-all after:duration-1000" style={{ animationDelay: '0.3s', ...(isVisible && { '--tw-after-width': '100%' }) }}>FULL STACK</span>
//             <br />
//             <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text inline-block relative after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-purple-500 after:w-0 after:transition-all after:duration-1000 after:delay-500" style={{ animationDelay: '0.6s', ...(isVisible && { '--tw-after-width': '100%' }) }}>DEVELOPER</span>
//           </h1>
//           <p className={`text-xl mb-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             I am Shemir - <span className="text-blue-400 relative inline-block animate-float">a seasoned full stack web-developer</span> with a passion for 
//             creating beautiful and responsive websites.
//           </p>
//           <a 
//             href="#portfolio" 
//             className={`inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-400 to-pink-500 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-white font-medium animate-pulse-subtle transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
//           >
//             VIEW MY WORK
//           </a>
//         </div>
        
//         <div className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
//           <div className="absolute inset-0 z-0 opacity-200">
//             <div className="absolute top-10 right-20 text-gray-700 opacity-30 text-sm font-mono">
//               &lt;html&gt;
//               <br />&nbsp;&nbsp;&lt;head&gt;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Portfolio&lt;/title&gt;
//               <br />&nbsp;&nbsp;&lt;/head&gt;
//               <br />&nbsp;&nbsp;&lt;body&gt;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;.container &#123;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display: flex;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;&#125;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;$ npm install
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;const App = () =&gt; &#123;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return &lt;div&gt;Frontend&lt;/div&gt;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;&#125;
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;Grid
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;Flexbox
//               <br />&nbsp;&nbsp;&nbsp;&nbsp;React
//               <br />&nbsp;&nbsp;&lt;/body&gt;
//               <br />&lt;/html&gt;
//             </div>
//           </div>
//           <div className="relative z-10 rounded-lg ml-auto overflow-hidden">
//             <img 
//               src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg" 
//               alt="FullStack Engineer" 
//               className="object-cover transform hover:scale-105 transition-transform duration-700" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 mix-blend-overlay opacity-30"></div>
//             <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-10" style={{ backgroundSize: '200% 100%' }}></div>
//           </div>
//         </div>
//       </div>
      
//       {/* Floating Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//         {[...Array(20)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute h-2 w-2 rounded-full bg-pink-500 opacity-30"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animation: `float ${5 + Math.random() * 10}s linear infinite`,
//               animationDelay: `${Math.random() * 5}s`
//             }}
//           ></div>
//         ))}
//       </div>
      
//       {/* Services Section with Scroll Animation */}
//       <section id="services" className="relative max-w-6xl mx-auto mt-32 px-4 z-10">
//         <h2 className="text-4xl font-bold mb-12 text-center animate-on-scroll transform opacity-0 transition-all duration-700 translate-y-10">
//           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">SERVICES</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { title: 'Web Development', description: 'Creating responsive websites with modern technologies' },
//             { title: 'UI/UX Design', description: 'Designing beautiful and intuitive user interfaces' },
//             { title: 'Frontend Solutions', description: 'Building interactive and dynamic web applications' }
//           ].map((service, index) => (
//             <div 
//               key={index} 
//               className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-500/20 animate-on-scroll opacity-0 translate-y-10"
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 flex items-center justify-center text-2xl transform transition-transform duration-500 hover:rotate-12">
//                 {index === 0 ? '💻' : index === 1 ? '🎨' : '⚡'}
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-pink-500">{service.title}</h3>
//               <p className="text-gray-300">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
      
//       {/* Technologies Section with Scroll Animation */}
//       <section id="technologies" className="relative max-w-6xl mx-auto mt-32 px-4 z-10">
//         <h2 className="text-4xl font-bold mb-12 text-center animate-on-scroll transform opacity-0 transition-all duration-700 translate-y-10">
//           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">TECHNOLOGIES</span>
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {[
//             'JavaScript', 'React', 'HTML5', 'CSS3', 
//             'Tailwind CSS', 'TypeScript', 'Git', 'Responsive Design'
//           ].map((tech, index) => (
//             <div 
//               key={index} 
//               className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-500/20 animate-on-scroll opacity-0 translate-y-10"
//               style={{ transitionDelay: `${index * 50}ms` }}
//             >
//               <p className="text-lg font-medium relative">
//                 <span className="relative z-10">{tech}</span>
//                 <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity duration-300 rounded filter blur-sm -z-10 group-hover:opacity-30"></span>
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
      
//       {/* Portfolio Section with Scroll Animation */}
//       <section id="portfolio" className="relative max-w-6xl mx-auto mt-32 px-4 z-10">
//         <h2 className="text-4xl font-bold mb-12 text-center animate-on-scroll transform opacity-0 transition-all duration-700 translate-y-10">
//           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">PORTFOLIO</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[1, 2, 3, 4, 5, 6].map((item, index) => (
//             <div 
//               key={item} 
//               className="relative group overflow-hidden rounded-lg animate-on-scroll opacity-0 translate-y-10"
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               <img 
//                 src={`/api/placeholder/400/${300 + item * 10}`} 
//                 alt={`Portfolio item ${item}`} 
//                 className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
//                 <h3 className="text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project {item}</h3>
//                 <p className="text-gray-300 mt-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">Web Development</p>
//                 <button className="mt-4 px-4 py-2 rounded-full bg-pink-500 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 text-sm">View Project</button>
//               </div>
//               {/* Animated corner accent */}
//               <div className="absolute top-0 left-0 h-20 w-20 transform -translate-x-20 -translate-y-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-br from-pink-500 to-purple-500 opacity-80 rounded-full"></div>
//             </div>
//           ))}
//         </div>
//       </section>
      
//       {/* Contact Section with Scroll Animation */}
//       <section id="contact" className="relative max-w-6xl mx-auto mt-32 mb-16 px-4 z-10">
//         <h2 className="text-4xl font-bold mb-12 text-center animate-on-scroll transform opacity-0 transition-all duration-700 translate-y-10">
//           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">CONTACT</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
//           <div className="animate-on-scroll opacity-0 translate-x-10">
//             <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
//             <p className="text-gray-300 mb-6">I'm always open for new opportunities and interesting projects. Feel free to contact me!</p>
//             <div className="space-y-4">
//               <div className="flex items-center transform hover:-translate-x-2 transition-transform duration-300">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-4">
//                   <span>📧</span>
//                 </div>
//                 <span>email@example.com</span>
//               </div>
//               <div className="flex items-center transform hover:-translate-x-2 transition-transform duration-300">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-4">
//                   <span>📱</span>
//                 </div>
//                 <span>+1 (234) 567-8901</span>
//               </div>
//               <div className="flex items-center transform hover:-translate-x-2 transition-transform duration-300">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-4">
//                   <span>📍</span>
//                 </div>
//                 <span>Your Location</span>
//               </div>
//             </div>
//           </div>
//           <form className="space-y-6 animate-on-scroll opacity-0 -translate-x-10">
//             <div className="relative">
//               <input 
//                 type="text" 
//                 placeholder="Your Name" 
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none transition-all duration-300"
//               />
//               <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 group-focus-within:w-full"></div>
//             </div>
//             <div className="relative">
//               <input 
//                 type="email" 
//                 placeholder="Your Email" 
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none transition-all duration-300"
//               />
//               <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 group-focus-within:w-full"></div>
//             </div>
//             <div className="relative">
//               <textarea 
//                 placeholder="Your Message" 
//                 rows={5}
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none transition-all duration-300"
//               ></textarea>
//               <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 group-focus-within:w-full"></div>
//             </div>
//             <button 
//               type="submit" 
//               className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 text-white font-medium relative overflow-hidden group"
//             >
//               <span className="relative z-10">SEND MESSAGE</span>
//               <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
//             </button>
//           </form>
//         </div>
//       </section>
      
//       {/* Footer with Animation */}
//       <footer className="relative bg-gray-950 py-8 mt-16 z-10">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <div className="flex justify-center space-x-6 mb-6">
//             {['Github', 'LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
//               <a 
//                 key={index} 
//                 href="#" 
//                 className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors transform hover:rotate-12 hover:scale-110 transition-all duration-300"
//               >
//                 {social[0]}
//               </a>
//             ))}
//           </div>
//           <p className="text-gray-400">© 2025 Tetiana Zaporozhets. All rights reserved.</p>
//         </div>
//       </footer>
      
//       {/* CSS for custom animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
        
//         @keyframes shimmer {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }
        
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
        
//         .animate-shimmer {
//           animation: shimmer 3s linear infinite;
//         }
        
//         .animate-pulse-subtle {
//           animation: pulse-subtle 2s ease-in-out infinite;
//         }
        
//         @keyframes pulse-subtle {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
        
//         .animate-in {
//           opacity: 1 !important;
//           transform: translate(0, 0) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Portfolio;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}
export default App;