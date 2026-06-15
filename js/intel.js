import {
    getData, saveData
}
from "./storage.js";

export function saveIntel() {
    const title = document.getElementById("intelTitle").value;
    const content = document.getElementById("intelContent").value;
    if (
        !title.trim() ||
        !content.trim()
    ) return;
    const intel = getData("intel") || [];
    intel.unshift({
        id: Date.now(), title, content
    });
    saveData("intel", intel);
    document.getElementById("intelTitle").value = "";
    document.getElementById("intelContent").value = "";
    renderIntel();
}

export function renderIntel() {
    const intel = getData("intel") || [];
    const list = document.getElementById("intelList");
    list.innerHTML = "";
    intel.forEach(item => {
        const div = document.createElement("div");
        div.className = "border border-blue-700 p-3";
        div.innerHTML = `
        <strong>${item.title}</strong>
        <br><br>
        ${item.content} `;
        list.appendChild(div);
    });
}