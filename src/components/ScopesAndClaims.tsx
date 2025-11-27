import React, { useState } from 'react';
import {
    Scan,
    Eye,
    Shield,
    Database,
    Lock,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';
import Section from './Section';
import Card from './Card';
import Code from './Code';

const ScopesAndClaims: React.FC = () => {
    const [scopes, setScopes] = useState({
        openid: true, // Always required
        profile: false,
        nin: false,
        eid_extra: false
    });

    const toggleScope = (key: keyof typeof scopes) => {
        if (key === 'openid') return; // Cannot toggle off
        setScopes(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Section title="Scopes & Claims" id="scopes" color="green">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        You ask for <span className="text-green-400 font-bold">Scopes</span> (Permission). <br />
                        You get back <span className="text-green-400 font-bold">Claims</span> (Data).
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* LEFT: PHILOSOPHY & CONTROLS */}
                    <div className="space-y-8">
                        <Card icon={Shield} title="The Philosophy of Less" color="green">
                            <p className="mb-4">
                                <strong>Data Minimization:</strong> Only ask for what you strictly need.
                            </p>
                            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded text-sm text-gray-300">
                                <p className="mb-2">
                                    <span className="text-green-400 font-bold">Standard Scopes:</span> Use OIDC standards (<Code>profile</Code>, <Code>email</Code>, <Code>address</Code>) whenever possible.
                                </p>
                                <p>
                                    <span className="text-yellow-400 font-bold">eID Specifics:</span> Some eIDs have unique data. We use <Code>eid_name-extra</Code> (e.g., <Code>nbid-extra</Code>) for these.
                                </p>
                            </div>
                        </Card>

                        {/* SCOPE TOGGLES */}
                        <div className="cyber-box p-6 border border-green-500/50">
                            <div className="flex items-center gap-3 mb-6 border-b border-green-500/30 pb-4">
                                <Scan className="text-green-400" />
                                <h3 className="text-xl text-green-400 font-bold">SCOPE SCANNER</h3>
                            </div>

                            <div className="space-y-4">
                                {/* OPENID */}
                                <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded opacity-75 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <Lock size={16} className="text-gray-400" />
                                        <span className="font-mono text-green-300">openid</span>
                                    </div>
                                    <div className="w-10 h-5 bg-green-500 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>

                                {/* PROFILE */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${scopes.profile ? 'bg-green-900/20 border-green-500' : 'border-gray-700 hover:border-green-500/50'}`}
                                    onClick={() => toggleScope('profile')}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-green-300">profile</span>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${scopes.profile ? 'bg-green-500' : 'bg-gray-700'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${scopes.profile ? 'right-1' : 'left-1'}`}></div>
                                    </div>
                                </div>

                                {/* NIN */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${scopes.nin ? 'bg-green-900/20 border-green-500' : 'border-gray-700 hover:border-green-500/50'}`}
                                    onClick={() => toggleScope('nin')}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-green-300">nin</span>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${scopes.nin ? 'bg-green-500' : 'bg-gray-700'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${scopes.nin ? 'right-1' : 'left-1'}`}></div>
                                    </div>
                                </div>

                                {/* EID EXTRA */}
                                <div
                                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${scopes.eid_extra ? 'bg-yellow-900/20 border-yellow-500' : 'border-gray-700 hover:border-yellow-500/50'}`}
                                    onClick={() => toggleScope('eid_extra')}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-yellow-300">nbid-extra</span>
                                        <AlertTriangle size={14} className="text-yellow-500" />
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${scopes.eid_extra ? 'bg-yellow-500' : 'bg-gray-700'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${scopes.eid_extra ? 'right-1' : 'left-1'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: DECRYPTED CLAIMS MONITOR */}
                    <div className="cyber-box p-0 overflow-hidden border border-green-500/50 flex flex-col">
                        <div className="bg-black/50 p-4 border-b border-green-500/30 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Database size={18} className="text-green-400" />
                                <span className="font-bold text-green-400 text-sm tracking-wider">ID TOKEN PAYLOAD</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-500">LIVE DECRYPTION</span>
                            </div>
                        </div>

                        <div className="p-6 font-mono text-sm space-y-2 flex-1 bg-black/80">
                            <div className="text-gray-500">{"{"}</div>

                            {/* ALWAYS PRESENT */}
                            <div className="pl-4">
                                <span className="text-pink-400">"sub"</span>: <span className="text-blue-300">"928392-2382..."</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-pink-400">"iss"</span>: <span className="text-blue-300">"https://login.signicat.com"</span>,
                            </div>

                            {/* PROFILE CLAIMS */}
                            {scopes.profile && (
                                <div className="animate-fade-in-left">
                                    <div className="pl-4">
                                        <span className="text-pink-400">"name"</span>: <span className="text-blue-300">"Ola Nordmann"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-pink-400">"given_name"</span>: <span className="text-blue-300">"Ola"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-pink-400">"family_name"</span>: <span className="text-blue-300">"Nordmann"</span>,
                                    </div>
                                </div>
                            )}

                            {/* NIN CLAIMS */}
                            {scopes.nin && (
                                <div className="animate-fade-in-left">
                                    <div className="pl-4 bg-green-900/20 -mx-4 px-4 border-l-2 border-green-500">
                                        <span className="text-pink-400">"nin"</span>: <span className="text-blue-300">"12038512345"</span>,
                                    </div>
                                </div>
                            )}

                            {/* EXTRA CLAIMS */}
                            {scopes.eid_extra && (
                                <div className="animate-fade-in-left">
                                    <div className="pl-4 bg-yellow-900/20 -mx-4 px-4 border-l-2 border-yellow-500">
                                        <span className="text-pink-400">"nbid_birth_date"</span>: <span className="text-blue-300">"1985-03-12"</span>,
                                    </div>
                                    <div className="pl-4 bg-yellow-900/20 -mx-4 px-4 border-l-2 border-yellow-500">
                                        <span className="text-pink-400">"nbid_assurance_level"</span>: <span className="text-blue-300">"high"</span>,
                                    </div>
                                </div>
                            )}

                            <div className="text-gray-500">{"}"}</div>
                        </div>

                        <div className="p-3 bg-gray-900 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
                            <span>Algorithm: RS256</span>
                            <span>Size: {250 + (scopes.profile ? 120 : 0) + (scopes.nin ? 40 : 0) + (scopes.eid_extra ? 150 : 0)} bytes</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ScopesAndClaims;
