export function showPage(pageId) {
    const pages = [
        "dashboardPage",
        "missionsPage",
        "resourcesPage",
        "intelPage",
        "historyPage",
        "logsPage"
    ];
    pages.forEach(page => {
        const element =
        document.getElementById(page);
        if (!element) return;
        element.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
}