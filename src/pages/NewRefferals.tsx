import React,{ useState, useEffect } from "react";
import Page from "../components/Page";
import { Card, Table, Button } from "react-bootstrap";
import "../layout/NewRefferals.css";
import { getRefferals } from "../global/Refferals";
import { connect } from "react-redux";
import { getRefferal } from "../global/Refferal";
import { storeRefferalID } from "../utils/RefferalID";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";
import { RefferalProps } from "../@types/refferal";
import { RouteComponentProps } from "react-router-dom";

type NewRefferalsProps = StateProps & DispatchProps & RouteComponentProps;

const NewRefferals:React.FC<NewRefferalsProps> = ({ history, storeRefferal }) =>{
    const [referralsData, setRefferalsData] = useState<RefferalProps[]>([]);
    const [loadingError, setLoadingError] = useState("");
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const getRefferalsData = async() =>{
        setShowLoader(true);
        const res = await getRefferals();
        if(!res.success) {
            setLoadingError(res.error as string)
            setShowLoadingError(true)
            setShowLoader(false)
        } else {
            setRefferalsData(res.data);
            setShowLoader(false)
            return res;
        }
    }
    useEffect(() =>{
        getRefferalsData()
    },[])
    const handleMoreInfo = async(id: String) =>{
        setShowLoader(true)
        const res = await getRefferal(id);
        if(res.success) {
            storeRefferal(res.data)
            storeRefferalID(id);
            setLoadingError("");
            setShowLoadingError(false);
            setShowLoader(false)
            history.push("/refferal")
        } else {
            setLoadingError(res.error as string);
            setShowLoadingError(true);
            setShowLoader(false)
        }
    }
    return (
        <Page currentPage="Refferals">
            {
                showLoadingError ? <Error error={loadingError} /> : (
                    <>
                    <Card>
                        <Card.Header>
                            <h4>New Refferals</h4>
                        </Card.Header>
                        <Card.Body>
                            {
                                !referralsData.length && <Empty message="No New Refferals Recorded Yet" />
                            }
                            {
                                (referralsData.length !== 0) && (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Quote Sender</th>
                                                <th>Full Name</th>
                                                <th>Needed Funding</th>
                                                <th>Business Name</th>
                                                <th>More Info</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                referralsData.map((refferal, index) => (
                                                    <tr>
                                                        <td>{ index+1 }</td>
                                                        <td>{refferal.OwnerName}</td>
                                                        <td>{`${refferal.FirstName} ${refferal.LastName}`}</td>
                                                        <td>{refferal.DesiredAmountOfFunding}</td>
                                                        <td>{refferal.nameOfTheBusiness}</td>
                                                        <td>
                                                            <Button className="more-info-btn" onClick={() =>handleMoreInfo(refferal._id)}>
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
                    </>
                )
            }
        </Page>
    )
}

interface StateProps {
    refferalData: RefferalProps
}

function mapStateToProps(state:any) {
    return {
        refferalData: state.RefferalReducer
    }
}

interface DispatchProps {
    storeRefferal: (data:RefferalProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        storeRefferal: (data:RefferalProps) => dispatch({ type: "STORE_REFFERAL", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(NewRefferals);
