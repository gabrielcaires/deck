import { CardData } from "../../services/deck";

const SYMBOLS: Record<string, string> = {
	HEARTS: "♦",
	CLUBS: "♣",
	SPADES: "♠",
	DIAMONDS: "♦",
};

type Props = {
	card: CardData;
};

export const Card = ({ card }: Props) => {
	if (!SYMBOLS[card.suit]) return <></>;
	return (
		<div className="card">
			<span className={card.suit} title={card.suit}>
				{SYMBOLS[card.suit]}
			</span>

			<span className="value" title={card.value}>
				{card.value}
			</span>
		</div>
	);
};

export default Card;
