import React, { useState, useEffect, useRef } from "react";
import Playlists from "./Playlists";
import Songs from "./Songs";
import useScript from "../hooks/useScript";
function Rowx2({ Customize, Row }) {
	const [divisionClicked, setDivisionClicked] = useState(false);
	const [width, setWidth] = useState(0);
	const [widthA, setWidthA] = useState(0);
	const flexRef = useRef(null);
	useEffect(() => {
		setWidth(flexRef.current.getBoundingClientRect().width);
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
											backgroundColor: "blue",
									  }
									: {
											width: `${
												widthA === 0 ? `100%` : `${width - widthA - 20}px`
											}`,
									  }
							}
						>
							<div className="component-header">
								<h2 className="component-header-text">
									{type} {id}
								</h2>
								<div className="component-header-decoration"></div>
							</div>
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
				return <Playlists dragDisabled={Customize}></Playlists>;
			case "Songs":
				return <Songs dragDisabled={Customize}></Songs>;
				break;
		}
	}
}

export default Rowx2;
