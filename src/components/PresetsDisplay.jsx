import React from "react";

import PresetAction from "./PresetAction.jsx";

export default function PresetsDisplay(props) {
    return (
        <div className="presets-display">
            <div className="presets-display-header">
                <div className="presets-title">
                    {props.translations["presetsTitle"]}
                </div>
                <a className="presets-edit" href="#">
                    {props.translations["editAction"]}
                    <img
                        src={props.icons["Edit"]}
                        title={props.translations["editAction"]} />
                </a>
            </div>
            <div className="presets-display-actions">
                {props.presets.map(
                    ([id, totalMinutes, title]) => (
                        <PresetAction
                            key={id}
                            totalMinutes={totalMinutes}
                            title={title}
                        />)
                )}
            </div>
        </div>
    );
}