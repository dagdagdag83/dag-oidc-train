import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type InfoBoxVariant = 'purple' | 'yellow' | 'blue' | 'red' | 'green';

interface InfoBoxProps {
    title: string;
    children: ReactNode;
    variant?: InfoBoxVariant;
    icon?: LucideIcon;
    className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
    title,
    children,
    variant = 'purple',
    icon: Icon,
    className = ''
}) => {
    const getVariantStyles = (v: InfoBoxVariant) => {
        switch (v) {
            case 'purple':
                return 'bg-purple-900/20 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
            case 'yellow':
                return 'bg-yellow-900/10 border-yellow-500/30 text-yellow-100/80';
            case 'blue':
                return 'bg-blue-900/20 border-blue-500 text-blue-200';
            case 'red':
                return 'bg-red-900/20 border-red-500 text-red-200';
            case 'green':
                return 'bg-green-900/20 border-green-500 text-green-200';
            default:
                return 'bg-gray-900 border-gray-700 text-gray-300';
        }
    };

    const styles = getVariantStyles(variant);
    const titleColor = variant === 'yellow' ? 'text-yellow-400' : `text-${variant}-400`;

    return (
        <div className={`p-4 rounded text-sm border relative overflow-hidden group ${styles} ${className}`}>
            {variant === 'purple' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 -mr-8 -mt-8 rotate-45"></div>
            )}

            <div className={`flex items-center gap-3 mb-2 font-bold ${titleColor} uppercase tracking-wider text-xs`}>
                {Icon && <Icon size={16} className={titleColor} />}
                <h4>{title}</h4>
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default InfoBox;
