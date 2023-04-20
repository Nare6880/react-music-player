import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import finalPlaylist from "./Data/playlists.json";
import "../App.css";
import Playlist from "./Playlist";
function Playlists({ idEl, dragDisabled, setContext, setPlaylist }) {
	const [playlists, updatePlaylists] = useState(
		Array.from(finalPlaylist.playlists)
	);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(playlists);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updatePlaylists(items);
	}

	return (
		<div>
			<div className="component-header">
				<h2 className="component-header-text">Your Playlists</h2>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="songs">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{playlists.map(({ name, image, playlistKey }, index) => {
								return (
									<Draggable
										key={index.toString()}
										draggableId={index.toString()}
										index={index}
										isDragDisabled={false}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div>
													<img src={image} alt={`${name} Thumb`} />
												</div>
												<p
													className="playlistLink"
													onClick={() => {
														setContext("Playlist");
														setPlaylist(playlistKey);
													}}
												>
													{name}
												</p>
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
