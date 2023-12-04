/**
 * Get data from local storage.
 *
 * @param {string} key - Storage key
 */
const getData = (key: string) => {
    try {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : null;
    } catch (error) {
        return null;
    }
};

/**
 * Set data to local storage.
 *
 * @param {string} key - Storage key
 * @param {object} value - Storage value
 */
const setData = (key: string, value: string) => {
    try {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));

            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
};

/**
 * Remove data from local storage.
 *
 * @param {string} key - Storage key
 */
const removeData = (key: string) => {
    try {
        localStorage.removeItem(key);

        return true;
    } catch (error) {
        return false;
    }
};

const Storage = {
    getData,
    setData,
    removeData,
};

export default Storage;