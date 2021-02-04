
export function storeID(id:String) {
    localStorage.setItem("EFUNDING_EXPERTS_USER_ID", id as string);
}

export function getID() {
    return localStorage.getItem("EFUNDING_EXPERTS_USER_ID")
}
