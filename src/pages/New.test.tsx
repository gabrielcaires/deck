import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as service from "../services/deck";
import New from "./New";
import { mocked } from "ts-jest/utils";

jest.mock("../services/deck");

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

const mockedService = mocked(service, true);

const addCard = (card: string) => {
	userEvent.type(screen.getByLabelText("Add Cards to the Pile"), card);
	userEvent.click(screen.getByRole("button", { name: "Add" }));
};

const addRotationCard = (card: string) => {
	userEvent.type(screen.getByLabelText("Rotation Card"), card);
	userEvent.click(screen.getByRole("button", { name: "Add" }));
};

it("adds a new card", async () => {
	render(<New />);
	addCard("3s");
	const newCard = await screen.findByTitle("3 SPADES");
	expect(newCard).toBeInTheDocument();
});

it("prevents to add an invalid card", async () => {
	render(<New />);
	addCard("1s");
	const newCard = await screen.findByText("Sorry, this card is invalid.");
	expect(newCard).toBeInTheDocument();
});

it("prevents to add more than the maximum amount of cards", async () => {
	render(<New maximum={3} />);
	addCard("3s");
	addCard("3s");
	addCard("3s");
	addCard("3s");

	const newCard = await screen.findAllByTitle("3 SPADES");
	const errorMessage = await screen.findByText(
		"Sorry, your reached the maximum number of cards.",
	);
	expect(newCard.length).toBe(3);
	expect(errorMessage).toBeInTheDocument();
});

it("store the cards and rotation", () => {
	mockedService.createDeck.mockResolvedValue(["hand-id", "rotation-id"]);

	render(<New />);
	addCard("3s");
	addRotationCard("2s");
	userEvent.click(screen.getByText("Submit Deck"));

	expect(mockedService.createDeck).toHaveBeenCalledWith(
		[
			{
				code: "3S",
				suit: "SPADES",
				value: "3",
			},
		],
		{
			code: "2S",
			suit: "SPADES",
			value: "2",
		},
	);
});

it("displays error message when the storing process fail", async () => {
	mockedService.createDeck.mockRejectedValue(new Error("Some Error"));

	render(<New />);
	addCard("3s");
	addRotationCard("4s");
	userEvent.click(screen.getByText("Submit Deck"));

	const errorMessage = await screen.findByText(
		"Sorry, was not possible to create the deck.",
	);
	expect(errorMessage).toBeInTheDocument();
});

it("redirects to hand page", async () => {
	mockedService.createDeck.mockResolvedValue(["hand-id", "rotation-id"]);

	render(<New />);
	addCard("3s");
	addRotationCard("2s");
	userEvent.click(screen.getByText("Submit Deck"));

	await waitFor(() =>
		expect(mockHistoryPush).toHaveBeenCalledWith("/deck/hand-id::rotation-id"),
	);
});
