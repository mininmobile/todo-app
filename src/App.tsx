import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchContext from "./contexts/SearchContext";
import "./App.css";
import { fetchNotes, Note, removeNote } from "./reducers/noteReducer";

import { MenuDropdown, MenuDropdownProps } from "./components/Menu";
import Dialog from "./components/Dialog";
import FormNote from "./components/FormNote";
import NoteBar from "./components/NoteBar";
import NoteCard from "./components/NoteCard";

interface AppProps {
	action?: "NEW" | "EDIT",
}

const App: React.FC<AppProps> = ({ action }) => {
	const _notes = useSelector<Note[], Note[]>(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNotes(dispatch);
	}, [dispatch]);

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

	const notes = searchQuery.length > 0 ? _notes.filter(note => {
		if (searchQuery.length > 0)
			return ( new RegExp(escapeRegExp(searchQuery), "g").test(note.title!)
				|| new RegExp(escapeRegExp(searchQuery), "g").test(note.description!) );
		else return true;
	}) : _notes;

	return (
		<>
			<NoteBar />
			{notes
				.map(note =>
					<NoteCard key={note.id!}
						id={note.id!}
						title={note.title!}
						description={note.description!}
						deleteAction={() => onDeleteAction(note.id!)}
						navigateAction={navigate}
						setContextMenuState={setMenu}/>)}
			{searchQuery.length > 0 &&
				<div className="note-search-info">search excluding {_notes.length - notes.length} notes</div> }

			{/* render dropdown menu, if there is one */}
			{menu.open && <MenuDropdown x={menu.x} y={menu.y} menu={menu.menu} />}
			{/* handle dialogs */}
			{action && <Dialog element={<FormNote type={action} />} /> }
		</>
	);
}

export default App;
