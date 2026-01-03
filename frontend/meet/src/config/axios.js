import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "/api",
    withCredentials: true, // this will automatically send the cookies to the server from the browser on every request
})

export default axiosInstance