import "./Menu.css";

interface MenuButtonProps {
	menu: Array<[string, () => void]>,
	setContextMenuState: React.Dispatch<React.SetStateAction<MenuDropdownProps>>,
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, setContextMenuState }) => {
	const handleOpenMenu = () => {
		setContextMenuState({ open: true, menu: menu });
	}

	return (
		<div className="menu-button"
			onClick={handleOpenMenu}>
			≡
		</div>
	)
}

export interface MenuDropdownProps {
	open?: boolean,
	menu: Array<[string, () => void]>,
}

export const MenuDropdown:React.FC<MenuDropdownProps> = ({ menu }) => {
	return (
		<div className="menu-dropdown">
			{menu.map((item, i) =>
				<a key={i} onMouseUp={item[1]} className="menu-dropdown__item">{item[0]}</a>)}
		</div>
	);
}
