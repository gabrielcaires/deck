import { render, screen } from "@testing-library/react";
import Deck from "./Deck";

const CARDS = [
	{
		image: "https://deckofcardsapi.com/static/img/KH.png",
		value: "KING",
		suit: "HEARTS",
		code: "KH",
	},
	{
		image: "https://deckofcardsapi.com/static/img/8C.png",
		value: "8",
		suit: "CLUBS",
		code: "8C",
	},
];

it("renders all cards", () => {
	render(<Deck cards={CARDS} />);
	CARDS.forEach((item) => {
		const card = screen.getByTitle(item.value);
		expect(card).toBeInTheDocument();
	});
});
