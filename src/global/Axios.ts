import axios from "axios";

const instance = axios.create({
    baseURL: "https://efundingexperts-api.herokuapp.com/"
})

export default instance;
