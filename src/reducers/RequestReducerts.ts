
import { loadRequestData } from "../global/Request";

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action:any) {
    switch(action.type) {
        case "LOAD_REQUEST":
            return async() => state = await loadRequestData(action.payload)
        default:
            return state;
    }
}
