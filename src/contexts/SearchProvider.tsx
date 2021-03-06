import { useState, useMemo } from "react";
import SearchContext from "./SearchContext";

/**
 * provides a global searchQuery state accessible with `const { searchQuery, setSearchQuery } = useContext(SearchContext)`
 */
const SearchProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const context = SearchContext;
	const [searchQuery, setSearchQuery] = useState({ text: "", sort: 0, tags: Array<string>() });
	const value = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

	return (
		<context.Provider value={value}>
			{children}
		</context.Provider>
	);
}

export default SearchProvider;
