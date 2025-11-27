import React from 'react';
import {
    Shield,
    ArrowRight,
    PenTool,
    CheckCircle,
    Lock,
    Unlock,
    AlertTriangle,
    Server,
    FileKey,
    XCircle,
    Scale
} from 'lucide-react';
import Section from './Section';
import Step from './Step';
import InlineCode from './Code';
import InfoBox from './InfoBox';

const FinnishWeirdness: React.FC = () => {
    return (
        <Section title="Finnish Weirdness" id="mle">
            <div className="max-w-6xl mx-auto w-full">
                {/* Intro */}
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        FTN (Finnish Trust Network) is extra paranoid. <br />
                        They don't just want MLE on the response. They want security on the request too.
                    </p>
                    <div className="mt-4">
                        <InfoBox title="The Reason Why" variant="purple" icon={Shield}>
                            <p className="text-xs leading-relaxed">
                                The requirements (Signed Requests + Encrypted Responses) align perfectly with <strong>FAPI 2.0 (Financial-grade API)</strong>. Traficom effectively wants FAPI 2.0—they just don't realize it yet. But they will.
                            </p>
                        </InfoBox>
                    </div>
                </div>

                {/* INBOUND SECTION */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-gray-800 pb-4">
                        <ArrowRight className="text-pink-500" /> Inbound: Securing the Request
                    </h3>

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
                                    <p className="text-sm">Server-to-Server POST call over TLS. You trade parameters for a <strong>Request URI</strong> (URN).</p>
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
                                    <p className="text-sm">Pass a signed JWT as a query parameter (<InlineCode>?request=eyJ...</InlineCode>).</p>
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


                {/* OUTBOUND SECTION */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-gray-800 pb-4">
                        <ArrowRight className="text-cyan-500" /> Outbound: Securing the Response
                    </h3>

                    <div className="cyber-box p-8 border border-cyan-500/30">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-cyan-900/30 p-3 rounded-full border border-cyan-500/50">
                                <Lock className="text-cyan-400" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-cyan-400">Encrypted ID Token (MLE)</h4>
                                <p className="text-sm text-gray-400">Standard FTN Requirement: The ID Token we send back MUST be encrypted.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
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

                {/* SUPPORT NOTE */}
                {/* SUPPORT NOTE */}
                <InfoBox title="Support Note - Common Failure Modes" variant="yellow" icon={AlertTriangle}>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li><strong>Config Error (Admin):</strong> Customer rotated keys internally but didn't upload the new Public Key to Signicat Dashboard.</li>
                        <li><strong>Implementation Error (Dev):</strong> Customer library doesn't support the required algorithms (e.g., RSA-OAEP-256).</li>
                        <li><strong>JWT Format:</strong> Sending a malformed JWT (header/payload structure) before encryption even happens.</li>
                        <li><strong>Key Mismatch:</strong> Using the wrong Private Key to decrypt what we sent.</li>
                    </ul>
                </InfoBox>
            </div>
        </Section>
    );
};

export default FinnishWeirdness;

