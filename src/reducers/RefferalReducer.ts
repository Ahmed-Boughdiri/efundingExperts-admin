
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action:any) {
    switch(action.type) {
        case "STORE_REFFERAL":
            return state = action.payload;
        default:
            return state;
    }
}
