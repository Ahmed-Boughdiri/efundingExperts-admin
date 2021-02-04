import React,{ useState, useEffect } from "react";
import "../layout/Users.css";
import Page from "../components/Page";
import { Card, Table, Button } from "react-bootstrap";
import getUsers from "../global/GetUsers";
import Error from "../components/Error";
import Loader from "../components/Loader";
import getUserData from "../global/GetUserData";
import { connect } from "react-redux";
import { storeID } from "../utils/UserID";
import Empty from "../components/Empty";
import { UserProps } from "../@types/user";
import { RouteComponentProps } from "react-router-dom";

type UsersComponentProps = RouteComponentProps & StateProps & DispatchProps;

const Users:React.FC<UsersComponentProps> = ({ userData, storeUser, history }) =>{
    const [users, setUsers] = useState<UserProps[]>([]);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const loadUsers = async() =>{
        setShowLoader(true)
        const res = await getUsers();
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setUsers(res.data);
            setShowLoader(false)
        }
    }
    const handleUserData = async(id:String) =>{
        setShowLoader(true)
        const res = await getUserData(id);
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            storeUser(res.data);
            setShowError(false)
            setShowLoader(false)
        }
    }
    useEffect(() =>{
        loadUsers()
    },[])
    return (
        <Page currentPage="Users">
            {
                showError && <Error error={error} />
            }
            {
                !showError && (
                    <Card>
                        <Card.Header>
                            <h4>Users</h4>
                        </Card.Header>
                        <Card.Body>
                            {
                                !users.length && <Empty message="No User Recorded Yet" />
                            }
                            {
                                (users.length !== 0) && (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Occupation</th>
                                                <th>More Info</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user, index) =>(
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>{user.occupation}</td>
                                                        <td>
                                                            <Button 
                                                                className="more-info-btn"
                                                                onClick={async() =>{
                                                                    storeID(user._id)
                                                                    await handleUserData(user._id)
                                                                    history.push("/user/preview")
                                                                }}
                                                            >
                                                                More Info
                                                            </Button> 
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                )
                            }
                        </Card.Body>
                    </Card>
                )
            }
            {
                showLoader && <Loader />
            }
        </Page>
    )
}

interface StateProps {
    userData: UserProps
}

function mapStateToProps(state:any) {
    return {
        userData: state.UserReducer
    }
}

interface DispatchProps {
    storeUser: (data: UserProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        storeUser: (data:UserProps) =>dispatch({ type: "STORE_USER", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Users);

