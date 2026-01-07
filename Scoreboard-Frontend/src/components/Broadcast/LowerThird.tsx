import React, { useEffect, useState } from 'react';
import './LowerThird.css';

export interface LowerThirdData {
    title: string;
    subtitle?: string;
    image?: string;
    duration?: number; // seconds
}

interface LowerThirdProps {
    data: LowerThirdData | null;
    onComplete?: () => void;
}

const LowerThird: React.FC<LowerThirdProps> = ({ data, onComplete }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (data) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onComplete) setTimeout(onComplete, 500); // Wait for exit animation
            }, (data.duration || 5) * 1000);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [data, onComplete]);

    if (!data && !visible) return null;

    return (
        <div className={`lower-third-container ${visible ? 'enter' : 'exit'}`}>
            <div className="lt-blue-strip"></div>
            <div className="lt-content">
                {data?.image && <img src={data.image} alt="" className="lt-image" />}
                <div className="lt-text">
                    <div className="lt-title">{data?.title}</div>
                    {data?.subtitle && <div className="lt-subtitle">{data.subtitle}</div>}
                </div>
            </div>
        </div>
    );
};

export default LowerThird;
