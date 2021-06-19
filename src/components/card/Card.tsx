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

const formatValue = (value: string) => {
	if (!isNaN(parseInt(value))) return value;
	return value.length > 1 ? value[0] : value;
};
export const Card = ({ card }: Props) => {
	if (!SYMBOLS[card.suit]) return <></>;
	return (
		<div
			className={`card ${card.suit}`}
			title={`${formatValue(card.value)} ${card.suit}`}
		>
			<div className="header">
				<div className="value">{formatValue(card.value)}</div>
				<div className="suit">{SYMBOLS[card.suit]}</div>
			</div>
			<div className={`${card.suit} large`}>{SYMBOLS[card.suit]}</div>

			<div className="bottom">
				<div className="value">{formatValue(card.value)}</div>
				<div className={`${card.suit}`}>{SYMBOLS[card.suit]}</div>
			</div>
		</div>
	);
};

export default Card;
