import React,{ useState, useEffect } from "react";
import Page from "../components/Page";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import { connect } from "react-redux";
import SendContrcat from "../components/SendContract";
import { sendContract } from "../global/SendContract";
import Loader from "../components/Loader";
import { getID } from "../utils/ClientID";
import getClient from "../global/GetClient";
import Error from "../components/Error";
import { ClientProps } from "../@types/client";
import { RouteComponentProps } from "react-router-dom";
import EditClientStats from "../components/EditClientStats";
import handleClientEditStatsFunc from "../global/EditClientStat";
import AddClientNote from "../components/AddQuoteNote";
import addClientNote from "../global/AddClientNote";
import NotesHistory from "../components/NotesHistory";

type ClientComponentProps = RouteComponentProps & StateProps & DispatchProps

const Client:React.FC<ClientComponentProps> = ({ clientData, history, storeClient }) =>{
    const [sendContractForm, setSendContractForm] = useState(false);
    const [title, setTitle] = useState("");
    const [contractType, setContractType] = useState("");
    const [previewLink, setPreviewLink] = useState("");
    const [contract, setContract] = useState<Blob | null>(null)
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [loadingError, setLoadingError] = useState("");
    const [showLoadingError, setShowLoadingError] = useState(false);
    const handleSendContract = async(e:React.FormEvent, title:String, contractType: String, previewLink:String, ownerID: String) =>{
        setShowLoader(true)
        e.preventDefault()

        // Data Validation
        if(!title){
            setError("Title Value Needs To Be Provided")
            setShowLoader(false)
            setShowError(true)
            return null
        } else if(!contractType){
            setLoadingError("Contract Value Needs To Be Provided")
            setShowLoader(false)
            setShowLoadingError(true)
            return null
        } else if(!previewLink){
            setLoadingError("Preview Link Needs To Be Provided")
            setShowLoader(false)
            setShowLoadingError(true)
            return null
        } else if(!contract){
            setLoadingError("Contract Needs To Be Uploaded")
            setShowLoader(false)
            setShowLoadingError(true)
            return null
        }
        
        const data = new FormData();
        data.append("title", title as string)
        data.append("contractType", contractType as string)
        data.append("previewLink", previewLink as string)
        data.append("file", contract)
        data.append("ownerID", clientData.OwnerID as string)

        const res = await sendContract(data);
        if(!res.success) {
            setError(res.error as string)
            setShowError(false)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            setSendContractForm(false)
            return res;
        }
    }
    const handleClientData = async() =>{
        if(Object.keys(clientData).length === 0) {
            setShowLoader(true);
            const res = await getClient(getID() || "");
            if(!res.success) {
                setError(res.error as string)
                setShowLoadingError(true)
                setShowError(true);
                setShowLoader(false);
            } else {
                setShowLoadingError(false)
                storeClient(res.data);
                setShowLoader(false);
            }
        }
    }
    const [showEditClientStatsForm, setShowEditClientStatsForm] = useState(false);
    const [clientStatsApproxFundingAmount, setClientStatsApproxFundingAmount] = useState(clientData.ApproxQuoteAmount);
    const [clientStatsTotalCommision, setClientStatsTotalCommision] = useState(clientData.TotalCommissions);
    const [clientStatsCommisionCollected, setClientStatsCommisionCollected] = useState(clientData.CommissionsCollected);
    const [clientStatsNote, setClientStatsNote] = useState("");
    const handleClientEditStats = async() =>{
        setShowLoader(true)
        const data:any = {};
        if(clientStatsApproxFundingAmount !== 0) data.ApproxQuoteAmount = clientStatsApproxFundingAmount;
        if(clientStatsTotalCommision !== 0) data.TotalCommision = clientStatsTotalCommision;
        if(clientStatsCommisionCollected !== 0) data.CommisionCollected = clientStatsCommisionCollected;
        if(clientStatsNote.length) data.Notes = clientStatsNote;
        const res = await handleClientEditStatsFunc(clientData.OwnerID, clientData._id, data, clientData.Email);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            setError("")
            setShowError(false)
            history.push("/clients")
        }
    }
    const [showAddClientNote, setShowClientNote] = useState(false);
    const [clientNote, setClientNote] = useState("");
    const handleAddClientNote = async() =>{
        setShowLoader(true);
        const res = await addClientNote(clientData.OwnerID, clientData._id, clientData.Email, clientNote);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setShowLoader(false)
            history.push("/clients");
        }
    }
    useEffect(() =>{
        handleClientData();
    },[])
    const [showNotesHistory, setShowNotesHistory] = useState(false)
    return (
        <Page currentPage="Clients">
            {
                (!showLoadingError && Object.keys(clientData).length) && (
                    <Card>
                        <Card.Header>
                            <h3>{clientData.OwnerName}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>FullName:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={`${clientData.FirstName} ${clientData.LastName}`} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Adress:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.Adress as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>City:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.City as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>State:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.State as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Zip:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.Zip as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>DOB:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.DOBdata as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Phone:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.Phone as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Email:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.Email as string} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Income:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.Income as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Notes:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={(clientData?.Notes?.length) ? clientData.Notes[clientData.Notes.length - 1].contentValue as string : ""} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Funding Amount Requested:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.ApproxQuoteAmount as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Total Commissions:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.TotalCommissions as number} disabled />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm={5}>
                                        <h6>Commissions Collected:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control type="text" value={clientData.CommissionsCollected as number} disabled />
                                    </Col>
                                </Form.Group>

                                {
                                    clientData.creditReport && (
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm={5}>
                                                <h6>Uploaded File:</h6>
                                            </Form.Label>
                                            <Col sm={7}>
                                                <a 
                                                    href={`https://efundingexperts.herokuapp.com/report/download/${clientData.creditReport || ""}`} 
                                                    rel="noreferrer" 
                                                    target="_blank"
                                                >
                                                    Credit Report Download Link
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
                                onClick={() =>setSendContractForm(true)}
                            >
                                Send Contract
                            </Button>
                            <Button
                                variant="primary"
                                className="ml-2"
                                onClick={() =>setShowNotesHistory(true)}
                            >
                                See Notes History
                            </Button>
                            <Button 
                                variant="success" 
                                className="ml-2"
                                onClick={() => setShowEditClientStatsForm(true)}
                            >
                                Edit Stats
                            </Button>
                            <Button
                                variant="success"
                                className="ml-2"
                                onClick={() =>setShowClientNote(true)}
                            >
                                Add Note
                            </Button>
                        </Card.Footer>
                    </Card>
                )
            }
            {
                sendContractForm && <SendContrcat 
                                    closeFunc={() =>setSendContractForm(false)}
                                    titleValue={title}
                                    onChangeTitle={(e:React.ChangeEvent<HTMLInputElement>) =>setTitle(e.target.value)}
                                    onChangeContractType={(e:React.ChangeEvent<HTMLInputElement>) =>setContractType(e.target.value)}
                                    previewLinkValue={previewLink}
                                    onChangePreviewLink={(e:React.ChangeEvent<HTMLInputElement>) =>setPreviewLink(e.target.value)}
                                    onClick={(e:React.FormEvent) =>handleSendContract(e, title, contractType, previewLink, clientData.OwnerID)}
                                    contractUpload={(e:React.ChangeEvent<HTMLInputElement>) =>setContract(e.target.files && e.target.files[0])}
                                    error={error}
                                    showError={showError}
                                />
            }
            {
                showEditClientStatsForm && <EditClientStats 
                                                closeFunc={() => setShowEditClientStatsForm(false)}
                                                onClick={handleClientEditStats}
                                                approxFundingAmountValue={clientStatsApproxFundingAmount}
                                                totalCommisionValue={clientStatsTotalCommision}
                                                commisionCollectedValue={clientStatsCommisionCollected}
                                                noteValue={clientStatsNote}
                                                onChangeApproxFundingAmountValue={
                                                    (e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]*$/;
                                                        if(e.target.value === "" || re.test(e.target.value)) {
                                                            setClientStatsApproxFundingAmount(+e.target.value)
                                                        }
                                                    }
                                                }
                                                onChangeTotalCommision={
                                                    (e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]*$/;
                                                        if(e.target.value === "" || re.test(e.target.value)) {
                                                            setClientStatsTotalCommision(+e.target.value)
                                                        }
                                                    }
                                                }
                                                onChangeCommisionCollected={
                                                    (e:React.ChangeEvent<HTMLInputElement>) =>{
                                                        const re = /^[0-9]*$/;
                                                        if(e.target.value === "" || re.test(e.target.value)) {
                                                            setClientStatsCommisionCollected(+e.target.value)
                                                        }
                                                    }
                                                }
                                                onChangeNote={
                                                    (e:React.ChangeEvent<HTMLInputElement>) =>
                                                        setClientStatsNote(e.target.value)
                                                }
                                                error={error}
                                                showError={showError}
                                            />
            }
            {
                showAddClientNote && <AddClientNote 
                                        value={clientNote}
                                        onChange={
                                            (e:React.ChangeEvent<HTMLInputElement>) =>
                                                setClientNote(e.target.value)
                                        }
                                        closeFunc={() =>setShowClientNote(false)}
                                        error={error}
                                        showError={showError}
                                        onClick={handleAddClientNote}
                                    />
            }
            {
                showLoader && <Loader />
            }
            {
                showLoadingError && <Error error={loadingError} />
            }
            {
                showError && <Error error={error} />
            }
            {
                showNotesHistory && <NotesHistory 
                                        closeFunc={() =>setShowNotesHistory(false)}
                                        notes={clientData?.Notes || []}
                                    />
            }
        </Page>
    )
}

interface StateProps {
    clientData: ClientProps
}

function mapStateToProps(state:any) {
    return {
        clientData: state.ClientReducer
    }
}

interface DispatchProps {
    storeClient: (data: ClientProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        storeClient: (data:ClientProps) => dispatch({ type: "STORE_CLIENT", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Client);
