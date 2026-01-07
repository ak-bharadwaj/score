import React, { useEffect, useState } from 'react';
import Event from '../../types/Event';
import Scorebug from './Scorebug';
import LowerThird, { LowerThirdData } from './LowerThird';

interface OverlayControllerProps {
    activeEvent: Event | null;
    lowerThirdData: LowerThirdData | null;
    onLowerThirdComplete?: () => void;
}

const OverlayController: React.FC<OverlayControllerProps> = ({ activeEvent, lowerThirdData, onLowerThirdComplete }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // If no active event, don't show overlays
    if (!activeEvent) return null;

    return (
        <div className="overlay-layer">
            {/* Scorebug moved to Header per user request */}
            {/* <Scorebug
                event={activeEvent}
                variant={isMobile ? 'mobile' : 'desktop'}
            /> */}

            <LowerThird
                data={lowerThirdData}
                onComplete={onLowerThirdComplete}
            />
        </div>
    );
};

export default OverlayController;
