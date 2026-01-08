import React, { useState } from 'react';
import { RootURL } from '../Utilities/ApiEndpoints';

interface TeamLogoProps {
    src?: string;
    name: string;
    size?: number;
    className?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ src, name, size = 30, className = "" }) => {
    const [error, setError] = useState(false);

    const getSrc = () => {
        if (!src) return "";
        if (src.startsWith('/uploads')) {
            const baseUrl = RootURL.endsWith('/') ? RootURL.slice(0, -1) : RootURL;
            return baseUrl + src;
        }
        return src;
    };

    // Container for actual logo images - clean and circular
    const logoContainerStyle: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        padding: '4px'
    };

    // Container for fallback letters - dark background
    const fallbackContainerStyle: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid #444'
    };

    const fallbackTextStyle: React.CSSProperties = {
        fontSize: `${size * 0.45}px`,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase'
    };

    if (!src || error) {
        return (
            <div style={fallbackContainerStyle} className={className}>
                <span style={fallbackTextStyle}>
                    {name ? name[0] : '?'}
                </span>
            </div>
        );
    }

    return (
        <div style={logoContainerStyle} className={className}>
            <img
                src={getSrc()}
                alt={name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '50%'
                }}
                onError={() => setError(true)}
            />
        </div>
    );
};

export default TeamLogo;
