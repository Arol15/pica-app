import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";


test("Should render app and perform search", () => {
  it("Successfully returns images", async () => {
    render(<App />);
  
    expect(screen.getByText(/Pica App/i)).toBeDefined();
    expect(screen.queryByText(/Found/i)).toBeNull();
  
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole('button', { name: "Search" });
  
    await userEvent.type(searchInput, 'example');
    await userEvent.click(searchButton);
  
    await waitFor(() => screen.getByText("Found 2 results"));
  
    expect(screen.findByText('user1'));
    expect(screen.findByText('user2'));
  })
});
