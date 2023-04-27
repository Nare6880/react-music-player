import React, { useState, useEffect, useRef } from "react";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import Songs from "./Songs";
import PlaybackWrapper from "./PlaybackWrapper";
import RecommendedGenres from "./RecommendedGenres";
import useScript from "../hooks/useScript";
function Rowx2({ Customize, Row, setContext, setPlaylist, playlist }) {
	const [divisionClicked, setDivisionClicked] = useState(false);
	const [width, setWidth] = useState(0);
	const [widthA, setWidthA] = useState(0);
	const flexRef = useRef(null);
	useEffect(() => {
		setWidth(flexRef.current.getBoundingClientRect().width);
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);
	console.log(width);
	return (
		<div
			className="flex-2"
			onMouseMoveCapture={function (e) {
				if (!divisionClicked) {
					return;
				} else {
					if (
						e.clientX - 25 >= 0.33 * width &&
						e.clientX - 25 <= 0.66 * width
					) {
						setWidthA(e.clientX - 20);
						console.log("width: ", widthA);
					} else if (e.clientX - 25 > 0.66 * width) {
						setWidthA(0.66 * width);
						console.log("width: ", widthA);
					} else if (e.clientX - 10 < 0.33 * width) {
						setWidthA(0.33 * width);
						console.log("width: ", widthA);
					}
				}
				console.log("x", e.clientX);
			}}
			ref={flexRef}
		>
			{Row.map(({ type, id }, index) => {
				return (
					<>
						<div
							className="component-container"
							key={id}
							style={
								index === 0
									? {
											width: `${widthA === 0 ? `100%` : `${widthA}px`}`,
											flexGrow: "0",
									  }
									: {
											width: `${
												widthA === 0 ? `100%` : `${width - widthA - 20}px`
											}`,
									  }
							}
						>
							{getComponent({ type })}
						</div>
						{index === 0 && index !== Row.length - 1 && (
							<div
								className="division"
								onMouseDown={function (e) {
									setDivisionClicked(true);
									console.log(divisionClicked);
								}}
								onMouseUpCapture={function (e) {
									setDivisionClicked(false);
									console.log(divisionClicked);
								}}
							></div>
						)}
					</>
				);
			})}
		</div>
	);
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
				return (
					<RecommendedGenres
						dragDisabled={Customize}
						setContext={setContext}
						setPlaylist={setPlaylist}
					></RecommendedGenres>
				);
				break;
			case "PlaybackWrapper":
				return <PlaybackWrapper setContext={setContext}></PlaybackWrapper>;
		}
	}
}

export default Rowx2;
