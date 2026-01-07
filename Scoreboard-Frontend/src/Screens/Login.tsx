import { useContext, useState } from "react";
import "./styles/Login.css";
import API from "../Utilities/ApiEndpoints";
import { useSignIn } from "react-auth-kit";
import {
	ACCESS_TOKEN_EXPIRY_TIME,
	REFRESH_TOKEN_EXPIRY_TIME,
} from "../Utilities/AuthUtils";
import { useNavigate } from "react-router";
import { ToastContext } from "../Utilities/ToastContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const signIn = useSignIn();
	const navigate = useNavigate();
	const setToast = useContext(ToastContext).setToastMessage;

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (username === "" || password === "") {
			setErrorMsg("Enter Username and Password!");
			setTimeout(() => setErrorMsg(""), 3000);
			return;
		}

		try {
			const res = await API.LoginWithUsernameAndPassword({
				username,
				password,
			});
			if (
				signIn({
					tokenType: res.data.type as string,
					token: res.data.accessToken as string,
					expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
					refreshToken: res.data.refreshToken as string,
					refreshTokenExpireIn: REFRESH_TOKEN_EXPIRY_TIME,
					authState: {
						username: username,
						name: res.data.user.name,
						role: res.data.user.role,
					},
				})
			) {
				setToast("Login Successfull!");
				navigate("/admin");
			}
		} catch (error: any) {
			try {
				setErrorMsg(JSON.parse(error.request.response).message);
			} catch {
				setErrorMsg("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	return (
		<div className="loginContainer">
			<div className="loginDialog">
				<h1 className="fjalla">Login</h1>
				<form onSubmit={handleSubmit}>
					<label className="field">
						Username
						<input
							name="username"
							className="styledInput"
							autoComplete="off"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<label className="field">
						Password{" "}
						<input
							name="password"
							autoComplete="off"
							className="styledInput"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					<input type="submit" value={"Continue"} />
					<br></br>
					<span onClick={() => navigate("..")}>Go to Homepage</span>
				</form>
				<div>{errorMsg}</div>
			</div>
		</div>
	);
};

export default Login;
