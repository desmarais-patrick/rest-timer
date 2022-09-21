import React from "react";

export default function PresetAction({ id, totalMinutes, title, isSelected, onSelect }) {
    const containerClassName = isSelected ? "presets-action selected" : "presets-action";
    return (
        <div className={containerClassName}>
            <button onClick={() => onSelect(id)}>
                <div className="presets-action-minutes">{totalMinutes + "m"}</div>
                <div className="presets-action-title">{title}</div>
            </button>
        </div>
    );
}