import React from "react";

const enabledButtonStyle = {
    background: "#65EA4D",
    borderColor: "#2A951C",
};

const disabledButtonStyle = {
    borderColor: "#959595",
};

const warningButtonStyle = {
    background: "#4DB3EA",
    borderColor: "#005B80",
};

const enabledSpanStyle = {
    color: "#046D00",
};

const disabledSpanStyle = {
    color: "#959595",
};

const warningSpanStyle = {
    color: "#005B80",
};

export default function ControlsDisplay(props) {
    const leftButtonTitle = props.translations["controlsPlay"];
    const leftButtonSrc = props.icons["Play"];
    const leftButtonStyle = enabledButtonStyle;
    const leftButtonTextStyle = enabledSpanStyle;

    const rightButtonTitle = props.translations["controlsCancel"];
    const rightButtonSrc = props.icons["Cancel"];
    const rightButtonStyle = disabledButtonStyle;
    const rightButtonTextStyle = disabledSpanStyle;

    return (
        <div className="controls-display">
            <div
                className="controls-display-control">
                <button style={leftButtonStyle}>
                    <img src={leftButtonSrc} />
                    <span style={leftButtonTextStyle}>{leftButtonTitle}</span>
                </button>
            </div>
            <div className="controls-display-control">
                <button style={rightButtonStyle}>
                    <img src={rightButtonSrc} />
                    <span style={rightButtonTextStyle}>{rightButtonTitle}</span>
                </button>
            </div>
        </div>
    );
}
