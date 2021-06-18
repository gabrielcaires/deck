import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import Deck from "../components/deck/Deck";
import { CardData, create, getSuit } from "../services/deck";

const parse = (code: string): CardData | null => {
	if (code.length !== 2) return null;
	const [value, suffix] = code.split("");
	const suit = getSuit(suffix);
	if (!suffix) return null;
	return {
		code: code,
		suit: suit,
		value: value,
	};
};

const NewPage = () => {
	const [cards, setCards] = useState<CardData[]>([]);
	const [code, setCode] = useState<string>("");
	const [hasError, setError] = useState<boolean>(false);
	const history = useHistory();

	const addCard = (e: FormEvent) => {
		e.preventDefault();
		setCode("");
		const newCard = parse(code);

		if (newCard) {
			setCards([...cards, newCard]);
		} else {
			setError(true);
		}
	};

	const changeCode = (value: string) => {
		setError(false);
		setCode(value);
	};

	const createDeck = async () => {
		const response = await create(cards);
		history.push(`/deck/${response.data.deck_id}`);
	};

	return (
		<div>
			<h1>Deck of Card</h1>
			{hasError && (
				<span className="error">
					Sorry, You are trying to insert an invalid card
				</span>
			)}
			<Deck cards={cards} />
			<div className="add-cards">
				<label htmlFor="card">Add Cards to the Pile</label>
				<form onSubmit={addCard}>
					<input
						type="text"
						id="card"
						name="card"
						value={code}
						onChange={(e) => changeCode(e.target.value)}
					/>
					<button type="submit">Add</button>
				</form>
			</div>
			<button className="submit" onClick={createDeck}>
				Submit Deck
			</button>
		</div>
	);
};

export default NewPage;
