import axios from "axios";

const customaxios = axios.create({
  baseURL: "https://www.univey.site",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

export default customaxios;
