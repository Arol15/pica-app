import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Should render app and perform search", async () => {
  render(<App />);

  expect(screen.getByText(/Pica App/i)).toBeDefined();
  expect(screen.queryByText(/Found/i)).toBeNull();

  const searchInput = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button", { name: "Search" });

  await userEvent.type(searchInput, "example");
  await userEvent.click(searchButton);

  await waitFor(() => screen.getByText("Found 2 results"));

  expect(screen.findByText("user1")).toBeDefined();
  expect(screen.findByText("user2")).toBeDefined();
});

test("Displays a status message when images are not found", async () => {
  render(<App />);

  const searchInput = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button", { name: "Search" });

  await userEvent.type(searchInput, "jjjjjjj");
  await userEvent.click(searchButton);

  expect(
    await screen.findByText("No images. Please try another search term.")
  ).toBeInTheDocument();
});

  test("Displays an error status message when there is a server error", async () => {
    render(<App />);

    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole('button', { name: "Search" });
  
    await userEvent.type(searchInput, 'lion');
    await userEvent.click(searchButton);

    expect(screen.findAllByText('Sorry, something went wrong.'));
});
