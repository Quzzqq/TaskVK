import instance from "../axios";
import { IData } from "../types/dataType";
import { IFilter } from "../types/filterType";

export async function getData(filters: IFilter, token: string, page: number) {
  const path = `/search/code?${
    filters.code.length !== 0 ? "q=" + filters.code + "+in:" : "in:"
  }${filters.inWhere}${
    filters.languages.length !== 0
      ? "+language:" + filters.languages.join("+OR+language:")
      : ""
  }&page=${page}&per_page=40`;
  try {
    const response = await instance.get(path, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
