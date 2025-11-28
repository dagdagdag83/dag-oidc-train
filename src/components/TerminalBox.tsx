import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface TerminalBoxProps {
    title: string;
    content: string;
    type?: "info" | "error";
    hiddenAnswer?: boolean;
}

const TerminalBox: React.FC<TerminalBoxProps> = ({ title, content, type = "info", hiddenAnswer = false }) => {
    const [revealed, setRevealed] = useState(!hiddenAnswer);

    return (
        <div className="font-mono text-sm bg-black border border-gray-700 rounded p-4 my-4 shadow-lg w-full relative overflow-hidden group">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-2 text-xs text-gray-400">
                <span className="uppercase">{title}</span>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-900"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-900"></div>
                    <div className="w-3 h-3 rounded-full bg-green-900"></div>
                </div>
            </div>
            {/* Changed to whitespace-pre-wrap to handle newlines correctly */}
            <div className={`${type === 'error' ? 'text-red-400' : 'text-green-400'} whitespace-pre-wrap overflow-x-auto`}>
                {content}
            </div>

            {hiddenAnswer && (
                <div
                    onClick={() => setRevealed(true)}
                    className={`absolute inset-0 bg-gray-900 flex items-center justify-center cursor-pointer transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-95'}`}
                >
                    <div className="text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2 text-yellow-500 animate-pulse" />
                        <p className="text-yellow-500 font-bold uppercase tracking-widest">Click to Reveal Answer</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TerminalBox;
