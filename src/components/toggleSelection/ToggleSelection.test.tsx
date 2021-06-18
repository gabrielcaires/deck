import { render, screen } from "@testing-library/react";
import ToggleSelection from "./ToggleSelection";
import userEvent from "@testing-library/user-event";

it("renders a button for each option", () => {
	render(
		<ToggleSelection
			options={[
				{ label: "input order", value: "1" },
				{ label: "Rotation order", value: "2" },
			]}
			onSelect={jest.fn()}
		></ToggleSelection>,
	);

	const option1 = screen.queryByText("input order");
	const option2 = screen.queryByText("Rotation order");
	expect(option1).toBeInTheDocument();
	expect(option2).toBeInTheDocument();
});

it("starts with the initial value selected", () => {
	render(
		<ToggleSelection
			options={[
				{ label: "input order", value: "1" },
				{ label: "Rotation order", value: "2" },
			]}
			onSelect={jest.fn()}
			initial={"2"}
		></ToggleSelection>,
	);
	const rotation = screen.getByRole("button", { name: "Rotation order" });

	expect(rotation).toBeDisabled();
});

it("selects an option", () => {
	const handler = jest.fn();
	render(
		<ToggleSelection
			options={[
				{ label: "input order", value: "1" },
				{ label: "Rotation order", value: "2" },
			]}
			onSelect={handler}
		></ToggleSelection>,
	);

	userEvent.click(screen.getByText("input order"));
	const option = screen.getByRole("button", { name: "input order" });
	expect(handler).toHaveBeenCalledWith("1");
	expect(option).toBeDisabled();
});
