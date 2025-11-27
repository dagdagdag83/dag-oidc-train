import React from 'react';

const TronBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#050510] overflow-hidden">
            {/* Simple 2D Grid Pattern */}
            <div className="absolute inset-0 bg-grid-small opacity-20"></div>

            {/* Single Scanline */}
            <div className="absolute inset-0 scanline-sweep"></div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_100%)]"></div>
        </div>
    );
};

export default TronBackground;
