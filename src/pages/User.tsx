import React,{ useEffect, useState } from "react";
import Page from "../components/Page";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import getUserData from "../global/GetUserData";
import { getID } from "../utils/UserID";
import Error from "../components/Error";
import Loader from "../components/Loader";
import deleteUser from "../global/DeleteUser";
import DeleteConfirm from "../components/DeleteConfirm";
import SendReport from "../components/SendReport";
import sendUserReport from "../global/SendReport";
import { UserProps } from "../@types/user";
import { RouteComponentProps } from "react-router-dom";

type UserComponentProps = StateProps & DispatchProps & RouteComponentProps;

const User:React.FC<UserComponentProps> = ({ userData, storeUser, history }) =>{
    const [loadingError, setLoadingError] = useState("");
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const handleUserData = async() =>{
        if(Object.keys(userData).length === 0) {
            setShowLoader(true)
            const res = await getUserData(getID() || "");
            if(!res.success) {
                setLoadingError(res.error as string)
                setShowLoadingError(true)
                setShowLoader(false)
            } else {
                storeUser(res.data);
                setShowLoadingError(false)
                setShowLoader(false);
            }
        }
    }
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error,setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [sendReport, setSendReport] = useState(false);
    const [sendReportNote, setSendReportNote] = useState("");
    const [sendReportEmail, setSendReportEmail] = useState("");
    const handleDeleteUser = async(id:String) =>{
        setShowLoader(true)
        const res = await deleteUser(id);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false);
        } else {
            setShowLoader(false)
            history.push("/users")
            return res;
        }
    }
    const handleSendReport = async() =>{
        setShowLoader(true)
        const report = {
            ...userData,
            toEmail: setSendReportEmail,
            note: sendReportNote
        }
        const res = await sendUserReport(report)
        if(!res.success) {
            setError(res.error as string)
            setShowError(true);
            setShowLoader(false)
        } else {
            history.push("/users")
            setShowLoader(false)
            return res;
        }
    }
    useEffect(() =>{
        handleUserData()
    },[])
    return (
        <Page currentPage="Users">
            {
                showLoadingError && <Error error={loadingError} />
            }
            {
                !showLoadingError && (
                    <>
                        <Card>
                            <Card.Header>
                                <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>FullName:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={`${userData.firstName} ${userData.lastName}`} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Phone Number:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.phoneNumber as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Email:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.email as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Street Adress:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.streetAdress as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>City:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.city as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>State:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.state as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Postal:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.postal as number} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>What's Your Occupation:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.occupation as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>How Did You Hear About Us?:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.HowDidYouHearAboutUs as string} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Are you currently helping clients with 700+ scores obtain funding?:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.AreYouCurrentlyHelpingClientsWithHighScoresObtainFunding ? "Yes" : "No"} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>How much funding can you laverage per month?:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.HowMuchFundingCanYouLaveragePerMonth as number} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm={5}>
                                            <h6>Have you excellent (+700) clients to refer now ?:</h6>
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" value={userData.HaveYouExcellentHighClientsToReferNow ? "Yes" : "No"} disabled />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="danger" onClick={() =>setConfirmDelete(true)}>Delete User</Button>
                                <Button variant="success" className="ml-2" onClick={() =>setSendReport(true)}>Send</Button>
                            </Card.Footer>
                        </Card>
                        {
                            confirmDelete && <DeleteConfirm 
                                                closeFunc={() =>setConfirmDelete(false)} 
                                                fullName={`${userData.firstName} ${userData.lastName}`} 
                                                onClick={() =>handleDeleteUser(userData._id)} 
                                                error={error}
                                                showError={showError}
                                            />
                        }
                        {
                            sendReport && <SendReport 
                                                open={sendReport} 
                                                closeFunc={() =>setSendReport(false)} 
                                                note={sendReportNote} 
                                                setNote={(e:React.ChangeEvent<HTMLInputElement>) =>setSendReportNote(e.target.value)} 
                                                emailTo={sendReportEmail}
                                                setEmailTo={(e:React.ChangeEvent<HTMLInputElement>) =>setSendReportEmail(e.target.value)}
                                                error={error}
                                                showError={showError}
                                                onClick={() =>handleSendReport}
                                            />
                        }
                    </>
                )
            }
            {
                showLoader && <Loader />
            }
        </Page>
    )
}

interface StateProps {
    userData: UserProps;
}

function mapStateToProps(state:any) {
    return {
        userData: state.UserReducer
    }
}

interface DispatchProps {
    storeUser: (data: UserProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        storeUser: (data:UserProps) =>dispatch({ type: "STORE_USER", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(User);
