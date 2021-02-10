import React,{ useEffect, useState } from "react";
import Page from "../components/Page";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { denyQuote } from "../global/DenyQuote";
import { convertToClient } from "../global/ConvertToClient";
import AddQuoteNote from "../components/AddQuoteNote";
import { addNewNote } from "../global/NewNote";
import ApproveRefferal from "../components/ApproveRefferal";
import { handleApproveRefferal } from "../global/ApproveRefferal";
import DenyRefferal from "../components/DenyRefferal";
import ConvertToClientForm from "../components/ConvertToClientForm";
import Loader from "../components/Loader";
import SendReport from "../components/SendReport";
import handleReportSending from "../global/SendQuoteReport";
import { getRefferalID } from "../utils/RefferalID";
import { getRefferal } from "../global/Refferal";
import Error from "../components/Error";
import { RefferalProps } from "../@types/refferal";
import { RouteComponentProps } from "react-router-dom";
import NotesHistory from "../components/NotesHistory";

type RefferalComponentProps = StateProps & DispatchProps & RouteComponentProps;

const Refferal:React.FC<RefferalComponentProps> = ({ refferalData, history, storeRefferal }) => {
    const [loadingError, setLoadingError] = useState("");
    const [showLoadingError, setShowLoadingError] = useState(false);
    const handleRefferalData = async() =>{
        if(Object.keys(refferalData).length === 0 ) {
            setShowLoader(true);
            const id = getRefferalID()
            const res = await getRefferal(id || "");
            if(!res.success) {
                setLoadingError(res.error as string)
                setShowLoadingError(true)
                setShowLoader(false)
            } else {
                storeRefferal({ ...res.data });
                setLoadingError("");
                setShowLoadingError(false)
                setShowLoader(false)
            }
        }
    }
    useEffect(() =>{
        handleRefferalData()
    },[])
    // TODO: Working on Addding The New Note
    const [validateDeny, setValidateDeny] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [approveRefferal, setApproveRefferal] = useState(false);
    const [approveNotes, setApproveNotes] = useState("");
    const [denyNotes, setDenyNotes] = useState("");
    const [approxQuoteAmount, setApproxQuoteAmount] = useState(0);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [commissionsCollected, setCommissionsCollected] = useState(0);
    const [convertToClientForm, setConvertToClientForm] = useState(false);
    const [convertToClientNotes, setConvertToClientNotes] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showSendReport, setShowSendReport] = useState(false);
    const [sendReportNote, setSendreportNote] = useState("");
    const [sendReportTo, setSendReportTo] = useState("");
    const handleDeny = async(ownerID: String, id:String, note:String) =>{
        setShowLoader(true)
        const res = await denyQuote(ownerID, id, note);
        if(!res.success) {
            setError(res?.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            history.push("/refferals")
            return res
        }
    }
    const handleConvert = async(ownerID:String, id:String, ApproxQuoteAmount: Number, TotalCommissions:Number, CommissionsCollected: Number, note:String) =>{
        setShowLoader(true)
        const res = await convertToClient(ownerID, id, ApproxQuoteAmount, TotalCommissions, CommissionsCollected, note)
        if(!res.success) {
            setError(res?.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            history.push("/refferals")
            return res
        }
    }
    const handleNewNote = async(ownerID:String, id:String, note:String) =>{
        setShowLoader(true)
        const res = await addNewNote(ownerID, id, note)
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            history.push("/refferals")
            return res
        }
    }
    const handleApprove = async(ownerID:String,id:String,note:String) =>{
        setShowLoader(true)
        const res = await handleApproveRefferal(ownerID,id,note)
        if(!res.success) {
            setError(res?.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            history.push("/refferals")
            return res;
        }
    }
    const handleSendReport = async() =>{
        setShowLoader(true)
        const report = {
            ...refferalData,
            emailTo: sendReportTo,
            note: sendReportNote
        }
        const res = await handleReportSending(report);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowSendReport(false)
            setShowLoader(false)
            return res;
        }
    }
    const handleCloseSendQuote = () =>{
        setSendReportTo("")
        setSendreportNote("")
        setShowSendReport(false)
    }
    const [showNotesHistory, setShowNotesHistory] = useState(false)
    return (
        <Page currentPage="Refferals">
            {
                showLoadingError ? <Error error={loadingError} /> : (
                    <>
                    <Card>
                        <Card.Header>
                            <h4>{refferalData.OwnerName}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Desired amount of funding?</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.DesiredAmountOfFunding as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>What's main purpose of fund?</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.WhatsMainPurposeOfFund as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Do they already have a business?</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.DoTheyAlreadyHaveABusiness as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>First Name</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.FirstName as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Last Name</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.LastName as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Adress</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Adress as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>City</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.City as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>State</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.State as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Status</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Status as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Zip</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Zip as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>DOB (mm-dd-yyyy)</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.DOBdata as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Phone</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Phone as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Email</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Email as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Income</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={refferalData.Income as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm={5}>
                                        <h6>Notes</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={(refferalData?.Notes?.length) ? refferalData?.Notes[refferalData.Notes.length - 1].contentValue as string : ""} disabled />
                                    </Col>
                                </Form.Group>

                                {
                                    (refferalData.creditReport) && (
                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm={5}>
                                                <h6>Upload file:(upload multiple files on next page)</h6>
                                            </Form.Label>
                                            <Col sm={7}>
                                                <a 
                                                    href={`
                                                        https://efundingexperts.herokuapp.com/report/download/${refferalData.creditReport}
                                                    `} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                >
                                                    Download Credit Report
                                                </a>
                                            </Col>
                                        </Form.Group>
                                    )
                                }

                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button 
                                variant="primary" 
                                onClick={() =>setApproveRefferal(true)}
                            >
                                Approve Refferal
                            </Button>
                            <Button
                                variant="primary"
                                className="ml-2"
                                onClick={() =>setShowNotesHistory(true)}
                            >
                                See Notes History
                            </Button>
                            <Button 
                                variant="danger" 
                                className="ml-2" 
                                onClick={() =>setValidateDeny(true)}
                            >
                                Deny Refferal
                            </Button>
                            <Button 
                                variant="success" 
                                className="ml-2" 
                                onClick={() =>setShowSendReport(true)}
                            >
                                Send
                            </Button>
                            <Button 
                                variant="success" 
                                className="ml-2" 
                                onClick={() =>setAddNote(true)}
                            >
                                Add Note
                            </Button>
                            <Button 
                                variant="success" 
                                className="ml-2" 
                                onClick={() =>setConvertToClientForm(true)}
                            >
                                Covert To Client
                            </Button>
                        </Card.Footer>
                    </Card>
                    {
                        showSendReport && <SendReport 
                                                open={showSendReport} 
                                                closeFunc={handleCloseSendQuote} 
                                                note={sendReportNote} 
                                                emailTo={sendReportTo} 
                                                setEmailTo={(e:React.ChangeEvent<HTMLInputElement>) =>setSendReportTo(e.target.value)} 
                                                setNote={(e:React.ChangeEvent<HTMLInputElement>) =>setSendreportNote(e.target.value)} 
                                                onClick={handleSendReport} 
                                                error={error} 
                                                showError={showError} 
                                            />
                    }
                    {
                        validateDeny && <DenyRefferal 
                                            close={() =>setValidateDeny(false)} 
                                            value={denyNotes} 
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setDenyNotes(e.target.value)} 
                                            onClick={() =>handleDeny(refferalData.OwnerID, refferalData._id, denyNotes)} 
                                            error={error} 
                                            showError={showError} 
                                        />
                    }
                    {
                        addNote && <AddQuoteNote 
                                        closeFunc={() =>setAddNote(false)} 
                                        value={newNote} 
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setNewNote(e.target.value)} 
                                        onClick={() =>handleNewNote(refferalData.OwnerID, refferalData._id, newNote)} 
                                        error={error} 
                                        showError={showError} 
                                    />
                    }
                    {
                        approveRefferal && <ApproveRefferal 
                                                closeFunc={() =>setApproveRefferal(false)} 
                                                value={approveNotes} 
                                                onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setApproveNotes(e.target.value)} 
                                                onClick={() =>handleApprove(refferalData.OwnerID, refferalData._id,approveNotes)} 
                                                error={error} 
                                                showError={showError} 
                                            />
                    }
                    {
                        convertToClientForm && <ConvertToClientForm 
                                                    closeFunc={() =>setConvertToClientForm(false)} 
                                                    approximateQuoteAmountValue={approxQuoteAmount} 
                                                    onChangeApproxQuote={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]+$/;
                                                        if(e.target.value === "" || re.test(e.target.value)){
                                                            setApproxQuoteAmount(+e.target.value)
                                                        }
                                                    }} 
                                                    totalCommissionValue={totalCommissions} 
                                                    onChangeTotalCommission={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]+$/;
                                                        if(e.target.value === "" || re.test(e.target.value)) {
                                                            setTotalCommissions(+e.target.value)
                                                        }
                                                    }} 
                                                    onChangeCommissionCollected={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]+$/;
                                                        if(e.target.value === "" || re.test(e.target.value)) {
                                                            setCommissionsCollected(+e.target.value)
                                                        }
                                                    }} 
                                                    commissionCollectedValue={commissionsCollected} 
                                                    onClick={() =>handleConvert(refferalData.OwnerID, refferalData._id, approxQuoteAmount, totalCommissions, commissionsCollected, convertToClientNotes)} 
                                                    noteValue={convertToClientNotes} 
                                                    onChangeNote={(e:React.ChangeEvent<HTMLInputElement>) =>setConvertToClientNotes(e.target.value)} 
                                                    error={error} 
                                                    showError={showError} 
                                                />
                    }
                    {
                        showLoader && <Loader />
                    }
                    </>
                )
            }
            {
                showNotesHistory && <NotesHistory 
                                        closeFunc={() =>setShowNotesHistory(false)}
                                        notes={refferalData?.Notes || []}
                                    />
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

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Refferal);
