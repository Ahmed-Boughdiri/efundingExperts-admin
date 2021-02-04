import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(ownerID: String, clientID: String, data:any, clientEmail: String):Promise<ReturnProps> {
    if(!ownerID) return {
        success: false,
        error: "OwnerID Needs To Be Provided"
    }
    if(!clientID) return {
        success: false,
        error: "ClientID Needs To Be Provided"
    }
    if(!clientEmail) return {
        success: false,
        error: "ClientEmail Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/client/edit/stats",{ ownerID, clientID, clientEmail, data });
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response.data.error ||
                "An Error Has Occured Please Check Your Internet Connection And Try Again"
        }
    }
}
