import React, { useState } from 'react';
import {
    FileJson,
    Lock,
    Key,
    FileSignature,
    Box,
    Layers,
    ArrowDown
} from 'lucide-react';
import Section from './Section';
import InfoBox from './InfoBox';

const JwtSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'json' | 'jwt' | 'jws' | 'jwe' | 'jwk' | 'nested'>('jwt');

    const renderContent = () => {
        switch (activeTab) {
            case 'json':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-yellow-400 mb-2">JSON (JavaScript Object Notation)</h4>
                        <p className="text-gray-300 mb-4">The raw data format. Human readable, lightweight.</p>
                        <div className="bg-black/50 p-4 rounded border border-yellow-500/30 font-mono text-sm text-yellow-200">
                            {`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}
                        </div>
                    </div>
                );
            case 'jwt':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-purple-400 mb-2">JWT (JSON Web Token)</h4>
                        <p className="text-gray-300 mb-4">
                            The <strong>Abstract Class</strong>. It describes a way to represent claims securely.
                            Think of it as the "Passport" concept.
                        </p>
                        <InfoBox title="Concept" variant="purple" icon={Box}>
                            <p>
                                A JWT doesn't exist on its own. It must be either <strong>Signed (JWS)</strong> or <strong>Encrypted (JWE)</strong> to be useful.
                            </p>
                        </InfoBox>
                    </div>
                );
            case 'jws':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-blue-400 mb-2">JWS (JSON Web Signature)</h4>
                        <p className="text-gray-300 mb-4">
                            The most common implementation. <strong>Signed</strong> for integrity.
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 bg-red-900/50 border border-red-500 rounded text-xs text-red-300">Header</span>
                            <span className="text-gray-500">.</span>
                            <span className="px-2 py-1 bg-purple-900/50 border border-purple-500 rounded text-xs text-purple-300">Payload</span>
                            <span className="text-gray-500">.</span>
                            <span className="px-2 py-1 bg-blue-900/50 border border-blue-500 rounded text-xs text-blue-300">Signature</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            You can READ the data (it's just base64), but you can't CHANGE it without breaking the signature.
                        </p>
                    </div>
                );
            case 'jwe':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-green-400 mb-2">JWE (JSON Web Encryption)</h4>
                        <p className="text-gray-300 mb-4">
                            <strong>Encrypted</strong> for secrecy. The content is hidden.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                            <span className="px-2 py-1 bg-gray-800 border border-gray-600 rounded">Header</span>.
                            <span className="px-2 py-1 bg-green-900/50 border border-green-500 rounded text-green-300">Encrypted Key</span>.
                            <span className="px-2 py-1 bg-gray-800 border border-gray-600 rounded">IV</span>.
                            <span className="px-2 py-1 bg-green-900/50 border border-green-500 rounded text-green-300">Ciphertext</span>.
                            <span className="px-2 py-1 bg-gray-800 border border-gray-600 rounded">Tag</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            Opaque to everyone except the holder of the Private Key.
                        </p>
                    </div>
                );
            case 'jwk':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-pink-400 mb-2">JWK (JSON Web Key)</h4>
                        <p className="text-gray-300 mb-4">
                            The JSON representation of a cryptographic key.
                        </p>
                        <div className="bg-black/50 p-4 rounded border border-pink-500/30 font-mono text-sm text-pink-200 overflow-x-auto">
                            {`{
  "kty": "RSA",
  "use": "sig",
  "kid": "1b94c...",
  "n": "234...",
  "e": "AQAB"
}`}
                        </div>
                    </div>
                );
            case 'nested':
                return (
                    <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-orange-400 mb-2">Nested JWT</h4>
                        <p className="text-gray-300 mb-4">
                            <strong>Signed THEN Encrypted.</strong> The Gold Standard for Signicat.
                        </p>
                        <InfoBox title="Why Nest?" variant="yellow" icon={Layers}>
                            <p>
                                1. <strong>Sign (JWS)</strong>: Proves it came from Signicat.<br />
                                2. <strong>Encrypt (JWE)</strong>: Ensures only YOU can read it.
                            </p>
                        </InfoBox>
                    </div>
                );
        }
    };

    return (
        <Section title="JWT and friends" id="jwt" color="purple">
            <div className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-300">
                        The Alphabet Soup of Identity. <br />
                        <span className="text-purple-400 font-bold">JWT</span> is the concept. <span className="text-blue-400 font-bold">JWS</span> & <span className="text-green-400 font-bold">JWE</span> are the reality.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {/* TOP ROW: INGREDIENTS */}
                    <div className="flex justify-center gap-16">
                        {/* JSON */}
                        <div
                            onClick={() => setActiveTab('json')}
                            className={`flex flex-col items-center cursor-pointer transition-all hover:scale-110 ${activeTab === 'json' ? 'opacity-100 scale-110' : 'opacity-70'}`}
                        >
                            <div className={`w-24 h-24 rounded-full bg-yellow-900/20 border-2 ${activeTab === 'json' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'border-yellow-500/30'} flex items-center justify-center mb-2`}>
                                <FileJson className="text-yellow-400" size={32} />
                            </div>
                            <span className="text-sm font-bold text-yellow-400">JSON</span>
                            <span className="text-[10px] text-gray-500">The Data</span>
                        </div>

                        {/* JWK */}
                        <div
                            onClick={() => setActiveTab('jwk')}
                            className={`flex flex-col items-center cursor-pointer transition-all hover:scale-110 ${activeTab === 'jwk' ? 'opacity-100 scale-110' : 'opacity-70'}`}
                        >
                            <div className={`w-24 h-24 rounded-full bg-pink-900/20 border-2 ${activeTab === 'jwk' ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'border-pink-500/30'} flex items-center justify-center mb-2`}>
                                <Key className="text-pink-400" size={32} />
                            </div>
                            <span className="text-sm font-bold text-pink-400">JWK</span>
                            <span className="text-[10px] text-gray-500">The Key</span>
                        </div>
                    </div>

                    {/* MIDDLE: THE RUSSIAN DOLL (NESTED VISUALIZATION) */}
                    <div className="relative">
                        <div className="absolute left-1/2 -top-8 -translate-x-1/2 text-gray-600 animate-bounce">
                            <ArrowDown size={24} />
                        </div>

                        {/* 1. JWT CONTAINER (ABSTRACT) */}
                        <div
                            onClick={() => setActiveTab('jwt')}
                            className={`
                                w-full p-8 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden
                                ${activeTab === 'jwt' ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-gray-900/40 border-purple-900/30 hover:border-purple-500/50'}
                            `}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Layers size={120} />
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <Layers className="text-purple-400" />
                                <h3 className="text-2xl font-bold text-purple-400">JWT</h3>
                                <span className="text-sm text-purple-300/70 uppercase tracking-widest border border-purple-500/30 px-2 py-1 rounded">The Container</span>
                            </div>

                            {/* 2. JWE CONTAINER (OUTER LAYER) */}
                            <div
                                onClick={(e) => { e.stopPropagation(); setActiveTab('jwe'); }}
                                className={`
                                    ml-2 md:ml-12 p-4 md:p-6 rounded-2xl border-2 transition-all cursor-pointer relative
                                    ${activeTab === 'jwe' ? 'bg-green-900/20 border-green-500 shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'bg-black/40 border-green-900/30 hover:border-green-500/50'}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Lock className="text-green-400" />
                                    <h4 className="text-xl font-bold text-green-400">JWE</h4>
                                    <span className="text-xs text-green-300/70 uppercase tracking-widest border border-green-500/30 px-2 py-1 rounded hidden md:inline">Outer Layer (Encrypted)</span>
                                </div>

                                {/* 3. JWS CONTAINER (INNER PAYLOAD) */}
                                <div
                                    onClick={(e) => { e.stopPropagation(); setActiveTab('jws'); }}
                                    className={`
                                        ml-2 md:ml-12 p-4 md:p-6 rounded-xl border-2 transition-all cursor-pointer
                                        ${activeTab === 'jws' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_20px_rgba(96,165,250,0.2)]' : 'bg-black/40 border-blue-900/30 hover:border-blue-500/50'}
                                    `}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileSignature className="text-blue-400" />
                                        <h5 className="text-lg font-bold text-blue-400">JWS</h5>
                                        <span className="text-xs text-blue-300/70 uppercase tracking-widest border border-blue-500/30 px-2 py-1 rounded hidden md:inline">Inner Payload (Signed)</span>
                                    </div>

                                    <div className="font-mono text-xs md:text-sm text-blue-200 bg-blue-950/50 p-4 rounded border border-blue-500/20 overflow-x-auto">
                                        {`{ "sub": "1234567890", "name": "John Doe", "admin": true }`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NESTED LABEL (Floating) */}
                        <div
                            onClick={() => setActiveTab('nested')}
                            className={`
                                absolute right-0 top-0 -translate-y-1/2 md:rotate-0 md:top-8 md:right-8 md:translate-y-0
                                px-2 py-1 md:px-4 md:py-2 bg-orange-900/80 border border-orange-500 text-orange-300 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded cursor-pointer hover:bg-orange-800 transition-all
                                ${activeTab === 'nested' ? 'ring-2 ring-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : ''}
                            `}
                        >
                            Nested Pattern
                        </div>
                    </div>

                    {/* BOTTOM: INFO PANEL */}
                    <div className="min-h-[200px] p-6 border-t border-gray-800 bg-gray-900/30 rounded-xl">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default JwtSection;
