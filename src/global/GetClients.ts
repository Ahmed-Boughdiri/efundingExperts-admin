import Axios from "./Axios";
import { ReturnProps } from "../@types/function";

export async function getClients():Promise<ReturnProps> {
    try {
        const req = await Axios.get("/clients/get");
        const res = await req.data;
        return  {
            success: true,
            data: res
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data.error ||
                "An Error Has Occured Please Check Your internet Connection And Try Again"
        }
    }
}
