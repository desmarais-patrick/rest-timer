import React, { useEffect, useState } from 'react';
import ControlsDisplay from './ControlsDisplay.jsx';
import IconDisplay from './IconDisplay.jsx';
import PresetsDisplay from './PresetsDisplay.jsx';
import SettingsDisplay from './SettingsDisplay.jsx';
import TimeDisplay from './TimeDisplay.jsx';

export default function RestTimer(props) {
    const defaultMinutesLeft = props.presets[props.selectedPresetIndex][1];

    const [timerState, setTimerState] = useState("ready");
    const [minutesLeft, setMinutesLeft] = useState(defaultMinutesLeft);

    useEffect(() => {
        document.title = props.config.translations.appTitle;

        const timeoutId = setTimeout(() => {
            if (minutesLeft === 0 || timerState !== "running") {
                return;
            }

            const newMinutesLeft = (minutesLeft > 0) ? minutesLeft - 1 : 0;
            setMinutesLeft(newMinutesLeft);
        }, 60000);

        return () => {
            clearTimeout(timeoutId);
        };
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
                setMinutesLeft(props.presets[props.selectedPresetIndex][1]);
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
                    minutesLeft={minutesLeft}
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
