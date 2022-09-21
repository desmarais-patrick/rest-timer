export default function LanguageDetectionManager(supportedLangCodes, defaultLangCode) {
    const getDetectedLangCode = function () {
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
    };

    return {
        getDetectedLangCode,
    }
}