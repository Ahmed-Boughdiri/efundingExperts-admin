
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action:any) {
    switch(action.type) {
        case "STORE_APPROVED_QUOTE":
            return state = action.payload
        default:
            return state
    }
}
