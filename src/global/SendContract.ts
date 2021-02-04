import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function sendContract(data: any):Promise<ReturnProps> {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    try {
        const req = await Axios.post("/contract/send",data, config);
        const res = await req.data;
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
