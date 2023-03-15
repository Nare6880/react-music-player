import React from "react";
import Playlists from "./Playlists";
import Songs from "./Songs";
function Rowx2({ Customize, Row }) {
	return (
		<div className="flex-3">
			{Row.map(({ type, id }, index) => {
				return (
					<>
						<div className="component-container" style={{ width: "100%" }}>
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
			})}
		</div>
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

export default Rowx2;
