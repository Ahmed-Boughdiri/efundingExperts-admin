import React,{ useState, useEffect } from "react";
import Page from "../components/Page";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import SendContract from "../components/SendContract";
import { sendContract as sendUserContract } from "../global/SendContract";
import ConvertToClient from "../components/ConvertToClientForm";
import { convertToClient } from "../global/ConvertApprovedToClient";
import Loader from "../components/Loader";
import getApprovedQuote from "../global/GetApprovedQuote";
import { getID } from "../utils/ApprovedQuoteID";
import Error from "../components/Error";
import { RouteComponentProps } from "react-router-dom";
import { ApprovedQuoteProps } from "../@types/approved-quote";
import AddQuoteNote from "../components/AddQuoteNote";
import addApprovedQuoteNote from "../global/AddApprovedQuoteNote";
import NotesHistory from "../components/NotesHistory";

interface ApproveQuoteProps extends RouteComponentProps {
    approvedQuoteData: ApprovedQuoteProps,
    loadApprovedQuote: any

}

const ApprovedQuote:React.FC<ApproveQuoteProps> = ({ approvedQuoteData, history, loadApprovedQuote }) =>{
    const [loadingError, setLoadingError] = useState("");
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const handleApprovedQuoteData = async() =>{
        if(Object.keys(approvedQuoteData).length === 0) {
            const res = await getApprovedQuote(getID() || "")
            if(!res.success) {
                setLoadingError(res.error as string)
                setShowLoadingError(true)
                setShowLoader(false)
            } else {
                loadApprovedQuote(res.data)
                setShowLoader(false)
            }
        }
    }
    useEffect(() =>{
        handleApprovedQuoteData()
    }, [])
    const [sendContract, setSendContract] = useState(false);
    const [title, setTitle] = useState("");
    const [contractType, setContractType] = useState("");
    const [previewLink, setPreviewLink] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [contract, setContract] = useState<Blob|null>(null);
    const handleSendContract = async(e:React.FormEvent,titleValue:String, contractTypeValue:String, previewLinkValue:String, ownerID:String) =>{
        setShowLoader(true)
        e.preventDefault()
        // Data Validation
        if(!titleValue) {
            setShowLoader(false)
            setError("Contract Title Needs To Be Provided")
            setShowError(true)
            return null
        } else if(!contractTypeValue) {
            setShowLoader(false)
            setError("Contract Type Needs To Be Provided")
            setShowError(true)
            return null
        } else if(!previewLinkValue) {
            setShowLoader(false)
            setError("Preview Link Needs To Be Provided")
            setShowError(true)
            return null
        } else if(!ownerID) {
            setShowLoader(false)
            setError("An Error Has Occured Please Try Again")
            setShowError(true)
            return null
        }


        const data = new FormData()
        if(titleValue) data.append("title", titleValue as string)
        if(titleValue) data.append("contractType", contractTypeValue as string)
        if(titleValue) data.append("previewLink", previewLinkValue as string)
        if(titleValue) data.append("ownerID", ownerID as string)
        if(titleValue) data.append("file", contract || "")

        const res = await sendUserContract(data);
        if(!res.success) {
            setError(res.error as string);
            setShowError(true);
            setShowLoader(false)
        } else {
            setSendContract(false)
            history.push("/quotes/approved");
            setShowLoader(false)
            return res;
        }
    }
    const [convertToClientForm, setConvertToClientForm] = useState(false);
    const [approximateQuoteAmount, setApproximateQuoteAmount] = useState(0);
    const [totalCommission, setTotalCommission] = useState(0);
    const [commissionCollected, setCommissionCollected] = useState(0);
    const [note, setNote] = useState("");
    const handleConvertToClient = async(ownerID: String, id:String, approximateQuoteAmount:Number, totalCommission: Number, commissionCollected:Number, note:String) =>{
        setShowLoader(true)
        const res = await convertToClient(ownerID, id, approximateQuoteAmount, totalCommission, commissionCollected, note)
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setError("")
            setShowError(false)
            setShowLoader(false)
            history.push("/quotes/approved");
            return res;
        }
    }
    const [showAddNote, setShowAddNote] = useState(false);
    const [approvedQuoteNote, setApprovedQuoteNote] = useState("");
    const handleAddNewNote = async() =>{
        setShowLoader(true)
        const res = await addApprovedQuoteNote(
            approvedQuoteData._id, 
            approvedQuoteData.OwnerID, 
            approvedQuoteNote
        );
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setError("")
            setShowError(false)
            setShowLoader(false)
            history.push("/quotes/approved");
        }
    }
    const [showNotesHistory, setShowNotesHistory] = useState(false)
    return (
        <Page currentPage="ApprovedQuotes">
            {
                showLoadingError && <Error error={loadingError} />
            }
            {
                (!showLoadingError && Object.keys(approvedQuoteData).length) && (
                    <>
                    <Card>
                        <Card.Header>
                            <h4>{approvedQuoteData.OwnerName}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>FullName:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={`${approvedQuoteData.FirstName} ${approvedQuoteData.LastName}`} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Desired Amount Of Funding:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.DesiredAmountOfFunding as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Whats Main Purpose Of Fund:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.WhatsMainPurposeOfFund as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Do They Already Have A Business:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.DoTheyAlreadyHaveABusiness as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Date Created:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.DateCreated as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>name Of The Business:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.nameOfTheBusiness as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Adress:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.Adress as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>City:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.City as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>State:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.State as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Zip:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.Zip as number} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>DOB:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.DOBdata as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Phone:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.Phone as number} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Email:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.Email as string} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Income:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={approvedQuoteData.Income as number} 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group 
                                    as={Row} 
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label 
                                        column 
                                        sm={5}
                                    >
                                        <h6>Notes:</h6>
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control 
                                            type="text" 
                                            value={
                                                (approvedQuoteData?.Notes?.length) ? 
                                                approvedQuoteData.Notes[approvedQuoteData.Notes.length - 1].contentValue as string : ""
                                            } 
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>

                                {
                                    (approvedQuoteData.creditReport) && (
                                        <Form.Group 
                                            as={Row} 
                                            controlId="formPlaintextEmail"
                                        >
                                            <Form.Label 
                                                column 
                                                sm={5}
                                            >
                                                <h6>Uploaded file:</h6>
                                            </Form.Label>
                                            <Col sm={7}>
                                                <a 
                                                    href={`https://efundingexpertapi.herokuapp.com/report/download/${approvedQuoteData.creditReport}`} 
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
                                className="mr-2" 
                                onClick={() =>setConvertToClientForm(true)}
                            >
                                Convert To Client
                            </Button>
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={() =>setShowNotesHistory(true)}
                            >
                                See Notes History
                            </Button>
                            <Button 
                                variant="success" 
                                onClick={() =>setSendContract(true)}
                            >
                                Send Contract
                            </Button>
                            <Button
                                variant="success"
                                className="ml-2"
                                onClick={() =>setShowAddNote(true)}
                            >
                                Add Note
                            </Button>
                        </Card.Footer>
                    </Card>
                    {
                        sendContract && <SendContract 
                                            closeFunc={() =>setSendContract(false)}
                                            titleValue={title}
                                            onChangeTitle={(e:React.ChangeEvent<HTMLInputElement>) =>setTitle(e.target.value)} 
                                            onChangeContractType={(e:any) =>setContractType(e.target.value)}
                                            previewLinkValue={previewLink}
                                            onChangePreviewLink={(e:React.ChangeEvent<HTMLInputElement>) =>setPreviewLink(e.target.value)}
                                            onClick={(e:React.FormEvent) =>handleSendContract(e, title, contractType, previewLink, approvedQuoteData.OwnerID)}
                                            contractUpload={(e:React.ChangeEvent<HTMLInputElement>) =>setContract(e.target.files && e.target.files[0])}
                                            error={error}
                                            showError={showError}
                                        />
                    }
                    {
                        convertToClientForm && <ConvertToClient 
                                                closeFunc={() =>setConvertToClientForm(false)}
                                                approximateQuoteAmountValue={approximateQuoteAmount}
                                                onChangeApproxQuote={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                    const re = /^[0-9]+$/;
                                                    if(e.target.value === "" || re.test(e.target.value)) {
                                                        setApproximateQuoteAmount(+e.target.value)
                                                    }
                                                }}
                                                totalCommissionValue={totalCommission}
                                                onChangeTotalCommission={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                    const re = /^[0-9]+$/;
                                                    if(e.target.value === "" || re.test(e.target.value)) {
                                                        setTotalCommission(+e.target.value)
                                                    }
                                                }}
                                                commissionCollectedValue={commissionCollected}
                                                onChangeCommissionCollected={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                    const re = /^[0-9]+$/;
                                                    if(e.target.value || re.test(e.target.value)) {
                                                        setCommissionCollected(+e.target.value)
                                                    }
                                                }}
                                                noteValue={note}
                                                onChangeNote={(e:React.ChangeEvent<HTMLInputElement>) =>setNote(e.target.value)}
                                                onClick={() =>handleConvertToClient(approvedQuoteData.OwnerID, approvedQuoteData._id, approximateQuoteAmount, totalCommission, commissionCollected, note)}
                                                error={error}
                                                showError={showError}
                                            />
                    }
                    {
                        showAddNote && <AddQuoteNote 
                                            closeFunc={() =>setShowAddNote(false)}
                                            onClick={handleAddNewNote}
                                            error={error}
                                            showError={showError}
                                            value={approvedQuoteNote}
                                            onChange={
                                                (e:React.ChangeEvent<HTMLInputElement>) =>
                                                    setApprovedQuoteNote(e.target.value)
                                            }
                                        />
                    }
                    </>
                )
            }
            {
                showLoader && <Loader />
            }
            {
                showNotesHistory && <NotesHistory 
                                        closeFunc={() =>setShowNotesHistory(false)}
                                        notes={approvedQuoteData?.Notes || []}
                                    />
            }
        </Page>
    )
}

interface StateProps {
    approvedQuoteData: ApprovedQuoteProps
}

function mapStateToProps(state:any) {
    return {
        approvedQuoteData: state.ApprovedQuoteReducer
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

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ApprovedQuote);
