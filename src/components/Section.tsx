import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    color?: "blue" | "pink" | "yellow" | "green" | "red";
    id: string;
}

const Section: React.FC<SectionProps> = ({ title, children, color = "blue", id }) => {
    let textClass = 'neon-text-blue';
    if (color === 'pink') textClass = 'neon-text-pink';
    if (color === 'yellow') textClass = 'neon-text-yellow';
    if (color === 'green') textClass = 'neon-text-green';
    if (color === 'red') textClass = 'neon-text-red';

    return (
        <div id={id} className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative border-b border-gray-800">
            <div className={`text-4xl md:text-6xl mb-12 font-bold tracking-widest text-center ${textClass}`}>
                {title}
            </div>
            <div className="max-w-6xl w-full z-10">
                {children}
            </div>
        </div>
    );
};

export default Section;
