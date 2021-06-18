import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders the suit", () => {
	["SPADES", "CLUBS", "DIAMONDS", "HEARTS"].forEach((item) => {
		render(
			<Card card={{ suit: item, value: "some value", code: "some code" }} />,
		);
		const linkElement = screen.getByTitle(item);
		expect(linkElement).toBeInTheDocument();
	});
});

it("renders the value", () => {
	render(
		<Card card={{ suit: "CLUBS", value: "some value", code: "some code" }} />,
	);
	const linkElement = screen.getByTitle("some value");
	expect(linkElement).toBeInTheDocument();
});

it("doesn't renders the card when the suit is invalid", () => {
	render(
		<Card
			card={{ suit: "WRONG SUIT", value: "some value", code: "some code" }}
		/>,
	);
	const linkElement = screen.queryByTitle("WRONG SUIT");
	expect(linkElement).not.toBeInTheDocument();
});
