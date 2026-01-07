import { createRefresh } from "react-auth-kit";
import API from "./ApiEndpoints";

export const ACCESS_TOKEN_EXPIRY_TIME = 30; //in Mins
export const REFRESH_TOKEN_EXPIRY_TIME = 24 * 60;

export const getRefreshToken = () => {
	return (
		document.cookie
			.split("; ")
			.map((e) => e.split("="))
			.find((e) => e[0] === "_auth_refresh") as string[]
	)[1];
};

export const refreshApi = createRefresh({
	interval: ACCESS_TOKEN_EXPIRY_TIME,
	refreshApiCallback: async ({
		// arguments
		authToken,
		refreshToken,
		authUserState,
	}) => {
		console.log("Refreshing tokens");
		const res = await API.AccessToken({ refreshToken: refreshToken as string });
		try {
			return {
				isSuccess: true,
				newAuthToken: res.data.accessToken as string,
				newAuthTokenExpireIn: ACCESS_TOKEN_EXPIRY_TIME,
				newRefreshToken: res.data.refreshToken as string,
				newRefreshTokenExpiresIn: REFRESH_TOKEN_EXPIRY_TIME,
				newAuthUserState: authUserState,
			};
		} catch (error) {
			console.log(error);
			return {
				isSuccess: false,
				newAuthToken: authToken as string,
			};
		}
	},
});
