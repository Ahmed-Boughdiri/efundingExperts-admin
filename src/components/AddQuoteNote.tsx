import React from "react";
import "../layout/AddQuoteNote.css";
import { Modal, Form,Button, Alert } from "react-bootstrap";

interface AddQuoteProps {
    closeFunc: () => void,
    value: String,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    showError: Boolean,
    onClick: () => void
}

const AddQuoteNote:React.FC<AddQuoteProps>= ({ 
    closeFunc, 
    value, 
    onChange, 
    onClick, 
    error, 
    showError 
}) =>{
    return (
        <div className="add-quote-note-container">
            {
                showError && (
                    <Alert 
                        variant="danger" 
                        style={{ 
                            width: 450, 
                            textAlign: "center" 
                        }}
                    >
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="add-quote-note-card">
                <Modal.Header 
                    closeButton 
                    onHide={closeFunc} 
                    className="add-quote-note-header"
                >
                    <h6 className="add-quote-note-title">Add Note:</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="add-quote-note-label">
                                Enter The New Note:
                            </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={value as string} 
                                onChange={onChange} 
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

export default AddQuoteNote;
