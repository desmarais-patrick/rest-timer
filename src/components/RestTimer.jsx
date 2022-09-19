import React, { useEffect, useState } from 'react';
import ControlsDisplay from './ControlsDisplay.jsx';
import IconDisplay from './IconDisplay.jsx';
import PresetsDisplay from './PresetsDisplay.jsx';
import SettingsDisplay from './SettingsDisplay.jsx';
import TimeDisplay from './TimeDisplay.jsx';

const ONE_MIN_IN_MILLIS = 60 * 1000;
const EXTRA_TIMEOUT_DELAY_IN_MS = 10;

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

function computeTimeLeftLevel(minutesLeft, totalTimerMinutes) {
    const percentage = Math.ceil(100 * minutesLeft / totalTimerMinutes);
    if (percentage >= 100) {
        return 100;
    } else if (percentage >= 90) {
        return 90;
    } else if (percentage >= 50) {
        return 50;
    } else if (percentage >= 10) {
        return 10;
    } else {
        return 0;
    }
}

function playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
}

export default function RestTimer(props) {
    const defaultMinutesLeft = props.presets[props.selectedPresetIndex][1];
    const defaultTimerDurationInMillis = defaultMinutesLeft * ONE_MIN_IN_MILLIS;
    const [timerState, setTimerState] = useState({
        state: "ready",
        startTimeDate: null,
        startTimerDurationInMillis: defaultTimerDurationInMillis,
        millisLeft: defaultTimerDurationInMillis,
        audioPlayed: false,
    });

    useEffect(() => {
        let minutesLeft = null;
        let timeoutId = null;
        if (timerState.state === "running") {
            const millisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
            if (millisLeft > 0) {
                minutesLeft = "↓ " + Math.ceil(millisLeft / ONE_MIN_IN_MILLIS) + "m";
                const millisLeftUntilNextMin = millisLeft % ONE_MIN_IN_MILLIS;

                const timeoutDelay = millisLeftUntilNextMin + EXTRA_TIMEOUT_DELAY_IN_MS;
                timeoutId = setTimeout(() => {
                    if (timerState.millisLeft <= 0 || timerState.state !== "running") {
                        return;
                    }

                    const newMillisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
                    const newState = newMillisLeft > 0 ? "running" : "end";
                    let audioPlayed = false;
                    if (newMillisLeft <= 0 && timerState.audioPlayed === false) {
                        playAudio(props.config.audio["Tabla"]);
                        audioPlayed = true;
                    }
                    setTimerState(timerState => ({
                        ...timerState,
                        state: newState,
                        millisLeft: newMillisLeft,
                        audioPlayed,
                    }));
                }, timeoutDelay);
            } else {
                minutesLeft = "0m";
                if (timerState.audioPlayed === false) {
                    playAudio(props.config.audio["Tabla"]);
                }
                setTimerState({
                    state: "end",
                    startTimeDate: null,
                    startTimerDurationInMillis: 0,
                    millisLeft: 0,
                    audioPlayed: true,
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
        timerState.audioPlayed,
        props.config.translations.appTitle,
        props.config.audio,
    ]);

    const onControlAction = (action) => {
        let millisLeft, resumeStartTime;
        switch (action) {
            case "play":
                millisLeft = props.presets[props.selectedPresetIndex][1] * ONE_MIN_IN_MILLIS;
                setTimerState({
                    state: "running",
                    startTimeDate: new Date(),
                    startTimerDurationInMillis: millisLeft,
                    millisLeft,
                    audioPlayed: false,
                });
                break;
            case "cancel":
                millisLeft = props.presets[props.selectedPresetIndex][1] * ONE_MIN_IN_MILLIS;
                setTimerState({
                    state: "ready",
                    startTimeDate: null,
                    startTimerDurationInMillis: millisLeft,
                    millisLeft,
                    audioPlayed: false,
                });
                break;
            case "pause":
                setTimerState(timerState => {
                    const pausedMillisLeft = computeTimeLeft(timerState.startTimeDate, timerState.startTimerDurationInMillis);
                    return {
                        ...timerState,
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
                        ...timerState,
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

    const minutesLeft = Math.ceil(timerState.millisLeft / ONE_MIN_IN_MILLIS);
    let timeLeftLevel = computeTimeLeftLevel(minutesLeft, props.presets[props.selectedPresetIndex][1]);

    return (
        <div className="rest-timer">
            <div className="main">
                <IconDisplay
                    minified={false}
                    icons={props.config.icons}
                    translations={props.config.translations}
                    timeLeftLevel={timeLeftLevel}
                />
                <TimeDisplay
                    icons={props.config.icons}
                    timerState={timerState.state}
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
