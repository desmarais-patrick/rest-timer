import React from "react";

const controlsDisplayStyle = {
    marginBottom: "1rem",
};

const controlsDisplayControlStyle = {
    display: "inline-block",
    boxSizing: "border-box",
    width: "50%",
};

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

const leftImgStyle = {
    left: "1rem",
};

const rightImgStyle = {
    right: "1rem",
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
    const leftButtonTextStyle = {
        ...enabledSpanStyle,
        marginLeft: "1rem",
    };

    const rightButtonTitle = props.translations["controlsCancel"];
    const rightButtonSrc = props.icons["Cancel"];
    const rightButtonStyle = disabledButtonStyle;
    const rightButtonTextStyle = {
        ...disabledSpanStyle,
        marginRight: "1rem",
    };

    return (
        <div className="controls-display" style={controlsDisplayStyle}>
            <div
                className="controls-display-control"
                style={{ ...controlsDisplayControlStyle, paddingRight: ".5rem" }}>
                <button style={leftButtonStyle}>
                    <img src={leftButtonSrc} style={leftImgStyle} />
                    <span style={leftButtonTextStyle}>{leftButtonTitle}</span>
                </button>
            </div>
            <div className="controls-display-control"
                style={{ ...controlsDisplayControlStyle, paddingLeft: ".5rem" }}>
                <button style={rightButtonStyle}>
                    <img src={rightButtonSrc} style={rightImgStyle} />
                    <span style={rightButtonTextStyle}>{rightButtonTitle}</span>
                </button>
            </div>
        </div>
    );
}
