import {
    getData, saveData
}
from "./storage.js";

import {
    renderResources
}
from "./resources.js";

import {
    renderExpenseChart
}
from "./chart.js";

export function addFinance() {
    const description = document.getElementById("financeDescription").value;
    const amount = Number(document.getElementById("financeAmount").value);
    const type = document.getElementById("financeType").value;
    const finances = getData("finances") || [];
    finances.push({
        id: Date.now(), description, amount, type
    });
    saveData("finances", finances);
    renderFinances();
}

export function renderFinances() {
    const finances = getData("finances") || [];
    const list = document.getElementById("financeList");
    list.innerHTML = "";
    finances.forEach(item => {
        const div = document.createElement("div");
        div.className = "border border-green-500 p-2 mb-2";
        div.innerHTML =
        `${item.type.toUpperCase()}
        - ${item.description}
        - Rp ${item.amount}
        <button
        class="delete-finance border border-red-500 px-2 py-1 ml-2"
        data-id="${item.id}">DELETE</button> `;
        list.appendChild(div);
        div.querySelector(".delete-finance").addEventListener("click", () => {
            deleteFinance(item.id);
    });
});
    let income = 0;
    let expense = 0;

    finances.forEach(item => {
        if (item.type === "income") {
            income += item.amount;
        } else {
            expense += item.amount;
        }
    });
    document.getElementById("incomeTotal").textContent =
    `Income : Rp ${income} `;
    document.getElementById("expenseTotal").textContent =
    `Expense : Rp ${expense} `;
    document.getElementById("savingsTotal").textContent =
    `Savings : Rp ${income - expense} `;
    const resources = getData("resources") || {};
    resources.money = income - expense;
    saveData("resources", resources);
    renderResources();
    const moneyInput = document.getElementById("moneyInput");
    if (moneyInput) {
        moneyInput.value = income - expense;
    }
    renderExpenseChart(finances);
}

export function deleteFinance(id) {
    const finances = getData("finances") || [];
    const updated = finances.filter(item => item.id !== id);
    saveData("finances", updated);
    renderFinances();
}