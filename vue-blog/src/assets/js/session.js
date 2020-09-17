const session = window.sessionStorage;
export default {
  set(key, val) {
    if (val === undefined) {
      return;
    }
    session.setItem(key, serialize(val));
  },
  get(key, def) {
    const val = deserialize(session.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key) {
    session.removeItem(key);
  },
  clear() {
    session.clear();
  }
};

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== "string") {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}
