import { ReturnProps } from "../@types/function";

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export default function(
    email: String,
    password: String
):ReturnProps {
    if(!email)
        return {
            success: false,
            error: "Email Needs To Be Provided"
        }
    if(!password)
        return {
            success: false,
            error: "Password Needs To Be Provided"
        }
    if(!email.match(emailPattern)) 
        return {
            success: false,
            error: "Invalid Email Address"
        }
    if(password.length < 8)
        return {
            success: false,
            error: "Password Needs To Be At Least 8 Chars Long"
        }
    return {
        success: true,
        data: "Done"
    }
}
