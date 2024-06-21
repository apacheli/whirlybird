const { floor, random } = Math;

export const choice = (list) => list[floor(random() * list.length)];

export const rng = (max, min = 0) => floor(random() * (max - min) + min);

export const shuffle = (list) => {
  const len = list.length;
  const a = new Array(len);
  for (let i = 0; i < len; i++) {
    const j = floor(random() * (i + 1));
    if (j !== i) {
      a[i] = a[j];
    }
    a[j] = list[i];
  }
  return a;
};

export const shuffleSattolo = (list) => {
  const len = list.length;
  const a = new Array(len);
  for (let i = 0; i < len; i++) {
    const j = floor(random() * i);
    if (j !== i) {
      a[i] = a[j];
    }
    a[j] = list[i];
  }
  return a;
};
