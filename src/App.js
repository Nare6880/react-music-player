import React, { useState } from "react";
import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import PlaybackWrapper from "./components/PlaybackWrapper";
import Playlist from "./components/Playlist";
import GenreDisplay from "./components/GenreDisplay";
import Songs from "./components/Songs";
function App() {
	const [context, setContext] = useState("Home");
	const [playlist, setPlaylist] = useState("2000s");
	return (
		<div style={{ height: "100%" }}>
			<div className="sticky">
				<MenuBar classname="menu-bar" setContext={setContext} />
			</div>

			{getContext()}
		</div>
	);
	function getContext() {
		console.log(playlist);
		if (context === "Home")
			return (
				<Home
					setContext={setContext}
					playlist={playlist}
					setPlaylist={setPlaylist}
				></Home>
			);
		else if (context === "Songs") return <Songs></Songs>;
		else if (context === "Playlist") return getPlaylist();
		else if (context === "Genre") return getGenre();
		else if (context === "Playback") return <PlaybackWrapper></PlaybackWrapper>;
	}
	function getPlaylist() {
		return <Playlist playlist={playlist} setPlaylist={setPlaylist}></Playlist>;
	}
	function getGenre() {
		return (
			<GenreDisplay
				playlist={playlist}
				setPlaylist={setPlaylist}
			></GenreDisplay>
		);
	}
}

export default App;
