import React from "react";
import "../layout/DenyRefferal.css";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface DenyRefferalProps {
    close: () => void,
    value: String,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
    error: String,
    showError: Boolean
}

const DenyRefferal:React.FC<DenyRefferalProps> = ({ close, value, onChange, onClick, error, showError }) =>{
    return(
        <div className="deny-refferal">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 450, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="add-quote-note-card">
                <Modal.Header closeButton onHide={close} className="add-quote-note-header">
                    <h6 className="add-quote-note-title">Deny Refferal</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="add-quote-note-label">Notes:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={value as string} onChange={onChange} />
                        </Form.Group>
                        <Button className="add-quote-note-btn" variant="danger" onClick={onClick}>
                            Deny
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default DenyRefferal;
