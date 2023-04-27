import React from "react";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import RecommendedGenres from "./RecommendedGenres";
import PlaybackWrapper from "./PlaybackWrapper";
import Songs from "./Songs";
function Row({ Customize, type, id, setContext, setPlaylist, playlist }) {
	return <div className="component-row">{getComponent({ type })}</div>;
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

export default Row;
