import instance from "../axios";

export async function takeInfo() {
  const response = await instance.get(
    "/search/code?q=addClass+in:file+language:js&per_page=10",
    {
      headers: {
        Accept: "application/vnd.github.v3.text-match+json",
        Authorization: "token ",
      },
    }
  );
  return response.data;
}
