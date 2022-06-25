import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";

import Navbar from "./components/Navbar";

import App from "./App";
import About from "./routes/About";
import InvalidPage from "./routes/InvalidPage";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/new" element={<App action="NEW" />} />
						<Route path="/edit" element={<App action="NEW" />} />
						<Route path="/edit/:id" element={<App action="EDIT" />} />

						<Route path="/about" element={<About />} />
						<Route path="/*" element={<InvalidPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
