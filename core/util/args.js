const _h = (a, kw, v, _q) => {
  if (v[0] === "-") {
    if (v[1] === "-") {
      const z = v.indexOf("=", 2);
      if (z === -1) {
        kw[v.slice(2)] = true;
      } else {
        kw[v.slice(2, z)] = v.slice(z + 1 + _q);
      }
    } else {
      const z = v.indexOf("=", 1);
      let l = v.length;
      let p = true;
      if (z !== -1) {
        l = z;
        p = v.slice(z + 1 + _q);
      }
      for (let i = 1; i < l; i++) {
        kw[v[i]] = p;
      }
    }
  } else {
    a.push(v.slice(_q));
  }
};

export const parse = (s) => {
  const args = [];
  const kwargs = {};
  let q;
  let x;
  for (let i = 0, j = s.length; i < j; i++) {
    const c = s[i];
    if (q !== undefined) {
      if (c === q) {
        _h(args, kwargs, s.slice(x, i), 1);
        q = undefined;
        x = undefined;
      }
    } else if (c === "'" || c === '"' || c === "`") {
      q = c;
      if (x === undefined) {
        x = i;
      }
    } else if (c === " " || c === "\n") {
      if (x !== undefined) {
        _h(args, kwargs, s.slice(x, i), 0);
        x = undefined;
      }
    } else if (x === undefined) {
      x = i;
    }
  }
  if (x !== undefined) {
    _h(args, kwargs, s.slice(x), 0);
  }
  return { args, kwargs };
};

export const parseArgs = (list) => {
  const args = [];
  const kwargs = {};
  for (let i = 0, j = list.length; i < j; i++) {
    _h(args, kwargs, list[i], 0);
  }
  return { args, kwargs };
};
