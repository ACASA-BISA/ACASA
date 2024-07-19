import { render, screen } from "@testing-library/react"; // Importing render and screen utilities from testing-library
import App from "./App"; // Importing the App component to be tested

test("renders learn react link", () => {
  // Defining a test case for checking if the "learn react" link is rendered
  render(<App />); // Rendering the App component
  const linkElement = screen.getByText(/learn react/i); // Searching for an element with text matching "learn react"
  expect(linkElement).toBeInTheDocument(); // Asserting that the found element is present in the document
});
