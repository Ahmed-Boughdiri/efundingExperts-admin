import React,{ useEffect, useState } from "react";
import "../layout/Settings.css";
import Page from "../components/Page";
import { 
    Card, 
    Form, 
    Row, 
    Col,
    Button
} from "react-bootstrap";
import EditSettings from "../components/EditSettings";
import editSettingsHandler from "../global/EditSettings";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { RouteComponentProps } from "react-router-dom";
import getSettings from "../global/GetSettings";
import { SettingsProps } from "../@types/settings";

const Settings:React.FC<RouteComponentProps> = ({ history }) =>{
    const [editSettings, setEditSettings] = useState(false);
    const [notificationEmail, setNotificationEmail] = useState("");
    const [notificationEmailPassword, setNotificationEmailPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const handleEditSettings = async() =>{
        setEditSettings(false)
        setLoading(true);
        const res = await editSettingsHandler(
            notificationEmail,
            notificationEmailPassword,
            loginEmail,
            loginPassword
        )
        if(!res.success) {
            setError(res.error as string);
            setShowError(true);
            setLoading(false)
            return;
        }
        setLoading(false)
        setError("")
        setShowError(false);
        history.push("/settings")
    }
    const [settingsData, setSettingsData] = useState<SettingsProps>({
        notificationEmail: "",
        notificationEmailPassword: "",
        loginEmail: "",
        loginPassword: ""
    })
    const handleGetSettings = async() =>{
        setLoading(true)
        const res = await getSettings();
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setLoading(false)
            return;
        }
        setError("")
        setShowError(false)
        setSettingsData(res.data)
        setLoading(false)
    }
    useEffect(() =>{
        handleGetSettings()
    }, [])
    return (
        <Page currentPage="Settings">
            {
                !showError && (
                    <Card>
                        <Card.Header>
                            <h4>Admin Settings</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
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
                                            value={settingsData.notificationEmail as string}
                                            disabled 
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
                                            value={settingsData.notificationEmailPassword as string} 
                                            disabled 
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
                                            value={settingsData.loginEmail as string} 
                                            disabled 
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
                                            value={settingsData.loginPassword as string}
                                            disabled 
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                variant="success"
                                onClick={() => setEditSettings(true)}
                            >
                                Edit Settings
                            </Button>
                        </Card.Footer>
                    </Card>
                )
            }
            {
                editSettings && <EditSettings 
                                    onConfirm={handleEditSettings}
                                    onCancel={() => setEditSettings(false)}
                                    emailNotificationValue={notificationEmail}
                                    emailNotificationPasswordValue={notificationEmailPassword}
                                    loginEmailValue={loginEmail}
                                    loginPasswordValue={loginPassword}
                                    handleEmailNotification={
                                        (e:React.ChangeEvent<HTMLInputElement>) => 
                                            setNotificationEmail(e.target.value)
                                    }
                                    handleEmailNotificationPassword={
                                        (e:React.ChangeEvent<HTMLInputElement>) =>
                                            setNotificationEmailPassword(e.target.value)
                                    }
                                    handleLoginEmail={
                                        (e:React.ChangeEvent<HTMLInputElement>) =>
                                            setLoginEmail(e.target.value)
                                    }
                                    handleLoginPassword={
                                        (e:React.ChangeEvent<HTMLInputElement>) =>
                                            setLoginPassword(e.target.value)
                                    }
                                />
            }
            {
                showError && <Error error={error} />
            }
            {
                loading && <Loader />
            }
        </Page>
    )
}


export default Settings;

