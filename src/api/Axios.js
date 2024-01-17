import axios from "axios";

const customaxios = axios.create({
  baseURL: "http://54.180.42.118:8080",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

export default customaxios;
