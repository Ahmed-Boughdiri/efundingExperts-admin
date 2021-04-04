import React from "react";
import "../layout/ConfirmDeleteClient.css";
import { Button, Card } from "react-bootstrap";

interface ConfirmDeleteClientProps {
    onConfirm: () => void;
    onCancel: () => void
}

const ConfirmDeleteClient:React.FC<ConfirmDeleteClientProps> = ({
    onConfirm,
    onCancel
}) =>{
    return (
        <div className="confirm-delete-client-container">
            <Card className="confirm-delete-client-wrapper">
                <Card.Header>
                    <h6>Delete Confirmation</h6>
                </Card.Header>
                <Card.Body>
                    <p>
                        You Are Going To Delete All The Records Available 
                        On The DataBase For This Client. <br />
                        Do You Want To Porceed?
                    </p>
                </Card.Body>
                <Card.Footer>
                    <Button 
                        variant="danger"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="secondary"
                        className="ml-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default ConfirmDeleteClient

