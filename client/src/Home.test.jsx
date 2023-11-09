import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

// Test that the Home component renders All Contacts Title and the add button
describe("Home", () => {
  it('renders "All Contacts"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(getByText("All Contacts")).toBeTruthy();
  });

  it("renders the button '+' to add contacts", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(getByText("+")).toBeTruthy();
  });
});
