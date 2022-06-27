import { createRef, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchContext from "../contexts/SearchContext";

const defaultSearchQuery = { text: "", sort: 0, tags: [] };

function getSortIcon(sort: number): string {
	switch (sort) {
		case 0: return "—";
		case 1: case 2: return "title";
		case 3: case 4: return "desc";
		case 5: case 6: return "tags";
		default: return "?"; // probably should reset sort if its icon is '?'
	}
}

export const Searchbar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { searchQuery, setSearchQuery } = useContext(SearchContext);

	const input = createRef<HTMLInputElement>();

	useEffect(() => {
		if (location.pathname !== "/" && location.pathname !== "/new")
			setSearchQuery(defaultSearchQuery); // onBlur event executes setOpen(false) for us
	}, [location, setSearchQuery]);

	const handleFocus = () => {
		if (!open) {
			if (location.pathname !== "/" && location.pathname !== "/new")
				navigate("/");
			setOpen(true);
		}
	}

	const handleBlur = () => setOpen(false);

	return (
		<div className={"searchbar " + (open || searchQuery.text.length > 0 || searchQuery.sort > 0 ? "active" : "")}
			onClick={(e) => e.currentTarget === e.target ? input.current?.focus() : null}>
			<input ref={input} className="searchbar__input" type="text"
				// if there is a text in the searchbar, use it as the value
				value={open || searchQuery.text.length ? searchQuery.text :
					// otherwise, display "Search" if on the main page, or "Search Notes" if elsewhere
					((location.pathname === "/" || location.pathname === "/new" || location.pathname.startsWith("/edit"))
						? "Search" : "Search Notes")}
				onChange={(e) => setSearchQuery({ ...searchQuery, text: e.currentTarget.value })}
				onFocus={handleFocus}
				onBlur={handleBlur} />

			{/* clear button */}
			<div className="searchbar__clear" children="x"
				onClick={() => { if (searchQuery.text.length > 0 || searchQuery.sort > 0) { setSearchQuery(defaultSearchQuery); input.current?.focus() } } } />

			{/* sort button */}
			<div className={"searchbar__sort" + (searchQuery.sort > 0 ?
					(searchQuery.sort % 2 === 0 ? " ascending" : " descending") : "")}
				children={getSortIcon(searchQuery.sort)}
				onClick={() => {
						setSearchQuery({
							...searchQuery,
							sort: searchQuery.sort === 6 ? 0 : (searchQuery.sort + 1)
					})
				}} />
		</div>
	);
}
