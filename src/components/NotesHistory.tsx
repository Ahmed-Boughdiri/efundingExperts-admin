import React from "react";
import { Modal, Image } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import { NotesProps } from "../@types/notes";
import "../layout/NotesHistory.css";

interface NotesHistoryProps {
    closeFunc: () => void,
    notes: NotesProps[]
}

const NotesHistory:React.FC<NotesHistoryProps> = ({ closeFunc, notes }) =>{
    return (
        <div className="notes-history-container">
            <Modal.Dialog 
                style={{ 
                    width: 600, 
                    height: 300 
                }}
            >
                <Modal.Header 
                    closeButton 
                    onHide={closeFunc}
                >
                    <h6 className="notes-history-title">Notes History</h6>
                </Modal.Header>
                <Modal.Body>
                    <Scrollbars 
                        style={{ 
                            width: 470, 
                            height: 300 
                        }} 
                        className="notes-history-wrapper"
                    >
                        {
                            notes.map(note =>(
                                <div className="notes-history-item">
                                    <Image  
                                        src={"https://i.imgur.com/5nPYbgv.jpg"} 
                                        height={50} 
                                        width={50} 
                                    />
                                    <div>
                                        <h5>
                                            Note From 
                                            {(note.sender === "admin") ? "The admin" : "You"}:
                                        </h5>
                                        <p>
                                            {note.contentValue}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </Scrollbars>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default NotesHistory;

