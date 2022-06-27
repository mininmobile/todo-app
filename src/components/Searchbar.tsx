import { createRef, useContext, useEffect, useState } from "react";
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

	const input = createRef<HTMLInputElement>();

	useEffect(() => {
		if (location.pathname !== "/")
			setSearchQuery(""); // onBlur event executes setOpen(false) for us
	}, [location, setSearchQuery]);

	const handleFocus = () => {
		if (!open) {
			if (window.location.pathname !== "/")
				navigate("/");
			setOpen(true);
		}
	}

	const handleBlur = () => setOpen(false);

	return (
		<div className={"searchbar " + (open || searchQuery.length ? "active" : "")}
			onClick={(e) => e.currentTarget === e.target ? input.current?.focus() : null}>
			<input ref={input} className="searchbar__input" type="text"
				value={open || searchQuery.length ? searchQuery : children}
				onChange={(e) => setSearchQuery(e.currentTarget.value)}
				onFocus={handleFocus}
				onBlur={handleBlur} />
			<div className="searchbar__clear" children="x"
				onClick={() => { if (searchQuery.length) { setSearchQuery(""); input.current?.focus() } } } />
		</div>
	);
}
