import React, { useState } from "react";
import "../layout/Login.css";
import { 
    Card, 
    Form, 
    Button, 
    Alert
} from "react-bootstrap";
import validateData from "../global/ValidateAdminData";
import login from "../global/AdminLogin";
import Loader from "../components/Loader";
import { RouteComponentProps } from "react-router-dom";

const Login:React.FC<RouteComponentProps> = ({ history }) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const handleLogin = async() =>{
        setShowLoader(true)
        const validatedData = validateData(email, password);
        if(!validatedData.success) {
            setError(validatedData.error as string)
            setShowError(true)
            setShowLoader(false)
            return;
        }
        const res = await login(email, password);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
            return;
        }
        setShowLoader(false)
        history.push("/requests")
    }
    return (
        <div className="login-container">
            {
                showError && (
                    <Alert
                        style={{
                            width: 400
                        }}
                        variant="danger"
                    >
                        { error }
                    </Alert>
                )
            }
            <Card className="login-card-container shadow">
                <Card.Header>
                    <h4>Admin Login</h4>
                </Card.Header>
                <Card.Body className="login-card-body">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Admin Email" 
                            value={email}
                            onChange={
                                (e:React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Admin Password" 
                            value={password}
                            onChange={
                                (e:React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        className="login-card-btn"
                        onClick={handleLogin}
                    >
                        Submit
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            {
                showLoader && <Loader />
            }
        </div>
    )
}

export default Login;
