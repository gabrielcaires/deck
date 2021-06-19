import { useState } from "react";
import { useHistory } from "react-router-dom";
import Deck from "../components/deck/Deck";
import { CardData, createDeck } from "../services/deck";

const SUFFIX_TABLE: Record<string, string> = {
	H: "HEARTS",
	C: "CLUBS",
	S: "SPADES",
	D: "DIAMONDS",
};

const VALID_PREFIX = [
	"2",
	"A",
	"K",
	"Q",
	"J",
	"0",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
];

const isValid = (code: string) => {
	if (code.length < 2 || code.length > 3) return false;
	const value = code.slice(0, -1);
	if (!VALID_PREFIX.includes(value.toUpperCase())) return false;

	return true;
};
const getSuit = (suffix: string): string => {
	return SUFFIX_TABLE[suffix.toUpperCase()];
};

const parse = (code: string): CardData => {
	const value = code.slice(0, -1);
	const suffix = code[code.length - 1];
	return {
		code: code,
		suit: getSuit(suffix),
		value: value === "0" ? "10" : value,
	};
};

type Props = {
	maximum?: number;
};

const NewPage = ({ maximum = 10 }: Props) => {
	const [cards, setCards] = useState<CardData[]>([]);
	const [code, setCode] = useState<string>("");
	const [rotationCode, setRotationCode] = useState<string>("");
	const [erroMessage, setError] = useState<string | null>(null);
	const history = useHistory();

	const addCard = () => {
		if (!isValid(code)) {
			return setError("Sorry, this card is invalid.");
		}
		if (cards.length + 1 > maximum) {
			return setError("Sorry, your reached the maximum number of cards.");
		}
		const newCard = parse(code);
		setCards([...cards, newCard]);
		setCode("");
	};

	const changeCode = (value: string) => {
		setError(null);
		setCode(value.toUpperCase());
	};

	const create = async () => {
		if (!isValid(rotationCode)) {
			return setError("Sorry, You need to set a rotation card valid.");
		}

		try {
			const [hand, rotation] = await createDeck(cards, parse(rotationCode));

			history.push(`/deck/${hand}::${rotation}`);
		} catch (e) {
			setError("Sorry, was not possible to create the deck.");
		}
	};

	return (
		<section>
			<h1>Deck of cards</h1>
			{erroMessage && <span className="error">{erroMessage}</span>}
			<div className="deck">
				<Deck cards={cards} />
				<div className="add-cards">
					<label htmlFor="card">Add Cards to the Pile</label>
					<input
						type="text"
						id="card"
						name="card"
						value={code}
						maxLength={3}
						placeholder="Card name"
						onChange={(e) => changeCode(e.target.value)}
					/>
					<button name="add-to-desk" onClick={addCard}>
						Add
					</button>
				</div>
			</div>
			<div className="rotation-card">
				<label htmlFor="rotation-card">Rotation Card</label>
				<input
					type="text"
					maxLength={3}
					value={rotationCode}
					name="rotation-card"
					id="rotation-card"
					placeholder="Card name"
					onChange={(e) => setRotationCode(e.target.value.toUpperCase())}
				></input>
				<button className="submit" onClick={create}>
					Submit Deck
				</button>
			</div>
		</section>
	);
};

export default NewPage;
