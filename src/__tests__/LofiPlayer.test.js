import { render, screen } from "@testing-library/react";
import LofiPlayer from "../components/lofiPlayer/LofiPlayer";
import { Provider } from "react-redux";
import { store } from "../redux/store";

test("lofi player play button", () => {
  render(
    <Provider store={store}>
      <LofiPlayer />
    </Provider>
  );
  screen.debug();
});
