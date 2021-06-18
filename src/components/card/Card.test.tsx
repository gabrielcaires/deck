import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders the suit", () => {
	["SPADES", "CLUBS", "DIAMONDS", "HEARTS"].forEach((item) => {
		render(<Card card={{ suit: item, value: "3", code: "3s" }} />);
		const linkElement = screen.getByTitle(`${3} ${item}`);
		expect(linkElement).toBeInTheDocument();
	});
});

it("renders the short value name", () => {
	render(<Card card={{ suit: "SPADES", value: "KING", code: "3s" }} />);
	const linkElement = screen.getByTitle(`K SPADES`);
	expect(linkElement).toBeInTheDocument();
});

it("doesn't renders the card when the suit is invalid", () => {
	render(<Card card={{ suit: "WRONG SUIT", value: "3", code: "3s" }} />);
	const linkElement = screen.queryByTitle("WRONG SUIT");
	expect(linkElement).not.toBeInTheDocument();
});
