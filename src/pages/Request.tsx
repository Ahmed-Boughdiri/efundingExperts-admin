import React,{ useState, useEffect } from "react";
import "../layout/Request.css";
import Page from "../components/Page";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { loadRequestData } from "../global/Request";
import { connect } from "react-redux";
import approve from "../global/Approve";
import ValidateApprove from "../components/ValidateApprove";
import deny from "../global/Deny";
import ValidateDeny from "../components/ValidateDeny";
import Loading from "../components/Loader";
import Error from "../components/Error";
import SendReport from "../components/SendReport";
import sendUserReport from "../global/SendReport";
import { RequestProps } from "../@types/request";
import { RouteComponentProps } from "react-router-dom";

type RequestComponentProps = RouteComponentProps & StateProps;

const Request:React.FC<RequestComponentProps> = ({ 
    request, 
    id, 
    history 
}) =>{
    const [confirm, setConfirm] = useState(false);
    const [confirmDeny, setConfirmDeny] = useState(false);
    const [loading, setLoading] = useState(true);
    const [denyNote, setDenyNote] = useState("");
    const [approveNote, setApproveNote] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [sendReport, setSendReport] = useState(false);
    const [sendNote, setSendNote] = useState("");
    const [emailTo, setEmailTo] = useState("");
    const loadRequest = async() =>{
        try {
            const res = await loadRequestData(id);
            if(!res.success) {
                setError(res?.error as string);
                setShowError(true);
                setLoading(false)
            } else {
                setRequestData(res.data);
                setLoading(false)
            }
        } catch(err) {
            setError("An Error Has Occured Please Try Again Later")
            setShowError(true)
            setLoading(false)
        }
    }
    const approveRequest = async() =>{
        setLoading(true)
        try {
            const res = await approve(id, approveNote);
            if(!res.success) {
                setError(res?.error as string)
                setShowError(true)
                setLoading(false)
            } else {
                setLoading(false)
                history.push("/requests")
                return res;
            }
        } catch(err) {
            setError("An Error Has Occured Please Try Again")
            setShowError(true)
            setLoading(false)
        }
    }
    const denyRequest = async() =>{
        setLoading(true)
        try {
            const res = await deny(id, denyNote);
            if(!res.success) {
                setError(res?.error as string)
                setShowError(true)
                setLoading(false)
            } else {
                setLoading(false)
                history.push("/requests")
                return res;
            }
        } catch(err) {
            setError("An Error Has Occured Please Try Again")
        }
    }
    const handleSendReport = async() =>{
        const report = {
            firstName: requestData?.firstName,
            lastName: requestData?.lastName,
            phoneNumber: requestData?.phoneNumber,
            email: requestData?.email,
            streetAdress: requestData?.streetAdress,
            city: requestData?.city,
            state: requestData?.state,
            occupation: requestData?.occupation,
            HowDidYouHearAboutUs: 
                requestData?.HowDidYouHearAboutUs,
            AreYouCurrentlyHelpingClientsWithHighScoresObtainFunding: 
                requestData?.AreYouCurrentlyHelpingClientsWithHighScoresObtainFunding,
            HowMuchFundingCanYouLaveragePerMonth: 
                requestData?.HowMuchFundingCanYouLaveragePerMonth,
            HaveYouExcellentHighClientsToReferNow: 
                requestData?.HaveYouExcellentHighClientsToReferNow,
            toEmail: emailTo,
            note: sendNote
        }
        const res = await sendUserReport(report)
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
        } else {
            setSendReport(false)
            setEmailTo("");
            setSendNote("");
            return res;
        }
    }
    const [requestData, setRequestData] = useState<RequestProps>()
    const handleBoolean = (value: Boolean):string =>{
        if(value === true) {
            return "Yes"
        } else if(value === false) {
            return "No"
        } else {
            return ""
        }
    }
    useEffect(() =>{
        loadRequest()
    },[])
    return (
        <Page currentPage="RequestedUsers">
            {
                !showError && (
                    <>
                        <Card>
                            <Card.Header>
                                <h4>Preview Request</h4>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Full Name:</h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control value={`${requestData?.firstName} ${requestData?.lastName}`} disabled />
                                    </Col>
                                </Row>
                                
                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Phone Number: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.phoneNumber as number} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Email: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.email as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Street Adress: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.streetAdress as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>City: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.city as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>State: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.state as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>What is your occupation?: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.occupation as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>How did you hear about us?: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.HowDidYouHearAboutUs as string} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Are you currently helping clients with 700+ scores obtain funding?: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={handleBoolean(requestData?.AreYouCurrentlyHelpingClientsWithHighScoresObtainFunding || false)} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>How much funding can you laverage per month?: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={requestData?.HowMuchFundingCanYouLaveragePerMonth as number} />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col sm={5} className="text-left">
                                        <h6>Have you excellent (+700) clients to refer now ?: </h6>
                                    </Col>
                                    <Col sm={7} className="text-left">
                                        <Form.Control disabled value={handleBoolean(requestData?.HaveYouExcellentHighClientsToReferNow || false)} />
                                    </Col>
                                </Row>

                            </Card.Body>
                            <Card.Footer>
                                <Button className="px-4" onClick={(() =>setConfirm(true))}>Approve</Button>
                                <Button className="px-4 mx-3" variant="danger" onClick={() =>setConfirmDeny(true)}>Deny</Button>
                                <Button className="px-4" variant="success" onClick={() =>setSendReport(true)}>Send</Button>
                            </Card.Footer>
                        </Card>
                        <ValidateApprove 
                            onClick={approveRequest} 
                            open={confirm} 
                            closeFunc={() =>setConfirm(false)} 
                            note={approveNote} 
                            setNote={(e:React.ChangeEvent<HTMLInputElement>) =>setApproveNote(e.target.value)} 
                        />
                        <ValidateDeny 
                            onClick={denyRequest} 
                            open={confirmDeny} 
                            closeFunc={() =>setConfirmDeny(false)} 
                            note={denyNote} 
                            setNote={(e:React.ChangeEvent<HTMLInputElement>) =>setDenyNote(e.target.value)} 
                        />
                        <SendReport 
                            emailTo={emailTo} 
                            setEmailTo={(e:React.ChangeEvent<HTMLInputElement>) =>setEmailTo(e.target.value)} 
                            closeFunc={() =>setSendReport(false)} 
                            note={sendNote} 
                            setNote={(e:React.ChangeEvent<HTMLInputElement>) =>setSendNote(e.target.value)} 
                            onClick={handleSendReport} 
                            open={sendReport} 
                        />
                    </>
                )
            }
            {
                loading && <Loading />
            }
            {
                showError && <Error error={error} />
            }
        </Page>
    )
}

interface StateProps {
    request: RequestProps,
    id: String,
}

function mapStateToProps(state: any) {
    return {
        request: state.requestReducer,
        id: state.idReducer
    }
}

export default connect<StateProps, {}, {}>(mapStateToProps)(Request);
