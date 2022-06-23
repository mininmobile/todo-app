import React from "react"
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
	return (
		<nav>
			<Link to="/">Todo App</Link>
			<ul>
				<NavLink end to="/" className={({ isActive }) => isActive ? "active" : "" }>Home</NavLink>
				<NavLink end to="/about" className={({ isActive }) => isActive ? "active" : "" }>About</NavLink>
			</ul>
		</nav>
	);
}

export default Navbar;
