import { listHand, listRotation, storeCards, storeRotation } from "./deck";
import nock from "nock";

describe("service: deck", () => {
	beforeAll(() => {
		nock.disableNetConnect();
	});

	const cards = [{ code: "some-code", value: "1c", suit: "kings" }];

	it("stores a deck", () => {
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

		return expect(storeCards(cards)).resolves.toEqual({
			deck_id: "some-deck-id",
		});
	});

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
								image: "https://deckofcardsapi.com/static/img/KH.png",
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
				image: "https://deckofcardsapi.com/static/img/KH.png",
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
								image: "https://deckofcardsapi.com/static/img/KH.png",
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
				image: "https://deckofcardsapi.com/static/img/KH.png",
				value: "KING",
				suit: "HEARTS",
				code: "KH",
			},
		]);
	});

	it("set the rotation card", () => {
		const rotation = cards[0];

		nock("https://deckofcardsapi.com")
			.get("/api/deck/new/")
			.query({ cards: cards[0].code })
			.reply(200, { deck_id: "some-rotation-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-rotation-id/draw/")
			.query({ count: cards.length })
			.reply(200, { deck_id: "some-rotation-id" });

		nock("https://deckofcardsapi.com")
			.get("/api/deck/some-rotation-id/pile/rotation/add/")
			.query({ cards: cards[0].code })
			.reply(200, { deck_id: "some-rotation-id" });

		return expect(storeRotation(rotation)).resolves.toEqual({
			deck_id: "some-rotation-id",
		});
	});
});
