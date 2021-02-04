import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function getRequestedUsers():Promise<ReturnProps> {
    try {
        const req = await Axios.get("/users/requests");
        const res = await req.data
        return {
            success: true,
            data: [ ...res ]
        }       
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
            "An Error Has Occured, Please Check Your Internet Connection and Try Again",
        }
    }
}
