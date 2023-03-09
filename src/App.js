import React, { useState } from "react";
import "./App.css";
import Playlists from "./components/Playlists";
import Songs from "./components/Songs";
import {
	GridContextProvider,
	GridDropZone,
	GridItem,
	swap,
} from "react-grid-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Rowx2 from "./components/Rowx2";
import Rowx3 from "./components/Rowx2";
import Row from "./components/Row";
const defaultComponentList = [
	{ type: "Playlists", id: "0" },
	{ type: "Playlists", id: "1" },
	{ type: "Playlists", id: "2" },
	{ type: "Playlists", id: "3" },
	{ type: "Songs", id: "4" },
	{ type: "Playlists", id: "5" },
	{ type: "Playlists", id: "6" },
];
function App() {
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
	const [columns, updateColumns] = useState(1);
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
				<button
					style={{ backgroundColor: Customize ? "Green" : "Red" }}
					onClick={() => updateCustomize(!Customize)}
				>
					Customize
				</button>
				<button
					style={{ backgroundColor: columns === 1 ? "Green" : "Red" }}
					onClick={() => updateColumns(1)}
				>
					1Col
				</button>
				<button
					style={{ backgroundColor: columns === 2 ? "Green" : "Red" }}
					onClick={() => updateColumns(2)}
				>
					2Col
				</button>
				<button
					style={{ backgroundColor: columns === 3 ? "Green" : "Red" }}
					onClick={() => updateColumns(3)}
				>
					3Col
				</button>
				<GridDropZone
					id="components"
					boxesPerRow={columns}
					rowHeight={400}
					style={{ height: "2000px" }}
				>
					{components.map(({ type, id }, index) => {
						return (
							<GridItem key={id}>
								<div className="component-container">
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
			<button
				style={{ backgroundColor: Customize ? "Green" : "Red" }}
				onClick={() => updateCustomize(!Customize)}
			>
				Customize
			</button>
			<div className="Grid-1">
				{columns === 1
					? components.map(({ type, id }, index) => {
							return <Row type={type} id={id} Customize={Customize}></Row>;
					  })
					: columns === 2
					? components2.map((row) => {
							return <Rowx2 Customize={Customize} Row={row}></Rowx2>;
					  })
					: components3.map((row) => {
							return <Rowx3 Customize={Customize} Row={row}></Rowx3>;
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
				return <Playlists dragDisabled={Customize}></Playlists>;
			case "Songs":
				return <Songs dragDisabled={Customize}></Songs>;
				break;
		}
	}
}

export default App;
