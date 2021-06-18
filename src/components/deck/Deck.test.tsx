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
		const card1 = screen.getByTitle("K HEARTS");
		const card2 = screen.getByTitle("8 CLUBS");
		expect(card1).toBeInTheDocument();
		expect(card2).toBeInTheDocument();
	});
});
