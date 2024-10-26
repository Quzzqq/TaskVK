import instance from "../axios";

export default async function takeToken(token: string) {
  const response = await instance.get("/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response.data;
}
