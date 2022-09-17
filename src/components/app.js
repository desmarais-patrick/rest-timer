import React, { useState, useEffect } from "react";

import allTranslations from "../config/Translations.js";
import TimerPresets from "../config/TimerPresets.js";
import icons from "../config/Icons.js";

import Config from "../models/Config.js";

import RestTimer from "../components/RestTimer.jsx";

function useAppState(defaultLangCode, defaultPresets, defaultPresetIndex) {
    const [langCode, setLangCode] = useState(defaultLangCode);
    const [presets, setPresets] = useState({
        collection: defaultPresets,
        defaultPresetsOn: true,
        selectedPresetIndex: defaultPresetIndex,
    });

    useEffect(() => {
        // Detect browser language.
        const rand = Math.random() * 10;
        const detectedLangCode = (rand < 5) ? "en" : "fr";

        if (langCode !== detectedLangCode) {
            setLangCode(detectedLangCode);
            if (presets.defaultPresetsOn) {
                const newPresets = TimerPresets.generateDefaultPresets(allTranslations[detectedLangCode]);
                setPresets(presets => ({
                    ...presets,
                    collection: newPresets,
                }));
            }
        }
    }, [langCode]); // presets is not dependency once user edits it.

    useEffect(() => {
        // Read saved presets.
        const rand = Math.random() * 10;
        const savedPresets = (rand < 5) ? null : [
            ["A", 25, "Pomodoro"],
            ["B", 5, "🏃🏻‍♂️💨"],
            ["C", 15, "⌛️"]
        ];

        if (savedPresets === null) {
            return;
        }

        setPresets(presets => ({
            ...presets,
            collection: savedPresets,
            defaultPresetsOn: false,
        }));
    }, [presets]);

    return { langCode, presets, setPresets };
}

export default function App() {
    const defaultLangCode = "en";
    const defaultPresets = TimerPresets.generateDefaultPresets(allTranslations[defaultLangCode]);
    const defaultPresetIndex = 0;
    const { langCode, presets, setPresets } = useAppState(defaultLangCode, defaultPresets, defaultPresetIndex);

    const config = new Config(allTranslations, defaultPresets, icons);
    const timerConfig = config.generateConfig(langCode, defaultLangCode);

    const onSelectPreset = (newSelectedPresetId) => {
        let newSelectedPresetIndex = 0;
        presets.collection.forEach(([id], index) => {
            if (newSelectedPresetId === id) {
                newSelectedPresetIndex = index;
            }
        });
        setPresets({
            ...presets,
            selectedPresetIndex: newSelectedPresetIndex,
        });
    };

    return (
        <div className="container">
            <div className="content-container">
                <RestTimer
                    config={timerConfig}
                    presets={presets.collection}
                    selectedPresetIndex={presets.selectedPresetIndex}
                    onSelectPreset={onSelectPreset} />
                <p className="footer">{timerConfig.translations["appTitle"].toUpperCase()}</p>
            </div>
        </div>
    );
}
