import { render, screen, waitFor } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Details from "./Details";
import * as service from "../services/deck";
import { mocked } from "ts-jest/utils";

jest.mock("../services/deck.ts");

const mockedList = mocked(service, true);

const renderWithProviders = (
	ui: JSX.Element,
	route: string = "/",
	current: string = "/",
) => {
	const history = createMemoryHistory({ initialEntries: [current] });
	return {
		...render(
			<Router history={history}>
				<Route path={route}>{ui}</Route>
			</Router>,
		),
		history,
	};
};

function setup() {
	mockedList.listHand.mockResolvedValue([
		{
			image: "https://deckofcardsapi.com/static/img/KH.png",
			value: "KING",
			suit: "HEARTS",
			code: "KH",
		},
	]);

	mockedList.listRotation.mockResolvedValue([
		{
			image: "https://deckofcardsapi.com/static/img/KH.png",
			value: "7",
			suit: "CLUBS",
			code: "7C",
		},
	]);
}

it("display all cards", () => {
	setup();
	renderWithProviders(<Details />, "/deck/:id", "/deck/hand-id::rotation-id");

	return waitFor(() => {
		const hand = screen.queryByTitle("K HEARTS");
		const rotation = screen.queryByTitle("7 CLUBS");

		expect(hand).toBeInTheDocument();
		expect(rotation).toBeInTheDocument();
	});
});

it("redirect to the new page when there an error to load the decks", () => {
	mockedList.listHand.mockRejectedValue(
		new Error("some error to load the list"),
	);
	const { history } = renderWithProviders(
		<Details />,
		"/deck/:id",
		"/deck/wrong-id",
	);

	return waitFor(() => {
		expect(history.location.pathname).toBe("/deck/new");
	});
});
