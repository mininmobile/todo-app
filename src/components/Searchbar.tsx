import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchContext from "../contexts/SearchContext";

interface SearchbarProps {
	children: string,
}

export const Searchbar: React.FC<SearchbarProps> = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { searchQuery, setSearchQuery } = useContext(SearchContext);

	useEffect(() => {
		if (location.pathname !== "/")
			setSearchQuery(""); // onBlur event executes setOpen(false) for us
	}, [location]);

	const handleFocus = () => {
		if (!open) {
			if (window.location.pathname !== "/")
				navigate("/");
			setOpen(true);
		}
	}

	const handleBlur = () => setOpen(false);

	return (
		<label className={"searchbar " + (open || searchQuery.length ? "active" : "")}>
			<input className="searchbar__input" type="text"
				value={open || searchQuery.length ? searchQuery : children}
				onChange={(e) => setSearchQuery(e.currentTarget.value)}
				onFocus={handleFocus}
				onBlur={handleBlur} />
		</label>
	);
}
