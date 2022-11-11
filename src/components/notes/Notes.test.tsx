import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import Notes from "./Notes";

test("check for add notes button text", () => {
  render(
    <Provider store={store}>
      <Notes />
    </Provider>
  );

  expect(screen.getByText(/Add Note/i)).toBeInTheDocument();
});
