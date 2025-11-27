import React from 'react';

interface CodeProps {
    children: React.ReactNode;
    className?: string;
}

const Code: React.FC<CodeProps> = ({ children, className = '' }) => {
    return (
        <span className={`font-mono text-sm bg-black/30 px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-500/20 ${className}`}>
            {children}
        </span>
    );
};

export default Code;
