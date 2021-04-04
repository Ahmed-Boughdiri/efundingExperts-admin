import React from "react";
import "../layout/EditSettings.css";
import { 
    Card,
    Form,
    Row,
    Col,
    Button
} from "react-bootstrap";

interface EditSettingsProps {
    onConfirm: () => void;
    onCancel: () => void;
    emailNotificationValue: String;
    emailNotificationPasswordValue: String;
    loginEmailValue: String;
    loginPasswordValue: String;
    handleEmailNotification: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailNotificationPassword: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleLoginEmail: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleLoginPassword: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

const EditSettings:React.FC<EditSettingsProps> = ({
    onConfirm,
    onCancel,
    emailNotificationValue,
    emailNotificationPasswordValue,
    loginEmailValue,
    loginPasswordValue,
    handleEmailNotification,
    handleEmailNotificationPassword,
    handleLoginEmail,
    handleLoginPassword
}) =>{
    return (
        <div className="edit-settings-container">
            <Card className="edit-settings-wrapper">
                <Card.Header>
                    <h5>Edit Settings:</h5>
                </Card.Header>
                <Card.Body>
                    <Form.Group 
                        as={Row} 
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label 
                            column 
                            sm={5}
                        >
                            <h6>Email Notification:</h6>
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control 
                                type="text" 
                                value={emailNotificationValue as string}
                                onChange={handleEmailNotification}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group 
                        as={Row} 
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label 
                            column 
                            sm={5}
                        >
                            <h6>Email Notification Password:</h6>
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control 
                                type="text" 
                                value={emailNotificationPasswordValue as string} 
                                onChange={handleEmailNotificationPassword}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group 
                        as={Row} 
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label 
                            column 
                            sm={5}
                        >
                            <h6>Login Email:</h6>
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control 
                                type="text" 
                                value={loginEmailValue as string} 
                                onChange={handleLoginEmail}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group 
                        as={Row} 
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label 
                            column 
                            sm={5}
                        >
                            <h6>Login Password:</h6>
                        </Form.Label>
                        <Col sm={7}>
                            <Form.Control 
                                type="text" 
                                value={loginPasswordValue as string} 
                                onChange={handleLoginPassword}
                            />
                        </Col>
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant="success"
                        onClick={onConfirm}
                    >
                        Save
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

export default EditSettings;

