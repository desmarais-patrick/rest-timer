export default function TimerSettingsPersistenceManager(persistenceImpl) {
    const PRESETS_KEY = "presets";

    const readPresets = () => {
        return persistenceImpl.read(PRESETS_KEY);
    };

    const savePresets = (presets) => {
        persistenceImpl.save(PRESETS_KEY, presets);
    };

    return {
        readPresets,
        savePresets,
    };
}