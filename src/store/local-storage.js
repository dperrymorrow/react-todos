const LOCAL_STORAGE_KEY = "react-todos-mvc-redux-v2";
const DEFAULT_JSON = JSON.stringify({ todos: [], uiState: { filterBy: "all", sortBy: "updatedAt" } });

export default {
  load() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_JSON);
  },

  save(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },

  savePath(path, value) {
    const target = this.load();
    const segs = path.split(".");
    const last = segs.pop();
    segs.reduce((point, seg) => point[seg], target)[last] = value;
    this.save(target);
  },

};
