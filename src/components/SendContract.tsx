import React from "react";
import "../layout/SendContract.css";
import { Modal, Form, Button, Alert } from "react-bootstrap";

interface SendContractProps {
    closeFunc: () => void,
    titleValue: String,
    onChangeTitle: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onChangeContractType: (e:any) => void,
    onChangePreviewLink: (e:React.ChangeEvent<HTMLInputElement>) => void,
    previewLinkValue: String,
    onClick: (e:React.FormEvent) => void,
    contractUpload: (e:React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    showError: Boolean
}

const SendContract:React.FC<SendContractProps> = ({ closeFunc, titleValue, onChangeTitle, onChangeContractType, previewLinkValue, onChangePreviewLink, onClick, contractUpload, error, showError }) =>{
    return (
        <div className="send-contract">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 450, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog className="add-quote-note-card">
                <Modal.Header closeButton onHide={closeFunc} className="add-quote-note-header">
                    <h6 className="add-quote-note-title">Send Contract:</h6>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onClick}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Contract Link:</Form.Label>
                            <Form.Control type="text" value={previewLinkValue as string} onChange={onChangePreviewLink} placeholder="" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contract Title:</Form.Label>
                            <Form.Control type="text" placeholder="" value={titleValue as string} onChange={onChangeTitle} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contract Type</Form.Label>
                            <Form.Control as="select" onClick={onChangeContractType}>
                                <option value="Contracts and Applications">Contracts and Applications</option>
                                <option value="Other Applications">Other Applications</option>
                                <option value="Other Forms">Other Forms</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>PDF Version:</Form.Label>
                            <Form.Control type="file" placeholder="" onChange={contractUpload} />
                        </Form.Group>

                        <Button className="add-quote-note-btn" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default SendContract;
