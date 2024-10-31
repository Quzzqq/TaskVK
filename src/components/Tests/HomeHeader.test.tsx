import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import HomeHeader from "../Home/HomeHeader/HomeHeader";
import DataStore from "../../stores/DataStore";

vi.mock("../../../stores/DataStore", () => ({
  getDataAction: vi.fn(),
  clearPage: vi.fn(),
}));

describe("HomeHeader", () => {
  let setFilters;
  let setOpenHeader;
  let setManyAlerts;
  let setFetching;

  beforeEach(() => {
    setFilters = vi.fn();
    setOpenHeader = vi.fn();
    setManyAlerts = vi.fn();
    setFetching = vi.fn();
  });
  it("Рендерит заголовок с полем ввода и фильтрами", () => {
    render(
      <HomeHeader
        filters={{ code: "", languages: [], inWhere: "" }}
        setFilters={setFilters}
        token="fake_token"
        openHeader={true}
        setOpenHeader={setOpenHeader}
        setManyAlerts={setManyAlerts}
        setFetching={setFetching}
      />
    );

    expect(screen.getByText(/Код/i)).toBeInTheDocument();
    expect(screen.getByText(/язык программирования/i)).toBeInTheDocument();
    expect(screen.getByText(/где искать\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /искать/i })).toBeInTheDocument();
  });
  it("Изменяет код при вводе текста", async () => {
    render(
      <HomeHeader
        filters={{ code: "", languages: [], inWhere: "" }}
        setFilters={setFilters}
        token="fake_token"
        openHeader={true}
        setOpenHeader={setOpenHeader}
        setManyAlerts={setManyAlerts}
        setFetching={setFetching}
      />
    );

    const input = screen.getByTestId(/input/i);
    fireEvent.change(input, { target: { value: "test code" } });

    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });
});
