import { createDeck, listHand, listRotation, sortByRotation } from "./deck";
import nock from "nock";

const createCard = (value: string, suit: string) => {
	return {
		value: value,
		suit: suit,
		code: "code",
	};
};
describe("service: deck", () => {
	beforeAll(() => {
		nock.disableNetConnect();
	});

	const cards = [{ code: "some-code", value: "1c", suit: "kings" }];

	it("list the hand pile", () => {
		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-deck-id/pile/hand/list/")
			.reply(200, {
				success: true,
				deck_id: "osi0sgwz09l0",
				remaining: 0,
				piles: {
					hand: {
						remaining: 3,
						cards: [
							{
								value: "KING",
								suit: "HEARTS",
								code: "KH",
							},
						],
					},
				},
			});

		return expect(listHand("some-deck-id")).resolves.toEqual([
			{
				value: "KING",
				suit: "HEARTS",
				code: "KH",
			},
		]);
	});

	it("list the rotation pile", () => {
		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-deck-id/pile/rotation/list/")
			.reply(200, {
				deck_id: "some-deck-id",
				success: true,
				piles: {
					rotation: {
						remaining: 3,
						cards: [
							{
								value: "KING",
								suit: "HEARTS",
								code: "KH",
							},
						],
					},
				},
			});

		return expect(listRotation("some-deck-id")).resolves.toEqual([
			{
				value: "KING",
				suit: "HEARTS",
				code: "KH",
			},
		]);
	});

	it("store the rotation and card list", () => {
		const rotation = cards[0];

		nock("https://deckofcardsapi.com")
			.get("/api/deck/new/")
			.query({ cards: cards[0].code })
			.reply(200, { deck_id: "some-deck-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-deck-id/draw/")
			.query({ count: cards.length })
			.reply(200, { deck_id: "some-deck-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-deck-id/pile/hand/add/")
			.query({ cards: cards[0].code })
			.reply(200, { deck_id: "some-deck-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/new/")
			.query({ cards: rotation.code })
			.reply(200, { deck_id: "some-rotation-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-rotation-id/draw/")
			.query({ count: cards.length })
			.reply(200, { deck_id: "some-rotation-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-rotation-id/pile/rotation/add/")
			.query({ cards: rotation.code })
			.reply(200, { deck_id: "some-rotation-id" });

		return expect(createDeck(cards, rotation)).resolves.toEqual([
			"some-deck-id",
			"some-rotation-id",
		]);
	});

	it("sorts the card list by rotation", () => {
		const cards = [
			createCard("ACE", "CLUBS"),
			createCard("2", "CLUBS"),
			createCard("3", "CLUBS"),
			createCard("4", "CLUBS"),
			createCard("5", "CLUBS"),
			createCard("6", "CLUBS"),
			createCard("7", "CLUBS"),
			createCard("8", "CLUBS"),
			createCard("9", "CLUBS"),
			createCard("10", "CLUBS"),
			createCard("KING", "CLUBS"),
			createCard("JACK", "CLUBS"),
			createCard("QUEEN", "CLUBS"),
		];
		const rotation = createCard("6", "CLUBS");

		expect(sortByRotation(cards, rotation)).toEqual([
			createCard("6", "CLUBS"),
			createCard("5", "CLUBS"),
			createCard("4", "CLUBS"),
			createCard("3", "CLUBS"),
			createCard("2", "CLUBS"),
			createCard("ACE", "CLUBS"),
			createCard("KING", "CLUBS"),
			createCard("QUEEN", "CLUBS"),
			createCard("JACK", "CLUBS"),
			createCard("10", "CLUBS"),
			createCard("9", "CLUBS"),
			createCard("8", "CLUBS"),
			createCard("7", "CLUBS"),
		]);
	});
});
