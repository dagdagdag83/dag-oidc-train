import React from 'react';

interface HeroSectionProps {
    onEnter: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnter }) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-transparent"></div>
            <div className="z-10 animate-fade-in-up w-full max-w-4xl px-4">
                <h1 className="text-4xl md:text-8xl font-black mb-4 neon-text-blue tracking-tighter break-words">
                    OpenID Connect
                </h1>
                <h2 className="text-xl md:text-3xl text-cyan-200 font-bold tracking-[0.2em] md:tracking-[0.5em] mb-8">
                    The Identity Grid
                </h2>
                <p className="max-w-2xl mx-auto text-gray-400 mb-12 text-base md:text-lg px-4">
                    Fighting for the Users: Mastering OIDC and High Security Identity
                </p>
                <button
                    onClick={onEnter}
                    className="group relative px-8 py-4 md:px-12 md:py-6 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-cyan-500/10 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] overflow-hidden text-sm md:text-base w-full md:w-auto"
                >
                    <span className="relative z-10">Enter The System</span>
                    <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 w-full shadow-[0_0_10px_#22d3ee]"></div>
                    <div className="absolute top-0 right-0 h-1 bg-cyan-400 w-full shadow-[0_0_10px_#22d3ee]"></div>
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
