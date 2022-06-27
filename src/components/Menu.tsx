import { createRef } from "react";
import "./Menu.css";

export type Menu = Array<[string | JSX.Element, () => void ] | "-">;

interface MenuButtonProps {
	children?: string | JSX.Element,
	className?: string,
	menu: Menu,
	setContextMenuState: React.Dispatch<React.SetStateAction<MenuDropdownProps>>,
}

export const MenuButton: React.FC<MenuButtonProps> = ({ children = "≡", className, menu, setContextMenuState }) => {
	const button = createRef<HTMLDivElement>();

	const handleOpenMenu = () => {
		if (!button.current)
			return; // fail silently

		setContextMenuState({
			open: true, menu: menu,
			x: button.current.offsetLeft + button.current.offsetWidth,
			y: button.current.offsetTop + button.current.offsetHeight,
		});

		// focus responsible menu button
		button.current.classList.add("focus");
	}

	return (
		<div ref={button} className={"menu-button " + className} onClick={handleOpenMenu}>
			{children}
		</div>
	);
}

export interface MenuDropdownProps {
	open?: boolean,
	x: number,
	y: number,
	menu: Menu,
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ menu, x, y }) => {
	return (
		<div className="menu-dropdown" style={{ left: x, top: y, }}>
			{menu.map((item, i) => item === "-"
				? <div key={i} className="menu-dropdown__divider" />
				: <div key={i} onMouseUp={item[1]} className="menu-dropdown__item">{item[0]}</div>)}
		</div>
	);
}
