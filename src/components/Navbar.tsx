import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

interface NavigationLinkProps {
	to: string,
	children: React.ReactNode,
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children }) => {
	const location = useLocation();
	const [active, setActive] = useState(false);

	useEffect(() => {
		let l = location.pathname; // sanity
		if (to === "/")
			setActive(l === "/" || l === "/new" || l.startsWith("/edit"));
		else
			setActive(to === l);
	}, [location, to]);

	return (
		<Link to={to}
			className={"navbar__link " + (active ? "active" : "") }
			children={children} />
	);
}

export default Navbar;
