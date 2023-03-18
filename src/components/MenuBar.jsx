import React, { useState } from "react";
const defaultMenuContent = [
	{ type: "Home", id: "0" },
	{ type: "Songs", id: "1" },
];
function MenuBar() {
	const [menuContent, setMenuContent] = useState(defaultMenuContent);
	console.log(menuContent);
	return (
		<div className="menu-bar">
			{menuContent.map(({ type, id }) => {
				return <a id={`${id}`}>{type}</a>;
			})}
		</div>
	);
}

export default MenuBar;
