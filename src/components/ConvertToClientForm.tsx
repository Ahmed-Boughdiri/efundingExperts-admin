import React from "react";
import "../layout/ConvertToClientForm.css";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface ConvertToClientFormProps {
    closeFunc: () => void,
    onClick: () => void,
    approximateQuoteAmountValue: Number,
    totalCommissionValue: Number,
    commissionCollectedValue: Number,
    onChangeApproxQuote: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeTotalCommission: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeCommissionCollected: (e:React.ChangeEvent<HTMLInputElement>) => void,
    noteValue: String,
    onChangeNote: (e:React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    showError: Boolean
}

const ConvertToClientForm:React.FC<ConvertToClientFormProps> = ({ closeFunc, onClick, approximateQuoteAmountValue, totalCommissionValue, commissionCollectedValue, onChangeApproxQuote, onChangeTotalCommission, onChangeCommissionCollected, noteValue, onChangeNote, error, showError }) =>{
    return (
        <div className="convert-to-client">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 450, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="add-quote-note-card">
                <Modal.Header closeButton onHide={closeFunc} className="add-quote-note-header">
                    <h6 className="add-quote-note-title">Convert To Client:</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Funding Amount Requested($)</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={onChangeApproxQuote} value={approximateQuoteAmountValue as number} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Total Commissions($)</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={onChangeTotalCommission} value={totalCommissionValue as number} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Commissions Collected($)</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={onChangeCommissionCollected} value={commissionCollectedValue as number} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="add-quote-note-label">Enter The New Note:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={noteValue as string} onChange={onChangeNote} />
                        </Form.Group>
                        <Button className="add-quote-note-btn" onClick={onClick}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default ConvertToClientForm;
