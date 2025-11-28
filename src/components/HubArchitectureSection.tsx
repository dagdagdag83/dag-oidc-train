import React from 'react';
import {
    Shield,
    Server,
    Globe,
    ArrowRight
} from 'lucide-react';
import Section from './Section';
import Card from './Card';

const HubArchitectureSection: React.FC = () => {
    return (
        <Section title="The eID Hub Architecture" id="hub">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <Card icon={Globe} title="The 30+ eID Problem">
                        <p>Customers need access to BankID NO, MitID, FTN, iDIN, Belgian itsme, and 30+ others.</p>
                        <p className="mt-2 text-sm text-gray-400">Building direct integrations for each is impossible to maintain.</p>
                    </Card>
                    <Card icon={Server} title="The Signicat Hub">
                        <p>Signicat offers ONE entry point for all eIDs using your preferred protocol:</p>
                        <ul className="mt-4 space-y-2 text-sm font-mono text-cyan-200">
                            <li className="flex items-center gap-2"><ArrowRight size={12} /> OIDC (OpenID Connect) <span className="text-xs text-gray-500">// Modern, Token-based</span></li>
                            <li className="flex items-center gap-2 text-gray-500"><ArrowRight size={12} /> SAML2 <span className="text-xs text-gray-600">// XML-based, Legacy Enterprise</span></li>
                            <li className="flex items-center gap-2 text-gray-500"><ArrowRight size={12} /> Authentication REST API <span className="text-xs text-gray-600">// REST JSON, Non-standard</span></li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-cyan-500 font-bold uppercase">
                            * This training focuses purely on OIDC
                        </div>
                    </Card>
                </div>

                <div className="cyber-box p-8 flex flex-col items-center justify-center min-h-[400px] border border-cyan-500/50">
                    {/* Simple Visualization of Hub */}
                    <div className="relative w-full h-64 flex items-center justify-center">
                        {/* Hub */}
                        <div className="absolute z-10 w-32 h-32 rounded-full border-4 border-cyan-500 bg-black flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                            <Shield className="w-12 h-12 text-cyan-400 mb-2" />
                            <span className="font-bold text-xs text-cyan-400">SIGNICAT</span>
                            <span className="text-[10px] text-gray-500">eID HUB</span>
                        </div>

                        {/* Client */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
                            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center mb-2 border border-gray-600">
                                <Server className="text-white" />
                            </div>
                            <span className="text-xs">Client App</span>
                        </div>

                        {/* IDPs */}
                        <div className="absolute right-0 top-0 text-center">
                            <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-1 border border-blue-500">
                                <span className="text-[10px] font-bold">BankID</span>
                            </div>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
                            <div className="w-12 h-12 bg-red-900/50 rounded-full flex items-center justify-center mb-1 border border-red-500">
                                <span className="text-[10px] font-bold">MitID</span>
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 text-center">
                            <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mb-1 border border-green-500">
                                <span className="text-[10px] font-bold">FTN</span>
                            </div>
                        </div>

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#00f3ff" strokeWidth="2" strokeDasharray="5" className="animate-pulse" />
                            <line x1="60%" y1="50%" x2="80%" y2="20%" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
                            <line x1="60%" y1="50%" x2="80%" y2="50%" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
                            <line x1="60%" y1="50%" x2="80%" y2="80%" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
                        </svg>
                    </div>
                    <div className="mt-8 text-center text-sm text-cyan-300">
                        "The Abstraction Layer for Digital Identity."
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default HubArchitectureSection;
