import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import "../layout/DeleteConfirm.css";

interface DeleteConfirmProps {
    fullName: String,
    closeFunc: () => void,
    onClick: () => void,
    error: String,
    showError: Boolean
}

const DeleteConfirm:React.FC<DeleteConfirmProps> = ({ fullName, closeFunc, onClick, error, showError }) =>{
    return (
        <div className="delete-confirm">
            {
                showError && (
                    <Alert variant="danger" style={{ width: 400, textAlign: "center" }}>
                        { error }
                    </Alert>
                )
            }
            <Modal.Dialog style={{ width: 400 }}>
                <Modal.Header closeButton onHide={closeFunc}>
                    <h4>Delete a User</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are You Sure About Deleting The User: {fullName}.</p>
                    <p>Take In Consideration That All The User Recoreds Will Be Deleted (Contracts, Refferals, Quotes ...)</p>
                    <Button variant="danger" onClick={onClick} className="mt-3">Delete User</Button>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default DeleteConfirm;
