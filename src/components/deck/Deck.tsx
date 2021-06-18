import { CardData } from "../../services/deck";
import Card from "../card/Card";

type DeckProps = {
	cards: CardData[];
};

const Deck = ({ cards }: DeckProps) => (
	<div className="deck">
		{cards.map((card) => (
			<Card card={card} key={card.code}></Card>
		))}
	</div>
);

export default Deck;
