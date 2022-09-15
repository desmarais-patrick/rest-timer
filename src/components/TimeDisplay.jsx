import React from "react";

export default function TimeDisplay(props) {
    const downIndicatorClassName = (props.state === "running" ? "down-indicator down-indicator-active" : "down-indicator");
    const downIndicatorSrc = (props.state === "running" ? props.icons["DownIndicator"]["Active"] : props.icons["DownIndicator"]["Inactive"]);

    const formattedMinutesLeft = props.minutesLeft > 0 ? props.minutesLeft + "m" : "0m";

    return (
        <div className="time-display">
            <img className={downIndicatorClassName} src={downIndicatorSrc} />
            <div className="time-left">{formattedMinutesLeft}</div>
        </div>
    )
}