import "./footer.css";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="broadcast-footer">
			<div className="footer-ticker-line"></div>
			<div className="footer-content">
				<div className="footer-left">
					<span className="footer-label">SYSTEM:</span> ONLINE
					<span className="footer-separator">|</span>
					<span className="footer-label">VERSION:</span> 2.0.0 (Broadcast)
				</div>
				<div className="footer-right">
					JNTUA GAMES 2026 &copy; OFFICIAL SCOREBOARD
				</div>
			</div>
		</footer>
	);
};

export default Footer;
