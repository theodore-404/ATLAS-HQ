import {
    getData, saveData
}
from "./storage.js";

export function addSystemLog(text) {
    const logs = getData("systemLogs") || [];
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID");
    logs.unshift({
        time, text
    });
    saveData("systemLogs", logs);
    renderSystemLog();
}

export function renderSystemLog() {
    const logs = getData("systemLogs") || [];
    const container = document.getElementById("systemLog");
    container.innerHTML = "";
    logs.slice(0, 10).forEach(log => {
        const div = document.createElement("div");
        div.innerHTML = `
        [${log.time}]
        ${log.text} `;
        container.appendChild(div);
    });
}