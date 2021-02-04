import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(id:String):Promise<ReturnProps> {
    if(!id) return {
        success: false,
        error: "An Error Has Occured Please Try Again Later"
    }
    try {
        const req = await Axios.post("/user/get", { id })
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
