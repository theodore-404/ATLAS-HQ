let expenseChart = null;

export function renderExpenseChart(finances) {
    const canvas = document.getElementById("expenseChart");
    if (!canvas) return;
    const categories = {};
    finances.forEach(item => {
        if (item.type !== "expense") return;
        const category = item.category || "Other";
        categories[category] = (categories[category] || 0) + item.amount;
    });
    if (expenseChart) {
        expenseChart.destroy();
    }
    expenseChart = new Chart(canvas, {
        type: "pie",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories)
            }]
        }
    });
}