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
            <form className="settings-form">
                <div className="settings-presets-list">
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
                </div>
                <div className="settings-form-footer">
                    <div className="settings-form-action" style={{ paddingRight: ".5rem" }}>
                        <button className="cancel-action" type="button">
                            <img src={props.icons["Cancel"]} style={{ left: "1rem" }} />
                            <span style={{ marginLeft: "1rem", fontSize: "1rem" }}>{props.translations["cancelAction"]}</span>
                        </button>
                    </div>
                    <div className="settings-form-action" style={{ paddingLeft: ".5rem" }}>
                        <button className="save-action" type="submit">
                            <img src={props.icons["Save"]} style={{ right: "1rem" }} />
                            <span style={{ marginRight: "1rem", fontSize: "1rem" }}>{props.translations["saveAction"]}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}