import { useState, useMemo } from "react";
import SearchContext from "./SearchContext";

const SearchProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const context = SearchContext;
	const [searchQuery, setSearchQuery] = useState("");
	const value = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

	return (
		<context.Provider value={value}>
			{children}
		</context.Provider>
	);
}

export default SearchProvider;
