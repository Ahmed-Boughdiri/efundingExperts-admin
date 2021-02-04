import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function handleApproveRefferal(ownerID: String,id: String, note:String):Promise<ReturnProps> {
    if(!ownerID) return {
        success: false,
        error: "An Error Has Occured Please Try Again Later"
    }
    else if(!id) return {
        success: false,
        error: "An Error Has Occured Please Try Again Later"
    }
    else if(!note) return {
        success: false,
        error: "Notes Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/quotes/approve",{ ownerID, id, note })
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error || "An Error Has Occured Please Check Your Internet Connection And Try Again Later"
        }
    }
}
