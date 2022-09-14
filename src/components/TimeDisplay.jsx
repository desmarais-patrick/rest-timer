import React from "react";

export default function TimeDisplay(props) {
    const downIndicatorClassName = "down-indicator" +
        props.state === "running" ? "down-indicator-active" : "";
    const downIndicatorSrc = props.icons["DownIndicator"];

    const formattedMinutesLeft = props.minutesLeft > 0 ? props.minutesLeft + "m" : "0m";

    return (
        <div className="time-display">
            <img className={downIndicatorClassName} src={downIndicatorSrc} />
            <div className="time-left">{formattedMinutesLeft}</div>
        </div>
    )
}