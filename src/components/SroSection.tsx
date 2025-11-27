import React, { useState } from 'react';
import {
    FileKey,
    PenTool,
    ArrowRight,
    Hash,
    CheckCircle
} from 'lucide-react';
import Section from './Section';
import TerminalBox from './TerminalBox';
import InlineCode from './Code';

const SroSection: React.FC = () => {
    const [sroStep, setSroStep] = useState(0);

    return (
        <Section title="SRO Deep Dive" color="red" id="sro">
            <div className="max-w-6xl mx-auto w-full">
                <div className="p-6 border border-red-500/30 rounded-lg bg-red-900/5">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl mb-6 flex items-center gap-2">
                                <FileKey className="text-red-500" />
                                The Anatomy of a Signed Request
                            </h3>
                            <p className="text-red-200 mb-6 font-bold">
                                Instead of sending parameters naked, we wrap them in a JWT and SIGN it.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-900 border border-gray-700 rounded">
                                    <span className="text-xs text-gray-500 uppercase font-bold block mb-2">1. Header</span>
                                    <code className="text-xs text-green-400 block">
                                        {`{ "alg": "RS256", "typ": "JWT", "kid": "client-key-1" }`}
                                    </code>
                                </div>
                                <div className="p-4 bg-gray-900 border border-gray-700 rounded">
                                    <span className="text-xs text-gray-500 uppercase font-bold block mb-2">2. Body (Payload)</span>
                                    <code className="text-xs text-blue-400 block">
                                        {`{ "client_id": "foo", "scope": "openid", "iss": "foo", "aud": "signicat" }`}
                                    </code>
                                </div>
                                <div className="p-4 bg-gray-900 border border-gray-700 rounded relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                        <PenTool size={40} />
                                    </div>
                                    <span className="text-xs text-gray-500 uppercase font-bold block mb-2">3. Signature</span>
                                    <code className="text-xs text-red-400 block break-all">
                                        Rj8s7... (Signed with Client Private Key)
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* SRO Interactive Logic */}
                        <div className="cyber-box p-6 border-red-500/50">
                            <div className="flex justify-between mb-4 border-b border-gray-700 pb-2">
                                <span className="text-xs text-red-400 font-bold">SRO CREATION LAB</span>
                            </div>

                            <div className="space-y-4">
                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${sroStep === 0 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setSroStep(0)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">1. Define Payload</span>
                                        <Hash size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">Gather all OIDC parameters into a JSON object.</p>
                                </div>

                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${sroStep === 1 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setSroStep(1)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">2. Sign (RS256)</span>
                                        <PenTool size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">Hash the data and encrypt the hash with your Private Key.</p>
                                </div>

                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${sroStep === 2 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                    onClick={() => setSroStep(2)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">3. Send Request</span>
                                        <ArrowRight size={14} />
                                    </div>
                                    <p className="text-xs text-gray-400">Pass the massive JWT string in the URL.</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-700">
                                {sroStep === 0 && (
                                    <TerminalBox
                                        title="Payload JSON"
                                        content={`{\n  "client_id": "my-client",\n  "response_type": "code",\n  "scope": "openid profile",\n  "nonce": "xyz123"\n}`}
                                    />
                                )}
                                {sroStep === 1 && (
                                    <TerminalBox
                                        title="Signing Process"
                                        content={`> Loading 'client_private_key.pem'...\n> Hashing payload (SHA-256)...\n> Encrypting hash with RSA Private Key...\n> Signature Generated!`}
                                    />
                                )}
                                {sroStep === 2 && (
                                    <TerminalBox
                                        title="Final URL"
                                        content={`GET /authorize?request=eyJhbGciOiJSUzI1NiIs...<500 chars>...`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default SroSection;
