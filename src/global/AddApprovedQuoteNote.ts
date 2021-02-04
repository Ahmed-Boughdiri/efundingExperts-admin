import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(quoteID: String, ownerID: String, note: String):Promise<ReturnProps> {
    if(!quoteID) return {
        success: false,
        error: "QuoteID Needs To Be Provided"
    }
    if(!ownerID) return {
        success: false,
        error: "OwnerID Needs To Be Provided"
    }
    if(!note) return {
        success: false,
        error: "Note Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/quote/approved/note/add", { ownerID, quoteID, note })
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response.data.error ||
                "An Error Has Occured Please Check Your Internet Coonection And Try Again Later"
        }
    }
}
