import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import data from "./Data/songData.json";

function Songs({ dragDisabled }) {
	const [songs, updateSongs] = useState(data);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(songs);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateSongs(items);
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
							{songs.map(({ title, artist, album, runtime }, index) => {
								return (
									<Draggable
										key={index}
										draggableId={index.toString()}
										index={index}
										isDragDisabled={dragDisabled}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div></div>
												<p>{title}</p>
												<p>{artist}</p>
												<p>{album}</p>
												<p>{runtime}</p>
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

export default Songs;
