import Client from "@/config/Client";
import { v4 as uuidv4 } from "uuid";

export const formattedContent = (content) => {
  return content?.replaceAll("&nbsp;", " ");
};
export const generateRandomId = () => {
  return uuidv4();
};
export const fetcher = async (url) => {
  const res = await Client.get(url);
  return res;
};