import React from "react";
import {
  act,
  waitFor,
  render,
} from "@testing-library/react";
import Movies from "../movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Detail from "../detail";


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

function renderWithClient(client, ui) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  };
}


it("renders all the movies.", async () => {

  let component;
  
  await act(async () => {
    component = render(<QueryClientProvider client={queryClient}><Movies></Movies></QueryClientProvider>);
  });
  
  const loadingText  = await waitFor(() => component.findByText(/Loading/));
  expect(loadingText).toBeVisible();


    const element = await waitFor(() => component.findByText(/A New Hope/i), {timeout: 10000});
    expect(element).toBeInTheDocument();
});





// it('renders details pages', async () => {
//   let component;

//   await act(async () => {
//     component = render(<QueryClientProvider client={queryClient}><Detail params={{pathname: "/detail/4"}}/></QueryClientProvider>);
//   });

//   const loadingText  = await waitFor(() => component.findByText(/Loading/));
//   expect(loadingText).toBeVisible();
//   //The Phantom Menace

//   const element = await waitFor(() => component.findByText(/The Phantom Menace/i), {timeout: 10000});
//   expect(element).toBeInTheDocument();

// });