import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
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

	const onDeleteAction = (id: string) => {
		dispatch(removeNote(id));
	}

	return (
		<>
			<NoteBar />
			{notes.map((note) =>
				<Fragment key={note.id!}>
					<NoteCard
						id={note.id!}
						title={note.title!}
						description={note.description!}
						deleteAction={() => onDeleteAction(note.id!)}/>
				</Fragment>)}

			{/* handle dialogs */}
			{action ? <Dialog element={<FormNote type={action} />} /> : "" }
		</>
	);
}

export default App;
