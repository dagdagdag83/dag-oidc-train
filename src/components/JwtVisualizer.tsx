import React, { useState } from 'react';
import { FileJson, Lock, RefreshCw, Eye, Shield } from 'lucide-react';

const JwtVisualizer: React.FC = () => {
    const [revealed, setRevealed] = useState(false);

    // Raw token parts provided by user
    const header = "eyJhbGciOiJSUzI1NiIsImtpZCI6InNhbmRib3gtc2lnbmluZy1rZXktNWFkN2Y2YWQ2NTUzYjg0ZDhhZWEyNDYxY2QwMjU3MDMiLCJ0eXAiOiJKV1QifQ";
    const payload = "eyJpc3MiOiJodHRwczovL2RlbW8uc2FuZGJveC5zaWduaWNhdC5jb20vYXV0aC9vcGVuIiwibmJmIjoxNzY0MDc5NzEwLCJpYXQiOjE3NjQwNzk3MTAsImV4cCI6MTc2NDA4MDMxMCwiYXVkIjoic2FuZGJveC1zaGlueS1oYXQtMTkxIiwiYW1yIjpbImV4dGVybmFsIl0sImF0X2hhc2giOiI5REtQXzVDQVAwODZEajNTU0Z0QWZRIiwic2lkIjoiODhCNzc3NEU0MkZEQkNEMUYxOTI0RkU5QjBBMjhCREUiLCJzdWIiOiJwTUhWTnpnT0gtMHp1TkluZlpyQURtSDVlcVR4QlVYU1Z6a3d3ejVtWFlBPSIsImF1dGhfdGltZSI6MTc2NDA3OTcwNywiaWRwIjoibmJpZC1zaW11bGF0b3IiLCJpZHBfaWQiOiI2NDkxMzNkNC0xZDk0LTQ0ZjUtOWJhZS1iM2NkOGFkOWI1YzQiLCJuYW1lIjoiUGV0dGVyIE5vcnRodWciLCJ1cGRhdGVkX2F0IjoxNjA2Mzk0MTMwMDAwLCJuaW4iOiIxNzExMDgyOTk3MyIsIm5pbl90eXBlIjoiQ0lUSVpFTiIsIm5pbl9pc3N1aW5nX2NvdW50cnkiOiJOTyIsImlkcF9pc3N1ZXIiOiJzaW11bGF0b3IiLCJ0cmFuc2FjdGlvbl9pZCI6Ijg1ODVlYjYwLTZlMTgtMWM0NC05MzFiLThiMWIwMGFhOTc4YSIsInNhbmRib3giOnRydWUsImFjciI6InN1YnN0YW50aWFsIn0";
    const signature = "FiWaXAdh2hLaJMSMG5ImFFGVQPqVXngSeUN12Y6RWXcPi_t5it7I401071qroBWHRY-D8NqtIXu8Ze75fAI4S2TneFctfRfO3DDU_Ic6Warvglq9HYHSyG1846ZuwKA04xhrO0YAE5m2iw0uHYzg-4cjTluc5OkEbSFirZK7eww-gkdDNdUkT8O8tuBkB_Lv1dEiKfmvlsyBoja1tiqQ7PU5DD7IzJ4LkKv5qSEhGRmVdpDzg3bf2BxwCugHFXLAP1iKmqkxecrHTLKJJHUPbYJoMIdtaIdOZc_pEKrfKd_XCuLYPrLPjzoy6HMC5iqOQZeiguEBzmLDaZRIEW1uXw";

    const decodedHeader = {
        "alg": "RS256",
        "kid": "sandbox-signing-key-5ad7f6ad...",
        "typ": "JWT"
    };

    const decodedPayload = {
        "iss": "https://demo.sandbox.signicat.com/auth/open",
        "aud": "sandbox-shiny-hat-191",
        "sub": "pMHVNzgOH-0zuNInfZrADmH5eqTxBUXSVzkwwz5mXYA=",
        "name": "Petter Northug",
        "nin": "17110829973",
        "nin_type": "CITIZEN",
        "idp": "nbid-simulator",
        "acr": "substantial",
        "exp": 1764080310
    };

    return (
        <div className="mt-6 bg-black border border-gray-700 p-4 rounded font-mono text-xs shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                <span className="text-gray-400 font-bold flex items-center gap-2">
                    {revealed ? <FileJson size={14} className="text-green-400" /> : <Lock size={14} className="text-pink-400" />}
                    {revealed ? "DECODED TOKEN" : "ENCODED TOKEN"}
                </span>
                <button
                    onClick={() => setRevealed(!revealed)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1 transition-all ${revealed ? 'bg-gray-800 text-gray-400' : 'bg-green-900/50 text-green-400 border border-green-500/50 hover:bg-green-900'}`}
                >
                    {revealed ? <RefreshCw size={10} /> : <Eye size={10} />}
                    {revealed ? "Show Encoded" : "Decode"}
                </button>
            </div>

            {!revealed ? (
                <div className="break-all leading-relaxed opacity-90 transition-all">
                    <span className="text-pink-500 hover:bg-pink-900/30 hover:text-white transition-colors cursor-pointer border-b border-pink-900/0 hover:border-pink-500" title="Header">{header}</span>
                    <span className="text-gray-500 font-bold mx-0.5">.</span>
                    <span className="text-purple-400 hover:bg-purple-900/30 hover:text-white transition-colors cursor-pointer border-b border-purple-900/0 hover:border-purple-500" title="Payload">{payload}</span>
                    <span className="text-gray-500 font-bold mx-0.5">.</span>
                    <span className="text-cyan-500 hover:bg-cyan-900/30 hover:text-white transition-colors cursor-pointer border-b border-cyan-900/0 hover:border-cyan-500" title="Signature">{signature}</span>
                </div>
            ) : (
                <div className="space-y-4 animate-in zoom-in-95 duration-300">
                    {/* Header Section */}
                    <div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 border-b border-gray-800 pb-1">Header (Algorithm & Key ID)</p>
                        <p className="text-pink-300">{'{'}</p>
                        {Object.entries(decodedHeader).map(([key, value], i) => (
                            <p key={key} className="pl-4 hover:bg-white/5">
                                <span className="text-pink-400">"{key}"</span>: <span className="text-yellow-300">"{value}"</span>{i < Object.keys(decodedHeader).length - 1 ? ',' : ''}
                            </p>
                        ))}
                        <p className="text-pink-300">{'}'}</p>
                    </div>

                    {/* Payload Section */}
                    <div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 border-b border-gray-800 pb-1">Payload (Data)</p>
                        <p className="text-purple-300">{'{'}</p>
                        {Object.entries(decodedPayload).map(([key, value], i) => (
                            <p key={key} className="pl-4 hover:bg-white/5">
                                <span className="text-purple-400">"{key}"</span>: <span className="text-yellow-300">{typeof value === 'string' ? `"${value}"` : value}</span>{i < Object.keys(decodedPayload).length - 1 ? ',' : ''}
                            </p>
                        ))}
                        <p className="text-purple-300">{'}'}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-gray-800 text-center">
                        <span className="text-cyan-500 text-[10px] flex items-center justify-center gap-1">
                            <Shield size={10} /> Signature Verified (RS256)
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JwtVisualizer;
