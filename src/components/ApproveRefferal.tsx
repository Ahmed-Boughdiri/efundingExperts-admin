import React from "react";
import "../layout/ApproveRefferal.css";
import { Modal, Form, Button, Alert } from "react-bootstrap";

interface ApproveRefferalProps {
    closeFunc: () => void,
    value: String,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
    error: String,
    showError: Boolean,
}

const ApproveRefferal:React.FC<ApproveRefferalProps> = ({ closeFunc, value, onChange, onClick, error, showError }) =>{
    return (
        <div className="approve-reffferal">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 450, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="add-quote-note-card">
                <Modal.Header closeButton onHide={closeFunc} className="add-quote-note-header">
                    <h6 className="add-quote-note-title">Approve Refferal</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="add-quote-note-label">Notes/Quote:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={value as string} onChange={onChange} />
                        </Form.Group>
                        <Button className="add-quote-note-btn" variant="primary" onClick={onClick}>
                            Approve
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default ApproveRefferal;
