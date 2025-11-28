import React, { useState } from 'react';
import {
    CheckCircle,
    CheckSquare,
    Square,
    Shield,
    Globe,
    Smartphone,
    Lock,
    AlertTriangle,
    FileText,
    ExternalLink,
    XCircle
} from 'lucide-react';
import Section from './Section';
import InfoBox from './InfoBox';

interface ChecklistItem {
    id: string;
    title: string;
    icon: React.ElementType;
    summary: string;
    details: React.ReactNode;
    criticality: 'high' | 'medium';
}

const items: ChecklistItem[] = [
    {
        id: 'pkce',
        title: 'PKCE (Proof Key for Code Exchange)',
        icon: Lock,
        summary: 'Prevent authorization code interception attacks.',
        criticality: 'high',
        details: (
            <>
                <p className="mb-2">
                    Originally for mobile apps, now <strong>mandatory</strong> for all public clients (SPAs, Mobile).
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li>Client creates a random <code>code_verifier</code>.</li>
                    <li>Client sends hashed <code>code_challenge</code> in the authorization request.</li>
                    <li>Client sends raw <code>code_verifier</code> when exchanging the code.</li>
                    <li>Server verifies the hash matches.</li>
                </ul>
                <InfoBox title="Why?" variant="green" icon={CheckCircle}>
                    Ensures the entity exchanging the code is the same one that initiated the flow.
                </InfoBox>
            </>
        )
    },
    {
        id: 'redirects',
        title: 'Strict Redirect URIs',
        icon: Globe,
        summary: 'Exact matching, HTTPS only, no wildcards.',
        criticality: 'high',
        details: (
            <>
                <p className="mb-2">
                    The <code>redirect_uri</code> is the target for the authorization code. If an attacker controls it, they get the code.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>Exact Matching:</strong> <code>https://app.com/cb</code> != <code>https://app.com/cb?foo=bar</code></li>
                    <li><strong>HTTPS Only:</strong> No plain HTTP (except localhost).</li>
                    <li><strong>No Wildcards:</strong> <code>https://*.app.com</code> is forbidden.</li>
                </ul>
                <InfoBox title="Risk" variant="yellow" icon={AlertTriangle}>
                    Open redirects allow attackers to steal tokens by redirecting users to malicious sites.
                </InfoBox>
            </>
        )
    },
    {
        id: 'nonce',
        title: 'State & Nonce',
        icon: Shield,
        summary: 'CSRF protection and replay attack prevention.',
        criticality: 'high',
        details: (
            <>
                <p className="mb-2">
                    Cryptographic randomness to bind the request to the browser session.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>State:</strong> Prevents Cross-Site Request Forgery (CSRF). The client verifies the state returned matches what was sent.</li>
                    <li><strong>Nonce:</strong> Prevents replay attacks. Bound to the ID Token.</li>
                </ul>
            </>
        )
    },
    {
        id: 'tls',
        title: 'Transport Security',
        icon: Lock,
        summary: 'TLS 1.2 or higher is mandatory.',
        criticality: 'high',
        details: (
            <>
                <p className="mb-2">
                    All communication MUST be encrypted in transit.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>TLS 1.2+:</strong> Older protocols (SSL, TLS 1.0/1.1) are vulnerable.</li>
                    <li><strong>HSTS:</strong> Enforce HTTPS strict transport security headers.</li>
                </ul>
            </>
        )
    },
    {
        id: 'fapi',
        title: 'High Assurance (FAPI 2.0)',
        icon: Shield,
        summary: 'For financial-grade or sensitive data.',
        criticality: 'medium',
        details: (
            <>
                <p className="mb-2">
                    If you require high assurance or security, consider implementing the FAPI 2.0 profile.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>PAR:</strong> Pushed Authorization Requests for integrity.</li>
                    <li><strong>DPoP / mTLS:</strong> Sender-constrained tokens to prevent theft.</li>
                    <li><strong>JARM / JWE:</strong> Encrypted responses for confidentiality.</li>
                </ul>
                <InfoBox title="Tip" variant="green" icon={Shield}>
                    Even if you don't need full FAPI compliance, adopting parts of it (like PAR) significantly improves security.
                </InfoBox>
            </>
        )
    },
    {
        id: 'spa',
        title: 'SPA Best Practices',
        icon: Globe,
        summary: 'Browser-Based Apps (Draft BCP).',
        criticality: 'medium',
        details: (
            <>
                <p className="mb-2">
                    Single Page Applications run in an untrusted environment (the browser).
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>No Implicit Flow:</strong> Do not use <code>response_type=token</code>. It returns tokens in the URL fragment.</li>
                    <li><strong>Use Code Flow + PKCE:</strong> The gold standard.</li>
                    <li><strong>Refresh Tokens:</strong> Handle with care (Rotation, DPoP, or HttpOnly cookies).</li>
                </ul>
                <a
                    href="https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-xs"
                >
                    <FileText size={12} /> Read the IETF Draft
                    <ExternalLink size={12} />
                </a>
            </>
        )
    },
    {
        id: 'native',
        title: 'Native Apps Best Practices',
        icon: Smartphone,
        summary: 'RFC 8252 (AppAuth).',
        criticality: 'medium',
        details: (
            <>
                <p className="mb-2">
                    Mobile and Desktop applications.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
                    <li><strong>System Browser:</strong> Use the OS browser (SFSafariViewController, Chrome Custom Tabs), NOT embedded WebViews.</li>
                    <li><strong>Shared Session:</strong> Allows SSO with other apps and the browser.</li>
                    <li><strong>Security:</strong> App cannot spy on the user's credentials (which WebViews can do).</li>
                </ul>
                <a
                    href="https://datatracker.ietf.org/doc/rfc8252/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-xs"
                >
                    <FileText size={12} /> Read RFC 8252
                    <ExternalLink size={12} />
                </a>
            </>
        )
    }
];

