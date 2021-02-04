import React from "react";
import "../layout/Loader.css";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  position: absolute;
  left: 50%auto;
  top: 50%;
  transform: translate(-50%,-50%);
`;

const Loader = () =>{
    return (
        <div className="loader">
            <BeatLoader
                css={override}
                size={50}
                color={"#fff"}
                loading={true}
            />
        </div>
    )
}

export default Loader;
