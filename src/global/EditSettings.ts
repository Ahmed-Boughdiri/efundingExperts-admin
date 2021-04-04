import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export default async function(
    notificationEmail: String,
    notificationEmailPassword: String,
    loginEmail: String,
    loginPassword: String
):Promise<ReturnProps> {
    try {
        const req = await Axios.post("/settings/edit", {
            notificationEmail,
            notificationEmailPassword,
            loginEmail,
            loginPassword
        })
        const res = await req.data;
        return {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
                "An Error Has Occred Please Check Your Internet Connection And Try Again"
        }
    }
}

