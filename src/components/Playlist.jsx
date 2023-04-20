import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import p2000s from "./Data/2000s.json";
import playlists from "./Data/playlists.json";
import rapHits from "./Data/rapHits.json";
import rockClassics from "./Data/rockClassics.json";
import Jazz from "./Data/Jazz.json";
function Playlist({ dragDisabled, playlist, setPlaylist }) {
	const [data, setData] = useState(getData(playlist));
	const [playlistsArr, setPlaylists] = useState(playlists.playlists);

	function getData(playlist) {
		switch (playlist) {
			case "2000s":
				return p2000s;
			case "rapHits":
				return rapHits;
			case "rockHits":
				return rockClassics;
			case "Jazz":
				return Jazz;
			default:
				return p2000s;
		}
	}
	const [songs, updateSongs] = useState(data.songs);
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(songs);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateSongs(items);
	}
	function update(e) {
		setPlaylist(e.target.value);
		setData(getData(e.target.value));
		updateSongs(getData(e.target.value).songs);
	}
	console.log(playlist);
	return (
		<div>
			<div className="component-header-playlist">
				<img className="playlistImage" src={data.image}></img>
				<select
					className="PlaylistSelect"
					onChange={(e) => {
						update(e);
					}}
				>
					{playlistsArr.map((element) => {
						return <option value={element.playlistKey}>{element.name}</option>;
					})}
				</select>
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
												<div></div>
												<img className="song-image" src={image}></img>
												<p>{title}</p>
												<p>{artist}</p>
												<p>{album}</p>
												<p>{duration}</p>
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

export default Playlist;
