import {
    addMission, renderMissions, deleteMission
}
from "./mission.js";

document
.getElementById("addMission")
.addEventListener("click", () => {
    addMission();
    updateBriefing();
}
);

renderMissions();
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")
    ) {
const id =
e.target.dataset.id;
deleteMission(id);
updateBriefing();
}
});

updateBriefing();

export function updateBriefing() {
    const missions =
    JSON.parse(localStorage.getItem("missions")) || [];
    document.getElementById("briefing").innerHTML = `
    GOOD EVENING, WYNN
    <br><br>
    Active Missions : ${missions.length}
    <br>
    
    System Status : ONLINE `;
}