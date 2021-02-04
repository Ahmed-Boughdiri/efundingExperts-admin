import React from "react";
import "../layout/SendReport.css";
import { Toast, Form, Button, Alert } from "react-bootstrap";

interface SendReportProps {
    open: Boolean,
    closeFunc: () =>void,
    note: String,
    setNote: (e:React.ChangeEvent<HTMLInputElement>) =>void,
    onClick: () =>void,
    emailTo: String,
    setEmailTo: (e:React.ChangeEvent<HTMLInputElement>) =>void,
    error?: String,
    showError?: Boolean
}

const SendReport:React.FC<SendReportProps> = ({ open, closeFunc, note, setNote, onClick, emailTo, setEmailTo, error, showError }) =>{
    return (
        <div className="send-report" style={{ display: `${open ? "flex" : "none"}` }}>
            {
                showError && (
                    <Alert variant="danger" style={{ width: 350, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Toast show={true} style={{ width: 450 }} onClose={closeFunc}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt="" />
                    <strong className="mr-auto">Approving Request</strong>
                </Toast.Header>
                <Toast.Body>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        <strong>Email address:</strong>
                    </Form.Label>
                    <Form.Control type="text" placeholder="" value={emailTo as string} onChange={setEmailTo} />
                </Form.Group>
                    <strong>Notes:</strong> <br />
                    <div className="mt-3">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} value={note as string} onChange={setNote} />
                        </Form.Group>
                    </div>
                    <Button className="px-4 mt-1" variant="success" onClick={onClick}>Send</Button>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default SendReport;
