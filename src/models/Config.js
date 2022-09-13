export default function Config(allTranslations, defaultPresets, icons) {

    function generateConfig(langCode, defaultLangCode) {
        const selectedLangCode = typeof allTranslations[langCode] !== "undefined" ?
            langCode : defaultLangCode;
        const translations = allTranslations[selectedLangCode];

        return {
            translations,
            translationsLangCode: selectedLangCode,

            icons,

            defaultPresets,
        };
    }

    return {
        generateConfig,
    };
}