import React,{ useState, useEffect } from "react";
import Page from "../components/Page";
import { Card, Table, Button } from "react-bootstrap";
import { getApprovedQuotes } from "../global/GetApprovedQuotes";
import { connect } from "react-redux";
import { storeID } from "../utils/ApprovedQuoteID";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";
import { ApprovedQuoteProps } from "../@types/approved-quote";
import { RouteComponentProps } from "react-router-dom";

type ApprovedQuotesProps = RouteComponentProps & StateProps & DispatchProps

const ApprovedQuotes:React.FC<ApprovedQuotesProps> = ({ loadApprovedQuote, history }) =>{
    const [approvedQuotes, setApprovedQuotes] = useState<ApprovedQuoteProps[]>([]);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const loadApprovedQuotes = async() =>{
        setShowLoader(true)
        const res = await getApprovedQuotes();
        if(!res.success) {
            setError(res.error as string)
            setShowError(true);
            setShowLoader(false)
        } else {
            setApprovedQuotes(res.data)
            setShowLoader(false);
        }
    }
    useEffect(() =>{
        loadApprovedQuotes()
    },[])
    return (
        <Page currentPage="ApprovedQuotes">
            {
                showError && <Error error={error} />
            }
            <Card>
                <Card.Header>
                    <h4>Approved Quotes</h4>
                </Card.Header>
                <Card.Body>
                    {
                        !approvedQuotes.length && <Empty message="No Approved Quotes Recorded Yet" />
                    }
                    {
                        (approvedQuotes.length !== 0) && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Quote Sender</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>More Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        approvedQuotes.map(approved =>(
                                            <tr>
                                                <td>{"1"}</td>
                                                <td>{approved.OwnerName}</td>
                                                <td>{`${approved.FirstName} ${approved.LastName}`}</td>
                                                <td>{approved.Email}</td>
                                                <td>{approved.Phone}</td>
                                                <td>
                                                    <Button className="more-info-btn" onClick={() =>{
                                                        storeID(approved._id)
                                                        loadApprovedQuote(approved);
                                                        history.push("/quotes/approved/preview")
                                                    }}>
                                                        More Info
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Card.Body>
            </Card>
            {
                showLoader && <Loader />
            }
        </Page>
    )
}

interface StateProps {
    approvedQuoteReducer?: ApprovedQuoteProps
}

function mapStateToProps(state:any) {
    return {
        approvedQuoteReducer: state.ApprovedQuoteReducer
    }
}

interface DispatchProps {
    loadApprovedQuote: (data: ApprovedQuoteProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        loadApprovedQuote: (data:ApprovedQuoteProps) => dispatch({ type: "STORE_APPROVED_QUOTE", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ApprovedQuotes);

