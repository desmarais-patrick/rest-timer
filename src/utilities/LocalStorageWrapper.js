export default function LocalStorageWrapper() {
    let localStorageAvailable = true;
    try {
        if (typeof window.localStorage === "undefined") {
            localStorageAvailable = false;
        }
    } catch (e) {
        localStorageAvailable = false;
    }

    if (!localStorageAvailable) {
        return {
            read: (key) => { return null; },
            save: (key, value) => { return; },
        };
    }

    function readObject(key) {
        const jsonStr = window.localStorage.getItem(key);
        if (!jsonStr) {
            return null;
        }
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            return null;
        }
    }

    function saveObject(key, value) {
        const jsonStr = JSON.stringify(value);
        try {
            window.localStorage.setItem(key, jsonStr);
        } catch (e) {
            console.error("Saving presets failed", e);
            return;
        }
    }

    return {
        read: readObject,
        save: saveObject,
    };
}