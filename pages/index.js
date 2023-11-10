import React from "react";
import { useState, useEffect } from "react";
import {
	fetchFromApi,
	saveToBrowser,
	fetchFromBrowser,
	deleteFromBrowser,
} from "../lib/random-word-api";
import "./styles/styles.css";
const IndexPage = () => {
	const [randomWords, setRandomWords] = useState([]);

	const handleFetchFromServer = async () => {
		const words = await fetchFromApi();
		setRandomWords(words);
	};

	const handleFetchFromBrowser = async () => {
		const words = await fetchFromBrowser("randomWords");
		setRandomWords(words);
	};

	const handleSaveToBrowser = async () => {
		await saveToBrowser("randomWords", randomWords);
	};

	const handleDeleteFromBrowser = async () => {
		await deleteFromBrowser("randomWords");
		setRandomWords([]);
	};

	const handleClearData = async () => {
		setRandomWords([]);
	};

	return (
		<div className="container mx-auto text-center">
			<h1 className="text-3xl font-bold mt-4">Random Words</h1>
			<div className="flex flex-row flex-wrap justify-center mt-4 space-x-4">
				<button className="button" onClick={handleFetchFromServer}>
					Fetch from Server
				</button>
				<button className="button" onClick={handleFetchFromBrowser}>
					Fetch from Browser
				</button>
				<button className="button" onClick={handleSaveToBrowser}>
					Save to Browser
				</button>
				<button className="button" onClick={handleDeleteFromBrowser}>
					Delete from Browser
				</button>
				<button className="button" onClick={handleClearData}>
					Clear Data
				</button>
			</div>
			<ul className="mt-4 flex flex-col items-center">
				{randomWords &&
					randomWords.map((word) => (
						<li key={word} className="list-item slide-in-left">
							{word}
						</li>
					))}
			</ul>
		</div>
	);
};

export default IndexPage;
