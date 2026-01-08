import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../Utilities/Socket";
import Scorebug from "../Broadcast/Scorebug";
import Event from "../../types/Event";
import "./header.css";

interface HeaderProps {
	activeEvent?: Event | null;
}

function Header({ activeEvent }: HeaderProps) {
	const [time, setTime] = useState(new Date());
	const [isConnected, setIsConnected] = useState(socket.connected);
	const Navigate = useNavigate();

	useEffect(() => {
		// Clock Timer
		const timer = setInterval(() => setTime(new Date()), 1000);

		// Socket Status
		const onConnect = () => setIsConnected(true);
		const onDisconnect = () => setIsConnected(false);

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			clearInterval(timer);
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	// Format Date: "Mon, 01 Jan"
	const dateString = time.toLocaleDateString('en-GB', {
		weekday: 'short',
		day: '2-digit',
		month: 'short'
	});

	// Format Time: "14:05:30"
	const timeString = time.toLocaleTimeString('en-GB', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});

	const hideNav = (() => {
		try {
			const params = new URLSearchParams(window.location.search);
			return params.get("hideNav") === "1" || params.get("kiosk") === "1";
		} catch { return false; }
	})();

	if (hideNav) return null;

	return (
		<header className="broadcast-header">
			{/* Left: Branding */}
			<div className="header-brand">
				<Link to="/" className="brand-link">
					<img src="/logo192.png" alt="JNTUA Logo" className="brand-logo-img" />
					<div className="brand-text">
						<span className="brand-title">JNTUA</span>
						<span className="brand-subtitle">SPORTS MEET UP 2026</span>
					</div>
				</Link>
			</div>

			{/* Center: Integrated Scorebug (Broadcast Mode) */}
			<div className="header-center-broadcast">
				{activeEvent ? (
					<Scorebug event={activeEvent} variant="desktop" inHeader={true} />
				) : (
					<div className="header-status-standby">STANDBY</div>
				)}
			</div>

			{/* Right: Status & Clock */}
			<div className="header-status">
				<div className={`connection-pill ${isConnected ? 'online' : 'offline'}`}>
					<span className="status-dot"></span>
					{isConnected ? "LIVE" : "OFFLINE"}
				</div>
				<div className="digital-clock">
					<span className="clock-date">{dateString}</span>
					<span className="clock-time">{timeString}</span>
				</div>
			</div>
		</header>
	);
}

export default Header;
