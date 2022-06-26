import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { Searchbar } from "./Searchbar";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar__title">Todo App</Link>
			<div className="navbar__links">
				<Searchbar>Search</Searchbar>
				<NavigationLink to="/">Home</NavigationLink>
				<NavigationLink to="/about">About</NavigationLink>
			</div>
		</nav>
	);
}

const NavigationLink: React.FC<{ to: string, children: string }> = ({ to, children }) => {
	return (
		<NavLink
			end to={to}
			className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link" }
			children={children} />
	);
}

export default Navbar;
