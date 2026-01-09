import { useEffect, useState } from "react";
import "./SplashScreen.css";
// We can use these or replace with CSS shapes if logos fail to load

const SplashScreen = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + Math.random() * 10;
			});
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="splash-container">
			<div className="splash-content">
				<div className="splash-logo-circle">
					{/* Fallback to text if img missing, or use img */}
					<div className="splash-initials">JNTUA</div>
				</div>
				<div className="splash-text">
					<h1>JNTUA GAMES 2026</h1>
					<h2>SPORTS MEET UP</h2>
				</div>
				<div className="splash-loader">
					<div className="loader-bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
				</div>
				<div className="splash-status">
					INITIALIZING SYSTEM... {Math.floor(progress)}%
				</div>
			</div>
		</div>
	);
};

export default SplashScreen;
