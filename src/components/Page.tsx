import React from "react";
import "../layout/Page.css";
import Navigation from "./Navigation";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Page:React.FC<{ children:React.ReactNode, currentPage: String }> = ({ children, currentPage }) =>{
    return (
        <div className="page">
            <Navigation currentPage={currentPage} />
            <div className="page-content">
                <Container className="pt-4">
                    {
                        children
                    }
                </Container>
            </div>
        </div>
    )
}

export default Page;
