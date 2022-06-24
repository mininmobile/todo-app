import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import "./Dialog.css";

interface DialogProps {
	element: React.ReactElement,
	open?: boolean,
}

const Dialog: React.FC<DialogProps> = ({ element, open = true }) => {
	const navigate = useNavigate();

	const handleWrapperClick: MouseEventHandler = (e) => {
		if (e.target == e.currentTarget)
			onClose();
	}

	const onClose = () => navigate(-1);

	return (
		<div onClick={handleWrapperClick} className={open ? "dialog-wrapper open" : "dialog-wrapper"}>
			<div className="dialog">
				{element}
			</div>
		</div>
	)
}

export default Dialog;
