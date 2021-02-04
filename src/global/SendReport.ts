import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(report:any):Promise<ReturnProps> {
    try {
        const req = await Axios.post("/report/send",{ ...report })
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.respone?.data.error || 
                "An Error Has Occured Please Check Your Internet Connection And Try Again"
        }
    }
}
