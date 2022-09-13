import React, { useState, useEffect } from "react";

import allTranslations from "../config/Translations.js";
import defaultPresets from "../config/DefaultPresets.js";
import icons from "../config/Icons.js";

import Config from "../models/Config.js";

import RestTimer from "../components/RestTimer.jsx";

function useAppState(defaultLangCode, defaultPresets, defaultPresetIndex) {
    const [state, setState] = useState({
        selectedLangCode: defaultLangCode,
        presets: defaultPresets,
        selectedPreset: defaultPresetIndex,
    });

    useEffect(() => {
        // Detect browser language.
        const rand = Math.random() * 10;
        const detectedLangCode = (rand < 5) ? "en" : "fr";

        if (state.selectedLangCode !== detectedLangCode) {
            setState(state => ({
                ...state,
                selectedLangCode: detectedLangCode,
            }));
        }
    }, [state.selectedLangCode]);

    useEffect(() => {
        // Read saved presets.
        const rand = Math.random() * 10;
        const savedPresets = (rand < 5) ? null : [
            ["A", 25, "Pomodoro"],
            ["B", 5, "Move"],
            ["C", 15, "Long break"]
        ];

        if (savedPresets === null) {
            return;
        }

        setState(state => ({
            ...state,
            presets: savedPresets,
        }));
    }, [state.presets]);

    return { state };
}

export default function App() {
    const defaultLangCode = "en";
    const defaultPresetIndex = 0;
    const { state } = useAppState(defaultLangCode, defaultPresets, defaultPresetIndex);

    const config = new Config(allTranslations, defaultPresets, icons);
    const timerConfig = config.generateConfig(state.selectedLangCode,
        defaultLangCode);

    return (
        <div className="container">
            <div className="content-container">
                <RestTimer
                    config={timerConfig}
                    presets={state.presets}
                    selectedPresetIndex={state.selectedPreset} />
            </div>
        </div>
    );
}
