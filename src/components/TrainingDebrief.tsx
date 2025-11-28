import React from 'react';
import {
    Globe,
    Award,
    Shield,
    Lock,
    Shuffle
} from 'lucide-react';
import Section from './Section';

const TrainingDebrief: React.FC = () => {
    return (
        <Section title="Training Debrief" id="summary" color="blue">
            <div className="max-w-4xl mx-auto">
                <div className="cyber-box p-4 md:p-8 border border-blue-500/30 bg-blue-900/5">
                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-blue-900/30 rounded-full border border-blue-500/30 shrink-0">
                                <Globe className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-blue-100 mb-1">OIDC: The Universal Language</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">It's an open standard used everywhere. Signicat didn't invent it, we just do it really well.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-blue-500/20"></div>

                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-yellow-900/30 rounded-full border border-yellow-500/30 shrink-0">
                                <Award className="text-yellow-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-yellow-100 mb-1">Certified Excellence</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Signicat's OIDC solution is officially certified by the OpenID Foundation. We play by the rules.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-blue-500/20"></div>

                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-red-900/30 rounded-full border border-red-500/30 shrink-0">
                                <Shield className="text-red-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-red-100 mb-1">High Security Challenge</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Balancing user experience with rigorous security requirements (like FAPI2) is our specialty.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-blue-500/20"></div>

                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-green-900/30 rounded-full border border-green-500/30 shrink-0">
                                <Lock className="text-green-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-green-100 mb-1">The Trust Anchor</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Signicat bridges the gap between complex eIDs and simple developer APIs.</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-blue-500/20"></div>

                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-pink-900/30 rounded-full border border-pink-500/30 shrink-0">
                                <Shuffle className="text-pink-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-pink-100 mb-1">Future Proofing</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Signicat is ready for eIDAS 2.0, Digital Wallets, and whatever comes next.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TrainingDebrief;
