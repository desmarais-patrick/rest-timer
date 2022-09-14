import React from "react";

export default function ControlsDisplay(props) {
    return (
        <div>
            <button>
                <img src={props.icons["Play"]} />
                <span>{props.translations["controlsPlay"]}</span>
            </button>
            <button>
                <img src={props.icons["Cancel"]} />
                <span>{props.translations["controlsCancel"]}</span>
            </button>
        </div>
    );
}
