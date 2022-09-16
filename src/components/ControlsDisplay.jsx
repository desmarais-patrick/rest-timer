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
    let leftButtonAction = "play";
    let leftButtonTitle = props.translations["controlsPlay"];
    let leftButtonSrc = props.icons["Play"];
    if (props.timerState === "paused") {
        leftButtonAction = "resume";
        leftButtonTitle = props.translations["controlsResume"];
        leftButtonSrc = props.icons["Play"];
    } else if (props.timerState === "running") {
        leftButtonAction = "pause";
        leftButtonTitle = props.translations["controlsPause"];
        leftButtonSrc = props.icons["Pause"];
    }
    const leftButtonStyle = enabledButtonStyle;
    const leftButtonTextStyle = enabledSpanStyle;

    const rightButtonAction = "cancel";
    const rightButtonTitle = props.translations["controlsCancel"];
    const rightButtonSrc = props.icons["Cancel"];
    const rightButtonStyle = props.timerState === "ready" ? disabledButtonStyle : warningButtonStyle;
    const rightButtonTextStyle = props.timerState === "ready" ? disabledSpanStyle : warningSpanStyle;

    return (
        <div className="controls-display">
            <div
                className="controls-display-control">
                <button style={leftButtonStyle} onClick={() => props.onControlAction(leftButtonAction)}>
                    <img src={leftButtonSrc} />
                    <span style={leftButtonTextStyle}>{leftButtonTitle}</span>
                </button>
            </div>
            <div className="controls-display-control">
                <button style={rightButtonStyle} onClick={() => props.onControlAction(rightButtonAction)}>
                    <img src={rightButtonSrc} />
                    <span style={rightButtonTextStyle}>{rightButtonTitle}</span>
                </button>
            </div>
        </div>
    );
}
