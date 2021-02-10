import React,{ useState, useEffect } from "react";
import "../layout/Clients.css";
import Page from "../components/Page";
import { Card, Table, Button } from "react-bootstrap";
import { getClients } from "../global/GetClients";
import { connect } from "react-redux";
import { storeID } from "../utils/ClientID";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Empty from "../components/Empty";
import { ClientProps } from "../@types/client";
import { RouteComponentProps } from "react-router-dom";

type ClientsComponentProps = StateProps & DispatchProps & RouteComponentProps;

const Clients:React.FC<ClientsComponentProps> = ({ storeClient, history }) =>{
    const [clients, setClients] = useState<ClientProps[]>([]);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const loadClients = async() =>{
        setShowLoader(true)
        const res = await getClients();
        if(!res.success) {
            setError(res.error as string)
            setShowError(true)
            setShowLoader(false)
        } else {
            setClients(res.data);
            setShowLoader(false)
        }
    }
    useEffect(() =>{
        loadClients();
    },[])
    return (
        <Page currentPage="Clients">
            {
                showError && <Error error={error} />
            }
            {
                !showError && (
                    <Card>
                        <Card.Header>
                            <h4>Clients</h4>
                        </Card.Header>
                        <Card.Body>
                            {
                                !clients.length && <Empty message="No Clients Recorded Yet" />
                            }
                            {
                                (clients.length !== 0) && (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Quote Sender</th>
                                                <th>Full Name</th>
                                                <th>Funding Amount Requested</th>
                                                <th>Total Commission</th>
                                                <th>Commission Collected</th>
                                                <th>More Info</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                clients.map(client =>(
                                                    <tr>
                                                        <td>1</td>
                                                        <td>{client.OwnerName}</td>
                                                        <td>{`${client.FirstName} ${client.LastName}`}</td>
                                                        <td>{client.ApproxQuoteAmount}</td>
                                                        <td>{client.TotalCommissions}</td>
                                                        <td>{client.CommissionsCollected}</td>
                                                        <td>
                                                            <Button className="more-info-btn" onClick={() =>{
                                                                storeID(client._id)
                                                                storeClient(client);
                                                                history.push("/client")
                                                            }}>
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
    clientData: ClientProps
}

function mapStateToProps(state:any) {
    return {
        clientData: state.ClientReducer
    }
}

interface DispatchProps {
    storeClient: (data:ClientProps) => void
}

function mapDispatchToProps(dispatch:any) {
    return {
        storeClient: (data:ClientProps) => dispatch({ type: "STORE_CLIENT", payload: data })
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Clients);
