// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SetLocalStorageService = (key: string, value: string | object, serialized: boolean): void => {
    try {
        const serializedValue = serialized ? String(value) : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
    }
};


const GetLocalStorageService = <T>(key: string): T | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue) as T;
    } catch (error) {
        console.error("Error reading data from localStorage:", error);
        return null;
    }
};


export { SetLocalStorageService, GetLocalStorageService };
