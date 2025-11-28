import React, { useState } from 'react';
import {
    User,
    ArrowRight,
    Smartphone,
    Code,
    Key,
    BookOpen,
    AlertTriangle
} from 'lucide-react';
import Section from './Section';
import Card from './Card';
import InlineCode from './Code';
import JwtVisualizer from './JwtVisualizer';

const OidcFlowSection: React.FC = () => {
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    return (
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
                            onClick={() => { setStep(Math.max(0, step - 1)); }}
                            className="px-4 py-2 border border-gray-600 hover:bg-gray-800 text-sm"
                            disabled={step === 0}
                        >
                            PREV
                        </button>
                        {step < 4 && (
                            <button
                                onClick={handleNextStep}
                                className="px-6 py-2 bg-cyan-900/50 border border-cyan-500 hover:bg-cyan-500/20 text-cyan-300 text-sm font-bold"
                            >
                                NEXT STEP &gt;
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

                    {step === 4 && <JwtVisualizer />}
                </div>
            </div>
        </Section>
    );
};

export default OidcFlowSection;
