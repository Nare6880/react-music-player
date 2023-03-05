import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "../App.css";
const finalPlaylist = [
	{
		id: "0",
		name: "chill",
		thumb: "https://source.unsplash.com/random?sig=127",
	},
	{
		id: "1",
		name: "Electric",
		thumb: "https://source.unsplash.com/random?sig=99",
	},
	{
		id: "2",
		name: "rap",
		thumb: "https://source.unsplash.com/random?sig=0",
	},
	{
		id: "3",
		name: "funky",
		thumb: "https://source.unsplash.com/random?sig=23",
	},
];
function Playlists({ idEl, dragHandle }) {
	const [playlists, updatePlaylists] = useState(finalPlaylist);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(playlists);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updatePlaylists(items);
	}
	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="songs">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{playlists.map(({ id, name, thumb }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div>
													<img src={thumb} alt={`${name} Thumb`} />
												</div>
												<p>{name}</p>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default Playlists;
