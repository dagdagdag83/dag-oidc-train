import React, { useState } from 'react';
import {
    Lock,
    Shield,
    EyeOff,
    Server,
    Code,
    ArrowRight,
    FileKey,
    CheckCircle,
    XCircle,
    Scale
} from 'lucide-react';
import Section from './Section';
import TerminalBox from './TerminalBox';

const ParVsSro: React.FC = () => {
    const [parStep, setParStep] = useState(0);

    return (
        <Section title="PAR vs SRO" color="red" id="parvssro">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        Two ways to secure the request. One is a modern API call, the other is cryptography.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* PAR CARD */}
                    <div className="cyber-box p-8 border border-pink-500/50 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6 border-b border-pink-500/30 pb-4">
                            <Server className="text-pink-400" size={32} />
                            <h3 className="text-2xl text-pink-400">PAR (Pushed Auth Requests)</h3>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Mechanism</span>
                                <p className="text-sm">Server-to-Server POST call over TLS. You trade parameters for a UUID.</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Security Model</span>
                                <p className="text-sm">Relies on <strong className="text-white">Transport Layer Security (HTTPS)</strong> + Client Auth (Secret/Cert).</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Implementation</span>
                                <div className="flex items-center gap-2 text-green-400 font-bold mt-1">
                                    <CheckCircle size={16} /> Easy
                                </div>
                                <p className="text-xs text-gray-400">Just a standard API call. No complex signing libraries needed.</p>
                            </div>
                        </div>
                    </div>

                    {/* SRO CARD */}
                    <div className="cyber-box p-8 border border-red-500/50 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6 border-b border-red-500/30 pb-4">
                            <FileKey className="text-red-400" size={32} />
                            <h3 className="text-2xl text-red-400">SRO (Signed Request Object)</h3>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Mechanism</span>
                                <p className="text-sm">Pass a signed JWT as a query parameter (<code>?request=eyJ...</code>).</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Security Model</span>
                                <p className="text-sm">Relies on <strong className="text-white">Cryptographic Signature</strong> (Private Key).</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-500">Implementation</span>
                                <div className="flex items-center gap-2 text-red-400 font-bold mt-1">
                                    <XCircle size={16} /> Hard
                                </div>
                                <p className="text-xs text-gray-400">Requires managing keys, rotating them, and using JWT signing libraries correctly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-gray-900 border border-gray-700 text-center text-sm text-gray-400 rounded">
                    <Scale size={16} className="inline mr-2 mb-1" />
                    <strong>Verdict:</strong> For FTN compliance, customers <strong>MUST</strong> use either PAR or SRO. We strongly recommend PAR (easier integration), but some customers may still prefer SRO (often due to legacy banking infrastructure or specific non-repudiation policies).
                </div>
            </div>
        </Section>
    );
};

export default ParVsSro;
