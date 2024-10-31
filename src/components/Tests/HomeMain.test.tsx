import { beforeEach, describe, expect, it, vi } from "vitest";
import { IData } from "../../types/dataType";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import DataStore from "../../stores/DataStore";
import HomeMain from "../Home/HomeMain/HomeMain";

vi.mock("../../stores/DataStore", () => ({
  default: {
    data: [],
    deleteCurrentData: vi.fn(),
  },
}));

describe("HomeMain", () => {
  let mockData: IData[];

  beforeEach(() => {
    vi.clearAllMocks();

    mockData = [
      {
        git_url: "https://github.com/user/repo1",
        name: "Repo 1",
        html_url: "https://github.com/user/repo1",
        repository: {
          owner: {
            html_url: "https://github.com/user",
            avatar_url: "https://avatar.url/user",
          },
          name: "Repo 1",
        },
      },
      {
        git_url: "https://github.com/user/repo2",
        name: "Repo 2",
        html_url: "https://github.com/user/repo2",
        repository: {
          owner: {
            html_url: "https://github.com/user",
            avatar_url: "https://avatar.url/user",
          },
          name: "Repo 2",
        },
      },
    ];

    (DataStore as any).data = mockData;
  });

  it("Корректный рендер данных", () => {
    render(<HomeMain dataStore={DataStore} />);
    expect(
      screen.getByRole("heading", { name: /Repo 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Repo 2/i })
    ).toBeInTheDocument();
  });
  it("Удаление элемента при нажатии на кнопку закрытия", () => {
    render(<HomeMain dataStore={DataStore} />);

    const closeButton = screen.getAllByTestId("close")[0];
    fireEvent.click(closeButton);

    expect(DataStore.deleteCurrentData).toHaveBeenCalledWith(mockData[0]);
  });
});
