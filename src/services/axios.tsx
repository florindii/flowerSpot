import axios from "axios";

const instance = axios.create({
    baseURL: "https://flowrspot-api.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
});

// Function to set the token to the Axios instance headers
export const setAuthToken = (token: string | null) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

// Export the Axios instance
export default instance;
