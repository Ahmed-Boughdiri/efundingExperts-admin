import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function addNewNote(ownerID:String, id:String, note:String):Promise<ReturnProps> {
    if(!ownerID) return {
        success: false,
        error: "An Error Has Occred Please Try Again"
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
        const req = await Axios.post("/quotes/note",{ ownerID, id, note });
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error || 
                "An Error Has Been Occured Please Check Your Internet Connection And Try Again"
        }
    }
}
