import React from "react";

export default function IconDisplay(props) {
    const className = props.minified ? "icon-display icon-display-small" : "icon-display";

    let src;
    switch (props.timeLeftLevel) {
        case 0:
            src = props.icons.TimerIcons.Empty;
            break;
        case 10:
            src = props.icons.TimerIcons.Pct10;
            break;
        case 50:
            src = props.icons.TimerIcons.Pct50;
            break;
        case 90:
            src = props.icons.TimerIcons.Pct90;
            break;
        case 100:
        default:
            src = props.icons.TimerIcons.Full;
            break;
    }

    const title = props.translations["appTitle"];

    return (
        <div className={className}>
            <img
                src={src}
                title={title}
            />
        </div>
    );
}