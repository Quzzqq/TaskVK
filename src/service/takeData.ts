import instance from "../axios";
import { IFilter } from "../types/filterType";

export async function takeData(filters: IFilter, token: string) {
  const path = `/search/code?${
    filters.code.length !== 0 ? "q=" + filters.code + "+in:" : "in:"
  }${filters.inWhere}${
    filters.languages.length !== 0
      ? "+language:" + filters.languages.join("+OR+language:")
      : ""
  }&per_page=10`;
  console.log(path);

  const response = await instance.get(path, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
}
