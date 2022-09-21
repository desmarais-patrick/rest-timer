const defaultPresets = [
    ["A", 30, "presetsDefaultA"],
    ["B", 3, "presetsDefaultB"],
    ["C", 15, "presetsDefaultC"]
];

function applyTranslations(presets, translations) {
    return presets.map(([id, totalMinutes, translationKey]) => {
        const title = translations[translationKey] || translationKey;
        // Leave key as title if translation is not found.
        return [id, totalMinutes, title];
    });
}

const generateDefaultPresets = (translations) => {
    return applyTranslations(defaultPresets, translations);
}

const TimerPresets = {
    applyTranslations,
    generateDefaultPresets,
};

export default TimerPresets;