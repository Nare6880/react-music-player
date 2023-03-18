import React, { useState } from "react";
const defaultMenuContent = [
	{ type: "Home", id: "0" },
	{ type: "Songs", id: "1" },
];
function MenuBar({ setContext }) {
	const [menuContent, setMenuContent] = useState(defaultMenuContent);
	console.log(menuContent);
	return (
		<div className="menu-bar">
			{menuContent.map(({ type, id }) => {
				return (
					<a
						id={`${id}`}
						onClick={() => {
							setContext(type);
						}}
					>
						{type}
					</a>
				);
			})}
		</div>
	);
}

export default MenuBar;
