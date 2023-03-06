import React, { useState } from "react";
import "./App.css";
import Playlists from "./components/Playlists";
import Songs from "./components/Songs";
import {
	GridContextProvider,
	GridDropZone,
	GridItem,
	swap,
} from "react-grid-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
const defaultComponentList = [
	{ type: "Playlists", id: "0" },
	{ type: "Playlists", id: "1" },
	{ type: "Playlists", id: "2" },
	{ type: "Playlists", id: "3" },
	{ type: "Songs", id: "4" },
	{ type: "Playlists", id: "5" },
];
function App() {
	const [Customize, updateCustomize] = useState(false);
	console.log(Customize);
	const [components, updateComponents] = useState(defaultComponentList);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(components);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateComponents(items);
	}
	return Customize ? (
		<div>
			<GridContextProvider onChange={onChange}>
				<button
					style={{ backgroundColor: Customize ? "Green" : "Red" }}
					onClick={() => updateCustomize(!Customize)}
				>
					Customize
				</button>
				<GridDropZone
					id="components"
					boxesPerRow={1}
					rowHeight={400}
					style={{ height: "2000px" }}
				>
					{components.map(({ type, id }, index) => {
						return Customize ? (
							<GridItem key={id}>
								<div className="component-container">
									<div className="component-header">
										<h2 className="component-header-text">
											{type} {id}
										</h2>
										<div className="component-header-decoration">
											<FontAwesomeIcon
												icon={faArrowsUpDownLeftRight}
												size="2x"
											/>
										</div>
									</div>
									{getComponent({ type })}
								</div>
							</GridItem>
						) : (
							<GridItem key={id} onMouseDown={(e) => e.stopPropagation()}>
								<div className="component-container">
									<div className="component-header">
										<h2 className="component-header-text">
											{type} {id}
										</h2>
										{
											<div
												className="component-header-decoration"
												style={{ hidden: true }}
											></div>
										}
									</div>
									{getComponent({ type })}
								</div>
							</GridItem>
						);
					})}
				</GridDropZone>
			</GridContextProvider>
		</div>
	) : (
		<div>
			<button
				style={{ backgroundColor: Customize ? "Green" : "Red" }}
				onClick={() => updateCustomize(!Customize)}
			>
				Customize
			</button>
			{components.map(({ type, id }, index) => {
				return (
					<div className="component-container">
						<div className="component-header">
							<h2 className="component-header-text">
								{type} {id}
							</h2>
							<div className="component-header-decoration">
								<FontAwesomeIcon icon={faArrowsUpDownLeftRight} size="2x" />
							</div>
						</div>
						{getComponent({ type })}
					</div>
				);
			})}
		</div>
	);
	function onChange(sourceId, sourceIndex, targetIndex, targetId) {
		const nextState = swap(components, sourceIndex, targetIndex);
		updateComponents(nextState);
	}
	function getComponent(object) {
		switch (object.type) {
			case "Playlists":
				return <Playlists></Playlists>;
			case "Songs":
				return <Songs></Songs>;
				break;
		}
	}
}

export default App;
