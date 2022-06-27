import { createContext } from "react";

const SearchContext = createContext({
	searchQuery: { text: "", tags: Array<string>() },
	setSearchQuery: (searchQuery: { text: string, tags: Array<string> }) => {},
});

export default SearchContext;
