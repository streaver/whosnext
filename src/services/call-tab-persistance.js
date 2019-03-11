const LS_CACHED_TAB_DATA_KEY = 'whosnext:cached-tab-data';

const getTabList = () => JSON.parse(window.localStorage.getItem(LS_CACHED_TAB_DATA_KEY) || '[]');
const saveTabList = tabsList => window.localStorage.setItem(LS_CACHED_TAB_DATA_KEY, JSON.stringify(tabsList));

function useList(cb) {
  const tabsList = getTabList();

  saveTabList(cb(tabsList) || tabsList);
}

function remove(tabId) {
  useList(tabsList => {
    const tab = tabsList.find(t => t.tabId === tabId);
    const tabIndex = tabsList.indexOf(tab);

    if (tabIndex >= 0) {
      tabsList.splice(tabIndex, 1);
    }

    return tabsList;
  });
}

function save(tab, meetingId, userDetails) {
  remove(tab.id);

  useList(tabsList => {
    tabsList.push({
      tabId: tab.id,
      tabUrl: tab.url,
      meetingId,
      userDetails,
    });

    return tabsList;
  });
}

function exists(tabId) {
  let tabExists = false;

  useList(tabsList => {
    tabExists = !!tabsList.find(t => t.tabId === tabId);
  });

  return tabExists;
}

function find(tabId) {
  let tab;

  useList(tabsList => {
    tab = tabsList.find(t => t.tabId === tabId);
  });

  return tab;
}

export default { save, remove, exists, find };
