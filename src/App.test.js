import React from "react";
import {
  act,
  waitFor,
  render,
  screen,
  renderHook,
} from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider, useHistory } from "./useHistory";

const queryClient = new QueryClient();

function sleep(timeout) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, timeout);
  });
}

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  container = null;
});

function renderWithClient(client, location, ui) {
  const { rerender, ...result } = render(
    <LocationProvider value={location}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </LocationProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <LocationProvider value={location}>
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
        </LocationProvider>
      ),
  };
}

it("renders correct Home Page.", async () => {
  let component;
  await act(async () => {
    component = renderWithClient(queryClient, { pathname: "/" }, <App />);
  });

  await waitFor(() => screen.findByText("Movies Component"));
  // const componentText = screen.getByText(/Movies Component/i);
  // expect(componentText).toBe("Movies Component");
});

it("renders correct Detail Page.", async () => {
  let component;

  await act(async () => {
    component = renderWithClient(
      queryClient,
      { pathname: "/detail/1" },
      <App />
    );
  });

  const element = await waitFor(() => screen.findByText(/Detail/i));
  expect(element).toBeInTheDocument();

  // await waitFor(() => screen.findByText("Detail"));
  // const componentText = screen.getByText(/Movies Component/i);
  // expect(componentText).toBe("Movies Component");
});
