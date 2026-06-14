import {
    getData,
    saveData
}
from "./storage.js";

export function renderMissions() {
    const missions =
    getData("missions") || [];
    const missionList =
    document.getElementById("missionList");
    missionList.innerHTML = "";
    missions.forEach(mission => {
        const li =
        document.createElement("li");
        li.className =
        "flex justify-between border border-green-700 p-2";
        li.innerHTML = `
        <div class="flex gap-2">
        <input
        type="checkbox"
        class="toggle-btn"
        data-id="${mission.id}"
        ${mission.completed ? "checked" : ""}>
        <span>${mission.title}</span>
        </div>
        <button
        class="delete-btn"
        data-id="${mission.id}">X</button>`;
        missionList.appendChild(li);
    });
}

export function addMission() {
    const input =
    document.getElementById("missionInput");
    const title =
    input.value.trim();
    if (!title) return;
    const missions =
    getData("missions") || [];
    missions.push({
        id: Date.now(),
        title: title,
        completed: false
    });

    saveData("missions", missions);
    input.value = "";
    renderMissions();
}

export function deleteMission(id) {
    const missions =
    getData("missions") || [];
    const filtered =
    missions.filter(mission => mission.id != id);
    saveData("missions", filtered);
    renderMissions();
}

export function toggleMission(id) {
    const missions =
    getData("missions") || [];
    const mission =
    missions.find(m => m.id == id);
    if (!mission) return;
    mission.completed =
    !mission.completed;
    saveData("missions", missions);
    renderMissions();
}