import React, { useState } from "react";

import SettingsPresetItem from "./SettingsPresetItem.jsx";

export default function SettingsDisplay({ translations, icons, presets, onCancel, onSave }) {
    const initialPresets = presets.map(([id, totalMinutes, title]) => [id, totalMinutes, title]);
    const [formState, setFormState] = useState({
        modifiedPresets: initialPresets,
    });

    const onPresetItemChange = (presetId, newMinutes, newTitle) => {
        let cleanMinutes = newMinutes;
        if (newMinutes < 1) {
            cleanMinutes = 1;
        } else if (newMinutes > 720) {
            cleanMinutes = 720;
        }

        let cleanTitle = newTitle.trim();
        if (newTitle.length === 0) {
            cleanTitle = "_";
        }

        setFormState(formState => {
            const newModifiedPresets = formState.modifiedPresets.map(([id, totalMinutes, title]) => {
                if (id === presetId) {
                    return [id, cleanMinutes, cleanTitle];
                }
                return [id, totalMinutes, title];
            });
            return {
                modifiedPresets: newModifiedPresets
            };
        });
    };

    const onAnchorExit = (event) => {
        event.preventDefault();
        onCancel();
    };
    const onFormCancel = (event) => {
        event.preventDefault();
        onCancel();
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        onSave(formState.modifiedPresets);
    };

    return (
        <div className="settings">
            <div className="settings-header">
                <div className="settings-title">
                    {translations["presetsTitle"]}
                </div>
                <div className="settings-exit">
                    <a href="#" title={translations["cancelAction"]} onClick={onAnchorExit}>
                        <img src={icons["Cancel"]} />
                    </a>
                </div>
            </div>
            <form className="settings-form" onSubmit={onFormSubmit}>
                <div className="settings-presets-list">
                    {formState.modifiedPresets.map(([id, totalMinutes, title]) => <SettingsPresetItem
                        key={id}
                        presetId={id}
                        translations={translations}
                        initialMinutes={totalMinutes}
                        initialTitle={title}
                        onChange={onPresetItemChange}
                    />)}
                </div>
                <div className="settings-form-footer">
                    <div className="settings-form-action">
                        <button className="cancel-action" type="button" onClick={onFormCancel}>
                            <img src={icons["Cancel"]} />
                            <span>{translations["cancelAction"]}</span>
                        </button>
                    </div>
                    <div className="settings-form-action">
                        <button className="save-action" type="submit">
                            <img src={icons["Save"]} />
                            <span>{translations["saveAction"]}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}