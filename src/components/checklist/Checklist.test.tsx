import { render, screen } from "@testing-library/react";
import Checklist from "./Checklist";
import { Provider } from "react-redux";
import store from "../../store";

test("check for add checklist button text", () => {
  render(
    <Provider store={store}>
      <Checklist />
    </Provider>
  );

  expect(screen.getByText(/Add Checklist/i)).toBeInTheDocument();
});
