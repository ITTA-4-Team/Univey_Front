import axios from "axios";

const customaxios = axios.create({
  baseURL: "https://09c8-210-123-84-142.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

export default customaxios;
