import React, { useState } from 'react';
import {
    Cpu,
    Key,
    Lock,
    Server,
    Zap
} from 'lucide-react';
import Section from './Section';
import Card from './Card';
import TerminalBox from './TerminalBox';
import Code from './Code';


const OAuthApis: React.FC = () => {
    const [oauthStep, setOauthStep] = useState(0);

    return (
        <Section title="Signicat APIs & OAuth" id="oauth" color="green">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        Authentication isn't just for humans. <br />
                        Signicat offers powerful APIs for <span className="text-green-400">Signing, Data Enrichment, and Risk Analysis</span>.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Card icon={Cpu} title="Machine-to-Machine" color="green">
                            <p className="mb-4">When a backend server needs to talk to Signicat (e.g., to create a signing order), there is no human user to enter a password.</p>
                            <p className="text-sm text-gray-400">We use the <strong>OAuth 2.0 Client Credentials Flow</strong>.</p>
                        </Card>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-4 text-green-200 text-sm p-3 border border-green-500/30 bg-green-900/10 rounded">
                                <Key size={18} />
                                <span><strong>Client ID:</strong> Like a Username for the server.</span>
                            </div>
                            <div className="flex items-center gap-4 text-green-200 text-sm p-3 border border-green-500/30 bg-green-900/10 rounded">
                                <Lock size={18} />
                                <span><strong>Client Secret:</strong> Like a Password. Keep it safe!</span>
                            </div>
                        </div>
                    </div>

                    {/* API FLOW VISUALIZATION */}
                    <div className="cyber-box p-6 border border-green-500/50">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
                            <span className="text-xs text-green-400 font-bold uppercase">Client Credentials Flow</span>
                        </div>

                        <div className="space-y-2">
                            <div
                                className={`p-3 border rounded cursor-pointer transition-all ${oauthStep === 0 ? 'border-green-500 bg-green-900/20' : 'border-gray-700 opacity-50'}`}
                                onClick={() => setOauthStep(0)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-green-300">1. Request Token</span>
                                    <Server size={14} className="text-green-500" />
                                </div>
                                <p className="text-xs text-gray-400">POST /connect/token with <Code>client_credentials</Code> grant type.</p>
                            </div>

                            <div
                                className={`p-3 border rounded cursor-pointer transition-all ${oauthStep === 1 ? 'border-green-500 bg-green-900/20' : 'border-gray-700 opacity-50'}`}
                                onClick={() => setOauthStep(1)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-green-300">2. Receive Access Token</span>
                                    <Key size={14} className="text-green-500" />
                                </div>
                                <p className="text-xs text-gray-400">Signicat verifies secret and returns a JWT Access Token.</p>
                            </div>

                            <div
                                className={`p-3 border rounded cursor-pointer transition-all ${oauthStep === 2 ? 'border-green-500 bg-green-900/20' : 'border-gray-700 opacity-50'}`}
                                onClick={() => setOauthStep(2)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-green-300">3. Call API</span>
                                    <Zap size={14} className="text-green-500" />
                                </div>
                                <p className="text-xs text-gray-400">Use token in Header: <Code>Authorization: Bearer &lt;token&gt;</Code></p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700">
                            {oauthStep === 0 && (
                                <TerminalBox title="Request" content={`POST /connect/token\nclient_id=demo-client\nclient_secret=*****\ngrant_type=client_credentials`} type="info" />
                            )}
                            {oauthStep === 1 && (
                                <TerminalBox title="Response" content={`HTTP 200 OK\n{\n  "access_token": "eyJhbGci...",\n  "expires_in": 3600\n}`} type="info" />
                            )}
                            {oauthStep === 2 && (
                                <TerminalBox title="API Call" content={`POST /signing/orders\nAuthorization: Bearer eyJhbGci...`} type="info" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default OAuthApis;
