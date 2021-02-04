import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function loadRequestData(id:String):Promise<ReturnProps> {
    if(!id) return {
        success: false,
        error: "An Error Has Occured Please Try Again"
    }
    try {
        const req = await Axios.post("/users/user/request", { id });
        const res = await req.data;
        return {
            success: true,
            data: { ...res }
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
            "An Error Has Occured, Please Check Your Internet Connection and Try Again",
        }
    }
}

