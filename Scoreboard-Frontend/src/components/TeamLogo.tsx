import React, { useState } from 'react';

interface TeamLogoProps {
    src?: string;
    name: string;
    size?: number;
    className?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ src, name, size = 30, className = "" }) => {
    const [error, setError] = useState(false);

    const fallbackStyle: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#444',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: `${size * 0.5}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flexShrink: 0
    };

    if (!src || error) {
        return (
            <div style={fallbackStyle} className={className}>
                {name ? name[0] : '?'}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className={className}
            style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', flexShrink: 0 }}
            onError={() => setError(true)}
        />
    );
};

export default TeamLogo;
