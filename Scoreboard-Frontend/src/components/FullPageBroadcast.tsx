import { useEffect, useState } from "react";
import "./Broadcast.css"; // We'll create this CSS

interface FullPageBroadcastProps {
    message: string;
    onDismiss: () => void;
}

const FullPageBroadcast = ({ message, onDismiss }: FullPageBroadcastProps) => {
    return (
        <div className="broadcast-overlay">
            <div className="broadcast-content">
                <h1 className="broadcast-title">ALERT</h1>
                <h2 className="broadcast-message">{message}</h2>
            </div>
        </div>
    );
};

export default FullPageBroadcast;
