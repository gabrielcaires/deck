import { CardData } from "../../services/deck";
import Card from "../card/Card";

type DeckProps = {
	cards: CardData[];
};

const Deck = ({ cards }: DeckProps) => (
	<div className="card-list">
		{cards.map((card, index) => (
			<Card card={card} key={index}></Card>
		))}
	</div>
);

export default Deck;
