browser.contextMenus.create({
    id: "thread-selector-context",
    title: "Toggle image selector panel",
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "thread-selector-context") {
        browser.tabs.executeScript({
            file: "toggle.js"
        })
    }
});