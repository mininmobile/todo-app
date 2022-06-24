import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import NoteBar from "./components/NoteBar";
import NoteCard from "./components/NoteCard";
import { Note, addNote, removeNote, editNote } from "./reducers/noteReducer";

const App: React.FC = () => {
	const notes = useSelector<Note[], Note[]>((state) => state);
	const dispatch = useDispatch();

	const onDeleteAction = (id: string) => {
		dispatch(removeNote(id));
	}

	return (
		<div className="notes-view">
			<NoteBar />
			{notes.map((note) =>
				<Fragment key={note.id!}>
					<NoteCard
						title={note.title!}
						description={note.description!}
						deleteAction={() => onDeleteAction(note.id!)}/>
				</Fragment>)}
		</div>
	);
}

export default App;
