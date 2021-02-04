import React from "react";
import "../layout/ValidateApprove.css";
import { Toast, Button, Form } from "react-bootstrap";

interface ValidateApproveProps {
    onClick: () => void,
    open: Boolean,
    closeFunc: () => void,
    note: String,
    setNote: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const ValidateApprove:React.FC<ValidateApproveProps> = ({ onClick, open, closeFunc , note, setNote}) =>{
    return (
        <>
        <div className="validate-approve" style={{ display: `${ open ? "flex" : "none" }` }}>
            <Toast show={true} onClose={closeFunc}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt="" />
                    <strong className="mr-auto">Approving Request</strong>
                </Toast.Header>
                <Toast.Body>
                    <strong>Do You Really Want To Approve The Request For The Customer:</strong> <br />
                    <div className="mt-3">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} value={note as string} onChange={setNote} />
                        </Form.Group>
                    </div>
                    <Button className="px-4 mt-3" onClick={onClick}>Confirm</Button>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
}

export default ValidateApprove;
