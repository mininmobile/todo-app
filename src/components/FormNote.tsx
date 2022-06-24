interface FormNoteProps {
	type: "NEW" | "EDIT",
	newAction: (title: string, description: string) => void,
	editAction: (id: string, title: string, description: string) => void,
}

const FormNote: React.FC<FormNoteProps> = ({ type, newAction, editAction }) => {
	return (
		<>
			{/* stuff */}
		</>
	)
}

export default FormNote;
