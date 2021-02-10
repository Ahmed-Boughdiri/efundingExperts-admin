import { NotesProps } from "./notes";

export interface ClientProps {
    Adress: String,
    ApproxQuoteAmount: Number,
    City: String,
    CommissionsCollected: Number,
    DOBdata: String,
    DateCreated: String,
    DesiredAmountOfFunding: String,
    DoTheyAlreadyHaveABusiness: String,
    Email: String,
    FirstName: String,
    Income: Number,
    LastName: String,
    Notes: NotesProps[],
    OwnerID: String,
    OwnerName: String,
    Phone: Number,
    State: String,
    Status: String,
    TotalCommissions: Number,
    WhatsMainPurposeOfFund: String,
    Zip: Number,
    nameOfTheBusiness: String,
    __v: Number,
    _id: String,
    creditReport?: String;
}

