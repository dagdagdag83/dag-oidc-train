import React, { useState } from 'react';
import {
    PenTool,
    Lock,
    User,
    ArrowRight,
    Shield,
    Key
} from 'lucide-react';
import Section from './Section';

const CryptoCoreSection: React.FC = () => {
    const [cryptoDir, setCryptoDir] = useState('client_to_signicat');

    return (
        <Section title="The Crypto Core" color="yellow" id="crypto">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">Before we dive into the Finnish lakes, we must have a quick crypto lesson!</p>
                </div>

                {/* CONCEPT CARDS */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="cyber-box p-6 border border-yellow-500/30 bg-yellow-900/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500"><PenTool size={24} /></div>
                            <h3 className="text-2xl font-bold text-yellow-100">SIGNING</h3>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">Goal: <span className="text-white font-bold">IDENTITY & INTEGRITY</span></p>
                        <p className="text-xs font-mono text-gray-400">
                            "I am who I say I am, and this data hasn't changed."
                        </p>
                        <div className="mt-4 pt-4 border-t border-yellow-500/20 text-sm">
                            <span className="block mb-2">Sender uses: <strong className="text-red-400">Sender Private Key</strong> (Lock)</span>
                            <span className="block">Receiver uses: <strong className="text-green-400">Sender Public Key</strong> (Unlock)</span>
                        </div>
                    </div>

                    <div className="cyber-box p-6 border border-yellow-500/30 bg-yellow-900/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500"><Lock size={24} /></div>
                            <h3 className="text-2xl font-bold text-yellow-100">ENCRYPTION</h3>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">Goal: <span className="text-white font-bold">SECRECY</span></p>
                        <p className="text-xs font-mono text-gray-400">
                            "Only YOU can read this."
                        </p>
                        <div className="mt-4 pt-4 border-t border-yellow-500/20 text-sm">
                            <span className="block mb-2">Sender uses: <strong className="text-green-400">Receiver Public Key</strong> (Lock)</span>
                            <span className="block">Receiver uses: <strong className="text-red-400">Receiver Private Key</strong> (Unlock)</span>
                        </div>
                    </div>
                </div>

                {/* INTERACTIVE DIRECTION FLIP */}
                <div className="cyber-box p-8 border border-yellow-500/50">
                    <h3 className="text-xl text-center text-yellow-400 font-bold mb-6 uppercase tracking-widest">
                        The Direction Flip Visualization
                    </h3>

                    {/* Controls */}
                    <div className="flex justify-center gap-4 mb-12">
                        <button
                            onClick={() => setCryptoDir('client_to_signicat')}
                            className={`px-6 py-3 border font-bold transition-all ${cryptoDir === 'client_to_signicat' ? 'bg-pink-900/50 border-pink-400 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'border-gray-700 text-gray-500 hover:border-pink-800'}`}
                        >
                            Scenario: Inbound (Client &rarr; Signicat)
                        </button>
                        <button
                            onClick={() => setCryptoDir('signicat_to_client')}
                            className={`px-6 py-3 border font-bold transition-all ${cryptoDir === 'signicat_to_client' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'border-gray-700 text-gray-500 hover:border-cyan-800'}`}
                        >
                            Scenario: Outbound (Signicat &rarr; Client)
                        </button>
                    </div>

                    {/* Visualization Stage */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative px-12">

                        {/* Left Actor (Client) */}
                        <div className={`flex flex-col items-center transition-all duration-500 ${cryptoDir === 'client_to_signicat' ? 'scale-110' : 'scale-100 opacity-80'}`}>
                            <div className="w-20 h-20 rounded-full bg-pink-900/30 border-2 border-pink-500 flex items-center justify-center mb-4">
                                <User size={40} className="text-pink-400" />
                            </div>
                            <span className="font-bold text-pink-400">CLIENT</span>
                            <div className="mt-4 space-y-2 text-xs">
                                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-700">
                                    <Key size={12} className="text-red-500 fill-current" />
                                    <span className="text-gray-400">Client Private Key</span>
                                </div>

                            </div>
                        </div>

                        {/* Animation Arrows */}
                        <div className="flex-1 text-center relative h-32 flex flex-col justify-center">
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${cryptoDir === 'signicat_to_client' ? 'rotate-180' : ''}`}>
                                <ArrowRight size={32} className={cryptoDir === 'signicat_to_client' ? 'text-cyan-500' : 'text-pink-500'} />
                            </div>

                            <div className="space-y-4 z-10">
                                {/* Signing Action */}
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <span className="font-bold text-yellow-500">SIGN:</span>
                                    {cryptoDir === 'signicat_to_client' ? (
                                        <span className="text-cyan-300">Signicat Private Key</span>
                                    ) : (
                                        <span className="text-pink-300">Client Private Key</span>
                                    )}
                                    <PenTool size={14} className="text-yellow-500" />
                                </div>

                                {/* Encryption Action */}
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <span className="font-bold text-yellow-500">ENCRYPT:</span>
                                    {cryptoDir === 'signicat_to_client' ? (
                                        <span className="text-pink-300">Client Public Key</span>
                                    ) : (
                                        <span className="text-cyan-300">Signicat Public Key</span>
                                    )}
                                    <Lock size={14} className="text-yellow-500" />
                                </div>
                            </div>
                        </div>

                        {/* Right Actor (Signicat) */}
                        <div className={`flex flex-col items-center transition-all duration-500 ${cryptoDir === 'signicat_to_client' ? 'scale-110' : 'scale-100 opacity-80'}`}>
                            <div className="w-20 h-20 rounded-full bg-cyan-900/30 border-2 border-cyan-500 flex items-center justify-center mb-4">
                                <Shield size={40} className="text-cyan-400" />
                            </div>
                            <span className="font-bold text-cyan-400">SIGNICAT</span>
                            <div className="mt-4 space-y-2 text-xs">
                                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-700">
                                    <Key size={12} className="text-red-500 fill-current" />
                                    <span className="text-gray-400">Signicat Private Key</span>
                                </div>
                                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-700">
                                    <Key size={12} className="text-green-500 fill-current" />
                                    <span className="text-gray-400">Client Public Key</span>
                                </div>
                                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-700">
                                    <Key size={12} className="text-green-500 fill-current" />
                                    <span className="text-gray-400">Signicat Public Key</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Section>
    );
};

export default CryptoCoreSection;
