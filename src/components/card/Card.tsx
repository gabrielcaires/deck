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
		<div className="card" title={`${card.value} ${card.suit}`}>
			<div className="header">
				<div className="value">{card.value}</div>
				<div className="suit">{SYMBOLS[card.suit]}</div>
			</div>
			<div className={`${card.suit} large`}>{SYMBOLS[card.suit]}</div>

			<div className="bottom">
				<div className="value" title={card.value}>
					{card.value}
				</div>
				<div className={`${card.suit}`}>{SYMBOLS[card.suit]}</div>
			</div>
		</div>
	);
};

export default Card;
