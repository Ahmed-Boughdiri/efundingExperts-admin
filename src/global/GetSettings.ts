import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export default async function():Promise<ReturnProps> {
    try {
        const req = await Axios.get("/settings/get");
        const res = await req.data;
        console.log("Data: ", res)
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
                "An Error Has Occured Please Check Your Internet Connection And Try Again"
        }
    }
}

