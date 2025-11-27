import React from 'react';
import {
    Shield,
    ArrowRight,
    PenTool,
    CheckCircle,
    Lock,
    Unlock,
    AlertTriangle
} from 'lucide-react';
import Section from './Section';
import Step from './Step';

const FinnishWeirdness: React.FC = () => {
    return (
        <Section title="Finnish Security-Paranoia & General Weirdness" id="mle">
            <div className="max-w-6xl mx-auto w-full">
                {/* Intro */}
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        FTN (Finnish Trust Network) is extra paranoid. <br />
                        They don't just want MLE on the response. They want security on the request too.
                    </p>
                    <div className="flex justify-center mt-4">
                        <div className="p-4 bg-purple-900/20 border border-purple-500 text-purple-200 text-sm rounded shadow-[0_0_15px_rgba(168,85,247,0.2)] max-w-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 -mr-8 -mt-8 rotate-45"></div>
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="text-purple-400" size={20} />
                                <h4 className="font-bold text-purple-400 uppercase tracking-wider text-xs">The Reason Why</h4>
                            </div>
                            <p className="text-xs leading-relaxed">
                                The requirements (Signed Requests + Encrypted Responses) align perfectly with <strong>FAPI 2.0 (Financial-grade API)</strong>. Traficom effectively wants FAPI 2.0—they just don't realize it yet. But they will.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <span className="p-2 bg-red-900/50 border border-red-500 text-red-200 text-sm font-bold rounded">
                            Requirement: Signed Request Objects OR PAR + MLE
                        </span>
                    </div>
                </div>

                {/* Two Columns: Inbound vs Outbound */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Col 1: Inbound (Request Object) */}
                    <div className="cyber-box p-6 border border-pink-500/30">
                        <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2 border-b border-pink-500/20 pb-2">
                            <ArrowRight className="rotate-45" /> Inbound: The Paranoid Request
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">Client CANNOT just use plain query parameters. They must use <strong>PAR</strong> or a <strong>Signed Request Object</strong>.</p>

                        {/* Steps */}
                        <div className="space-y-4 font-mono text-sm">
                            <Step
                                num={1}
                                actor="Client"
                                action="Signs Payload"
                                detail="Creates JWT signed with Client Private Key"
                                icon={PenTool}
                                color="pink"
                            />
                            <Step
                                num={2}
                                actor="Client"
                                action="Sends to Signicat"
                                detail="Via PAR endpoint or 'request' parameter"
                                icon={Server}
                                color="pink"
                            />
                            <Step
                                num={3}
                                actor="Signicat"
                                action="Verifies Signature"
                                detail="Using CLIENT PUBLIC Key"
                                icon={CheckCircle}
                                color="pink"
                            />
                        </div>
                    </div>

                    {/* Col 2: Outbound (ID Token) */}
                    <div className="cyber-box p-6 border border-cyan-500/30">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                            <ArrowRight className="-rotate-45" /> Outbound: ID Token (MLE)
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">Standard FTN Requirement: The ID Token we send back MUST be encrypted.</p>

                        {/* Steps */}
                        <div className="space-y-4 font-mono text-sm">
                            <Step
                                num={1}
                                actor="Signicat"
                                action="Signs Payload"
                                detail="Using SIGNICAT PRIVATE Key"
                                icon={PenTool}
                                color="cyan"
                            />
                            <Step
                                num={2}
                                actor="Signicat"
                                action="Encrypts JWS"
                                detail="Using CLIENT PUBLIC Key"
                                icon={Lock}
                                color="cyan"
                            />
                            <div className="text-center py-2 text-gray-500 text-xs tracking-widest uppercase">- Transmission over Internet -</div>
                            <Step
                                num={3}
                                actor="Client"
                                action="Decrypts JWE"
                                detail="Using CLIENT PRIVATE Key"
                                icon={Unlock}
                                color="cyan"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-900/10 border border-yellow-500/30 rounded text-sm text-yellow-100/80">
                    <div className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} /> Support Note - Common Failure Modes
                    </div>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li><strong>Config Error (Admin):</strong> Customer rotated keys internally but didn't upload the new Public Key to Signicat Dashboard.</li>
                        <li><strong>Implementation Error (Dev):</strong> Customer library doesn't support the required algorithms (e.g., RSA-OAEP-256).</li>
                        <li><strong>JWT Format:</strong> Sending a malformed JWT (header/payload structure) before encryption even happens.</li>
                        <li><strong>Key Mismatch:</strong> Using the wrong Private Key to decrypt what we sent.</li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

// Missing Server icon import fix
import { Server } from 'lucide-react';

export default FinnishWeirdness;
