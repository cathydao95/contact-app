import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import CreateContact from "./CreateContact";

// create a mock of react router dom
vi.mock("react-router-dom", () => ({
  // create mock of useNavigate hook
  useNavigate: vi.fn(),
}));

// Test that create contact displays the correct input fields
describe("CreateContact Component", () => {
  it("renders name, phone, and email input fields", () => {
    const { getAllByDisplayValue } = render(<CreateContact />);

    const emptyInputs = getAllByDisplayValue("");

    expect(emptyInputs[0]).toHaveAttribute("name", "name");
    expect(emptyInputs[1]).toHaveAttribute("name", "phone");
    expect(emptyInputs[2]).toHaveAttribute("name", "email");
  });
});
