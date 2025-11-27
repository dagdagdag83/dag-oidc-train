import React, { useState, useEffect } from 'react';

const sections = [
    { id: 'hub', label: 'Architecture' },
    { id: 'happypath', label: 'OIDC Flow' },
    { id: 'jwt', label: 'JWT' },
    { id: 'scopes', label: 'Scopes & Claims' },
    { id: 'crypto', label: 'Crypto Core' },
    { id: 'mle', label: 'Finnish Weirdness' },
    { id: 'par', label: 'PAR' },
    { id: 'sro', label: 'SRO' },
    { id: 'summary', label: 'Debrief' },
];

const Navbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state for background effect
            setScrolled(window.scrollY > 50);

            // Scroll Spy Logic
            const scrollPosition = window.scrollY + 100; // Offset for fixed header

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section.id);
                        return; // Found the current section
                    }
                }
            }

            // If at the top or no section matches
            if (window.scrollY < 100) {
                setActiveSection('');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${scrolled ? 'bg-black/90 border-cyan-500/50 shadow-[0_0_20px_rgba(0,243,255,0.2)] py-2' : 'bg-black/50 border-cyan-500/10 py-4 backdrop-blur-sm'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo / Title */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 cursor-pointer no-underline"
                    >
                        <div className={`w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]`}></div>
                        <div className={`font-bold text-cyan-400 tracking-[0.2em] text-sm md:text-base ${scrolled ? 'text-shadow-neon' : ''}`}>
                            OIDC<span className="text-white">TRAINING</span>
                        </div>
                    </a>

                    {/* Navigation Links */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar mask-fade-sides md:mask-none py-1">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`
                                    relative px-3 py-1 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border no-underline
                                    ${activeSection === section.id
                                        ? 'bg-cyan-900/40 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                                        : 'border-transparent text-gray-500 hover:text-cyan-200 hover:border-cyan-500/30'}
                                `}
                            >
                                {activeSection === section.id && (
                                    <span className="absolute inset-0 bg-cyan-400/10 animate-pulse"></span>
                                )}
                                {section.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Scanline under navbar */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        </nav>
    );
};

export default Navbar;
