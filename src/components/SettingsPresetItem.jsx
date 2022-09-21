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

function parseMinutes(inputValue) {
    if (typeof inputValue === "number" && isNaN(inputValue) === false) {
        return inputValue;
    }

    if (typeof inputValue !== "string" || inputValue.length === 0) {
        return 1;
    }

    try {
        const parsedValue = parseInt(inputValue);
        if (isNaN(parsedValue) === false) {
            return parsedValue;
        }
    } catch (e) {
        // Silent parsing failed.
    }

    return 1;
}

export default function SettingsPresetItem({ presetId, translations, initialMinutes, initialTitle, onChange }) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [title, setTitle] = useState(initialTitle);

    const onMinuteChange = (event) => {
        setMinutes(event.target.value);
    };
    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onBlur = () => {
        const parsedMinutes = parseMinutes(minutes);
        onChange(presetId, parsedMinutes, title);
    };

    const parsedMinutes = parseMinutes(minutes);
    const unitsMinuteLabel = parsedMinutes > 1 ?
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