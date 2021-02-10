import React from "react";
import "../layout/EditClientStats.css";
import { Modal, Form, Button, Alert } from "react-bootstrap";

interface EditClientStatsProps {
    closeFunc: () => void,
    onClick: () => void,
    approxFundingAmountValue: Number,
    totalCommisionValue: Number,
    commisionCollectedValue: Number,
    noteValue: String,
    onChangeApproxFundingAmountValue: 
        (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeTotalCommision: 
        (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeCommisionCollected: 
        (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeNote: 
        (e:React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    showError: Boolean
}

const EditClientStats:React.FC<EditClientStatsProps> = ({ 
    closeFunc, 
    onClick,
    approxFundingAmountValue,
    totalCommisionValue,
    commisionCollectedValue,
    noteValue,
    onChangeApproxFundingAmountValue,
    onChangeTotalCommision,
    onChangeCommisionCollected,
    onChangeNote,
    error,
    showError
}) =>{
    return (
        <div className="edit-client-stats-container">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 500, marginBottom: -10 }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="edit-client-stats-modal">
                <Modal.Header 
                    className="edit-client-stats-header"
                    closeButton
                    onHide={closeFunc}
                >
                    <h6 className="edit-client-stats-header-title">Edit Client Stats</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="edit-client-stats-label">
                                Funding Amount Requested($)
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={onChangeApproxFundingAmountValue} 
                                value={approxFundingAmountValue as number} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="edit-client-stats-label">
                                Total Commissions($)
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={onChangeTotalCommision} 
                                value={totalCommisionValue as number} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="edit-client-stats-label">
                                Commissions Collected($)
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                onChange={onChangeCommisionCollected} 
                                value={commisionCollectedValue as number} 
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="add-quote-note-label">
                                Enter The New Note:
                            </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={noteValue as string} 
                                onChange={onChangeNote} 
                            />
                        </Form.Group>

                        <Button 
                            className="add-quote-note-btn" 
                            onClick={onClick}
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default EditClientStats;
