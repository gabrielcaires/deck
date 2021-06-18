import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Deck from "../components/deck/Deck";
import { listHand, CardData, listRotation } from "../services/deck";

type Params = {
	id: string;
};

const Details = () => {
	const { id } = useParams<Params>();
	const history = useHistory();
	const [handCards, setHandCards] = useState<CardData[]>([]);
	const [rotationCards, setRotationCard] = useState<CardData[]>([]);
	const [hand, rotation] = id.split("::");

	const loadDeck = async () => {
		try {
			setHandCards(await listHand(hand));
			setRotationCard(await listRotation(rotation));
		} catch (e) {
			history.push("/deck/new");
		}
	};

	useEffect(() => {
		loadDeck();
	}, [id]);

	return (
		<section>
			<h1>Deck of cards</h1>
			<div className="deck">
				<Deck cards={handCards} />
				<h2>Rotation Card</h2>
				<Deck cards={rotationCards} />
			</div>
		</section>
	);
};

export default Details;
