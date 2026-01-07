import "./Ticker.css"; // We'll create this CSS

interface ScrollingTickerProps {
    text: string;
}

const ScrollingTicker = ({ text }: ScrollingTickerProps) => {
    return (
        <div className="ticker-container">
            <div className="ticker-label">LATEST UPDATES</div>
            <div className="ticker-wrapper">
                <div className="ticker-content">{text}</div>
            </div>
        </div>
    );
};

export default ScrollingTicker;
