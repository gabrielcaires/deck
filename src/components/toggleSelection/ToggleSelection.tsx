import { useState } from "react";

type Option = {
	label: string;
	value: string;
};
type OnSelectHandler = (value: any) => void;

type Props = {
	options: Option[];
	onSelect: OnSelectHandler;
	initial?: string;
};

export const ToggleSelection = ({ options, onSelect, initial = "" }: Props) => {
	const [selected, setSelection] = useState<string>(initial);

	const select = (value: string) => {
		setSelection(value);
		onSelect(value);
	};

	return (
		<ul>
			{options.map((option) => (
				<li
					key={option.value}
					role="option"
					aria-selected={option.value === selected}
				>
					<button
						disabled={option.value === selected}
						onClick={() => select(option.value)}
						name={option.value}
					>
						{option.label}
					</button>
				</li>
			))}
		</ul>
	);
};

export default ToggleSelection;
