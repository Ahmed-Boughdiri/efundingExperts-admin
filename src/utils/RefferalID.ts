
export function storeRefferalID(id:String) {
    localStorage.setItem("EFUNDING_EXPERTS_REFFERAL_ID", id as string);
}

export function getRefferalID() {
    return localStorage.getItem("EFUNDING_EXPERTS_REFFERAL_ID");
}
