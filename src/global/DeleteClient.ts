import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export default async function(id: String, ownerID: String):Promise<ReturnProps> {
    if(!id) return {
        success: false,
        error: "ID Needs To Be Provided"
    }
    if(!ownerID) return {
        success: false,
        error: "Owner ID Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/client/delete", { id, ownerID })
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
