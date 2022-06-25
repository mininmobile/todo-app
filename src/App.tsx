import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { MenuDropdown, MenuDropdownProps } from "./components/Menu";
import Dialog from "./components/Dialog";
import FormNote from "./components/FormNote";
import NoteBar from "./components/NoteBar";
import NoteCard from "./components/NoteCard";
import { Note, removeNote } from "./reducers/noteReducer";

interface AppProps {
	action?: "NEW" | "EDIT",
}

const App: React.FC<AppProps> = ({ action }) => {
	const notes = useSelector<Note[], Note[]>(state => state);
	const dispatch = useDispatch();

	// stuff that is passed down to each NoteCard bc react deems it so
	// don't really have to pass useNavigate down but it's a bit of an optimization
	const navigate = useNavigate();

	const onDeleteAction = (id: string) => {
		dispatch(removeNote(id));
	}

	// context menu stuff
	const [menu, setMenu] = useState<MenuDropdownProps>({ open:false, menu: [] });
	document.addEventListener("mouseup", (e) => {
		if (menu.open)
			setMenu({ open: false, menu: [] });
	});

	return (
		<>
			<NoteBar />
			{notes.map((note) =>
				<Fragment key={note.id!}>
					<NoteCard
						id={note.id!}
						title={note.title!}
						description={note.description!}
						deleteAction={() => onDeleteAction(note.id!)}
						navigateAction={navigate}
						setContextMenuState={setMenu}/>
				</Fragment>)}

			{/* render dropdown menu, if there is one */}
			{menu.open && <MenuDropdown menu={menu.menu} />}
			{/* handle dialogs */}
			{action ? <Dialog element={<FormNote type={action} />} /> : "" }
		</>
	);
}

export default App;
