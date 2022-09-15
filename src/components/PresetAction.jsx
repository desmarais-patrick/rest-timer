import React from "react";

export default function PresetAction({ totalMinutes, title }) {
    return (
        <div className="presets-action">
            <button>
                <div className="presets-action-minutes">{totalMinutes}</div>
                <div className="presets-action-title">{title}</div>
            </button>
        </div>
    );
}