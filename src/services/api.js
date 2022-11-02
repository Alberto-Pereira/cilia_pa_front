import axios from "axios";

const api = axios.create({
  baseURL: "https://albertofelisberto-web.maxstudio.com.br/api",
});

export default api;
