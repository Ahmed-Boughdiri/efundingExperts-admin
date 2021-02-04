
interface ClientProps {
    Adress: String,
    ApproxQuoteAmount: Number,
    City: String,
    CommissionsCollected: Number,
    DateCreated: String,
    DesiredAmountOfFunding: String,
    DoTheyAlreadyHaveABusiness: String,
    Email: String,
    FirstName: String,
    Income: Number,
    LastName: String,
    Notes: String,
    Phone: Number,
    State: String,
    Status: String,
    TotalCommissions: Number,
    WhatsMainPurposeOfFund: String,
    Zip: String,
    nameOfTheBusiness: String,
    _id: String,
}

interface ContractProps {
    contract: String,
    contractType: String,
    previewLink: String,
    title: String,
    _id: String,
}

interface QuoteProps {
    Adress: String,
    City: String,
    DateCreated: String,
    DesiredAmountOfFunding: String,
    DoTheyAlreadyHaveABusiness: String,
    Email: String,
    FirstName: String,
    Income: Number,
    LastName: String,
    Notes: String,
    Phone: Number,
    QuoteID: String,
    State: String,
    Status: String,
    WhatsMainPurposeOfFund: String,
    Zip: String,
    creditReport: String,
    nameOfTheBusiness: String,
    _id: String
}

export interface UserProps {
    AreYouCurrentlyHelpingClientsWithHighScoresObtainFunding: Boolean,
    HaveYouExcellentHighClientsToReferNow: Boolean,
    HowDidYouHearAboutUs: String,
    HowMuchFundingCanYouLaveragePerMonth: Number,
    city: String,
    clients: ClientProps[],
    contracts: ContractProps[],
    email: String,
    firstName: String,
    lastName: String,
    occupation: String,
    phoneNumber: String,
    postal: Number,
    quotes: QuoteProps[],
    state: String,
    streetAdress: String,
    _id: String
}
