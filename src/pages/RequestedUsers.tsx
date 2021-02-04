import React,{ useState, useEffect } from "react";
import Page from "../components/Page";
import { Card, Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../layout/RequestedUsers.css";
import { getRequestedUsers } from "../global/RequestedUsers";
import { connect } from "react-redux";
import Loading from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";
import { RequestProps } from "../@types/request";
import { RouteComponentProps } from "react-router-dom";

interface RequestsComponentProps { 
    loading: Boolean, 
    handleMoreInfo: (id: String) => Promise<void>, 
    requests: any[] 
}

const Requests:React.FC<RequestsComponentProps> = ({ requests, loading, handleMoreInfo }) =>{
    return (
        <>
        <Card>
            <Card.Header>
                <h4 className="text-left">Requests</h4>
            </Card.Header>
            <Card.Body>
                {
                    !(requests?.length) ? <Empty message="There is No Requests Recorded Yet" /> : (
                        <Table striped bordered hover>
                            <thead>
                                <tr className="text-left">
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>More Info</th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {
                                    requests.map((req, index) =>(
                                        <tr key={req.id}>
                                            <td>{req.id}</td>
                                            <td>{req.name}</td>
                                            <td>{req.email}</td>
                                            <td>{req.phoneNumber}</td>
                                            <td>
                                                <Button className="more-info-btn" onClick={() =>handleMoreInfo(req.uid)}>
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
        {
            loading && <Loading />
        }
        </>
    )
}

type RequestedUsersProps = RouteComponentProps & StateProps & DispatchProps

const RequestedUsers:React.FC<RequestedUsersProps> = ({ history, loadID }) =>{
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const getRequests = async() =>{
        try {
            const res = await getRequestedUsers();
            if(!res.success) {
                setError(res.error as string)
                setShowError(true)
            } else {
                setRequests(res.data || []);
                setLoading(false)
            }
        } catch(err) {
            setError("An Error Has Occured, Please Check Your Internet Connection And Try Again")
            setShowError(true)
        }
    }
    const handleMoreInfo = async(id:String) =>{
        setLoading(true)
        loadID(id)
        setLoading(false)
        history.push("/request")
    }
    useEffect(() =>{
        getRequests()
    },[])
    return (
        <div>
            <Page currentPage="RequestedUsers">
                {
                    showError ? <Error error={error} /> : <Requests requests={requests} loading={loading} handleMoreInfo={handleMoreInfo} /> 
                }
            </Page>
        </div>
    )
}

interface StateProps {
    request: RequestProps
}

function mapStateToProps(state: any) {
    return {
        request: state.requestReducer
    }
}

interface DispatchProps {
    loadRequest: (id:String) => Promise<void>,
    loadID: (id:String) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        loadRequest: async(id:String) =>await dispatch({ type: "LOAD_REQUEST", payload: id }),
        loadID: (id:String) => dispatch({ type: "STORE_ID", payload: id })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(RequestedUsers);
