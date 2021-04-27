import React from "react";
import "../layout/ShowUploadedFiles.css";
import { Image, Carousel } from "react-bootstrap";

import { isArray } from "util";

interface ShowUploadedFileProps {
    closeFunc: () => void,
    fileSrc: String | String[]
}

const ShowUploadedFile:React.FC<ShowUploadedFileProps> = ({ closeFunc, fileSrc }) =>{
    return (
        <div className="show-uploaded-file">
            <div className="show-uploaded-file-content">
                <div className="show-uploaded-file-content-wrapper">
                    <div 
                        className="show-uploaded-file-content-image"
                    >
                        {

                            (typeof fileSrc === "string") ? (
                                <Image 
                                    src={fileSrc as string}   
                                />
                            ) : (
                                <Carousel>
                                    {
                                        (isArray(fileSrc)) && fileSrc.map(file =>(
                                            <Carousel.Item className="carousel-item-container">
                                                <img
                                                    className="d-block w-100 carousel-image"
                                                    src={`https://efundingexpertapi.herokuapp.com/${file as string}`}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            )
                        }
                    </div>
                    <div 
                        className="show-uploaded-file-content-close-btn-container shadow"
                        onClick={closeFunc}
                    >
                        <Image 
                            src={"https://i.imgur.com/rsc2TZI.png"} 
                            onClick={closeFunc}    
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowUploadedFile;
