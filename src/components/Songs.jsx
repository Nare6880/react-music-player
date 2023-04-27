import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowsUpDownLeftRight,
	faColumns,
	faHeart,
	faPenToSquare,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import data from "./Data/LikedSongs.json";

function Songs({ dragDisabled }) {
	const [songs, updateSongs] = useState(data);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(songs);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateSongs(items);
	}
	function handleSongRemoval(idex) {
		const items = Array.from(songs);
		items.splice(idex, 1);
		updateSongs(items);
	}
	return (
		<div>
			<div className="component-header">
				<h2 className="component-header-text">Liked Songs</h2>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="songs">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{songs.map(({ title, artist, image, album, duration }, index) => {
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
												<div className="song-container">
													{" "}
													<img className="song-image" src={image}></img>
													<p>{title}</p>
													<p>{artist}</p>
													<p>{album}</p>
													<p>{duration}</p>
													<div className="justify-end">
														<FontAwesomeIcon
															onClick={() => handleSongRemoval(index)}
															className="heart"
															icon={faX}
															size="2x"
														/>
													</div>
												</div>
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
