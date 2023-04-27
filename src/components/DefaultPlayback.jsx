import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlayCircle,
	faPauseCircle,
	faForward,
	faBackward,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons";
function DefaultPlaybackMenu({
	isPlaying,
	setIsPlaying,
	isShuffle,
	setIsShuffle,
}) {
	return (
		<div className="default-playback-grid-v">
			<img
				className="img-full-height"
				src="https://i.scdn.co/image/ab67616d00004851b9ff0a5f40d3406aed5e5e3b"
			></img>
			<div
				style={{
					display: "flex",
					height: "100%",
					justifyContent: "center",
					breakAfter: "all",
				}}
			>
				<p style={{ margin: "0 auto" }}>Umbrella: 0:00/4:35</p>
				<div className="playbackBar">
					<div className="playbackDot"></div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					height: "100%",
					fontSize: "3rem",
					justifyContent: "center",
					gap: "20px",
				}}
			>
				<FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
				{isPlaying ? (
					<FontAwesomeIcon icon={faPauseCircle}></FontAwesomeIcon>
				) : (
					<FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
				)}
				<FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
				<FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
			</div>
		</div>
	);
}

export default DefaultPlaybackMenu;
