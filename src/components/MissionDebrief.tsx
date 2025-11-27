import React from 'react';
import {
    Globe,
    Award,
    Shield,
    Shuffle,
    MessageCircle
} from 'lucide-react';
import Section from './Section';

const MissionDebrief: React.FC = () => {
    return (
        <Section title="Mission Debrief" id="summary" color="blue">
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Globe className="text-blue-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">OIDC: The Universal Language</h4>
                                <p className="text-gray-400 text-sm">It's an open standard used everywhere. We didn't invent it, we just mastered it.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Award className="text-yellow-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">Certified Excellence</h4>
                                <p className="text-gray-400 text-sm">Our solution is officially certified by the OpenID Foundation. We play by the rules.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Shield className="text-red-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">The FTN Challenge</h4>
                                <p className="text-gray-400 text-sm">Paranoid security creates significant friction for customers. It's hard, but necessary.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Shuffle className="text-pink-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg">The Mobile Switch Trap</h4>
                                <p className="text-gray-400 text-sm">App-to-browser switching is a chaos variable. State can be lost, and it's hard to mitigate.</p>
                            </div>
                        </div>
                    </div>

                    <div className="cyber-box p-8 border border-blue-500/50 bg-blue-900/10 text-center flex flex-col justify-center">
                        <MessageCircle size={48} className="mx-auto text-blue-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Questions?</h3>
                        <p className="text-gray-300 mb-6">The floor is yours.</p>

                        <div className="pt-6 border-t border-blue-500/30">
                            <p className="text-sm text-gray-400 uppercase font-bold mb-3">Internal Comms</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="px-3 py-1 bg-blue-900/50 rounded border border-blue-500/30 text-xs text-blue-200">#dtp</span>
                                <span className="px-3 py-1 bg-blue-900/50 rounded border border-blue-500/30 text-xs text-blue-200">#team-connect</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default MissionDebrief;
