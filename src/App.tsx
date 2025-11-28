import { useState } from 'react';

import HighSecuritySection from './components/HighSecuritySection';
import SecurityChecklistSection from './components/SecurityChecklistSection';
import TrainingDebrief from './components/TrainingDebrief';
import Navbar from './components/Navbar';
import JwtSection from './components/JwtSection';
import ScopesAndClaims from './components/ScopesAndClaims';
import TronBackground from './components/TronBackground';
import HeroSection from './components/HeroSection';
import TronEntryOverlay from './components/TronEntryOverlay';
import HubArchitectureSection from './components/HubArchitectureSection';
import OidcFlowSection from './components/OidcFlowSection';
import CryptoCoreSection from './components/CryptoCoreSection';
import Footer from './components/Footer';

export default function OidcTraining() {
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

    return (
        <>
            <Navbar />
            <div className="min-h-screen grid-bg relative bg-[#050510]">
                <div className="scanline"></div>

                {/* TRON ENTRY OVERLAY */}
                <TronEntryOverlay entering={entering} />

                {/* HERO SECTION */}
                <HeroSection onEnter={handleEnter} />

                {/* Content Sections with Background */}
                <div className="relative">
                    <TronBackground />

                    <HubArchitectureSection />

                    {/* SECTION 2: OIDC Philosophy & Happy Path */}
                    <OidcFlowSection />

                    <JwtSection />
                    <ScopesAndClaims />


                    {/* SECTION 4: THE CRYPTO CORE */}
                    <CryptoCoreSection />

                    <HighSecuritySection />
                    <SecurityChecklistSection />
                    <TrainingDebrief />

                    {/* FOOTER */}
                    <Footer />
                </div> {/* End of content wrapper */}
            </div>
        </>
    );
}