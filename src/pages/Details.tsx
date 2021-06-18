import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Deck from "../components/deck/Deck";
import ToggleSelection from "../components/toggleSelection/ToggleSelection";
import {
	listHand,
	CardData,
	listRotation,
	sortByRotation,
} from "../services/deck";

enum SortOptions {
	ORIGINAL = "original",
	ROTATION = "rotation",
}

type Params = {
	id: string;
};

const sortOptions = [
	{
		label: "Input order",
		value: SortOptions.ORIGINAL,
	},
	{
		label: "Rotation order",
		value: SortOptions.ROTATION,
	},
];

const Details = () => {
	const { id } = useParams<Params>();
	const history = useHistory();
	const [handCards, setHandCards] = useState<CardData[]>([]);
	const [rotationCards, setRotationCard] = useState<CardData[]>([]);
	const [sortMode, setSortMode] = useState<SortOptions>(SortOptions.ORIGINAL);

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
				<Deck
					cards={
						sortMode === SortOptions.ORIGINAL
							? handCards
							: sortByRotation(handCards, rotationCards[0])
					}
				/>
				<h2>Rotation Card</h2>
				<Deck cards={rotationCards} />
			</div>
			<div className="sort">
				<h2>Sort cards by:</h2>
				<ToggleSelection
					options={sortOptions}
					onSelect={(value: SortOptions) => setSortMode(value)}
					initial={SortOptions.ORIGINAL}
				></ToggleSelection>
			</div>
		</section>
	);
};

export default Details;
