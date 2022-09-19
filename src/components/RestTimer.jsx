import React, { useEffect, useState } from 'react';
import ControlsDisplay from './ControlsDisplay.jsx';
import IconDisplay from './IconDisplay.jsx';
import PresetsDisplay from './PresetsDisplay.jsx';
import SettingsDisplay from './SettingsDisplay.jsx';
import TimeDisplay from './TimeDisplay.jsx';

function computeTimeLeft(startTimeDate, timerDurationInMillis) {
    const startTime = startTimeDate.getTime();
    const endTime = startTime + timerDurationInMillis;
    if (endTime <= 0) {
        return -1;
    }

    const currentTimeDate = new Date();
    const currentTime = currentTimeDate.getTime();

    const timeLeftInMillis = endTime - currentTime;
    return timeLeftInMillis;
}

export default function RestTimer(props) {
    const defaultMinutesLeft = props.presets[props.selectedPresetIndex][1];
    const defaultTimerDurationInMillis = defaultMinutesLeft * 60 * 1000;
    const [timerState, setTimerState] = useState({
        state: "ready",
        startTimeDate: null,
        startTimerDurationInMillis: defaultTimerDurationInMillis,
        millisLeft: defaultTimerDurationInMillis,
    });

    useEffect(() => {
        let minutesLeft = null;
        let timeoutId = null;
        if (timerState.state === "running") {
            const millisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
            if (millisLeft > 0) {
                const oneMinuteInMillis = 60 * 1000;
                minutesLeft = "↓" + Math.ceil(millisLeft / oneMinuteInMillis) + "m";
                const millisLeftUntilNextMin = millisLeft % oneMinuteInMillis;

                const timeoutDelay = millisLeftUntilNextMin + 1;
                timeoutId = setTimeout(() => {
                    if (timerState.millisLeft <= 0 || timerState.state !== "running") {
                        return;
                    }

                    const newMillisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
                    const newState = newMillisLeft > 0 ? "running" : "end";
                    setTimerState(timerState => ({
                        ...timerState,
                        state: newState,
                        millisLeft: newMillisLeft,
                    }));
                }, timeoutDelay);
            } else {
                minutesLeft = "0m";
                setTimerState({
                    state: "end",
                    startTimeDate: null,
                    startTimerDurationInMillis: 0,
                    millisLeft: 0,
                });
            }
        }

        if (!minutesLeft) {
            document.title = props.config.translations.appTitle;
        } else {
            document.title = `${minutesLeft} | ${props.config.translations.appTitle}`;
        }

        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, [
        timerState.state,
        timerState.startTimeDate,
        timerState.startTimerDurationInMillis,
        timerState.millisLeft,
        props.config.translations.appTitle
    ]);

    const onControlAction = (action) => {
        let millisLeft, resumeStartTime;
        switch (action) {
            case "play":
                millisLeft = props.presets[props.selectedPresetIndex][1] * 60 * 1000;
                setTimerState({
                    state: "running",
                    startTimeDate: new Date(),
                    startTimerDurationInMillis: millisLeft,
                    millisLeft,
                });
                break;
            case "cancel":
                millisLeft = props.presets[props.selectedPresetIndex][1] * 60 * 1000;
                setTimerState({
                    state: "ready",
                    startTimeDate: null,
                    startTimerDurationInMillis: millisLeft,
                    millisLeft,
                });
                break;
            case "pause":
                setTimerState(timerState => {
                    const pausedMillisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
                    return {
                        state: "paused",
                        millisLeft: pausedMillisLeft,
                    };
                });
                break;
            case "resume":
                setTimerState(timerState => {
                    resumeStartTime = new Date();
                    millisLeft = computeTimeLeft(resumeStartTime, timerState.millisLeft);
                    return {
                        state: "running",
                        startTimeDate: resumeStartTime,
                        startTimerDurationInMillis: timerState.millisLeft,
                        millisLeft,
                    };
                });
                break;
            default:
                throw new Error(`Control action not supported ${action}`);
        }
    };

    const minutesLeft = Math.ceil(timerState.millisLeft / (60 * 1000));

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
                    timerState={timerState.state}
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
