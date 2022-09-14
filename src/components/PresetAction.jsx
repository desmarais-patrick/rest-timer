import React from "react";

export default function PresetAction({ totalMinutes, title }) {
    return (
        <button>
            <div>{totalMinutes}</div>
            <div>{title}</div>
        </button>
    );
}