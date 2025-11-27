import React, { useState } from 'react';
import {
    Shield,
    ArrowRight,
    Lock,
    Server,
    EyeOff,
    Code
} from 'lucide-react';
import Section from './Section';
import TerminalBox from './TerminalBox';
import InlineCode from './Code';

const ParSection: React.FC = () => {
    const [parStep, setParStep] = useState(0);

    return (
        <Section title="PAR Deep Dive" color="pink" id="par">
            <div className="max-w-6xl mx-auto w-full">
                <div className="p-6 border border-pink-500/30 rounded-lg bg-pink-900/5">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl mb-6 flex items-center gap-2">
                                <Lock className="text-pink-500" />
                                Why PAR?
                            </h3>
                            <p className="text-pink-200 mb-6 font-bold">
                                It's the same "Auth Code Flow", but we secure the start.
                            </p>
                            <div className="p-4 bg-pink-900/20 border border-pink-500/40 rounded mb-6">
                                <span className="block text-sm text-gray-300 mb-2">The Trade:</span>
                                <p className="text-white text-sm">
                                    We send ALL the sensitive parameters (back-channel) &larr; <br />
                                    We get back a short, one-time <span className="text-pink-400">Request URI</span> (URN).
                                </p>
                            </div>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-pink-500 mt-1 shrink-0" />
                                    <span><strong>Integrity:</strong> Users can't tamper with parameters (scopes/claims) in the browser URL.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <EyeOff className="w-5 h-5 text-pink-500 mt-1 shrink-0" />
                                    <span><strong>Privacy:</strong> No PII (SSNs) leaking in browser history logs.</span>
                                </li>
                            </ul>
                        </div>

                        {/* PAR Interactive Logic */}
                        <div className="cyber-box p-6 border-pink-500/50">
                            <div className="flex justify-between mb-4 border-b border-gray-700 pb-2">
                                <span className="text-xs text-pink-400 font-bold">PAR FLOW SIMULATION</span>
                            </div>

                            <div className="space-y-4">
                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${parStep === 0 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setParStep(0)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">1. POST /connect/par (Back-Channel)</span>
                                        <Server size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">Client sends all parameters (client_id, scope, state) directly to Signicat.</p>
                                </div>

                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${parStep === 1 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setParStep(1)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">2. Receive URI</span>
                                        <Code size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">Signicat responds with a reference: <InlineCode>urn:[...]:request_uri:F7A3E8</InlineCode></p>
                                </div>

                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${parStep === 2 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setParStep(2)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">3. Redirect User (Front-Channel)</span>
                                        <ArrowRight size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">User redirected to Signicat with JUST the reference URI. Safe & Clean.</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <TerminalBox
                                    title="Example PAR Response"
                                    content={`HTTP/1.1 201 Created\n{\n  "request_uri": "urn:[...]:request_uri:F7A3E8",\n  "expires_in": 60\n}`}
                                />
                                <div className="mt-4">
                                    <TerminalBox
                                        title="Next Step: Authorize Request"
                                        content={`GET /connect/authorize?client_id=demo-client&request_uri=urn:[...]:request_uri:F7A3E8`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ParSection;
