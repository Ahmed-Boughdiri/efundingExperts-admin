
export function storeID(id: String) {
    localStorage.setItem("EFUNDING_EXPERTS_APPROVED_QUOTE_ID", id as string)
}

export function getID() {
    return localStorage.getItem("EFUNDING_EXPERTS_APPROVED_QUOTE_ID")
}
