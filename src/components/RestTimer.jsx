import React, { useEffect, useState } from 'react';
import ControlsDisplay from './ControlsDisplay.jsx';
import IconDisplay from './IconDisplay.jsx';
import PresetsDisplay from './PresetsDisplay.jsx';
import SettingsDisplay from './SettingsDisplay.jsx';
import TimeDisplay from './TimeDisplay.jsx';

export default function RestTimer(props) {
    const [timerState, setTimerState] = useState("ready");

    useEffect(() => {
        document.title = props.config.translations.appTitle;
    });

    const onControlAction = (action) => {
        switch (action) {
            case "play":
                setTimerState("running");
                break;
            case "pause":
                setTimerState("paused");
                break;
            case "cancel":
                setTimerState("ready");
                break;
            case "resume":
                setTimerState("running");
                break;
            default:
                throw new Error(`Control action not supported ${action}`);
        }
    };

    return (
        <div className="rest-timer">
            <div className="main">
                <IconDisplay
                    minified={false}
                    icons={props.config.icons}
                    translations={props.config.translations}
                    timeLeftLevel={100}
                />
                <TimeDisplay
                    icons={props.config.icons}
                    minutesLeft={30}
                />
            </div>
            <div className="actions">
                <ControlsDisplay
                    icons={props.config.icons}
                    translations={props.config.translations}
                    timerState={timerState}
                    onControlAction={onControlAction}
                />
                <PresetsDisplay
                    icons={props.config.icons}
                    translations={props.config.translations}
                    presets={props.presets}
                    selectedPresetIndex={props.selectedPresetIndex}
                    onSelectPreset={props.onSelectPreset}
                />
            </div>
            <SettingsDisplay
                icons={props.config.icons}
                translations={props.config.translations}
                presets={props.presets}
            />
        </div>
    );
}
