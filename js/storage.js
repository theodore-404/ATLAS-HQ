export function getData(key) {
    const data =
    localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
}

export function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}