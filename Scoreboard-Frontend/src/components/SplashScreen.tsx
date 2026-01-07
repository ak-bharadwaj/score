import "./SplashScreen.css";
import interIITLogo from "../imgs/interIIT-logo.webp";
import irnpLogo from "../imgs/IRP Logo.svg";

const SplashScreen = () => {
	return (
		<>
			<div className="splashScreen">
				<img className="logo" src={interIITLogo} alt="InterIIT 2023 logo" />
				<div className="irp">
					Developed Under <img src={irnpLogo} alt="IR&P Logo"></img>
				</div>
			</div>
		</>
	);
};

export default SplashScreen;
