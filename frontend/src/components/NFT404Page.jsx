import React, { useEffect, useState } from 'react';

const NFT404Page = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Create floating particles
    const particleCount = 50;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 8
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden font-mono">
      {/* Background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${Math.min(particle.size, 6)}px`,
            height: `${Math.min(particle.size, 6)}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Large 404 background */}
      <div className="absolute text-8xl md:text-9xl font-bold text-white opacity-10 select-none">
        404
      </div>
      
      <div className="z-10 w-full px-4 flex flex-col items-center">
        {/* Glitch title */}
        <div className="relative text-4xl md:text-6xl font-bold uppercase mb-8 glitch-text">
          <span className="block relative">
            Reality Glitch
          </span>
        </div>
        
        {/* Message */}
        <div className="text-center max-w-2xl mb-12">
          <p className="mb-4">The Royality Transformation you were looking for has been lost in the metaverse. Your NFT experience has momentarily fragmented across dimensions.</p>
          <p>While our digital artists work to restore the connection, explore these other unique pieces from our collection.</p>
        </div>
        
        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
          {[3726, 8194, 5039].map((id) => (
            <div 
              key={id}
              className="w-36 h-36 md:w-40 md:h-40 rounded-lg flex items-center justify-center font-bold relative overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                background: 'linear-gradient(45deg, #ff2a6d, #05d9e8)'
              }}
            >
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
              <span className="relative z-10">NFT #{id}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <a 
          href="/" 
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold rounded-full relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="relative z-10">Return to Gallery</span>
        </a>
      </div>
      
      {/* CSS for glitch effect */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(20px); }
        }
        
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        
        .glitch-text {
          text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                      -0.025em -0.05em 0 rgba(0,255,0,0.75),
                      0.025em 0.05em 0 rgba(0,0,255,0.75);
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                      -0.025em -0.05em 0 rgba(0,255,0,0.75),
                      0.025em 0.05em 0 rgba(0,0,255,0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                      -0.025em -0.05em 0 rgba(0,255,0,0.75),
                      0.025em 0.05em 0 rgba(0,0,255,0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                      0.025em 0.025em 0 rgba(0,255,0,0.75),
                      -0.05em -0.05em 0 rgba(0,0,255,0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                      0.025em 0.025em 0 rgba(0,255,0,0.75),
                      -0.05em -0.05em 0 rgba(0,0,255,0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                      0.05em 0 0 rgba(0,255,0,0.75),
                      0 -0.05em 0 rgba(0,0,255,0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                      0.05em 0 0 rgba(0,255,0,0.75),
                      0 -0.05em 0 rgba(0,0,255,0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255,0,0,0.75),
                      -0.025em -0.025em 0 rgba(0,255,0,0.75),
                      -0.025em -0.05em 0 rgba(0,0,255,0.75);
          }
        }
      `}</style>
    </div>
  );
};

export default NFT404Page;