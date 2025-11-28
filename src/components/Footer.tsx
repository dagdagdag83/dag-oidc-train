import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 py-10 text-center text-gray-600 border-t border-gray-900 bg-black">
            <p className="font-mono text-sm tracking-widest flex items-center justify-center gap-4">
                <a
                    href="https://www.linkedin.com/in/dags83/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-900 hover:text-cyan-500 transition-colors flex items-center gap-1 group"
                >
                    DAG SNEEGGEN <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <span>//</span>
                <a
                    href="https://developer.signicat.com/docs/eid-hub/oidc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-700 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                >
                    SIGNICAT <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <span>//</span>
                <span>OIDC TRAINING</span>
                <span>//</span>
                <span>END OF LINE</span>
            </p>
        </footer>
    );
};

export default Footer;
