import {
    getData, saveData
}
from "./storage.js";

export function addHistory(text) {
    const history = getData("history") || [];
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
    });
    history.unshift({
        time, text
    });
    saveData("history", history);
    renderHistory();
}

export function renderHistory() {
    const history = getData("history") || [];
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history
    .slice(0, 20)
    .forEach(item => {
        const li =
        document.createElement("li");
        li.className = "border border-green-700 p-2";
        li.innerHTML = `
        [${item.time}]
        <br>
        ${item.text} `;
        list.appendChild(li);
    });
}