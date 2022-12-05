import axios from "axios";
// intace of axios
export const http = axios.create({
  baseURL: "https://dummyjson.com",
});
