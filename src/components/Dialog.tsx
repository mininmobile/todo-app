import { cloneElement, MouseEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dialog.css";

interface DialogProps {
	element: React.ReactElement,
	open?: 0 | 1 | 2, // closed, opened, force close
}

const Dialog: React.FC<DialogProps> = ({ element, open = 1 }) => {
	// pretty much all of this code is just to handle closing of the dialog
	// it may look a little jank but it has to be done
	// it lets me animate the dialog using without any libraries!!!
	const navigate = useNavigate();
	const [dialogState, setDialogState] = useState({ open: 0 });
	const setOpen = useCallback((o: number) => setDialogState({ open: o }), []);

	if (dialogState.open === 0 && open === 1)
		setTimeout(() => setOpen(1), 1);

	const handleClose = () => {
		setOpen(2);
		setTimeout(() => navigate(-1), 300);
	}

	// close if user clicks outside the dialog
	const handleWrapperClick: MouseEventHandler = (e) => {
		if (e.target === e.currentTarget)
		handleClose();
	}

	return (
		<div onClick={handleWrapperClick} className={dialogState.open === 1 ? "dialog-wrapper open" : "dialog-wrapper"}>
			<div className="dialog">
				{cloneElement(element, { onClose: handleClose })}
			</div>
		</div>
	)
}

export default Dialog;
