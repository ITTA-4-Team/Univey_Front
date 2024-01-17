import axios from "axios";

const customaxios = axios.create({
  baseURL: "https://7178-220-118-206-222.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

export default customaxios;
