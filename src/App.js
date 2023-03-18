import React, { useState } from "react";
import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import Songs from "./components/Songs";
function App() {
	const [context, setContext] = useState("Home");
	return (
		<div>
			<MenuBar setContext={setContext} />
			{getContext()}
		</div>
	);
	function getContext() {
		if (context === "Home") return <Home></Home>;
		else if (context === "Songs") return <Songs></Songs>;
	}
}

export default App;
