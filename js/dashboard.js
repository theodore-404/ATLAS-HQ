import { getData }
from "./storage.js";

export function updateDashboard() {
    const missions = getData("missions") || [];
    const resources = getData("resources") || {};
    const active = missions.filter(m => !m.completed).length;
    document.getElementById("activeMissionCount").textContent = active;
    document.getElementById("moneyStatus").textContent = resources.money || 0;
    document.getElementById("focusStatus").textContent = `${resources.focus || 0}% `;
    let threat = "LOW";
    if (active >= 5) threat = "MEDIUM";
    if (active >= 8) threat = "HIGH";
    document.getElementById("threatStatus").textContent = threat;
}