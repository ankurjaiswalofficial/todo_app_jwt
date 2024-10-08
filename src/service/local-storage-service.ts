// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SetLocalStorageService = (key: string, value: string | object, serialized: boolean): void => {
    try {
        const serializedValue = serialized ? String(value) : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
    }
};


const GetLocalStorageService = (key: string): string | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return serializedValue;
    } catch (error) {
        console.error("Error reading data from localStorage:", error);
        return null;
    }
};


export { SetLocalStorageService, GetLocalStorageService };
