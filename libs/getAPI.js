import axios from "../pages/api/data"

export default async function getAPI(url) {
    const response = await axios.get(url);
    return response.data;
}