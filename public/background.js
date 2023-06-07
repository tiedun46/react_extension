// eslint-disable-next-line no-undef
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    console.log(currentTab.url);
  });