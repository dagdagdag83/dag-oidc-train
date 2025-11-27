import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
    color?: "blue" | "pink" | "green" | "red";
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, children, color = "blue" }) => {
    let borderClass = 'border border-cyan-500/30';
    let iconBgClass = 'bg-cyan-900/20 text-cyan-400';

    if (color === 'pink') {
        borderClass = 'border border-pink-500/30';
        iconBgClass = 'bg-pink-900/20 text-pink-400';
    } else if (color === 'green') {
        borderClass = 'border border-green-500/30';
        iconBgClass = 'bg-green-900/20 text-green-400';
    } else if (color === 'red') {
        borderClass = 'border border-red-500/30';
        iconBgClass = 'bg-red-900/20 text-red-400';
    }

    return (
        <div className={`cyber-box p-6 m-2 ${borderClass} flex-1 min-w-[300px]`}>
            <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full mr-4 ${iconBgClass}`}>
                    <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div className="text-gray-300 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default Card;
