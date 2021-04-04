import Axios from "./Axios";
import { 
    faUsers, 
    faFileWord, 
    faCheckSquare, 
    faUser, 
    faUserPlus,
    faCog
} from '@fortawesome/free-solid-svg-icons';

async function requestedUsersNotifications() {
    try{
        const req = await Axios.get("/notifications/requests")
        if(req.status === 400 || req.status === 500) return undefined;
        const res = await req.data;
        if(res.notifications === 0) return undefined; 
        return res.notifications;
    } catch(err) {
        return undefined;
    }
}

async function refferalsNotifications() {
    try {
        const req = await Axios.get("/notifications/refferals");
        if(req.status === 400 || req.status === 500) return undefined;
        const res = await req.data;
        if(res.notifications === 0) return undefined
        return res.notifications;
    } catch(err) {
        return undefined;
    }
}

export const tabs = async() =>{
    const requestedUsersNotif = await requestedUsersNotifications();
    const refferalsNotif = await refferalsNotifications();
    return [
        {
            name: "Users",
            link: "/users",
            icon: faUserPlus,
            placeholder: "Users",
        },
        {
            name: "RequestedUsers",
            link: "/requests",
            icon: faUsers,
            placeholder: "New Requests",
            notifications: requestedUsersNotif,
        },
        {
            name: "Refferals",
            link: "/refferals",
            icon: faFileWord,
            placeholder: "New Refferals",
            notifications: refferalsNotif
        },
        {
            name: "ApprovedQuotes",
            link: "/quotes/approved",
            icon: faCheckSquare,
            placeholder: "Approved Quotes",
        },
        {
            name: "Clients",
            link: "/clients",
            icon: faUser,
            placeholder: "Clients",
        },
        {
            name: "Settings",
            link: "/settings",
            icon: faCog,
            placeholder: "Settings"
        }
    ]
} 
