import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function convertToClient(ownerID: String, id: String,ApproxQuoteAmount: Number,TotalCommissions: Number,CommissionsCollected: Number, note:String):Promise<ReturnProps> {
    if(!ownerID) return {
        success: false,
        error: "An Error Has Occured Please Try Again"
    }
    else if(!id) return {
        success: false,
        error: "An Error Has Occured Please Try Again"
    }
    else if(!note) return {
        success: false,
        error: "Note Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/convert/approved/client",{ ownerID, id, ApproxQuoteAmount, TotalCommissions, CommissionsCollected, note })
        const res = await req.data
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
