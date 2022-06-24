import React from "react"
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar__title">Todo App</Link>
			<div className="navbar__links">
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
			className={({ isActive }) =>
				isActive ? "navbar__link navbar__link__active" : "navbar__link" }
		>
			{children}
		</NavLink>
	);
}

export default Navbar;
