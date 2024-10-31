import { beforeEach, describe, expect, it, vi } from "vitest";
import DataStore from "../../stores/DataStore";
import { getData } from "../../service/getData";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home/Home";
import { makeAutoObservable } from "mobx";

vi.mock("../../service/getData.ts", () => ({
  getData: vi.fn(),
}));

vi.mock("../../stores/AuthStore.ts", () => ({
  default: {
    token: "fake_token",
  },
}));

vi.mock("../../stores/DataStore.ts", () => {
  return {
    default: class MockDataStore {
      data: any[] = [];
      isLoading = false;
      page = 1;
      totalCount = 0;
      countNow = 0;
      maxCount = false;
      notFound = false;

      getDataAction = vi.fn();
      deleteCurrentData = vi.fn();
      clearPage = vi.fn();
      restartNotFound = vi.fn();
      constructor() {
        makeAutoObservable(this);
      }
    },
  };
});

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("Рендер страницы без данных", async () => {
    const mockedAuthStore = {
      token: "fake_token",
    };

    const mockedDataStore = new DataStore();

    act(() => {
      render(
        <MemoryRouter>
          <Home authStore={mockedAuthStore} dataStore={mockedDataStore} />
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("empty-data")).toBeInTheDocument();
  });
  it("Рендер страницы с загрузкой", async () => {
    const mockedAuthStore = {
      token: "fake_token",
    };

    const mockedDataStore = {
      data: [],
      isLoading: true,
      getDataAction: vi.fn(),
      maxCount: false,
      notFound: false,
      restartNotFound: vi.fn(),
    };

    act(() => {
      render(
        <MemoryRouter>
          <Home authStore={mockedAuthStore} dataStore={mockedDataStore} />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it("Рендер страницы с ошибкой 'not found'", async () => {
    const mockedAuthStore = {
      token: "fake_token",
    };

    const mockedDataStore = {
      data: [],
      isLoading: false,
      getDataAction: vi.fn(),
      maxCount: false,
      notFound: true,
      restartNotFound: vi.fn(),
    };

    act(() => {
      render(
        <MemoryRouter>
          <Home authStore={mockedAuthStore} dataStore={mockedDataStore} />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(
      screen.getByText("По вашему запросу ничего не найдено")
    ).toBeInTheDocument();
  });
  it("Рендер страницы с максимальным количеством данных", async () => {
    const mockedAuthStore = {
      token: "fake_token",
    };

    const mockedDataStore = {
      data: [],
      isLoading: false,
      getDataAction: vi.fn(),
      maxCount: true,
      notFound: false,
      restartNotFound: vi.fn(),
    };

    act(() => {
      render(
        <MemoryRouter>
          <Home authStore={mockedAuthStore} dataStore={mockedDataStore} />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByText("Больше нет данных")).toBeInTheDocument();
  });
});
