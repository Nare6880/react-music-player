import React, { useState } from "react";
import "./App.css";
import Playlists from "./components/Playlists";
import Songs from "./components/Songs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
	const [components, updateComponents] = useState(defaultComponentList);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(components);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateComponents(items);
	}
	return (
		<>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="components">
					{(provided, snapshot) => (
						<ul
							className="component-2col"
							{...provided.droppableProps}
							style={{
								backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
							}}
							ref={provided.innerRef}
						>
							{components.map(({ type, id }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												className="component-container"
											>
												<div className="component-header">
													<h2 className="component-header-text">
														{type} {id}
													</h2>
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
												{getComponent({ type })}
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
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