const SecurityChecklistSection: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string>(items[0].id);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const activeItem = items.find(i => i.id === selectedId) || items[0];

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const mandatoryItems = items.filter(i => i.criticality === 'high');
    const allMandatoryChecked = mandatoryItems.every(i => checkedItems[i.id]);

    return (
        <Section title="Security Checklist" id="checklist">
            <div className={`grid md:grid-cols-12 gap-6 transition-all duration-300 ease-out rounded-xl p-2 
                ${allMandatoryChecked
                    ? 'scale-[1.02] border border-green-400 shadow-[0_0_60px_rgba(74,222,128,0.4)] bg-green-900/10 ring-1 ring-green-400/50 relative overflow-hidden'
                    : 'border border-transparent'}`}>
                {allMandatoryChecked && (
                    <>
                        <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none rounded-xl" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 opacity-50 blur-xl animate-pulse pointer-events-none" />
                    </>
                )}
                {/* LIST */}
                <div className="md:col-span-5 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`p-3 md:p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-3 md:gap-4 group
                                ${selectedId === item.id
                                    ? 'bg-cyan-900/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCheck(item.id);
                                }}
                                className={`p-1 rounded hover:bg-white/10 transition-colors ${checkedItems[item.id] ? 'text-green-400' : 'text-gray-600'}`}
                            >
                                {checkedItems[item.id] ? <CheckSquare size={20} /> : <Square size={20} />}
                            </div>

                            <div className={`p-2 rounded-full ${selectedId === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-500'}`}>
                                <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-bold text-sm ${selectedId === item.id ? 'text-white' : 'text-gray-300'} ${checkedItems[item.id] ? 'line-through decoration-green-500/50 text-gray-500' : ''}`}>
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">{item.summary}</p>
                            </div>
                            {item.criticality === 'high' && (
                                <div title="Critical">
                                    <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* DETAIL VIEW */}
                <div className="md:col-span-7">
                    <div className={`h-full bg-gray-900/80 border rounded-xl p-6 relative overflow-hidden transition-colors duration-500 ${allMandatoryChecked ? 'border-green-500/50' : 'border-gray-700'}`}>
                        {/* Background decoration */}
                        <div className={`absolute top-0 right-0 p-32 blur-[100px] rounded-full pointer-events-none transition-colors duration-500 ${allMandatoryChecked ? 'bg-green-500/10' : 'bg-cyan-500/5'}`} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-4">
                                <activeItem.icon size={32} className={allMandatoryChecked ? 'text-green-400' : 'text-cyan-400'} />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{activeItem.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        {activeItem.criticality === 'high' ? (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-900/50 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                                                Critical Priority
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                                                Best Practice
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-gray-300 leading-relaxed text-sm mb-8">
                                {activeItem.details}
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-700 flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-mono">ID: {activeItem.id.toUpperCase()}</span>

                                <label className="flex items-center gap-3 cursor-pointer group select-none">
                                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${checkedItems[activeItem.id] ? 'text-green-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                        {checkedItems[activeItem.id] ? 'Implemented' : 'Mark as Implemented'}
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={!!checkedItems[activeItem.id]}
                                            onChange={() => toggleCheck(activeItem.id)}
                                        />
                                        <div className="w-6 h-6 border-2 border-gray-600 rounded peer-checked:bg-green-500 peer-checked:border-green-500 transition-all"></div>
                                        <CheckCircle size={16} className="absolute top-0.5 left-0.5 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default SecurityChecklistSection;
