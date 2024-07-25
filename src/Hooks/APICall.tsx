import axios from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;
const API_AUTH = import.meta.env.VITE_API_AUTH;
export default axios.create({
    baseURL: BaseURL,
    headers: {
        accept: 'application/json',
        Authorization: API_AUTH
    }
})
