import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import Reminders from "./Reminders";

test("check for add reminder button text", () => {
  render(
    <Provider store={store}>
      <Reminders />
    </Provider>
  );

  expect(screen.getByText(/Add reminder/i)).toBeInTheDocument();
});
