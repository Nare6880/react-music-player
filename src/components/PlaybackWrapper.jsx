import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisV,
	faCar,
	faExpand,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CarModePlayback from "./CarModePlayback";
import DefaultPlayback from "./DefaultPlayback";
function PlaybackWrapper({ setContext }) {
	const [layout, setLayout] = useState("CarModePlayback");
	const [isPlaying, setIsPlaying] = useState(false);
	const [isShuffle, setIsShuffle] = useState(false);
	return (
		<>
			<div className="playbackMenu">
				<select
					name="playbackMode"
					onChange={(e) => {
						setLayout(e.target.value);
					}}
					id="playback"
				>
					<option value="CarModePlayback">Car Mode</option>
					<option value="default">Default</option>
				</select>
				<FontAwesomeIcon
					style={{ fontSize: "2rem" }}
					icon={faExpand}
					onClick={() => {
						setContext("Playback");
					}}
				></FontAwesomeIcon>
			</div>
			<div className="heightfull">{getPlaybackMenu()}</div>
		</>
	);
	function getPlaybackMenu() {
		switch (layout) {
			case "default":
				return <DefaultPlayback></DefaultPlayback>;
			case "CarModePlayback":
				return (
					<CarModePlayback
						isShuffle={isShuffle}
						setIsShuffle={setIsShuffle}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
					></CarModePlayback>
				);
		}
	}
}

export default PlaybackWrapper;
