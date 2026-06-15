import {
    addMission, renderMissions, deleteMission, toggleMission
}
from "./mission.js";

import {
    saveResources, renderResources
}
from "./resources.js";

import {
    addHistory, renderHistory
}
from "./history.js";

import {
    renderProgress
}
from "./progress.js";

import {
    saveIntel, renderIntel
}
from "./intel.js"

import {
    addSystemLog, renderSystemLog
}
from "./systemLog.js";

import {
    showPage
}
from "./navigation.js";

document
.getElementById("addMission")
.addEventListener("click", () => {
    const title =
    document.getElementById("missionInput").value;
    addMission();
    addSystemLog("MISSION ADDED");
    renderProgress();
    addHistory(`Mission Added: ${title}`);
    updateBriefing();
    updateThreats();
}
);

document
.getElementById("saveResources")
.addEventListener("click", () => {
    saveResources();
    addSystemLog("RESOURCE STATUS UPDATED");
    updateBriefing();
    addHistory("Resources Updated");
});

renderMissions();
renderResources();
renderHistory();
renderProgress();
renderIntel();
renderSystemLog();

addSystemLog("SYSTEM ONLINE");
addSystemLog("DATABASES LOADED");

document.getElementById("saveIntel").addEventListener("click", () => {
    saveIntel();
    addSystemLog("INTEL DATABASE UPDATED");
    addHistory("New Intel Logged");
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")
    ) {
const id =
e.target.dataset.id;
deleteMission(id);
addSystemLog("MISSION DELETED");
renderProgress();
addHistory("Mission Deleted");
updateBriefing();
updateThreats();
}
});

document.addEventListener("change", (e) => {
    if (e.target.classList.contains("toggle-btn")) {
        toggleMission(e.target.dataset.id);
        addSystemLog("MISSION STATUS UPDATED");
        renderProgress();
        updateThreats();
        updateBriefing();
    }
});

updateBriefing();
updateThreats();

export function updateBriefing() {
    const missions =
    JSON.parse(localStorage.getItem("missions")) || [];
    const resources =
    JSON.parse(localStorage.getItem("resources")) || {};
    const activeMissions =
    missions.filter(m => !m.completed);
    let moneyStatus =
    "UNKNOWN";
    if (Number(resources.money) >= 500000) {
        moneyStatus = "STABLE"; }
        else {
            moneyStatus = "LOW";
    }
    let threatLevel = "LOW";
    let threatColor = "lime";
    if (activeMissions.length >= 5) {
        threatLevel = "MEDIUM";
        threatColor = "yellow";
    }
    if (activeMissions.length >= 8) {
        threatLevel = "HIGH";
        threatColor = "red";
    }
    document.getElementById("briefing").innerHTML = `
    GOOD EVENING, WYNN
    <br><br>
    Money Status : ${moneyStatus}
    <br>
    Focus Level : ${resources.focus || 0}%
    <br><br>
    Active Missions : ${activeMissions.length}
    <br>
    Threat Level : 
    <span style="color:${threatColor}; font-weight:bold;"> ${threatLevel} </span> `;
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

document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
        const page = button.dataset.page;
        const map = {
            dashboard: "dashboardPage",
            missions: "missionsPage",
            resources: "resourcesPage",
            intel: "intelPage",
            history: "historyPage",
            logs: "logsPage"
        };
        showPage(map[page]);
    });
});

showPage("dashboardPage");