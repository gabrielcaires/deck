// import { useEffect } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, CardData } from "../services/deck";

type Params = {
	deck: string;
};
const Details = () => {
	const { deck } = useParams<Params>();

	async function loadDeck() {
		const response = await get(deck);
		console.log(response);
		// setCards(response.data);
		return Promise.resolve();
	}

	useEffect(() => {
		(async function anyNameFunction() {
			await loadDeck();
		})();
	}, [deck]);

	return (
		<div>
			<h1>{deck}</h1>
		</div>
	);
};

export default Details;
