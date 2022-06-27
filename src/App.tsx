import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchContext from "./contexts/SearchContext";
import { RootState } from "./store";
import "./App.css";
import { addNote, fetchNotes, Note } from "./reducers/noteReducer";
import { fetchTags } from "./reducers/tagReducer";

import { MenuDropdown, MenuDropdownProps } from "./components/Menu";
import Dialog from "./components/Dialog";
import FormNote from "./components/FormNote";
import NoteBar from "./components/NoteBar";
import NoteCard from "./components/NoteCard";
import TagSearchbar from "./components/TagSearchbar";

interface AppProps {
	dialog?: "NEW" | "EDIT",
}

const App: React.FC<AppProps> = ({ dialog }) => {
	const notes = useSelector<RootState, Note[]>(state => state.notes);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNotes(dispatch);
		fetchTags(dispatch);
	}, [dispatch]);

	// passed down to NoteBar
	const onNewAction = (title: string, description: string) =>
		addNote(dispatch, title, description);

	// passed down to NoteCard(s)
	const navigate = useNavigate();

	// context menu stuff
	const closedMenuState: MenuDropdownProps = { open: false, x: 0, y: 0, menu: [] }
	const [menu, setMenu] = useState(closedMenuState);
	document.addEventListener("mouseup", (e) => {
		if (menu.open) {
			setMenu(closedMenuState);

			// defocus responsible menu button
			document.getElementsByClassName("menu-button focus")[0]?.classList.remove("focus");
		}
	});

	// search bar stuff
	const { searchQuery } = useContext(SearchContext);

	const escapeRegExp = (string: string) => {
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	const filteredNotes = useMemo(() => {
		let exp = new RegExp(escapeRegExp(searchQuery.text), "g");
		return notes.filter(note => searchQuery.text.length ? // if a search query is passed
				// only allow if search query is in title or description
				( exp.test(note.title!) || exp.test(note.description!) )
				// allow all
				: true)
			.filter(note => searchQuery.tags.length ?
				// only allow if has all notes
				searchQuery.tags.every(v => note.tags!.includes(v))
				// allow all
				: true);
	}, [notes, searchQuery]);

	return (
		<>
			<NoteBar newNoteAction={onNewAction} />
			<TagSearchbar />
			{filteredNotes
				.map(note =>
					<NoteCard key={note.id!}
						id={note.id!}
						title={note.title!}
						description={note.description!}
						tagIds={note.tags!}
						navigateAction={navigate}
						setContextMenuState={setMenu}/>)}
			{(searchQuery.text.length > 0 || searchQuery.tags.length > 0) &&
				<div className="note-search-info">search excluding {notes.length - filteredNotes.length} notes</div> }

			{/* render dropdown menu, if there is one */}
			{menu.open && <MenuDropdown x={menu.x} y={menu.y} righty={menu.righty} menu={menu.menu} />}
			{/* handle dialogs */}
			{dialog && <Dialog element={<FormNote type={dialog} />} /> }
		</>
	);
}

export default App;
