// localStorage wrapper — drop-in replacement for Claude.ai window.storage API

export function load(key) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // quota exceeded or private browsing — fail silently
  }
}
