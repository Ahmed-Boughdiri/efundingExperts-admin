import axios from "axios";

const instance = axios.create({
    baseURL: "http://efundingexperts.herokuapp.com/"
})

export default instance;
