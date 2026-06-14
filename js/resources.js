import {
    getData, saveData
}
from "./storage.js";

export function saveResources() {
    const resources = {
        money: document.getElementById("moneyInput").value,
        energy: document.getElementById("energyInput").value,
        focus: document.getElementById("focusInput").value,
        time: document.getElementById("timeInput").value
    };
    saveData("resources", resources);
    renderResources();
}

export function renderResources() {
    const resources = getData("resources");
    const display = document.getElementById("resourceDisplay");
    if (!resources.money) {
        display.innerHTML =
        "No resource data";
        return;
    }
    display.innerHTML = `
    Money :
    Rp${resources.money}
    <br>
    Energy :
    ${resources.energy}%
    <br>
    Focus :
    ${resources.focus}%
    <br>
    Free Time :
    ${resources.time}h `;
}