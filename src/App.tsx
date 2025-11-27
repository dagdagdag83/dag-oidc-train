import React, { useState } from 'react';
import {
    Shield,
    Server,
    Globe,
    User,
    Lock,
    Key,
    Smartphone,
    ArrowRight,
    Code,
    AlertTriangle,
    BookOpen,
    PenTool
} from 'lucide-react';

import Section from './components/Section';
import Card from './components/Card';
import JwtVisualizer from './components/JwtVisualizer';
import FinnishWeirdness from './components/FinnishWeirdness';
import ParSection from './components/ParSection';
import SroSection from './components/SroSection';
import MissionDebrief from './components/MissionDebrief';
import Navbar from './components/Navbar';
import JwtSection from './components/JwtSection';
import ScopesAndClaims from './components/ScopesAndClaims';
import InlineCode from './components/Code';
import TronBackground from './components/TronBackground';




export default function OidcTraining() {
    const [step, setStep] = useState(0);
    const [showToken, setShowToken] = useState(false);
    const [cryptoDir, setCryptoDir] = useState('client_to_signicat');
    const [entering, setEntering] = useState(false);

    // Auto-scroll handler for smooth navigation
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleEnter = () => {
        setEntering(true);
        setTimeout(() => {
            scrollTo('hub');
            // Keep animation active for a bit longer to ensure overlay fades during scroll
            setTimeout(() => setEntering(false), 1000);
        }, 1000);
    };

    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            setShowToken(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen grid-bg relative bg-[#050510]">
                <div className="scanline"></div>


                {/* TRON ENTRY OVERLAY */}
                <div className={`tron-entry-overlay ${entering ? 'tron-entry-active' : ''}`}>
                    <div className="tron-tunnel"></div>
                    <div className="tron-bike-line"></div>
                </div>

                {/* HERO SECTION */}
                <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-transparent"></div>
                    <div className="z-10 animate-fade-in-up">
                        <h1 className="text-6xl md:text-8xl font-black mb-4 neon-text-blue tracking-tighter">
                            OpenID Connect
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-cyan-200 font-bold tracking-[0.5em] mb-8">
                            Signicat Training
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-400 mb-12 text-lg">
                            Fighting for the Users: Identity, Tokens, and the Finnish Protocol
                        </p>
                        <button
                            onClick={handleEnter}
                            className="group relative px-12 py-6 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold uppercase tracking-[0.2em] hover:bg-cyan-500/10 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] overflow-hidden"
                        >
                            <span className="relative z-10">Enter The System</span>
                            <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 w-full shadow-[0_0_10px_#22d3ee]"></div>
                            <div className="absolute top-0 right-0 h-1 bg-cyan-400 w-full shadow-[0_0_10px_#22d3ee]"></div>
                        </button>
                    </div>
                </div>

                {/* Content Sections with Background */}
                <div className="relative">
                    <TronBackground />

                    {/* SECTION 1: THE EID HUB ARCHITECTURE */}
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

                    {/* SECTION 2: OIDC Philosophy & Happy Path */}
                    <Section title="OIDC: The Universal Translator" id="happypath">

                        {/* NEW: OIDC Philosophy */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card icon={BookOpen} title="Why OIDC?">
                                    <p className="mb-4 text-sm">
                                        Before OIDC, we had SAML (XML-based, heavy). <br />
                                        OIDC is built on <strong>OAuth 2.0</strong> and uses <strong>JSON</strong>.
                                    </p>
                                    <div className="p-3 bg-cyan-900/10 border border-cyan-500/20 rounded text-xs text-cyan-200">
                                        "I don't want your password. I just want a Ticket (Token) proving who you are."
                                    </div>
                                </Card>
                                <Card icon={Key} title="Identity vs. Access">
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-cyan-400">OAuth 2.0:</span>
                                            <span className="text-gray-400">"Authorization" (Access to API)</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-pink-400">OIDC:</span>
                                            <span className="text-gray-400">"Authentication" (Who are you?)</span>
                                        </li>
                                    </ul>
                                    <p className="mt-3 text-xs text-gray-500 italic">Signicat uses both: ID Token (Who) + Access Token (API Access)</p>
                                </Card>
                            </div>
                        </div>

                        <div className="text-center mb-8 pt-8 border-t border-gray-800">
                            <h3 className="text-2xl text-white mb-2">The Flow: Authorization Code</h3>
                        </div>

                        <div className="bg-gray-900/80 p-6 rounded-lg border border-cyan-500/30">
                            {/* Interactive Flow Diagram */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 relative">

                                {/* Steps */}
                                {[
                                    { id: 0, label: "Login Trigger", icon: User },
                                    { id: 1, label: "Redirect", icon: ArrowRight },
                                    { id: 2, label: "3rd-party EID", icon: Smartphone },
                                    { id: 3, label: "Code Return", icon: Code },
                                    { id: 4, label: "Token Exchange", icon: Key },
                                ].map((s, idx) => (
                                    <div key={idx} className={`flex flex-col items-center z-10 transition-all duration-500 ${step >= idx ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step === idx ? 'bg-cyan-500 text-black shadow-[0_0_20px_#00f3ff]' : 'bg-gray-800 text-gray-400'}`}>
                                            <s.icon size={20} />
                                        </div>
                                        <span className="text-xs font-mono uppercase text-center w-24">{s.label}</span>
                                    </div>
                                ))}

                                {/* Progress Bar */}
                                <div className="absolute top-6 left-0 h-1 bg-gray-800 w-full -z-0">
                                    <div
                                        className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                                        style={{ width: `${step * 25}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Dynamic Description Box */}
                            <div className="cyber-box p-6 min-h-[150px]">

                                {/* Button container moved to top */}
                                <div className="mb-6 flex justify-end gap-4 border-b border-gray-800 pb-4">
                                    <button
                                        onClick={() => { setStep(Math.max(0, step - 1)); setShowToken(false); }}
                                        className="px-4 py-2 border border-gray-600 hover:bg-gray-800 text-sm"
                                        disabled={step === 0}
                                    >
                                        PREV
                                    </button>
                                    {!showToken && (
                                        <button
                                            onClick={handleNextStep}
                                            className="px-6 py-2 bg-cyan-900/50 border border-cyan-500 hover:bg-cyan-500/20 text-cyan-300 text-sm font-bold"
                                        >
                                            {step === 4 ? "REVEAL TOKEN" : "NEXT STEP >"}
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="text-cyan-400 font-mono text-xl font-bold">0{step + 1}</div>
                                    <div className="flex-1">
                                        {step === 0 && (
                                            <>
                                                <h4 className="font-bold text-lg mb-2">Login Trigger</h4>
                                                <p>User clicks "Log in with BankID" on the Client's website.</p>
                                            </>
                                        )}
                                        {step === 1 && (
                                            <>
                                                <h4 className="font-bold text-lg mb-2">Redirect (Front-channel)</h4>
                                                <p>Client browser is redirected to Signicat.</p>
                                                <code className="block bg-black/50 p-2 mt-2 text-xs text-green-300 overflow-x-auto">
                                                    GET /connect/authorize?response_type=code&client_id=...&scope=openid+profile
                                                </code>
                                            </>
                                        )}
                                        {step === 2 && (
                                            <>
                                                <h4 className="font-bold text-lg text-yellow-400 mb-2">Federation to 3rd-party EID</h4>
                                                <p className="mb-2">User is redirected to the specific ID method (BankID, MitID, etc). This often involves leaving the Client's site context completely.</p>

                                                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded">
                                                    <h5 className="font-bold text-red-300 flex items-center gap-2"><AlertTriangle size={16} /> The Danger Zone:</h5>
                                                    <p className="text-sm text-gray-300">
                                                        If this step triggers an external App Switch (common on mobile), and the user returns to a <em>different</em> browser (e.g. Samsung Internet instead of Chrome), <strong>Authentication will fail</strong> because the session cookie/state is lost.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {step === 3 && (
                                            <>
                                                <h4 className="font-bold text-lg mb-2">Code Return</h4>
                                                <p>Signicat generates a one-time <strong>Authorization Code</strong> and redirects browser back to Client.</p>
                                                <InlineCode className="block bg-black/50 p-2 mt-2 text-xs text-green-300">
                                                    302 Redirect &rarr; https://client.com/cb?code=83jdh...
                                                </InlineCode>
                                            </>
                                        )}
                                        {step === 4 && (
                                            <>
                                                <h4 className="font-bold text-lg mb-2">Token Exchange (Back-channel)</h4>
                                                <p className="text-pink-300 font-bold">Crucial Step!</p>
                                                <p>Client Server calls Signicat Server directly. No browser involved.</p>
                                                <p className="mt-2 text-sm text-gray-400">They swap <InlineCode>code</InlineCode> + <InlineCode>client_secret</InlineCode> for <InlineCode>Access Token</InlineCode> & <InlineCode>ID Token</InlineCode>.</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {showToken && <JwtVisualizer />}
                            </div>
                        </div>
                    </Section>




                    <JwtSection />
                    <ScopesAndClaims />


                    {/* SECTION 4: THE CRYPTO CORE */}
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

                    <FinnishWeirdness />
                    <ParSection />
                    <SroSection />
                    <MissionDebrief />

                    {/* FOOTER */}
                    <footer className="py-10 text-center text-gray-600 border-t border-gray-900 bg-black">
                        <p className="font-mono text-sm">SIGNICAT // OIDC TRAINING // END OF LINE</p>
                    </footer>
                </div> {/* End of content wrapper */}
            </div>
        </>
    );
}