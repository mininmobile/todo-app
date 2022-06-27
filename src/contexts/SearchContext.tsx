import { createContext } from "react";

/** THE SEARCHQUERY OBJECT:
 * text is a string that will be used to search both the title and description of the notes
 *
 * tags is a list of tag ids that will be used to show only the notes with all tags in the list
 *
 * sort defines the sorting mode:
 *  0 - no sorting
 *  1 - titles alphabetically       |   a-z
 *  2 - titles alphabetically       |   z-a
 *  3 - descriptions alphabetically |   a-z
 *  4 - descriptions alphabetically |   z-a
 *  5 - tag amount                  | min-max
 *  6 - tag amount                  | max-min
 */

const SearchContext = createContext({
	searchQuery: { text: "", sort: 0, tags: Array<string>() },
	setSearchQuery: (searchQuery: { text: string, sort: number, tags: Array<string> }) => {},
});

export default SearchContext;
