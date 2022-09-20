import React, { useState, useEffect } from "react";

import allTranslations from "../config/Translations.js";
import TimerPresets from "../config/TimerPresets.js";
import icons from "../config/Icons.js";
import audio from "../config/Audio.js";

import Config from "../models/Config.js";

import RestTimer from "../components/RestTimer.jsx";
import LocalStorageWrapper from "../utilities/LocalStorageWrapper.js";
import TimerSettingsPersistenceManager from "../utilities/TimerSettingsPersistenceManager.js";

function getDetectedLangCode(supportedLangCodes, defaultLangCode) {
    const navigatorLanguage = window.navigator.language;
    let langRegExp;
    let i = 0;
    for (; i < supportedLangCodes.length; i++) {
        langRegExp = new RegExp(`^${supportedLangCodes[i]}\\b`, "i");
        if (langRegExp.test(navigatorLanguage)) {
            return supportedLangCodes[i];
        }
    }
    return defaultLangCode;
}

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
        const detectedLangCode = getDetectedLangCode(supportedLangCodes, defaultLangCode);
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
    }, [loading.languageDetected, langCode]); // presets is not dependency once user edits it.

    useEffect(() => {
        if (loading.localStorageRead) {
            return;
        }

        const localStorageWrapper = new LocalStorageWrapper();
        const persistenceManager = new TimerSettingsPersistenceManager(localStorageWrapper);
        const savedPresets = persistenceManager.readPresets();
        setLoading(loading => ({
            ...loading,
            localStorageRead: true,
        }));

        if (savedPresets === null) {
            return;
        }

        setPresets(presets => ({
            ...presets,
            collection: savedPresets,
            defaultPresetsOn: false,
            variationCount: presets.variationCount + 1,
        }));
    }, [loading.localStorageRead, presets]);

    return { loading, langCode, presets, setPresets };
}

export default function App() {
    const defaultLangCode = "en";
    const defaultPresets = TimerPresets.generateDefaultPresets(allTranslations[defaultLangCode]);
    const defaultPresetIndex = 0;
    const supportedLangCodes = Object.keys(allTranslations);
    const { loading, langCode, presets, setPresets } = useAppState(supportedLangCodes, defaultLangCode, defaultPresets, defaultPresetIndex);

    const config = new Config(allTranslations, defaultPresets, icons, audio);
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

    const isLoaded = loading.languageDetected && loading.localStorageRead;
    const containerClassName = isLoaded ? "content-container loaded" : "content-container";
    return (
        <div className="container">
            <div className={containerClassName}>
                <RestTimer key={presets.variationCount}
                    config={timerConfig}
                    presets={presets.collection}
                    selectedPresetIndex={presets.selectedPresetIndex}
                    onSelectPreset={onSelectPreset}
                    onPresetChange={onPresetCollectionChange} />
                <p className="footer">{timerConfig.translations["appTitle"].toUpperCase()}</p>
            </div>
        </div >
    );
}
