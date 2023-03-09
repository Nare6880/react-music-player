import React from "react";
import Playlists from "./Playlists";
import Songs from "./Songs";
function Row({ Customize, type, id }) {
	return (
		<>
			<div className="component-container">
				<div className="component-header">
					<h2 className="component-header-text">
						{type} {id}
					</h2>
					<div className="component-header-decoration"></div>
				</div>
				{getComponent({ type })}
			</div>
		</>
	);
	function getComponent(object) {
		switch (object.type) {
			case "Playlists":
				return <Playlists dragDisabled={Customize}></Playlists>;
			case "Songs":
				return <Songs dragDisabled={Customize}></Songs>;
				break;
		}
	}
}

export default Row;
