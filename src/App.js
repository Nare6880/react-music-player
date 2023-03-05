import React, { useState } from "react";
import "./App.css";
import Playlists from "./components/Playlists";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
const defaultComponentList = [
	{ type: "Playlists", id: "0" },
	{ type: "Playlists", id: "1" },
	{ type: "Playlists", id: "2" },
	{ type: "Playlists", id: "3" },
];
function App() {
	const [components, updateComponents] = useState(defaultComponentList);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(components);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateComponents(items);
	}
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="components">
				{(provided) => (
					<div
						className="Grid"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{components.map(({ type, id }, index) => {
							return (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps}>
											<div className="component-header">
												<h2 className="component-header-text">{type}</h2>
												<div
													className="component-header-decoration"
													{...provided.dragHandleProps}
												>
													<FontAwesomeIcon
														icon={faArrowsUpDownLeftRight}
														size="2x"
													/>
												</div>
											</div>
											<Playlists></Playlists>
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default App;
