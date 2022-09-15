import React from "react";

const totalMinutesInputStyle = {
    width: "3rem",
    marginRight: ".5rem",
};

const unitSpanStyle = {
    marginRight: ".5rem",
};

const titleInputStyle = {
    width: "8rem",
};

export default function SettingsDisplay(props) {
    return (
        <div className="settings">
            <div className="settings-header">
                <div className="settings-title">
                    {props.translations["presetsTitle"]}
                </div>
                <div className="settings-exit">
                    <a href="#" title={props.translations["cancelAction"]}>
                        <img src={props.icons["Cancel"]} />
                    </a>
                </div>
            </div>
            <form className="settings-presets-list">
                {props.presets.map(([id, totalMinutes, title]) => {
                    const unitsMinuteLabel = totalMinutes > 1 ?
                        props.translations["unitsMinutePlural"] :
                        props.translations["unitsMinuteSingular"];
                    return (
                        <div key={id} className="settings-presets-item">
                            <input
                                type="number"
                                value={totalMinutes}
                                style={totalMinutesInputStyle}
                            />
                            <span style={unitSpanStyle}>{unitsMinuteLabel}</span>
                            <input
                                type="text"
                                value={title}
                                style={titleInputStyle}
                            />
                        </div>
                    );
                })}
                <div className="settings-form-footer">
                    <div className="settings-form-action">
                        <button className="cancel-action" type="button">
                            <img src={props.icons["Cancel"]} />
                            {props.translations["cancelAction"]}
                        </button>
                    </div>
                    <div className="settings-form-action">
                        <button className="save-action" type="submit">
                            <img src={props.icons["Save"]} />
                            {props.translations["saveAction"]}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}