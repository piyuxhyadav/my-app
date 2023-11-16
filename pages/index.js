import React from "react";
import { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
	fetchFromApi,
	saveToBrowser,
	fetchFromBrowser,
	deleteFromBrowser,
} from "../lib/random-word-api";
import "./styles/styles.css";

const ItemTypes = {
	CARD: "card",
};
const DraggableItem = ({ word, index, moveCard }) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: { index },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveCard(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});

	return (
		<div
			ref={(node) => drag(drop(node))}
			style={{
				opacity: isDragging ? 0 : 1,
				transform: isDragging ? "translateY(0)" : "translateY(0)",
				transition: "opacity 0.2s, transform 0.4s",
				cursor: "grab",
			}}
			className="list-item"
		>
			{word}
		</div>
	);
};

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
	const moveCard = (fromIndex, toIndex) => {
		const newRandomWords = [...randomWords];
		const [movedWord] = newRandomWords.splice(fromIndex, 1);
		newRandomWords.splice(toIndex, 0, movedWord);
		setRandomWords(newRandomWords);
	};

	return (
		<DndProvider backend={HTML5Backend}>
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
						randomWords.map((word, index) => (
							<DraggableItem
								key={word}
								index={index}
								word={word}
								moveCard={moveCard}
							/>
						))}
				</ul>
			</div>
		</DndProvider>
	);
};

export default IndexPage;
