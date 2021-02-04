import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(id: String, note:String):Promise<ReturnProps> {
    if(!id) return {
        success: false,
        error: "An Error Has Occured Please Try Again"
    }
    else if(!note) return {
        success: false,
        error: "Note Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/requests/approve", { id, note })
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
