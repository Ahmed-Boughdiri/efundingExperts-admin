import axios from "axios";

const instance = axios.create({
    baseURL: "https://efundingexpertapi.herokuapp.com/"
})

export default instance;
