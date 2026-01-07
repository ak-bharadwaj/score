import { useNavigate } from "react-router";
import "./Sidebar.css";

const SideBar = ({
	items,
}: {
	items: {
		title: string;
		linkTo: string;
		icon: any;
	}[];
}) => {
	const navigate = useNavigate();

	return (
		<div className="sidebar">
			<div className="items">
				{items.map((item, i) => (
					<div
						className="item"
						tabIndex={1}
						key={i}
						onClick={() => navigate(item.linkTo)}
					>
						<item.icon fontSize="large" />
						<span className="title">{item.title}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SideBar;
