// https://github.com/python/cpython/blob/3.11/Lib/colorsys.py

const { abs, max, min, floor } = Math;

const ONE_THIRD = 1 / 3;
const ONE_SIXTH = 1 / 6;
const TWO_THIRD = 2 / 3;

const _h = (r, g, b, mx, d) => {
  if (r === mx) {
    return (g - b) / d + (g < b ? 6 : 0);
  }
  if (g === mx) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
};

const _v = (m1, m2, h) => {
  if (h < 0) {
    h += 1;
  } else if (h > 1) {
    h -= 1;
  }
  if (h < ONE_SIXTH) {
    return m1 + (m2 - m1) * 6 * h;
  }
  if (h < .5) {
    return m2;
  }
  if (h < TWO_THIRD) {
    return m1 + (m2 - m1) * (TWO_THIRD - h) * 6;
  }
  return m1;
};

export const rgb = (n) => [n >> 16, n >> 8 & 255, n & 255];

export const rgbToCmyk = (r, g, b) => {
  const k = max(r, g, b);
  if (k === 0) {
    return [0, 0, 0, 1];
  }
  const c = 1 - r / k;
  const m = 1 - g / k;
  const y = 1 - b / k;
  return [c, m, y, 1 - k];
};

export const cmykToRgb = (c, m, y, k) => {
  if (k === 1) {
    return [0, 0, 0];
  }
  const x = 1 - k;
  return [x - c * x, x - m * x, x - y * x];
};

export const rgbToHls = (r, g, b) => {
  const mx = max(r, g, b);
  const mn = min(r, g, b);
  const c = mx + mn;
  const l = c / 2;
  if (mn === mx) {
    return [0, l, 0];
  }
  const d = mx - mn;
  const s = d / (1 - abs(2 * l - 1));
  const h = _h(r, g, b, mx, d) / 6;
  return [h, l, s];
};

export const hlsToRgb = (h, l, s) => {
  if (s === 0) {
    return [l, l, l];
  }
  const m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  const m1 = 2 * l - m2;
  const r = _v(m1, m2, h + ONE_THIRD);
  const g = _v(m1, m2, h);
  const b = _v(m1, m2, h - ONE_THIRD);
  return [r, g, b];
};

export const rgbToHsv = (r, g, b) => {
  const mx = max(r, g, b);
  const mn = min(r, g, b);
  if (mn === mx) {
    return [0, 0, mx];
  }
  const d = mx - mn;
  const s = d / mx;
  const h = _h(r, g, b, mx, d) / 6;
  return [h, s, mx];
};

export const hsvToRgb = (h, s, v) => {
  if (s === 0) {
    return [v, v, v];
  }
  const i = floor(h * 6);
  const f = h * 6 - 1;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  if (i === 0) {
    return [v, t, p];
  }
  if (i === 1) {
    return [q, v, p];
  }
  if (i === 2) {
    return [p, v, t];
  }
  if (i === 3) {
    return [p, q, v];
  }
  if (i === 4) {
    return [t, p, v];
  }
  if (i === 5) {
    return [v, p, q];
  }
};
