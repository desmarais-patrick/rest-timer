import React, { useState } from "react";

const totalMinutesInputStyle = {
    width: "4rem",
    marginRight: ".5rem",
};

const unitSpanStyle = {
    marginRight: ".5rem",
};

const titleInputStyle = {
    width: "8rem",
};

export default function SettingsPresetItem({ presetId, translations, initialMinutes, initialTitle, onChange }) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [title, setTitle] = useState(initialTitle);

    const onMinuteChange = (event) => {
        let intValue = event.target.value;
        if (typeof intValue === "string") {
            try {
                intValue = parseInt(intValue);
            } catch (e) {
                intValue = 1;
            }
        }
        setMinutes(intValue);
    };
    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onBlur = () => {
        onChange(presetId, minutes, title);
    };

    const unitsMinuteLabel = minutes > 1 ?
        translations["unitsMinutePlural"] :
        translations["unitsMinuteSingular"];

    return (
        <div className="settings-presets-item">
            <input
                type="number"
                value={minutes}
                onChange={onMinuteChange}
                onBlur={onBlur}
                max={720}
                min={1}
                step={1}
                style={totalMinutesInputStyle}
            />
            <span style={unitSpanStyle}>{unitsMinuteLabel}</span>
            <input
                type="text"
                value={title}
                onChange={onTitleChange}
                onBlur={onBlur}
                required={true}
                maxLength={120}
                style={titleInputStyle}
            />
        </div>
    );
}