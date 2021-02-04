import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(report: any):Promise<ReturnProps> {
    if(!report.note) return {
        success: false,
        error: "Note Needs To Be Provided"
    }
    else if(!report.emailTo) return {
        success: false,
        error: "Email Adress Needs To Be Provided"
    }
    try {
        const req = await Axios.post("/quote/send",{ ...report });
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    }catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
                "An Error Has Occured Please Check Your Internet Connection And Try Again"
        }
    }
}
