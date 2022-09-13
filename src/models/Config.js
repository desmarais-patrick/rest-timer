export default function Config(allTranslations, defaultPresets) {

    function generateConfig(langCode, defaultLangCode) {
        const selectedLangCode = typeof allTranslations[langCode] !== "undefined" ?
            langCode : defaultLangCode;
        const translations = allTranslations[selectedLangCode];

        return {
            translations,
            selectedLangCode,

            defaultPresets,
        };
    }

    return {
        generateConfig,
    };
}