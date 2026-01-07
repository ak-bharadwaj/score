/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate, useParams } from "react-router";
import SideBar from "../../components/Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
import { UserRole } from "../../types/UserRole";
import "./AdminDashboard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Users from "./Users";
import EditScores from "./EditScores";
import { useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import { AuthStateUserObject } from "react-auth-kit/dist/types";
import { User } from "../../types/User";
import UserRoleChip from "../../components/UserRoleChip";
import API from "../../Utilities/ApiEndpoints";
import { getRefreshToken } from "../../Utilities/AuthUtils";
import { ToastContext } from "../../Utilities/ToastContext";
import Teams from "./Teams";
import { Team } from "../../types/Team";
import ScheduleEditor from "./ScheduleEditor";
import LogsViewer from "./components/LogsViewer";

const AdminDashboard = () => {
	const urlParam = useParams();
	const navigate = useNavigate();
	const signOut = useSignOut();
	const setToast = useContext(ToastContext).setToastMessage;
	const auth = useAuthUser() as () => AuthStateUserObject;
	const user = useRef(auth() as User);
	const getAccessToken = useAuthHeader();

	const [showProfileDialog, setShowProfileDialog] = useState(false);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [allTeams, setAllTeams] = useState<Team[]>([]);

	const SideBarItems = useRef([
		...(user.current.role === UserRole.ADMIN
			? [
				{
					title: "Users",
					linkTo: "users",
					icon: PeopleAltIcon,
				},
			]
			: []),
		{
			title: "Edit Scores",
			linkTo: "edit_scores",
			icon: ScoreboardIcon,
		},
		...(user.current.role === UserRole.ADMIN
			? [
				{
					title: "Teams",
					linkTo: "teams",
					icon: Diversity2Icon,
				},
			]
			: []),
		...(user.current.role === UserRole.ADMIN
			? [
				{
					title: "Schedule",
					linkTo: "schedule",
					icon: TableChartIcon,
				},
			]
			: []),
		...(user.current.role === UserRole.ADMIN
			? [
				{
					title: "Logs",
					linkTo: "logs",
					icon: AssignmentIcon,
				},
			]
			: []),
	]);

	const getRoutes = (): { linkTo: string; element: React.JSX.Element }[] => {
		return [
			...(user.current.role === UserRole.ADMIN
				? [
					{
						linkTo: "users",
						element: (
							<Users
								onUserAdd={handleAddUser}
								onDelete={handleUserDelete}
								users={allUsers}
							/>
						),
					},
				]
				: []),
			{
				linkTo: "edit_scores",
				element: <EditScores />,
			},
			...(user.current.role === UserRole.ADMIN
				? [
					{
						linkTo: "teams",
						element: (
							<Teams
								teams={allTeams}
								onTeamAdd={handleAddTeam}
								onTeamDelete={handleDeleteTeam}
							/>
						),
					},
				]
				: []),
			...(user.current.role === UserRole.ADMIN
				? [
					{
						linkTo: "schedule",
						element: <ScheduleEditor teams={allTeams} />,
					},
				]
				: []),
			...(user.current.role === UserRole.ADMIN
				? [
					{
						linkTo: "logs",
						element: <LogsViewer />,
					},
				]
				: []),
		];
	};

	const fetchUsers = async () => {
		const result = (await API.GetUsers(getAccessToken())).data;
		const Users: User[] = result.map((obj: any) => {
			return {
				name: obj.name,
				username: obj.username,
				role: obj.role,
				password: obj.password,
			};
		});
		setAllUsers(Users);
	};

	const fetchTeams = async () => {
		const result = (await API.GetTeams(getAccessToken())).data;
		const Teams: Team[] = result.map((obj: any) => {
			return {
				_id: obj._id,
				name: obj.name,
				medals: { ...obj.medals },
				points: obj.points,
			};
		});
		setAllTeams(Teams);
	};

	useEffect(() => {
		if (user.current.role === UserRole.ADMIN) {
			fetchUsers();
			fetchTeams();
		}
	}, []);

	useEffect(() => {
		if (!urlParam["*"]) navigate(SideBarItems.current[0].linkTo); //navigate to the first sidebar item if /admin visited
	}, []);

	const handleLogout = async () => {
		navigate("/login");
		await API.Logout({
			refreshToken: getRefreshToken(),
		});
		setToast("Logged Out");
		signOut();
	};

	const handleAddUser = async (userToAdd: User, password: string) => {
		try {
			await API.CreateUserWithUsernameAndPassword({
				name: userToAdd.name,
				username: userToAdd.username,
				role: userToAdd.role,
				password: password,
				accessToken: getAccessToken(),
			});
			await fetchUsers();
			setToast("Added User " + userToAdd.username);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	const handleUserDelete = async (userToDelete: User) => {
		if (userToDelete.username === user.current.username) {
			setToast("You Cant Delete Yourself!");
			return;
		} else {
			try {
				await API.DeleteUser(userToDelete.username, getAccessToken());
				await fetchUsers();
				setToast("Deleted User " + userToDelete.username);
			} catch (error: any) {
				try {
					setToast(JSON.parse(error.request.response).message);
				} catch {
					setToast("Could not connect with the Server");
					console.log(error);
				}
			}
		}
	};

	const handleAddTeam = async (teamToAdd: Team) => {
		try {
			await API.AddTeam(getAccessToken(), teamToAdd);
			await fetchTeams();
			setToast("Added Team " + teamToAdd.name);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	const handleDeleteTeam = async (teamToDelete: Team) => {
		try {
			await API.DeleteTeam(getAccessToken(), teamToDelete);
			await fetchTeams();
			setToast("Deleted Team " + teamToDelete.name);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	return (
		<div className="admin-container">
			<SideBar items={SideBarItems.current} />
			<section className="admin-content">
				<section className="floatingDialogBox">
					<button
						className="styledButton"
						onClick={() => setShowProfileDialog((prev) => !prev)}
					>
						<span className="user-name-text">{user.current.name}</span>{" "}
						<UserRoleChip role={user.current.role} />
					</button>
					{showProfileDialog && (
						<div style={{ margin: "10px" }}>
							Username:
							<br />
							{user.current.username}
							<button
								onClick={handleLogout}
								style={{ marginTop: "5px" }}
								className="styledButton"
							>
								Logout
							</button>
						</div>
					)}
				</section>
				<Routes>
					{getRoutes().map(
						(
							{
								linkTo,
								element,
							}: { linkTo: string; element: React.JSX.Element },
							i: number
						) => (
							<Route key={i} path={linkTo} element={element} />
						)
					)}
				</Routes>
			</section>
		</div>
	);
};

export default AdminDashboard;
