import React from "react";

export default function SettingsDisplay(props) {
    return (
        <div className="settings">
            <div className="settings-title">{props.translations["presetsTitle"]}</div>
            <form className="settings-presets-list">
                {props.presets.map(([id, totalMinutes, title]) => {
                    const unitsMinuteLabel = totalMinutes > 1 ?
                        props.translations["unitsMinutePlural"] :
                        props.translations["unitsMinuteSingular"];
                    return (
                        <div key={id} className="settings-presets-item">
                            <input type="number" value={totalMinutes} />
                            <span>{unitsMinuteLabel}</span>
                            <input type="text" value={title} />
                        </div>
                    );
                })}
                <button type="button">
                    <img src={props.icons["Cancel"]} />
                    {props.translations["cancelAction"]}
                </button>
                <button type="submit">
                    <img src={props.icons["Save"]} />
                    {props.translations["saveAction"]}
                </button>
            </form>
        </div>
    );
}