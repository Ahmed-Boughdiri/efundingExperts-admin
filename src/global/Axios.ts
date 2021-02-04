import axios from "axios";

const instance = axios.create({
    baseURL: "https://efundingexperts.herokuapp.com/"
})

export default instance;
