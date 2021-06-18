import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import New from "./New";

it("adds a new card", () => {
	render(<New />);
	userEvent.type(screen.getByLabelText("Add Cards to the Pile"), "1s");
	userEvent.click(screen.getByText("Add"));

	const newCard = screen.queryByTitle("SPADES");
	expect(newCard).toBeInTheDocument();
});
