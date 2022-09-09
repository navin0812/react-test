import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, waitFor } from "@testing-library/react";
import Detail from "../detail";
import { LocationProvider } from "../useHistory";
const queryClient = new QueryClient();

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
          <QueryClientProvider client={client}>
            {rerenderUi}
          </QueryClientProvider>
        </LocationProvider>
      ),
  };
}

it("renders movie details", async () => {
  let component;

  await act(async () => {
    component = render(<QueryClientProvider client={queryClient}><Detail  params={{pathname: "/details/1"}}/></QueryClientProvider>);

  });

  const loadingText = await waitFor(() => component.findByText(/Loading/));
  expect(loadingText).toBeVisible();

  const element = await waitFor(() => component.findByText(/A New Hope/i), {
    timeout: 10000,
  });
  expect(element).toBeInTheDocument();

});
