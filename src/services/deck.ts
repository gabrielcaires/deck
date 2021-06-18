import axios from "axios";
const SERVICE_URL = "https://deckofcardsapi.com";

export interface CardData {
	value: string;
	suit: string;
	code: string;
}

type DeckResponse = {
	deck_id: string;
};

const HAND = "hand";
const ROTATION = "rotation";

const draw = async (deck: string, count: number) =>
	(
		await axios.get<DeckResponse>(`${SERVICE_URL}/api/deck/${deck}/draw/`, {
			params: { count },
		})
	).data;

const create = async (codes: string[]) =>
	(
		await axios.get<DeckResponse>(`${SERVICE_URL}/api/deck/new/`, {
			params: { cards: codes.join(",") },
		})
	).data;

const addToPile = async (deck: string, pile: string, codes: string[]) =>
	(
		await axios.get<DeckResponse>(
			`${SERVICE_URL}/api/deck/${deck}/pile/${pile}/add/`,
			{
				params: { cards: codes.join(",") },
			},
		)
	).data;

const listPile = async (deck: string, name: string) => {
	return (await axios.get(`${SERVICE_URL}/api/deck/${deck}/pile/${name}/list/`))
		.data.piles[name].cards;
};

const store = async (
	cards: CardData[],
	pile: string,
): Promise<DeckResponse> => {
	const codes = cards.map((item) => item.code);
	const { deck_id } = await create(codes);
	await draw(deck_id, codes.length);
	return addToPile(deck_id, pile, codes);
};

const storeCards = (cards: CardData[]) => store(cards, HAND);
const storeRotation = (card: CardData) => store([card], ROTATION);

export const listHand = async (deck: string) => listPile(deck, HAND);
export const listRotation = async (deck: string) => listPile(deck, ROTATION);
export const createDeck = async (
	cards: CardData[],
	rotationCard: CardData,
): Promise<[string, string]> => {
	const [hand, rotation] = await Promise.all([
		storeCards(cards),
		storeRotation(rotationCard),
	]);

	return [hand.deck_id, rotation.deck_id];
};
