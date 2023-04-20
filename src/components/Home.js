import React, { useState } from "react";
import "../App.css";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import RecommendedGenres from "./RecommendedGenres";
import Songs from "./Songs";
import PlaybackWrapper from "./PlaybackWrapper";
import Row from "./Row";
import Rowx2 from "./Rowx2";
import Rowx3 from "./Rowx3";
import {
	GridContextProvider,
	GridDropZone,
	GridItem,
	swap,
} from "react-grid-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowsUpDownLeftRight,
	faColumns,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const defaultComponentList = [
	{ type: "Playlists", id: "0" },
	{ type: "RecommendedGenres", id: "1" },
	{ type: "Songs", id: "2" },
	{ type: "Playlist", id: "3" },
	{ type: "Playlist", id: "4" },
	{ type: "PlaybackWrapper", id: "5" },
];
function Home({ setContext, setPlaylist, playlist }) {
	var boxMinWidth = 1000;
	var isHandlerDragging = false;
	var pointerRelativeXpos = 0;
	onmousemove = function (e) {
		if (!isHandlerDragging) {
			return;
		}
		pointerRelativeXpos = e.clientX;
		console.log(pointerRelativeXpos);
	};
	onmouseup = function (e) {
		isHandlerDragging = false;
	};
	const [Customize, updateCustomize] = useState(false);
	const [columns, updateColumns] = useState(2);
	const [components, updateComponents] = useState(defaultComponentList);
	const [components2, updateComponents2] = useState(getRowArr(components, 2));
	const [components3, updateComponents3] = useState(getRowArr(components, 3));
	function getRowArr(inputArr, size) {
		let arr = [];
		let tempArr = Array.from(inputArr);
		for (let i = 0; i < tempArr.length; i += size) {
			arr.push(tempArr.slice(i, i + size));
		}
		return arr;
	}
	console.log(components, components2, components3);
	return Customize ? (
		<div>
			<GridContextProvider onChange={onChange}>
				<div className="align-left">
					<button
						className="customizeButton"
						style={{ backgroundColor: Customize ? "Green" : "Red" }}
						onClick={() => updateCustomize(!Customize)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							class="bi bi-x-lg"
							viewBox="0 0 16 16"
						>
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
						</svg>
					</button>
					<button
						className="customizeButton"
						style={{ backgroundColor: columns === 1 ? "Green" : "Red" }}
						onClick={() => updateColumns(1)}
					>
						<img
							className="col-icon"
							src="https://img.icons8.com/ios/50/null/column.png"
						/>
					</button>
					<button
						className="customizeButton"
						style={{ backgroundColor: columns === 2 ? "Green" : "Red" }}
						onClick={() => updateColumns(2)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							class="bi bi-layout-split"
							viewBox="0 0 16 16"
						>
							<path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8.5zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5V2z" />
						</svg>
					</button>
					<button
						className="customizeButton"
						style={{ backgroundColor: columns === 3 ? "Green" : "Red" }}
						onClick={() => updateColumns(3)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							class="bi bi-layout-three-columns"
							viewBox="0 0 16 16"
						>
							<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1H1.5zM10 15V1H6v14h4zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11v14z" />
						</svg>
					</button>
				</div>
				<GridDropZone
					id="components"
					boxesPerRow={columns}
					rowHeight={400}
					style={{ height: "2000px" }}
				>
					{components.map(({ type, id }, index) => {
						return (
							<GridItem key={id}>
								<div className="component-container moveable">
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
						);
					})}
				</GridDropZone>
			</GridContextProvider>
		</div>
	) : (
		<div>
			<div className="align-left">
				<button
					className="customizeButton"
					style={{ backgroundColor: Customize ? "Green" : "Red" }}
					onClick={() => updateCustomize(!Customize)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						class="bi bi-arrows-move"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
						/>
					</svg>
				</button>
			</div>

			<div className="Grid-1">
				{columns === 1
					? components.map(({ type, id }, index) => {
							return (
								<Row
									type={type}
									id={id}
									Customize={Customize}
									setContext={setContext}
									playlist={playlist}
									setPlaylist={setPlaylist}
								></Row>
							);
					  })
					: columns === 2
					? components2.map((row) => {
							return (
								<Rowx2
									Customize={Customize}
									Row={row}
									playlist={playlist}
									setContext={setContext}
									setPlaylist={setPlaylist}
								></Rowx2>
							);
					  })
					: components3.map((row) => {
							return (
								<Rowx3
									Customize={Customize}
									Row={row}
									playlist={playlist}
									setContext={setContext}
									setPlaylist={setPlaylist}
								></Rowx3>
							);
					  })}
			</div>
		</div>
	);
	function onChange(sourceId, sourceIndex, targetIndex, targetId) {
		const nextState = swap(components, sourceIndex, targetIndex);
		updateComponents(nextState);
		updateComponents2(getRowArr(nextState, 2));
		updateComponents3(getRowArr(nextState, 3));
	}
	function getComponent(object) {
		switch (object.type) {
			case "Playlists":
				return (
					<Playlists
						dragDisabled={Customize}
						setContext={setContext}
						setPlaylist={setPlaylist}
					></Playlists>
				);
			case "Playlist":
				return (
					<Playlist
						dragDisabled={Customize}
						setPlaylist={setPlaylist}
						playlist={playlist}
					></Playlist>
				);
			case "Songs":
				return <Songs dragDisabled={Customize}></Songs>;
				break;
			case "RecommendedGenres":
				return <RecommendedGenres dragDisabled={Customize}></RecommendedGenres>;
				break;
			case "PlaybackWrapper":
				return <PlaybackWrapper setContext={setContext}></PlaybackWrapper>;
		}
	}
}

export default Home;
