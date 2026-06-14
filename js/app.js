import {
    addMission, renderMissions, deleteMission, toggleMission
}
from "./mission.js";

import {
    saveResources, renderResources
}
from "./resources.js";

document
.getElementById("addMission")
.addEventListener("click", () => {
    addMission();
    updateBriefing();
    updateThreats();
}
);

document
.getElementById("saveResources")
.addEventListener("click", saveResources);

renderMissions();
renderResources();
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")
    ) {
const id =
e.target.dataset.id;
deleteMission(id);
updateBriefing();
updateThreats();
}
});

document.addEventListener("change", (e) => {
    if (e.target.classList.contains("toggle-btn")) {
        toggleMission(e.target.dataset.id);
        updateThreats();
    }
});

updateBriefing();
updateThreats();

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

function updateThreats() {
    const missions =
    JSON.parse(localStorage.getItem("missions")) || [];
    const activeMissions =
    missions.filter(m => !m.completed);
    const threats =
    document.getElementById("threats");
    if (activeMissions.length >= 5) {
        threats.innerHTML = `
        ⚠ HIGH WORKLOAD DETECTED
        <br><br>
        Active Missions : ${activeMissions.length}`;
    }
    else {
        threats.innerHTML =
        "No threats detected";
    }
}