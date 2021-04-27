import React,{ useState, useEffect } from "react";
import "../layout/Navigation.css";
import { Image, ListGroup, Col, Row, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tabs } from "../global/Global";
import Loading from "./Loader";

const Navigation:React.FC<{ currentPage: String }> = ({ currentPage }) =>{
    const [tabsData, setTabsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const loadTabs = async() =>{
        const data = await tabs()
        setTabsData(data)
        setLoading(false);
    }
    useEffect(() =>{
        loadTabs()
    },[])
    return (
        <div className="navigation">
            <div className="brand mb-2">
                <Image 
                    src={"https://i.imgur.com/GrUZyoc.png"} 
                    height={33} 
                    width={105} 
                />
            </div>
            <div className="navigation-title mb-2">
                <h6 className="text-left mt-2">NAVIGATION</h6>
            </div>
            <ListGroup className="rounded-0 mt-4">
                {
                    tabsData.length && tabsData.map(tab =>(
                        <Link 
                            className={`
                                remove-underline 
                                mt-2 
                                ${(currentPage === tab.name) && "active-tab"}`} 
                                to={tab.link}
                                >
                            <ListGroup.Item
                                className={`bg-transparent text-left border-0 navigation-link`}
                            >
                                <Row>
                                    <Col sm={2}>
                                        <FontAwesomeIcon
                                            icon={tab.icon}
                                            size={"lg"}
                                            color={"#fff"}
                                        />
                                    </Col>
                                    <Col sm={tab.notifications ? 6 : 8}>
                                        <p className="text-left font-weight-normal text-light navigation-tab-title">
                                            {tab.placeholder}
                                        </p>
                                    </Col>
                                    {
                                        tab.notifications && (
                                            <Col sm={2}>
                                                <Badge 
                                                    variant="danger" 
                                                    className="notif-number"
                                                    >
                                                        {tab.notifications}
                                                    </Badge>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </ListGroup.Item>
                        </Link>
                    ))
                }
            </ListGroup>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default Navigation;
