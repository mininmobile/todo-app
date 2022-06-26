import { createContext } from "react";

const SearchContext = createContext({
	searchQuery: "",
	setSearchQuery: (x: string) => {},
});

export default SearchContext;
