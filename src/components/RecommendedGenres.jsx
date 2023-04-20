import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowsUpDownLeftRight,
	faColumns,
	faHeart,
	faPenToSquare,
	faX,
} from "@fortawesome/free-solid-svg-icons";
const genres = ["Jazz", "Pop", "Rap", "Electronic"];
function RecommendedGenres({ setContext, setPlaylist }) {
	return (
		<div>
			<div>
				<div className="component-header">
					<h2 className="component-header-text">Recommended Genres</h2>
				</div>
			</div>

			<div className="Grid-2">
				{genres.map((genre) => {
					return (
						<div className="genre-container">
							<h2
								className="genre-title"
								onClick={() => {
									setContext("Genre");
									setPlaylist(genre);
								}}
							>
								{genre}
							</h2>
							<div className="justify-end">
								<FontAwesomeIcon className="heart" icon={faHeart} size="2x" />
								<FontAwesomeIcon className="heart" icon={faX} size="2x" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default RecommendedGenres;
