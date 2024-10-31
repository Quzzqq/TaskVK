import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe } from "node:test";
import { expect, it, vi } from "vitest";
import Registration from "../Registration/Registration.tsx";
import takeToken from "../../service/checkToken.ts";
import authStore from "../../stores/authStore.ts";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../service/checkToken.ts", () => ({
  default: vi.fn(),
}));

describe("Registration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("Проверка на неверный токен", async () => {
    vi.mocked(takeToken).mockRejectedValue(new Error("Неверный токен"));
    render(
      <MemoryRouter>
        <Registration signIn={authStore.signIn} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/токен/i), {
      target: { value: "invalid-token" },
    });
    fireEvent.click(screen.getByRole("button", { name: /отправить/i }));
    expect(await screen.findByText(/неверный токен/i)).toBeInTheDocument();
  });
  it("Проверка на верный токен", async () => {
    const mockedAuthStore = {
      signIn: vi.fn(),
      token: "",
    };
    render(
      <MemoryRouter>
        <Registration signIn={mockedAuthStore.signIn} />
      </MemoryRouter>
    );

    vi.mocked(takeToken).mockResolvedValue("valid-token");

    fireEvent.change(screen.getByLabelText(/токен/i), {
      target: { value: "valid-token" },
    });
    fireEvent.click(screen.getByRole("button", { name: /отправить/i }));

    expect(await mockedAuthStore.signIn).toHaveBeenCalledWith("valid-token");

    expect(await window.localStorage.getItem("userToken")).toBe("valid-token");
  });
});
