import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from './App';

it('Should render the app and performs a search', async () => {
  render(<App />);
  
  expect(screen.getByText(/Pica App/i)).toBeDefined();
  expect(screen.queryByText(/Found/i)).toBeNull();

  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: "Search" });
  userEvent.type(searchInput, 'flamingo');
  userEvent.click(searchButton);

  expect(await screen.findByText(/Found 2 results/i)).toBeDefined()

  // expect(screen.getByText(/Found 2 results/i)).toBeInTheDocument();
  // expect(screen.getByAltText('user1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  // expect(screen.getByAltText('user2')).toHaveAttribute('src', 'https://example.com/image2.jpg');
});
