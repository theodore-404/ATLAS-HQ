import { getData } from "./storage.js";

let startTime = Date.now();

export function updateHeader() {
    const resources = getData("resources") || {};
    const missions = getData("missions") || [];
    const active = missions.filter(m => !m.completed);
    let threat = "LOW";
    if (active.length >= 5) {
        threat = "MEDIUM";
    }
    if (active.length >= 8) {
        threat = "HIGH";
    }
    document.getElementById("headerThreat").textContent = `THREAT : ${threat} `;
    document.getElementById("headerFocus").textContent = `FOCUS : ${resources.focus || 0}% `;
}

export function startUptime() {
    setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        document.getElementById("headerUptime").textContent = `UPTIME : ${h}:${m}:${s} `;
    }, 1000);
}