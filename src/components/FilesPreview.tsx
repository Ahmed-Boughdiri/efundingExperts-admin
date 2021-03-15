import React,{ useEffect } from "react";
import "../layout/FilePreview.css";
import { 
    Card, 
    Carousel, 
    Image, 
    Button 
} from "react-bootstrap";

import close from "../assets/close.png";

interface FilePreviewProps {
    files: String[];
    closeFunc: () => void
}

const allowedExt = [".png", ".jpg", "jpeg", ".svg"];

const FilePreview:React.FC<FilePreviewProps> = ({ files, closeFunc }) =>{
    return (
        <div className="preview-files">
            <Card className="preview-files-container">
                <Card.Header className="preview-files-header">
                    <h6 className="preview-files-title">File(s) Uploaded:</h6>
                    <Image 
                        src={close}
                        height={20}
                        width={20}
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={closeFunc}
                    />
                </Card.Header>
                <Card.Body className="preview-files-wrapper">
                    <Carousel>
                        {
                            files.map((file, index) =>{
                                const ext = file.slice(file.length - 4, file.length)
                                if(!allowedExt.includes(ext))
                                    return (
                                        <Carousel.Item 
                                            className="preview-files-item unavailable"
                                            key={index as number}
                                        >
                                            <h5 className="preview-files-unavailable-title">
                                                This File Can Not Be Previewed On The Browser
                                            </h5>
                                            <Button
                                                variant="dark"
                                                onClick={closeFunc}
                                                className="mt-4"
                                            >
                                                Close Previewer
                                            </Button>
                                        </Carousel.Item>
                                    )
                                else
                                    return (
                                        <Carousel.Item 
                                            className="preview-files-item"
                                            key={index as number}
                                        >
                                            <img
                                                className="d-block preview-file-img"
                                                src={`http://efundingexperts.herokuapp.com/${file}`}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                            })
                        }
                    </Carousel>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FilePreview;
