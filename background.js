chrome.tabs.onCreated.addListener((newTab) => {
  // console.log(newTab);
  chrome.tabs.query({windowType:'normal'}, function(tabs) {
    // windowTabCounts = {}
    currentWindowTabCount = 0;
    tabs.map((tab) => {
      // console.log(tab.windowId)
      // if (!(tab.windowId in windowTabCounts)) {
      //   windowTabCounts[tab.windowId] = 0
      // }
      // windowTabCounts[tab.windowId] += 1;
      if (tab.windowId == newTab.windowId) {
        currentWindowTabCount += 1
      }
    })
    // console.log(currentWindowTabCount);
    if (currentWindowTabCount > 10) {
      chrome.tabs.remove(newTab.id, () => {
        console.log('ere');
        chrome.notifications.create(
        "test", {
            type: 'basic',
            iconUrl: 'images/icon.png',
            title: 'Too Many Tabs!',
            message: 'Close some. For all our sanity.',
            priority: 2,
            requireInteraction: false,
        }, () => console.log("sad"))
      });
    }
  });
});
