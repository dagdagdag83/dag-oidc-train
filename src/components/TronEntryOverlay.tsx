import React from 'react';

interface TronEntryOverlayProps {
    entering: boolean;
}

const TronEntryOverlay: React.FC<TronEntryOverlayProps> = ({ entering }) => {
    return (
        <div className={`tron-entry-overlay ${entering ? 'tron-entry-active' : ''}`}>
            <div className="tron-tunnel"></div>
            <div className="tron-bike-line"></div>
        </div>
    );
};

export default TronEntryOverlay;
