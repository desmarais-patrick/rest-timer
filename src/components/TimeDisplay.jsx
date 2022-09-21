import React from "react";

export default function TimeDisplay(props) {
    const downIndicatorClassName = (
        props.timerState === "running" ?
            "down-indicator down-indicator-active" :
            "down-indicator"
    );
    const downIndicatorSrc = (
        props.timerState === "running" ?
            props.icons["DownIndicator"]["Active"] :
            props.icons["DownIndicator"]["Inactive"]
    );

    const formattedMinutesLeft = (
        props.minutesLeft > 0 ?
            props.minutesLeft + "m" :
            "0m"
    );

    return (
        <div className="time-display">
            {(props.timerState === "running" || props.timerState === "paused") &&
                <img className={downIndicatorClassName} src={downIndicatorSrc} />}
            <div className="time-left">{formattedMinutesLeft}</div>
        </div>
    )
}