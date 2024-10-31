import { render, screen } from "@testing-library/react";
import PageNotFound from "../PageNotFound/PageNotFound.tsx";
import { describe, expect, it } from "vitest";

describe("Компонент PageNotFound", () => {
  it("Показывает сообщение о том, что страница не найдена", () => {
    render(<PageNotFound />);
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });
});
