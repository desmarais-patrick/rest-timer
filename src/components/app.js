import React, { useState, useEffect } from "react";

import allTranslations from "../config/Translations.js";
import TimerPresets from "../config/TimerPresets.js";
import icons from "../config/Icons.js";
import audio from "../config/Audio.js";

import TimerConfigManager from "../utilities/TimerConfigManager.js";

import LocalStorageWrapper from "../utilities/LocalStorageWrapper.js";
import TimerSettingsPersistenceManager from "../utilities/TimerSettingsPersistenceManager.js";

import RestTimer from "../components/RestTimer.jsx";
import LanguageDetectionManager from "../utilities/LanguageDetectionManager.js";

function useAppState(supportedLangCodes, defaultLangCode, defaultPresets, defaultPresetIndex) {
    const [loading, setLoading] = useState({
        languageDetected: false,
        localStorageRead: false,
    });
    const [langCode, setLangCode] = useState(defaultLangCode);
    const [presets, setPresets] = useState({
        collection: defaultPresets,
        defaultPresetsOn: true,
        selectedPresetIndex: defaultPresetIndex,
        variationCount: 0,
    });

    useEffect(() => {
        const languageDetection = new LanguageDetectionManager(supportedLangCodes, defaultLangCode);
        const detectedLangCode = languageDetection.getDetectedLangCode();
        if (langCode !== detectedLangCode) {
            setLangCode(detectedLangCode);
            if (presets.defaultPresetsOn) {
                const newTranslations = allTranslations[detectedLangCode];
                const newPresets = TimerPresets.generateDefaultPresets(newTranslations);
                setPresets(presets => ({
                    ...presets,
                    collection: newPresets,
                    variationCount: presets.variationCount + 1,
                }));
            }
        }
        setLoading(loading => ({
            ...loading,
            languageDetected: true,
        }));
    }, [loading.languageDetected, langCode]); // presets is not a dependency once user edits it.

    useEffect(() => {
        if (loading.localStorageRead) {
            return;
        }

        const localStorageWrapper = new LocalStorageWrapper();
        const persistenceManager = new TimerSettingsPersistenceManager(localStorageWrapper);
        const savedPresets = persistenceManager.readPresets();
        if (savedPresets !== null) {
            setPresets(presets => ({
                ...presets,
                collection: savedPresets,
                defaultPresetsOn: false,
                variationCount: presets.variationCount + 1,
            }));
        }

        setLoading(loading => ({
            ...loading,
            localStorageRead: true,
        }));
    }, [loading.localStorageRead, presets]);

    return { loading, langCode, presets, setPresets };
}

export default function App() {
    const supportedLangCodes = Object.keys(allTranslations);
    const defaultLangCode = "en";
    const defaultTranslations = allTranslations[defaultLangCode];
    const defaultPresets = TimerPresets.generateDefaultPresets(defaultTranslations);
    const defaultPresetIndex = 0;
    const { loading, langCode, presets, setPresets } = useAppState(supportedLangCodes, defaultLangCode, defaultPresets, defaultPresetIndex);

    const configManager = new TimerConfigManager(allTranslations, defaultPresets, icons, audio);
    const timerConfig = configManager.generateConfig(langCode);

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
            variationCount: presets.variationCount + 1,
        });
    };

    const onPresetCollectionChange = (newPresets) => {
        const localStorageWrapper = new LocalStorageWrapper();
        const persistenceManager = new TimerSettingsPersistenceManager(localStorageWrapper);
        persistenceManager.savePresets(newPresets);

        setPresets({
            ...presets,
            collection: newPresets,
            defaultPresetsOn: false,
            variationCount: presets.variationCount + 1,
        });
    };

    const isLoadComplete = loading.languageDetected && loading.localStorageRead;
    const containerClassName = isLoadComplete ? "content-container loaded" : "content-container";
    return (
        <div className="container">
            <div className={containerClassName}>
                <RestTimer key={presets.variationCount}
                    config={timerConfig}
                    presets={presets.collection}
                    selectedPresetIndex={presets.selectedPresetIndex}
                    onSelectPreset={onSelectPreset}
                    onPresetChange={onPresetCollectionChange} />
                <p className="footer">
                    {timerConfig.translations["appTitle"].toUpperCase()}
                </p>
            </div>
        </div >
    );
}
