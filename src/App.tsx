import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchContext from "./contexts/SearchContext";
import { RootState } from "./store";
import "./App.css";
import { addNote, fetchNotes, Note, removeNote } from "./reducers/noteReducer";
import { fetchTags } from "./reducers/tagReducer";

import { MenuDropdown, MenuDropdownProps } from "./components/Menu";
import Dialog from "./components/Dialog";
import FormNote from "./components/FormNote";
import NoteBar from "./components/NoteBar";
import NoteCard from "./components/NoteCard";

interface AppProps {
	dialog?: "NEW" | "EDIT",
}

const App: React.FC<AppProps> = ({ dialog }) => {
	const notes = useSelector<RootState, Note[]>(state => state.notes);
	const tags = useSelector<RootState, Note[]>(state => state.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNotes(dispatch);
		fetchTags(dispatch);
	}, [dispatch]);

	// passed down to NoteBar
	const onNewAction = (title: string, description: string) =>
		addNote(dispatch, title, description);

	// stuff that is passed down to each NoteCard bc react deems it so
	// don't really have to pass useNavigate down but it's a bit of an optimization
	const navigate = useNavigate();

	const onDeleteAction = (id: string) =>
		removeNote(dispatch, id);

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
	}, [notes, tags, searchQuery]);

	return (
		<>
			<NoteBar newNoteAction={onNewAction} />
			{filteredNotes
				.map(note =>
					<NoteCard key={note.id!}
						id={note.id!}
						title={note.title!}
						description={note.description!}
						tagIds={note.tags!}
						deleteAction={() => onDeleteAction(note.id!)}
						navigateAction={navigate}
						setContextMenuState={setMenu}/>)}
			{(searchQuery.text.length > 0 || searchQuery.tags.length > 0) &&
				<div className="note-search-info">search excluding {notes.length - filteredNotes.length} notes</div> }

			{/* render dropdown menu, if there is one */}
			{menu.open && <MenuDropdown x={menu.x} y={menu.y} menu={menu.menu} />}
			{/* handle dialogs */}
			{dialog && <Dialog element={<FormNote type={dialog} />} /> }
		</>
	);
}

export default App;
