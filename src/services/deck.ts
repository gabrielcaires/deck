import axios from "axios";
const SERVICE_URL = "https://deckofcardsapi.com";

export const SUFFIX_TABLE: Record<string, string> = {
	H: "HEARTS",
	C: "CLUBS",
	S: "SPADES",
	D: "DIAMONDS",
};

export const getSuit = (suffix: string): string => {
	return SUFFIX_TABLE[suffix.toUpperCase()];
};

export interface CardData {
	value: string;
	suit: string;
	code: string;
}

type DeckCreationResponse = {
	deck_id: string;
};

export const create = (data: CardData[]) => {
	return axios.get<DeckCreationResponse>(`${SERVICE_URL}/api/deck/new`, {
		params: { cards: data.map((item) => item.code).join(",") },
	});
};

export const get = async (id: string) => {
	return axios.get(`${SERVICE_URL}/api/deck/${id}`);
};
