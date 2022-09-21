export default function TimerConfigManager(allTranslations, defaultPresets, icons, audio) {

    function generateConfig(langCode) {
        const translations = allTranslations[langCode];

        return {
            translations,
            translationsLangCode: langCode,

            icons,
            audio,

            defaultPresets,
        };
    }

    return {
        generateConfig,
    };
}