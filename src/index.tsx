import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";

import App from "./App";
import About from "./routes/About";
import InvalidPage from "./routes/InvalidPage";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="new" element="" /> // new note dialog
						<Route path="edit/:id">
							// edit note dialog
						</Route>
					</Route>
					<Route path="/about" element={<About />} /> // about
					<Route path="/*" element={<InvalidPage />} />     // 404
				</Routes>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);
