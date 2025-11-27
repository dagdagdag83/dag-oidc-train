import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepProps {
    num: number;
    actor: string;
    action: string;
    detail: React.ReactNode;
    icon?: LucideIcon;
    color?: string;
}

const Step: React.FC<StepProps> = ({ num, actor, action, detail, icon: Icon, color = "cyan" }) => (
    <div className={`flex items-center gap-4 p-3 rounded bg-black/40 border border-${color}-500/20`}>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-${color}-900/30 text-${color}-400 font-bold text-xs shrink-0`}>
            {num}
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-${color}-300 font-bold text-xs uppercase`}>{actor}</span>
                <span className="text-gray-500 text-xs">→</span>
                <span className="text-white font-bold">{action}</span>
            </div>
            <div className="text-gray-400 text-xs flex items-center gap-2">
                {Icon && <Icon size={12} />}
                {detail}
            </div>
        </div>
    </div>
);

export default Step;
