import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlayCircle,
	faPauseCircle,
	faForward,
	faBackward,
	faPlay,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons";
function CarModePlayback({ isPlaying, setIsPlaying, isShuffle, setIsShuffle }) {
	return (
		<div className="grid-4-full-height">
			<div className="car-item">
				<FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
			</div>
			<div
				className="car-item"
				style={
					isPlaying ? { backgroundColor: "#93C572" } : { backgroundColor: "#93C572" }
				}
				onClick={() => {
					setIsPlaying(!isPlaying);
				}}
			>
				{isPlaying ? (
					<FontAwesomeIcon icon={faPauseCircle}></FontAwesomeIcon>
				) : (
					<FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
				)}
			</div>
			<div className="car-item">
				<FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
			</div>
			<div
				className="car-item"
				style={
					isShuffle ? { backgroundColor: "#93C572" } : { backgroundColor: "#93C572" }
				}
				onClick={() => {
					setIsShuffle(!isShuffle);
				}}
			>
				<FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
			</div>
		</div>
	);
}

export default CarModePlayback;
