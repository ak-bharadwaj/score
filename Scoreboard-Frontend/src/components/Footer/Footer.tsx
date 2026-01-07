import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import "./footer.css";
import { BRAND } from "../../config/branding";
const Footer = () => {
	return (
		<footer style={styles.footer1} className="footer-div">
			<div style={styles.description}>
				<h4 className="CRTDH-name-footer1">{BRAND.eventName} {BRAND.year}</h4>
				<hr></hr>
				<p className="CRTDH-desc">
					Official scoreboard of {BRAND.orgName} — {BRAND.eventName} ({BRAND.dates})
					<br />Copyright © {BRAND.year}, {BRAND.orgName}, All rights reserved
				</p>
				<hr />
				<p className="credits CRTDH-desc">Live Scoreboard developed at {BRAND.orgName}</p>
				<hr />
				<div className="social-icons">
					<h4
						className="CRTDH-name-footer1"
						style={{ marginBottom: "0px", marginTop: "30px" }}
					>
						Connect with us!
					</h4>
					<span>
						<a target="blank" href={BRAND.social.facebook}>
							<FacebookIcon />
						</a>
						<a target="blank" href={BRAND.social.instagram}>
							<InstagramIcon />
						</a>
						<a target="blank" href={BRAND.social.linkedin}>
							<LinkedInIcon />
						</a>
					</span>
				</div>
			</div>
			<div className="quick-links-block" style={styles.quickLinks}>
				<h4 className="CRTDH-name-footer1">Quick Links</h4>
				<Link target="blank" to={BRAND.website} className="quick-links-link">
					<p className="quick-links ">
						<ArrowForwardIcon /> &nbsp;{BRAND.orgName}
					</p>
				</Link>
				<Link to="/" className="quick-links-link">
					<p className="quick-links ">
						<ArrowForwardIcon /> &nbsp;Home
					</p>
				</Link>
			</div>
			<div style={styles.reachUs}>
				<h4 className="CRTDH-name-footer1">Reach Us</h4>
				<p className="Head-office ">
					<HomeOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;Get In Touch
				</p>
				<p className="head-office-address">
					<Link
						to="https://www.google.com/maps/place/Rajeev+Gandhi+Memorial+College+of+Engineering+and+Technology/@15.505343,78.374587,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb5b49bf7e231ed:0xf209159e6bde969c!8m2!3d15.505343!4d78.3771619!16s%2Fg%2F11cm6bhsyz?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
						target="_blank"
						style={{ color: "white", textDecoration: "none" }}

					>
						RGMCET, Nerawada, X' Roads, Nandyala, Andhra Pradesh 518112
					</Link>{" "}
				</p>
				<hr></hr>
				<p className="Head-office ">
					<CallOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;CALL US
				</p>
				<p className="head-office-address">
					P. Venkatesh organizing Secretary <br></br>
					T. Narayana Reddy Secretary sports council <br></br>
					T. Jayachandra Prasad Principle
				</p>
				<hr></hr>
				<p className="Head-office ">
					<EmailOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;Email
				</p>
				<p className="head-office-address">sports@rgmcet.edu.in</p>
			</div>
		</footer>
	);
};

export default Footer;

const styles = {
	footer1: {
		backgroundColor: "#0351a4",
		color: "#fff",
		padding: "20px",
		display: "flex",
		flexWrap: "wrap" as "wrap",
		justifyContent: "space-between",
		marginTop: "50px",
	},
	description: {
		flex: "1 1 30%",
		marginBottom: "20px",
		padding: "20px",
	},
	quickLinks: {
		display: "flex",
		// justifyContent:'center',
		flexDirection: "column" as "column",
		// alignItems:'center',
		flex: "1 1 30%",
		padding: "20px 20px 20px 70px",
	},
	reachUs: {
		flex: "1 1 30%",
		marginBottom: "20px",
		display: "flex",
		// justifyContent:'center',
		flexDirection: "column" as "column",
		alignItems: "left",
		padding: "20px",
	},
};
