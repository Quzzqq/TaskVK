import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RoutesComp from "../../RoutesComp";
import authStore from "../../stores/authStore";

vi.mock("../../stores/AuthStore.ts", () => ({
  default: {
    token: "",
    signIn: vi.fn(),
    logout: vi.fn(),
  },
}));

describe("RoutesComp", () => {
  it("Рендер страницы при отсутвии токена", () => {
    render(<RoutesComp />);
    expect(screen.getByText(/поиск необходимого кода/i)).toBeInTheDocument();
  });
  it("Рендер страницы при наличии токена", () => {
    authStore.token = "test_token";
    render(<RoutesComp />);
    expect(screen.getByTestId(/home/i)).toBeInTheDocument();
  });
});
