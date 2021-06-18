import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Deck from "../components/deck/Deck";
import { listHand, CardData } from "../services/deck";

type Params = {
	deck: string;
};
const Details = () => {
	const { deck } = useParams<Params>();
	const [cards, setCards] = useState<CardData[]>([]);

	const loadDeck = async () => {
		const cards = await listHand(deck);
		setCards(cards);
		return Promise.resolve();
	};

	useEffect(() => {
		loadDeck();
	}, [deck]);

	return (
		<div>
			<Deck cards={cards} />
		</div>
	);
};

export default Details;
