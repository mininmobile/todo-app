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
			setSearchQuery({ text: "", tags: Array<string>() }); // onBlur event executes setOpen(false) for us
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
		<div className={"searchbar " + (open || searchQuery.text.length ? "active" : "")}
			onClick={(e) => e.currentTarget === e.target ? input.current?.focus() : null}>
			<input ref={input} className="searchbar__input" type="text"
				value={open || searchQuery.text.length ? searchQuery.text : children}
				onChange={(e) => setSearchQuery({ text: e.currentTarget.value, tags: searchQuery.tags })}
				onFocus={handleFocus}
				onBlur={handleBlur} />
			<div className="searchbar__clear" children="x"
				onClick={() => { if (searchQuery.text.length) { setSearchQuery({ text: "", tags: searchQuery.tags }); input.current?.focus() } } } />
		</div>
	);
}
