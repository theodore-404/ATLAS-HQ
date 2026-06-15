import { getData }
from "./storage.js";

export function renderProgress() {
    const missions = getData("missions") || [];
    const completed = missions.filter(m => m.completed).length;
    const total = missions.length;
    let percent = 0;
    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }
    const blocks = Math.round(percent / 10);
    const bar =
    "█".repeat(blocks) +
    "░".repeat(10-blocks);
    document.getElementById("missionProgress").innerHTML = `
    <h2>MISSION COMPLETION</h2>
    <br>
    ${bar}
    <br><br>
    ${percent}%
    <br>
    ${completed} / ${total} Complete `;
}