import React, { useState, useEffect } from "react";

import allTranslations from "../config/Translations.js";
import defaultPresets from "../config/DefaultPresets.js";

import Config from "../models/Config.js";

import RestTimer from "../components/RestTimer.jsx";

function useAppState(defaultLangCode) {
    const [state, setState] = useState({
        selectedLangCode: defaultLangCode,
    });

    useEffect(() => {
        // Detect browser language.
        const rand = Math.random() * 10;
        const detectedLanguage = (rand < 5) ? "en" : "fr";

        // Update state, if necessary.
        if (state.selectedLangCode !== detectedLanguage) {
            setState({
                selectedLangCode: detectedLanguage,
            });
        }
    }, [state.selectedLangCode]);

    return { state };
}

export default function App() {
    const defaultLangCode = "en";
    const { state } = useAppState(defaultLangCode);

    const config = new Config(allTranslations, defaultPresets);
    const timerConfig = config.generateConfig(state.selectedLangCode,
        defaultLangCode);

    return (
        <div className="container">
            <div className="content-container">
                <RestTimer config={timerConfig} />
            </div>
        </div>
    );
}
