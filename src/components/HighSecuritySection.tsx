import React, { useState } from 'react';
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
    Scale,
    Link,
    BadgeCheck,
    EyeOff,
    Code,
    Hash
} from 'lucide-react';
import Section from './Section';
import Step from './Step';
import InlineCode from './Code';
import InfoBox from './InfoBox';
import TerminalBox from './TerminalBox';

const HighSecuritySection: React.FC = () => {
    const [activeConstraint, setActiveConstraint] = useState<'mtls' | 'dpop'>('mtls');
    const [parStep, setParStep] = useState(0);
    const [sroStep, setSroStep] = useState(0);
    const [outboundStep, setOutboundStep] = useState(0);

    return (
        <Section title="High Security (FAPI2)" id="fapi">
            <div className="max-w-6xl mx-auto w-full">
                {/* Intro */}
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300 mb-6">
                        When "good enough" isn't enough. <br />
                        <strong>FAPI 2.0 (Financial-grade API)</strong> is the gold standard for high-security APIs.
                    </p>

                    <InfoBox title="The Finnish Connection" variant="purple" icon={Shield}>
                        <p>
                            The <strong>Finnish Trust Network (FTN)</strong> is a prime example. While not explicitly "FAPI 2.0" by name, it enforces some of the rigorous requirements:
                            <br />
                            <span className="font-bold text-white">Request Integrity + Response Confidentiality.</span>
                        </p>
                    </InfoBox>
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

                    <div className="mt-8 p-4 bg-gray-900 border border-gray-700 text-center text-sm text-gray-400 rounded mb-16">
                        <Scale size={16} className="inline mr-2 mb-1" />
                        <strong>Verdict:</strong> For FAPI2 compliance, customers <strong>MUST</strong> use either PAR or SRO. We strongly recommend PAR (easier integration), but some customers may still prefer SRO (often due to legacy banking infrastructure or specific non-repudiation policies).
                    </div>

                    {/* PAR DEEP DIVE */}
                    <div className="mb-8">
                        <div className="p-4 border border-pink-500/30 rounded-lg bg-pink-900/5">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl mb-4 flex items-center gap-2">
                                        <Lock className="text-pink-500" size={20} />
                                        PAR Deep Dive
                                    </h3>
                                    <p className="text-pink-200 mb-4 text-sm font-bold">
                                        It's the same "Auth Code Flow", but we secure the start.
                                    </p>
                                    <div className="p-3 bg-pink-900/20 border border-pink-500/40 rounded mb-4">
                                        <span className="block text-xs text-gray-300 mb-1">The Trade:</span>
                                        <p className="text-white text-xs">
                                            We send ALL the sensitive parameters (back-channel) &larr; <br />
                                            We get back a short, one-time <span className="text-pink-400">Request URI</span> (URN).
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <Shield className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                                            <span><strong>Integrity:</strong> Users can't tamper with parameters (scopes/claims) in the browser URL.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <EyeOff className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                                            <span><strong>Privacy:</strong> No PII (SSNs) leaking in browser history logs.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* PAR Interactive Logic */}
                                <div className="cyber-box p-4 border-pink-500/50">
                                    <div className="flex justify-between mb-2 border-b border-gray-700 pb-1">
                                        <span className="text-xs text-pink-400 font-bold">PAR FLOW SIMULATION</span>
                                    </div>

                                    <div className="space-y-2">
                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${parStep === 0 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setParStep(0)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">1. POST /connect/par (Back-Channel)</span>
                                                <Server size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">Client sends all parameters (client_id, scope, state) directly to Signicat.</p>
                                        </div>

                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${parStep === 1 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setParStep(1)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">2. Receive URI</span>
                                                <Code size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">Signicat responds with a reference: <InlineCode>urn:[...]:request_uri:F7A3E8</InlineCode></p>
                                        </div>

                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${parStep === 2 ? 'border-pink-500 bg-pink-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setParStep(2)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">3. Redirect User (Front-Channel)</span>
                                                <ArrowRight size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">User redirected to Signicat with JUST the reference URI. Safe & Clean.</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-gray-700">
                                        {parStep === 0 && (
                                            <TerminalBox
                                                title="1. Back-Channel Request"
                                                content={`POST /connect/par HTTP/1.1\nHost: id.signicat.com\nContent-Type: application/x-www-form-urlencoded\n\nclient_id=demo-client\n&scope=openid profile\n&response_type=code\n&redirect_uri=https://client.com/cb\n&state=xyz123`}
                                            />
                                        )}
                                        {parStep === 1 && (
                                            <TerminalBox
                                                title="2. Signicat Response"
                                                content={`HTTP/1.1 201 Created\n{\n  "request_uri": "urn:ietf:params:oauth:request_uri:F7A3E8",\n  "expires_in": 60\n}`}
                                            />
                                        )}
                                        {parStep === 2 && (
                                            <TerminalBox
                                                title="3. Front-Channel Redirect"
                                                content={`GET /connect/authorize?client_id=demo-client&request_uri=urn:ietf:params:oauth:request_uri:F7A3E8`}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SRO DEEP DIVE */}
                    <div className="mb-16">
                        <div className="p-4 border border-red-500/30 rounded-lg bg-red-900/5">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl mb-4 flex items-center gap-2">
                                        <FileKey className="text-red-500" size={20} />
                                        SRO Deep Dive
                                    </h3>
                                    <p className="text-red-200 mb-4 text-sm font-bold">
                                        Instead of sending parameters naked, we wrap them in a JWT and SIGN it.
                                    </p>

                                    <div className="space-y-2">
                                        <div className="p-3 bg-gray-900 border border-gray-700 rounded">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">1. Header</span>
                                            <code className="text-[10px] text-green-400 block">
                                                {`{ "alg": "RS256", "typ": "JWT", "kid": "client-key-1" }`}
                                            </code>
                                        </div>
                                        <div className="p-3 bg-gray-900 border border-gray-700 rounded">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">2. Body (Payload)</span>
                                            <code className="text-[10px] text-blue-400 block">
                                                {`{ "client_id": "foo", "scope": "openid", "iss": "foo", "aud": "signicat" }`}
                                            </code>
                                        </div>
                                        <div className="p-3 bg-gray-900 border border-gray-700 rounded relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                                <PenTool size={32} />
                                            </div>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">3. Signature</span>
                                            <code className="text-[10px] text-red-400 block break-all">
                                                Rj8s7... (Signed with Client Private Key)
                                            </code>
                                        </div>
                                    </div>
                                </div>

                                {/* SRO Interactive Logic */}
                                <div className="cyber-box p-4 border-red-500/50">
                                    <div className="flex justify-between mb-2 border-b border-gray-700 pb-1">
                                        <span className="text-xs text-red-400 font-bold">SRO CREATION LAB</span>
                                    </div>

                                    <div className="space-y-2">
                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${sroStep === 0 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setSroStep(0)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">1. Define Payload</span>
                                                <Hash size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">Gather all OIDC parameters into a JSON object.</p>
                                        </div>

                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${sroStep === 1 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setSroStep(1)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">2. Sign (RS256)</span>
                                                <PenTool size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">Hash the data and encrypt the hash with your Private Key.</p>
                                        </div>

                                        <div
                                            className={`p-2 border rounded cursor-pointer transition-all ${sroStep === 2 ? 'border-red-500 bg-red-900/20' : 'border-gray-700 opacity-50'}`}
                                            onClick={() => setSroStep(2)}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs">3. Send Request</span>
                                                <ArrowRight size={12} />
                                            </div>
                                            <p className="text-[10px] text-gray-400">Pass the massive JWT string in the URL.</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-gray-700">
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

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div
                                    onClick={() => setOutboundStep(0)}
                                    className={`p-4 border rounded cursor-pointer transition-all ${outboundStep === 0 ? 'bg-cyan-900/20 border-cyan-500' : 'bg-gray-900/50 border-gray-700 hover:border-cyan-500/50'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Lock size={16} className={outboundStep === 0 ? 'text-cyan-400' : 'text-gray-500'} />
                                        <h4 className={`font-bold ${outboundStep === 0 ? 'text-cyan-400' : 'text-gray-300'}`}>1. The Package (JWE)</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">The client receives an opaque, encrypted string.</p>
                                </div>

                                <div
                                    onClick={() => setOutboundStep(1)}
                                    className={`p-4 border rounded cursor-pointer transition-all ${outboundStep === 1 ? 'bg-cyan-900/20 border-cyan-500' : 'bg-gray-900/50 border-gray-700 hover:border-cyan-500/50'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Unlock size={16} className={outboundStep === 1 ? 'text-cyan-400' : 'text-gray-500'} />
                                        <h4 className={`font-bold ${outboundStep === 1 ? 'text-cyan-400' : 'text-gray-300'}`}>2. Decrypt (Private Key)</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">Client uses their Private Key to peel the encryption layer.</p>
                                </div>

                                <div
                                    onClick={() => setOutboundStep(2)}
                                    className={`p-4 border rounded cursor-pointer transition-all ${outboundStep === 2 ? 'bg-cyan-900/20 border-cyan-500' : 'bg-gray-900/50 border-gray-700 hover:border-cyan-500/50'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <BadgeCheck size={16} className={outboundStep === 2 ? 'text-cyan-400' : 'text-gray-500'} />
                                        <h4 className={`font-bold ${outboundStep === 2 ? 'text-cyan-400' : 'text-gray-300'}`}>3. Verify & Read</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">Inside is a Signed JWT (JWS). Verify signature and read claims.</p>
                                </div>
                            </div>

                            <div className="h-full">
                                {outboundStep === 0 && (
                                    <TerminalBox
                                        title="Encrypted Token (JWE)"
                                        content={`eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.
(Header: Encrypt to Client Public Key)
.
<Encrypted Content Key>
.
<Initialization Vector>
.
<Ciphertext (The actual JWS)>
.
<Authentication Tag>`}
                                    />
                                )}
                                {outboundStep === 1 && (
                                    <TerminalBox
                                        title="Decrypted Payload (JWS)"
                                        content={`eyJhbGciOiJSUzI1NiIsImtpZCI6InNpZ25pY2F0LWtleSJ9.
(Header: Signed by Signicat)
.
eyJzdWIiOiJ1c2VyMTIzIiwiYXVkIjoiY2xpZW50IiwiZnRuX3NzbCI6InRydWUifQ.
(Payload: The Claims)
.
<Signature>`}
                                    />
                                )}
                                {outboundStep === 2 && (
                                    <TerminalBox
                                        title="Verified Claims"
                                        content={`{
  "sub": "user123",
  "aud": "my-client-id",
  "iss": "https://id.signicat.com",
  "ftn_hetu": "210281-9988",
  "exp": 1735689600
}`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SENDER CONSTRAINED TOKENS SECTION */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-gray-800 pb-4">
                        <ArrowRight className="text-yellow-500" /> Sender-Constrained Tokens
                    </h3>

                    <InfoBox title="Current Limitation" variant="yellow" icon={AlertTriangle} className="mb-8">
                        <p>
                            <strong>Note:</strong> Signicat does not currently support these methods. They are primarily relevant for securing API-to-API communication, rather than the initial OIDC authentication flow.
                        </p>
                    </InfoBox>

                    <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-5">
                            <p className="text-gray-300 mb-6">
                                <strong>Bearer Tokens</strong> are like cash. If you steal it, you can spend it. <br />
                                <strong>Sender-Constrained Tokens</strong> are like a credit card. You need to prove you own it to use it.
                            </p>

                            <div className="space-y-4">
                                <div
                                    onClick={() => setActiveConstraint('mtls')}
                                    className={`p-4 border rounded cursor-pointer transition-all ${activeConstraint === 'mtls' ? 'bg-yellow-900/20 border-yellow-500' : 'bg-gray-900/50 border-gray-700 hover:border-yellow-500/50'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link className={activeConstraint === 'mtls' ? 'text-yellow-400' : 'text-gray-500'} />
                                        <h4 className={`font-bold ${activeConstraint === 'mtls' ? 'text-yellow-400' : 'text-gray-300'}`}>mTLS (Mutual TLS)</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">Transport Layer Binding. The connection itself is the proof.</p>
                                </div>

                                <div
                                    onClick={() => setActiveConstraint('dpop')}
                                    className={`p-4 border rounded cursor-pointer transition-all ${activeConstraint === 'dpop' ? 'bg-orange-900/20 border-orange-500' : 'bg-gray-900/50 border-gray-700 hover:border-orange-500/50'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <BadgeCheck className={activeConstraint === 'dpop' ? 'text-orange-400' : 'text-gray-500'} />
                                        <h4 className={`font-bold ${activeConstraint === 'dpop' ? 'text-orange-400' : 'text-gray-300'}`}>dPoP (Demonstrating Proof-of-Possession)</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">Application Layer Binding. A cryptographic signature in the header.</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="cyber-box p-8 border border-gray-700 h-full flex flex-col justify-center items-center relative overflow-hidden">
                                {activeConstraint === 'mtls' && (
                                    <div className="animate-fade-in text-center">
                                        <div className="flex items-center justify-center gap-4 mb-6">
                                            <div className="p-4 bg-gray-800 rounded border border-gray-600">Client</div>
                                            <div className="relative">
                                                <div className="h-2 w-32 bg-yellow-900/50 rounded overflow-hidden">
                                                    <div className="absolute inset-0 bg-yellow-500/20 animate-pulse"></div>
                                                </div>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-full border-2 border-yellow-500 z-10 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                                                    <Lock size={16} className="text-yellow-500" />
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-800 rounded border border-gray-600">Server</div>
                                        </div>
                                        <h4 className="text-xl font-bold text-yellow-400 mb-2">mTLS: The Secure Pipe</h4>
                                        <p className="text-sm text-gray-300">
                                            The client presents a <strong>Client Certificate</strong> during the TLS handshake. <br />
                                            The server knows EXACTLY who is calling before any data is exchanged.
                                        </p>
                                        <div className="mt-4 flex gap-2 justify-center">
                                            <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-500/30">Secure</span>
                                            <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-500/30">Infrastructure Heavy</span>
                                        </div>
                                    </div>
                                )}

                                {activeConstraint === 'dpop' && (
                                    <div className="animate-fade-in text-center">
                                        <div className="flex flex-col items-center gap-4 mb-6">
                                            <div className="w-full max-w-md bg-gray-900 p-3 rounded border border-orange-500/30 font-mono text-xs text-left">
                                                <div className="text-gray-500">POST /resource HTTP/1.1</div>
                                                <div className="text-gray-500">Authorization: DPoP &lt;access_token&gt;</div>
                                                <div className="text-orange-400">DPoP: &lt;jwt_signature_of_request&gt;</div>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-orange-400 mb-2">dPoP: The Signed Badge</h4>
                                        <p className="text-sm text-gray-300">
                                            The client signs the request (method, URI) with a private key held in the browser/app. <br />
                                            The server verifies the signature matches the public key in the token.
                                        </p>
                                        <div className="mt-4 flex gap-2 justify-center">
                                            <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-500/30">Flexible</span>
                                            <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-500/30">Implementation Heavy</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-900 border border-gray-700 text-center text-sm text-gray-400 rounded">
                        <Scale size={16} className="inline mr-2 mb-1" />
                        <strong>Verdict:</strong> Unlike PAR vs SRO, there is no "winner" here. The choice between mTLS and dPoP depends heavily on your specific architecture, infrastructure capabilities, and platform constraints.
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default HighSecuritySection;
