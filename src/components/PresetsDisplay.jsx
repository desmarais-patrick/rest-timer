import React from "react";

import PresetAction from "./PresetAction.jsx";

export default function PresetsDisplay(props) {
    const onEdit = (event) => {
        event.preventDefault();
        props.showSettings();
    };

    return (
        <div className="presets-display">
            <div className="presets-display-header">
                <div className="presets-title">
                    {props.translations["presetsTitle"]}
                </div>
                <a className="presets-edit" href="#" onClick={onEdit}>
                    {props.translations["editAction"]}
                    <img
                        src={props.icons["Edit"]}
                        title={props.translations["editAction"]} />
                </a>
            </div>
            <div className="presets-display-actions">
                {props.presets.map(
                    ([id, totalMinutes, title], index) => (
                        <PresetAction
                            key={id}
                            id={id}
                            totalMinutes={totalMinutes}
                            title={title}
                            isSelected={props.selectedPresetIndex === index}
                            onSelect={props.onSelectPreset}
                        />)
                )}
            </div>
        </div>
    );
}