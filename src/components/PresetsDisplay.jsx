import React from "react";

import PresetAction from "./PresetAction.jsx";

export default function PresetsDisplay(props) {
    return (
        <div>
            <div>
                <div className="presets-title">{props.translations["presetsTitle"]}</div>
                <button className="presets-edit-btn">
                    {props.translations["editAction"]}
                    <img src={props.icons["Edit"]} title={props.translations["editAction"]} />
                </button>
            </div>
            <div>
                {props.presets.map(
                    ([id, totalMinutes, title]) => <PresetAction
                        key={id}
                        totalMinutes={totalMinutes}
                        title={title}
                    />)}
            </div>
        </div>
    );
}