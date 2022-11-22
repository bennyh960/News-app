import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";

const router = axios.create({
  baseURL: url,
});

export default router;
